import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog.tsx"
import { Button } from "@/components/ui/button.tsx"
import { Plus } from "lucide-react"
import { Input } from "@/components/ui/input.tsx"
import { useVideoUpload } from "@/hooks/useVideoUpload.ts"

interface UploadVideoModalProps {
  onVideoUploaded?: ((isInitialLoad?: boolean) => Promise<void>) | undefined
}

const UploadVideoModal = ({ onVideoUploaded }: UploadVideoModalProps) => {
  const { state, actions, dragHandlers } = useVideoUpload(onVideoUploaded)

  const { isUploadOpen, title, file, uploading, isDragging } = state
  const { setIsUploadOpen, setTitle, setFile, handleUpload } = actions

  return (
    <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          className="h-9 gap-2 rounded-full border-none px-4"
        >
          <Plus className="size-4" />
          <span className="text-sm font-medium">Создать</span>
        </Button>
      </DialogTrigger>

      <DialogContent
        className="overflow-hidden"
        onDragOver={dragHandlers.onDragOver}
        onDragLeave={dragHandlers.onDragLeave}
        onDrop={dragHandlers.onDrop}
      >
        <DialogHeader>
          <DialogTitle>Загрузить видео</DialogTitle>
        </DialogHeader>

        {isDragging && (
          <div className="pointer-events-none absolute inset-0 z-50 m-2 flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-primary bg-primary/10 backdrop-blur-sm">
            <div className="mb-2 rounded-full bg-background p-4 shadow-lg">
              <Plus className="h-8 w-8 animate-bounce text-primary" />
            </div>
            <p className="text-lg font-bold text-primary">
              Отпустите, чтобы загрузить
            </p>
          </div>
        )}

        <div className="relative grid gap-4 py-4">
          <div className="grid gap-2">
            <label htmlFor="title" className="text-sm font-medium">
              Название
            </label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Введите название видео"
            />
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-medium">Файл видео</label>
            <div className="relative">
              <Input
                id="file"
                type="file"
                accept="video/*"
                className="absolute inset-0 z-10 cursor-pointer opacity-0"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />

              <div
                className={`flex h-10 w-full items-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background ${!file ? "text-muted-foreground" : "text-foreground"}`}
              >
                {file ? (
                  <span className="flex-1 truncate font-medium text-primary">
                    ✅ {file.name}
                  </span>
                ) : (
                  <span className="flex-1">Выберите или перетащите файл</span>
                )}

                {file ? (
                  <Button
                    type="button"
                    variant="ghost"
                    className="relative z-20 h-6 w-6 p-0"
                    onClick={(e) => {
                      e.preventDefault()
                      setFile(null)
                    }}
                  >
                    ✕
                  </Button>
                ) : (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="pointer-events-none ml-2 h-7 px-2"
                  >
                    Обзор...
                  </Button>
                )}
              </div>
            </div>

            {file && (
              <p className="text-[10px] text-muted-foreground">
                Размер: {(file.size / (1024 * 1024)).toFixed(2)} MB
              </p>
            )}
          </div>

          <Button onClick={handleUpload} disabled={uploading}>
            {uploading ? "Загрузка..." : "Опубликовать"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default UploadVideoModal
