import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { CirclePlus, Globe, History, House, Menu, Users } from "lucide-react"
import axios from "axios"
import { cn } from "@/lib/utils.ts"
import { Button } from "@/components/ui/button.tsx"
import { Separator } from "@/components/ui/separator.tsx"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.tsx"
import { LoadingSpinner } from "@/components/ui/LoadingSpinner.tsx"
import { ErrorState } from "@/components/ui/ErrorState.tsx"

export interface ErrorInfo {
  message: string;
  status?: number;
}


type Item = {
  icon: React.ComponentType<{ className?: string }>
  label: string
  to?: string
}

type User = {
  uuid: string
  username: string
  email: string
  avatar: string
}

type LayoutMode = "push" | "fixed"

const block1: Item[] = [
  { icon: House, label: "Главная", to: "/" },
  { icon: Globe, label: "Публичные комнаты", to: "/rooms" },
  { icon: CirclePlus, label: "Создать комнату" },
]

const block2: Item[] = [
  { icon: Users, label: "Мои комнаты" },
  { icon: History, label: "История просмотров" },
]

function Row({ icon: Icon, label, to }: Item) {
  const cls =
    "group flex w-full items-center gap-5 rounded-lg px-3 py-2 text-sm text-foreground/90 transition-colors hover:bg-accent hover:text-accent-foreground"
  if (to)
    return (
      <Link to={to} className={cls}>
        <Icon className="h-5 w-5 shrink-0" />
        <span>{label}</span>
      </Link>
    )
  return (
    <button className={cls}>
      <Icon className="h-5 w-5 shrink-0" />
      <span>{label}</span>
    </button>
  )
}

interface SidebarProps {
  isOpen?: boolean
  setIsOpen: (value: boolean) => void;
  mode: LayoutMode
}

const Sidebar = ({ isOpen, setIsOpen, mode }: SidebarProps) => {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<ErrorInfo | null>(null);

  const fetchUsers = async (controller: AbortController = new AbortController()) => {
    setError(null)
    try {
      setLoading(true)
      const response = await axios.get<User[]>("/api/users", {
        signal: controller.signal,
      })

      setUsers(response.data)
    } catch (err) {
      if (axios.isCancel(err)) {
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
  }

  useEffect(() => {
    const controller = new AbortController()
    fetchUsers(controller)
    return () => controller.abort()
  }, [])

  return (
    <aside
      className={cn(
        "z-40 shrink-0 bg-background transition-all duration-300 ease-in-out",
        mode === "push" ? (isOpen ? "w-64 border-r" : "w-0 border-r-0") : "w-0",
        mode === "fixed" && "fixed inset-y-0 left-0 h-full"
      )}
    >
      <div
        className={cn(
          "h-full w-64 border-r border-border bg-background transition-transform duration-300 ease-in-out",
          !isOpen && "-translate-x-full",
          mode === "fixed" && "fixed top-0 z-50 shadow-2xl"
        )}
      >
        {mode === "fixed" && (
          <>
            <div className="flex h-16 items-center gap-2 px-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
              >
                <Menu className="h-5 w-5" />
              </Button>
              <Link to="/" className="flex items-center gap-1.5">
                <span className="grid h-7 w-7 place-items-center rounded-md bg-primary font-bold text-primary-foreground">
                  S
                </span>
                <span className="text-lg font-semibold tracking-tight">
                  syncview
                </span>
              </Link>
            </div>
            <Separator />
          </>
        )}

        <div className="flex flex-col gap-1 p-3">
          {block1.map((i) => (
            <Row key={i.label} {...i} />
          ))}
          <Separator className="my-2" />
          <div className="px-3 pt-2 pb-1 text-sm font-semibold text-foreground">
            Вы
          </div>
          {block2.map((i) => (
            <Row key={i.label} {...i} />
          ))}
          <Separator className="my-2" />
          {loading ? (
            <LoadingSpinner />
          ) : error ? (
              <ErrorState status={error.status} onRetry={fetchUsers} />
            ) : (
              <>
                <div className="px-3 pt-2 pb-1 text-sm font-semibold text-foreground">
                  Список пользователей
                </div>
                {users.map((user) => (
                  <button
                    key={user.uuid}
                    className="group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-foreground/90 transition-colors hover:bg-accent"
                  >
                    <div className="relative">
                      <Avatar className="h-8 w-8 rounded-lg">
                        <AvatarImage
                          src={user.avatar}
                          alt={user.username}
                        />
                        <AvatarFallback className="rounded-lg">
                          {user.username.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      {/*<span className="absolute -right-0.5 -bottom-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-background" />*/}
                    </div>
                    <span className="transition-colors group-hover:text-primary">
                {user.username}
              </span>
                  </button>
                ))}
              </>
          ) }


        </div>
      </div>
      {mode === "fixed" && isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/10 transition-opacity dark:bg-black/70"
          onClick={() => setIsOpen(false)}
        />
      )}
    </aside>
  )
}

export default Sidebar
