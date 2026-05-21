import { useState } from "react"
import Header from "@/components/layout/Header.tsx"
import Sidebar from "@/components/layout/Sidebar.tsx"
import VideoList from "@/components/VideoList.tsx"

const Home = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} mode="push" />

        <main className="min-w-0 flex-1 p-4 md:p-6">
          <VideoList />
        </main>
      </div>
    </div>
  )
}

export default Home