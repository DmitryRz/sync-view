import VideoCard from "@/components/VideoCard.tsx"
import { LoadingSpinner } from "@/components/ui/LoadingSpinner.tsx"
import { ErrorState } from "@/components/ui/ErrorState.tsx"
import { Film } from "lucide-react"
import type { VideoType } from "@/types/video/Video.ts"
import type { ErrorInfo } from "@/components/layout/Sidebar.tsx"

interface VideoListProps {
  username?: string | undefined
  videos: VideoType[],
  loading: boolean,
  error: ErrorInfo | null,
  refetch: () => void,
}

const VideoList = ({ username, videos, loading, error, refetch }: VideoListProps ) => {

  if (loading) return <LoadingSpinner />
  if (error) return <ErrorState status={error.status} onRetry={refetch} />

  const displayVideos = username
    ? videos.filter(v => v.ownerUsername === username)
    : videos;

  if (username && displayVideos.length === 0) {
    return (
      <div className="flex h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-secondary/10 p-8 text-center animate-in fade-in zoom-in duration-300">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <Film className="h-8 w-8 text-primary" />
        </div>
        <h3 className="text-xl font-semibold">Пока нет видео</h3>
        <p className="mt-2 max-w-sm text-muted-foreground">
          Пользователь <strong>{username}</strong> еще не загрузил ни одного видео.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {displayVideos.map((v) => (
        <VideoCard key={v.id} video={v} />
      ))}
    </div>
  )
}

export default VideoList