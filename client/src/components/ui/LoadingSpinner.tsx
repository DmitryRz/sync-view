import { Loader2 } from "lucide-react";
import type { ReactNode } from "react"

interface LoadingSpinnerProps {
  className?: string;
  children?: ReactNode;
}

export const LoadingSpinner = ({ className, children }: LoadingSpinnerProps) => {
  return (
    <div className="flex flex-col h-full w-full items-center justify-center gap-3 p-8">
      <Loader2 className={`h-8 w-8 animate-spin text-primary ${className}`} />
      {children && (
        <span className="text-sm font-medium text-muted-foreground animate-pulse">
          {children}
        </span>
      )}
    </div>
  );
};