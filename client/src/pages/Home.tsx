import { useCallback, useEffect, useState } from "react"
import Header from "@/components/layout/Header.tsx"
import Sidebar, { type ErrorInfo } from "@/components/layout/Sidebar.tsx"
import axios from "axios"
import VideoCard from "@/components/VideoCard.tsx"
import { LoadingSpinner } from "@/components/ui/LoadingSpinner.tsx"
import { ErrorState } from "@/components/ui/ErrorState.tsx"

export type VideoType = {
  id: number
  title: string
  url: string
  duration: number
  ownerUsername: string
  createdAt: string
}


const Home = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [videos, setVideos] = useState<VideoType[]>([]);
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<ErrorInfo | null>(null);

  const fetchVideos = useCallback(async (isInitialLoad = false) => {
    const controller = new AbortController()
    setError(null)

    try {
      if (isInitialLoad) {
        setLoading(true);
      }

      const response = await axios.get<VideoType[]>("/api/videos", {
        signal: controller.signal,
      })

      setVideos(response.data)

    } catch(err) {
      if (axios.isCancel(err)) {
        console.log("Запрос отменен")
        return
      }
      if (axios.isAxiosError(err)) {
        setError({
          message: err.message,
          status: err.response?.status || 0
        });
      } else {
        setError({
          message: err instanceof Error ? err.message : "Unexpected error"
        });
      }
    } finally {
      setLoading(false)
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchVideos(true);
  }, [fetchVideos]);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header isOpen={isOpen} setIsOpen={setIsOpen} onVideoUploaded={fetchVideos} />
      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} mode="push" />

        <main className="min-w-0 flex-1 p-4 md:p-6">
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorState status={error.status} onRetry={fetchVideos} />
        ) : (
          <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {videos.map((v) => (
              <VideoCard key={v.id} video={v} />
            ))}
          </div>
        )}
        </main>
      </div>
    </div>
  )
}

export default Home