import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog.tsx"
import { Button } from "@/components/ui/button.tsx"
import { Input } from "@/components/ui/input.tsx"

interface CreateRoomModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CreateRoomModal = ({ open, onOpenChange }: CreateRoomModalProps) => {
  const navigate = useNavigate()
  const [name, setName] = useState("")
  const [externalUrl, setExternalUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleCreateRoom = async () => {
    if (!name.trim() || !externalUrl.trim()) {
      setError("Пожалуйста, заполните все поля")
      return
    }

    try {
      setLoading(true)
      setError("")

      const response = await axios.post("/api/rooms", {
        name: name.trim(),
        externalUrl: externalUrl.trim(),
      })

      setName("")
      setExternalUrl("")
      onOpenChange(false) // Закрываем через внешний метод

      const createdRoomId = response.data.id
      navigate(`/rooms/${createdRoomId}`)
    } catch (err: any) {
      console.error("Ошибка при создании комнаты:", err)
      setError(err.response?.data?.message || "Не удалось создать комнату")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-hidden sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Создание новой комнаты</DialogTitle>
        </DialogHeader>

        <div className="relative grid gap-4 pbe-4">
          {error && (
            <p className="text-sm font-medium text-destructive bg-destructive/10 p-2 rounded-md">
              {error}
            </p>
          )}

          <div className="grid gap-2">
            <label htmlFor="roomName" className="text-sm font-medium">
              Название комнаты
            </label>
            <Input
              id="roomName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Стрим с друзьями"
              disabled={loading}
            />
          </div>

          <div className="grid gap-2">
            <label htmlFor="externalUrl" className="text-sm font-medium">
              Ссылка на внешнее видео (.m3u8, mp4)
            </label>
            <Input
              id="externalUrl"
              value={externalUrl}
              onChange={(e) => setExternalUrl(e.target.value)}
              placeholder="https://example.com/video.m3u8"
              disabled={loading}
            />
          </div>

          <Button onClick={handleCreateRoom} disabled={loading} className="mt-2">
            {loading ? "Создание..." : "Создать и войти"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default CreateRoomModal