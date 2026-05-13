import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const NotFoundPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 text-center">
      <div className="mb-6 grid h-20 w-20 place-items-center rounded-2xl bg-primary text-4xl font-bold text-primary-foreground shadow-lg">
        S
      </div>
      <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">404</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Упс! Похоже, это видео удалено или страница еще не создана.
      </p>
      <div className="mt-10">
        <Button asChild size="lg" className="rounded-full px-8">
          <Link to="/">Вернуться на главную</Link>
        </Button>
      </div>
    </div>
  );
};