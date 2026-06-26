import { useState } from "react"
import Header from "@/components/layout/Header.tsx"
import Sidebar from "@/components/layout/Sidebar.tsx"
import VideoList from "@/components/VideoList.tsx"
import { useVideos } from "@/hooks/useVideos.ts"

const Home = () => {
  const { videos, loading, error, refetch } = useVideos();


  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header isOpen={isOpen} setIsOpen={setIsOpen} onUploadSuccess={refetch} />
      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} mode="push" />

        <main className="min-w-0 flex-1 p-4 md:p-6">
          <VideoList videos={videos} loading={loading} error={error} refetch={refetch} />
        </main>
      </div>
    </div>
  )
}

export default Home