import { useState } from "react"
import Header from "@/components/layout/Header.tsx"
import Sidebar from "@/components/layout/Sidebar.tsx"
import VideoCard from "@/components/VideoCard.tsx"
import { LoadingSpinner } from "@/components/ui/LoadingSpinner.tsx"
import { ErrorState } from "@/components/ui/ErrorState.tsx"
import { useVideos } from "@/hooks/useVideos.ts"

const Home = () => {
  const [isOpen, setIsOpen] = useState(true);

  const { videos, loading, error, refetch } = useVideos()

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header isOpen={isOpen} setIsOpen={setIsOpen} onVideoUploaded={refetch} />
      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} mode="push" />

        <main className="min-w-0 flex-1 p-4 md:p-6">
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorState status={error.status} onRetry={refetch} />
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