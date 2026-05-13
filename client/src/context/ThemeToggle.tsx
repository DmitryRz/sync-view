import { Button } from "@/components/ui/button.js"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/context/ThemeProvider.tsx"

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme()

  return (
    <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} aria-label="Toggle theme">
      {theme ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </Button>
  )
}

export default ThemeToggle