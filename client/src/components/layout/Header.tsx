  import ThemeToggle from "@/context/ThemeToggle.tsx"
  import { Button } from "@/components/ui/button.tsx"
  import { Input } from "@/components/ui/input.tsx"
  import {
    Menu,
    Mic,
    Search,
    User,
  } from "lucide-react"
  import Logo from "@/components/shared/logo.tsx"
  import keycloak from "@/lib/keycloak.ts"
  import { UserNav } from "@/components/layout/UserNav.tsx"
  import UploadVideoModal from "@/components/layout/UploadVideoModal.tsx"

  interface HeaderProps {
    setIsOpen: (value: boolean) => void
    isOpen?: boolean
    onVideoUploaded?: (isInitialLoad?: boolean) => Promise<void>
  }

  const Header = ({
    setIsOpen,
    isOpen,
    onVideoUploaded,
  }: HeaderProps) => {
    return (
      <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b border-border bg-background/80 px-4 backdrop-blur">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Menu"
            onClick={() => {
              setIsOpen(!isOpen)
            }}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <Logo />
        </div>
        <div className="mx-auto flex w-full max-w-2xl items-center">
          <div className="flex flex-1 items-center rounded-full border border-border bg-secondary/40 focus-within:border-primary/50">
            <Input
              placeholder="Поиск"
              className="h-10 flex-1 border-0 bg-transparent px-4 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              aria-label="Search"
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="ml-2 rounded-full bg-secondary/40"
            aria-label="Voice"
          >
            <Mic className="h-4 w-4" />
          </Button>
        </div>
        <ThemeToggle />
        {keycloak.authenticated ? (
          <div className="flex items-center gap-1">
            <UploadVideoModal onVideoUploaded={onVideoUploaded} />
            <UserNav />
          </div>
        ) : (
          <Button
            variant="default"
            className="gap-2 rounded-full"
            onClick={() => keycloak.login()}
          >
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Войти</span>
          </Button>
        )}
      </header>
    )
  }

  export default Header
