import { useCallback, useEffect, useState } from "react"
import type { ErrorInfo } from "@/components/layout/Sidebar.tsx"
import axios from "axios"
import type { UserProfile } from "@/types/user/types.ts"


export const useGetProfile = (userId: string | undefined) => {
  const [user, setUser] = useState<UserProfile|null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<ErrorInfo | null>(null)

  const getProfile = useCallback(async (controller?: AbortController) => {
    if (!userId) return;
    setLoading(true)
    setError(null)

    const abortSignal = controller?.signal ?? new AbortController().signal

    try {
      const response = await axios.get<UserProfile>(`/api/users/${userId}`, {
        signal: abortSignal,
      })
      setUser(response?.data)

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
  }, [userId])


  useEffect(() => {
    const controller = new AbortController();
    getProfile(controller);
    return () => controller.abort();
  }, [getProfile, userId]);

  return { user, loading, error, getProfile }
}