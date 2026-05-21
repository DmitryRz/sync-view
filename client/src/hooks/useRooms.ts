import { useState, useEffect } from "react"
import axios from "axios"
import type { ErrorInfo } from "@/components/layout/Sidebar.tsx"

export const useRooms = () => {
  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<ErrorInfo | null>(null)

  const fetchRooms = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get("/api/rooms")
      setRooms(data)
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError({
          message: err.message,
          status: err.response?.status || 0,
        })
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchRooms() }, [])

  return { rooms, loading, error, refetch: fetchRooms }
}