import { Link } from "react-router-dom"
import { Construction, Home, ArrowLeft, Terminal } from "lucide-react"
import { Button } from "@/components/ui/button"

interface NotImplementedPageProps {
  featureName?: string
}

export const NotImplementedCardPage = ({ featureName }: NotImplementedPageProps) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4 selection:bg-primary/10">
      {/* Фоновые градиенты */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] h-[40%] w-[40%] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute -right-[10%] -bottom-[10%] h-[40%] w-[40%] rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="flex flex-col items-center space-y-6 rounded-2xl border border-border bg-secondary/20 p-8 text-center backdrop-blur-md">
          {/* Иконка */}
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 animate-bounce [animation-duration:3s]">
            <Construction className="h-8 w-8 text-primary" />
          </div>

          {/* Текст */}
          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Раздел проектируется
            </h1>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {featureName
                ? `Модуль «${featureName}» находится на стадии активной разработки и тестирования.`
                : "Данный функционал еще не реализован. Мы усердно пишем код, чтобы запустить его как можно скорее."}
            </p>
          </div>

          {/* Техническая плашка */}
          <div className="flex w-full items-center gap-3 rounded-lg border border-border bg-background/50 px-4 py-3 font-mono text-xs text-muted-foreground">
            <Terminal className="h-4 w-4 shrink-0" />
            <span className="truncate">Status: FEATURE_UNDER_DEVELOPMENT</span>
          </div>

          {/* Кнопки действий */}
          <div className="flex w-full flex-col gap-3 sm:flex-row">
            <Button
              variant="default"
              asChild
              className="h-11 flex-1 gap-2 rounded-full"
            >
              <Link to="/">
                <Home className="h-4 w-4" />
                На главную
              </Link>
            </Button>

            <Button
              variant="outline"
              onClick={() => window.history.back()}
              className="h-11 flex-1 gap-2 rounded-full border-border bg-transparent hover:bg-secondary/50"
            >
              <ArrowLeft className="h-4 w-4" />
              Назад
            </Button>
          </div>
        </div>

        {/* Подвал страницы */}
        <p className="mt-8 flex items-center justify-center gap-2 text-center text-xs text-muted-foreground/60">
          <span className="grid h-5 w-5 place-items-center rounded-md bg-muted text-[10px] font-bold">
            S
          </span>
          syncview core system
        </p>
      </div>
    </div>
  )
}