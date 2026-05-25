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
import type { ErrorInfo } from "@/components/layout/Sidebar.tsx"
import keycloak from "@/lib/keycloak.ts"
import { validateUrl } from "@/lib/validateVideoUrl.ts"

interface CreateRoomModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CreateRoomModal = ({ open, onOpenChange }: CreateRoomModalProps) => {
  const navigate = useNavigate()
  const [name, setName] = useState("")
  const [externalUrl, setExternalUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<ErrorInfo | null>(null)

  const handleCreateRoom = async () => {
    if (!name.trim() || !externalUrl.trim()) {
      setError({ message: "Пожалуйста, заполните все поля" })
      return
    }

    const trimmedName = name.trim();
    const trimmedUrl = externalUrl.trim();

    try {
      new URL(trimmedUrl);
      const {isSupported, pureMimeType} = await validateUrl(trimmedUrl);
      if (!isSupported) {
        setError({
          message: `Неподдерживаемый формат видео (${pureMimeType || "неизвестно"}). Ссылка должна вести на прямой видеофайл (MP4, WEBM, MOV) или HLS-стрим (.M3U8).`
        })
        setLoading(false)
        return
      }
    } catch (err) {
      console.error(err)
      setError({
        message: "Введите корректную ссылку или проверьте доступность видео-файла."
      })
      setLoading(false)
      return;
    }

    try {
      setLoading(true)
      setError(null)

      const response = await axios.post("/api/rooms", {
        name: trimmedName,
        externalUrl: trimmedUrl,
      }, {
        headers: {
          "Authorization": `Bearer ${keycloak.token}`,
        }
      })

      setName("")
      setExternalUrl("")
      onOpenChange(false)

      const createdRoomId = response.data.id
      navigate(`/watch/${createdRoomId}`)
    }catch (err) {
      console.error("Ошибка не удалось создать комнату: ", err);
      alert("Не удалось создать комнату");
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 401) {
          setError({
            message: "Вы не авторизованы"
          })
        }
        else {
          setError({
            message: err.message,
            status: err.response?.status || 0,
          })
        }
      }
      return false;
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
              {error.message}
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