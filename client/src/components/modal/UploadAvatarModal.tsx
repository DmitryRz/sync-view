import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog.tsx"
import { Input } from "@/components/ui/input.tsx"
import { useAvatarUpload } from "@/hooks/useAvatarUpload.ts"
import { truncateFileName } from "@/lib/truncateFileName.ts"

interface UploadAvatarModalProps {
  refetch: () => void;
}

const UploadAvatarModal = ({ refetch }: UploadAvatarModalProps) => {
  const { state, actions, dragHandlers } = useAvatarUpload(refetch)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Редактировать</Button>
      </DialogTrigger>
      <DialogContent
        className="overflow-hidden"
        onDragOver={dragHandlers.onDragOver}
        onDragLeave={dragHandlers.onDragLeave}
        onDrop={dragHandlers.onDrop}
      >
        <DialogHeader>
          <DialogTitle>Изменить фото профиля</DialogTitle>
        </DialogHeader>

        {/* Оверлей для визуализации перетаскивания */}
        {state.isDragging && (
          <div className="pointer-events-none absolute inset-0 z-50 m-2 flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-primary bg-primary/10 backdrop-blur-sm">
            <div className="mb-2 rounded-full bg-background p-4 shadow-lg">
              <span className="text-4xl">📸</span>
            </div>
            <p className="text-lg font-bold text-primary">
              Отпустите, чтобы загрузить
            </p>
          </div>
        )}

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <label className="text-sm font-medium">Выберите файл</label>
            <div className="relative">
              <Input
                type="file"
                accept="image/*"
                title={state.file?.name}
                className="absolute inset-0 z-10 cursor-pointer opacity-0"
                onChange={(e) => actions.setFile(e.target.files?.[0] || null)}
              />
              <div className="flex h-10 w-full items-center rounded-md border border-input bg-background px-3 py-2 text-sm text-muted-foreground">
                {state.file ? (
                  <span
                    className="min-w-0 truncate font-medium text-primary block"
                    title={state.file.name}
                  >
                    ✅ {truncateFileName(state.file.name, 25)}
                  </span>
                ) : (
                  <span>Нажмите или перетащите файл</span>
                )}
              </div>
            </div>
          </div>

          <Button
            onClick={actions.handleUpload}
            disabled={state.uploading || !state.file}
          >
            {state.uploading ? "Загрузка..." : "Сохранить изменения"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default UploadAvatarModal