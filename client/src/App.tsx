import { Route, Routes } from "react-router-dom"
import Home from "@/pages/Home.tsx"
import { useEffect, useRef, useState } from "react"
import keycloak from "@/lib/keycloak.ts"
import { AuthErrorPage } from "@/pages/AuthErrorPage.tsx"
import Video from "@/pages/Video.tsx"
import { NotFoundPage } from "@/pages/NotFoundPage.tsx"
import { LoadingSpinner } from "@/components/ui/LoadingSpinner.tsx"

export function App() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isTargetStarted = useRef(false);

  useEffect(() => {
    if (isTargetStarted.current) return;
      isTargetStarted.current = true;

    keycloak
      .init({ onLoad: 'check-sso', checkLoginIframe: false })
      .then((authenticated) => {
        console.log("Успешная инициализация", authenticated);
        setIsInitialized(true);
      })
      .catch((err) => {
        console.error("Ошибка Keycloak:", err);
        setError("Сервер Keycloak временно недоступен.");
      });
  });



  if (error) {
    return (
      <AuthErrorPage
        message={error}
        onRetry={() => {
          isTargetStarted.current = false;
          setError(null);
        }}
      />
    );
  }

  if (!isInitialized) {
    return <LoadingSpinner>Загрузка системы безопасности...</LoadingSpinner>;
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/watch/:roomId" element={<Video />} />
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/keycloak-error" element={<AuthErrorPage />} />
    </Routes>
  );
}

export default App
