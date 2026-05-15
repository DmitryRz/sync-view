import { useState, useEffect, useCallback } from "react"
import axios from "axios"
import type { ErrorInfo } from "@/components/layout/Sidebar.tsx"
import type { VideoType } from "@/types/video/Video.ts"

export const useVideos = () => {
  const [videos, setVideos] = useState<VideoType[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<ErrorInfo | null>(null)

  const fetchVideos = useCallback(async (isInitialLoad = false, controller?: AbortController) => {
    setError(null)
    const abortSignal = controller?.signal ?? new AbortController().signal

    try {
      if (isInitialLoad) {
        setLoading(true)
      }

      const response = await axios.get<VideoType[]>("/api/videos", {
        signal: abortSignal,
      })

      setVideos(response.data)
    } catch (err) {
      if (axios.isCancel(err)) {
        console.log("Запрос отменен")
        return
      }
      if (axios.isAxiosError(err)) {
        setError({
          message: err.message,
          status: err.response?.status || 0,
        })
      } else {
        setError({
          message: err instanceof Error ? err.message : "Unexpected error",
        })
      }
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const controller = new AbortController()
    void fetchVideos(true, controller)

    return () => {
      controller.abort()
    }
  }, [fetchVideos])

  return { videos, loading, error, refetch: fetchVideos }
}