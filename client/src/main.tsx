import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "@/App.tsx"
import { BrowserRouter } from "react-router-dom"
import { ThemeProvider } from "@/context/ThemeProvider.tsx"

const root = createRoot(document.getElementById("root")!);

root.render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
)