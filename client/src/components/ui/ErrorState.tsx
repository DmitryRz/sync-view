import {
  AlertCircle,
  WifiOff,
  Construction,
  ShieldAlert,
  FileSearch,
} from "lucide-react"
import { Button } from "@/components/ui/button";

interface ErrorStateProps {
  status?: number;
  message?: string;
  title?: string;
  onRetry?: () => void;
}

export const ErrorState = ({ status, message, title, onRetry }: ErrorStateProps) => {

  const getErrorConfig = () => {
    if (status && status >= 500) {
      return {
        icon: <Construction className="h-10 w-10" />,
        defaultTitle: "Внутренняя ошибка сервера",
        defaultMessage: "На стороне сервера произошла непредвиденная ошибка. Мы уже работаем над её устранением.",
        color: "text-orange-500"
      };
    }

    switch (status) {
      case 401:
      case 403:
        return {
          icon: <ShieldAlert className="h-10 w-10" />,
          defaultTitle: "Доступ ограничен",
          defaultMessage: "У вас недостаточно прав для просмотра этого контента или срок действия сессии истек.",
          color: "text-destructive"
        };
      case 404:
        return {
          icon: <FileSearch className="h-10 w-10" />,
          defaultTitle: "Ресурс не найден",
          defaultMessage: "Запрашиваемая страница или файл не существует. Проверьте правильность ссылки.",
          color: "text-muted-foreground"
        };
      case 429:
        return {
          icon: <AlertCircle className="h-10 w-10" />,
          defaultTitle: "Слишком много запросов",
          defaultMessage: "Превышен лимит запросов. Пожалуйста, подождите некоторое время и попробуйте снова.",
          color: "text-orange-500"
        };
      case 0:
        return {
          icon: <WifiOff className="h-10 w-10" />,
          defaultTitle: "Нет связи",
          defaultMessage: "Проверьте подключение к интернету.",
          color: "text-blue-500"
        };
      default:
        return {
          icon: <AlertCircle className="h-10 w-10" />,
          defaultTitle: "Произошла ошибка",
          defaultMessage: "Что-то пошло не так.",
          color: "text-destructive"
        };
    }
  };

  const config = getErrorConfig();

  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border p-10 text-center bg-secondary/10">
      <div className={`mb-4 rounded-full p-3 bg-background shadow-sm ${config.color}`}>
        {config.icon}
      </div>

      <h3 className="text-xl font-bold tracking-tight text-foreground">
        {title || config.defaultTitle}
      </h3>

      <p className="mt-2 max-w-[320px] text-sm text-muted-foreground">
        {message || config.defaultMessage}
      </p>

      {onRetry && (
        <Button
          variant="outline"
          onClick={onRetry}
          className="mt-6 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
        >
          Попробовать снова
        </Button>
      )}

      {status !== null && status !== undefined && (
        <span className="mt-8 text-[10px] uppercase tracking-widest text-muted-foreground/50 font-mono">
          Error Code: {status}
        </span>
      )}
    </div>
  );
};