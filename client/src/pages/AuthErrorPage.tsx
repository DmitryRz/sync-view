import {
  ShieldAlert,
  RefreshCw,
  Home,
  MessageCircleWarning,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

interface AuthErrorPageProps {
  message?: string
  onRetry?: () => void
  onSkip?: () => void
}

export const AuthErrorPage = ({ message, onRetry, onSkip }: AuthErrorPageProps) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4 selection:bg-primary/10">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] h-[40%] w-[40%] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute -right-[10%] -bottom-[10%] h-[40%] w-[40%] rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="flex flex-col items-center space-y-6 rounded-2xl border border-border bg-secondary/20 p-8 text-center backdrop-blur-md">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
            <ShieldAlert className="h-8 w-8 text-primary" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Ошибка авторизации
            </h1>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {message ||
                "Не удалось подключиться к серверу аутентификации. Возможно, ведутся технические работы."}
            </p>
          </div>

          <div className="flex w-full items-center gap-3 rounded-lg border border-border bg-background/50 px-4 py-3 font-mono text-xs text-muted-foreground">
            <MessageCircleWarning className="h-4 w-4 shrink-0" />
            <span className="truncate">Status: KEYCLOAK_CONNECTION_FAILED</span>
          </div>

          <div className="flex w-full flex-col gap-3 sm:flex-row">
            <Button
              variant="default"
              className="h-11 flex-1 gap-2 rounded-full"
              onClick={onRetry}
            >
              <RefreshCw className="h-4 w-4" />
              Повторить
            </Button>

            <Button
              variant="outline"
              asChild
              className="h-11 flex-1 gap-2 rounded-full border-border bg-transparent hover:bg-secondary/50"
              onClick={onSkip}
            >
              <Link to="/">
                <Home className="h-4 w-4" />
                На главную
              </Link>
            </Button>
          </div>
        </div>

        <p className="mt-8 flex items-center justify-center gap-2 text-center text-xs text-muted-foreground/60">
          <span className="grid h-5 w-5 place-items-center rounded-md bg-muted text-[10px] font-bold">
            S
          </span>
          syncview security system
        </p>
      </div>
    </div>
  )
}