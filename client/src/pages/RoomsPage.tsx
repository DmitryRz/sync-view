import { useState } from "react"
import {
  Tv,
  Monitor,
  Zap,
  Film,
  Coffee,
  Music,
  BookOpen,
  Gamepad2,
  Globe,
  Heart,
  Users,
} from "lucide-react"
import Header from "@/components/layout/Header.tsx"
import Sidebar from "@/components/layout/Sidebar.tsx"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { useRooms } from "@/hooks/useRooms.ts"
import { Skeleton } from "@/components/ui/skeleton"

const roomMetadata = [
  { name: "Киновечер", creator: "Alex", icon: Tv, viewers: 0 },
  { name: "Киновечер", creator: "GamerGirl", icon: Monitor, viewers: 0 },
  { name: "Киновечер", creator: "Maria", icon: Zap, viewers: 0 },
  { name: "Киновечер", creator: "Admin", icon: Film, viewers: 0 },
  { name: "Утренний кофе", creator: "CoffeeLover", icon: Coffee, viewers: 12 },
  { name: "Lo-Fi Beats", creator: "DJ_Chill", icon: Music, viewers: 25 },
  { name: "Клуб чтения", creator: "BookWorm", icon: BookOpen, viewers: 6 },
  { name: "Ретро игры", creator: "PixelMaster", icon: Gamepad2, viewers: 9 },
  { name: "Путешествия", creator: "Explorer", icon: Globe, viewers: 15 },
  { name: "Добрые стримы", creator: "Smile", icon: Heart, viewers: 7 },
]

interface Room {
  id: string
  name: string
  creator: string
  currentVideo: string
  videoId: number
}

const PublicRooms = () => {
  const [isOpen, setIsOpen] = useState(true)
  const { rooms, loading } = useRooms()

  const enrichedRooms = rooms.map((room: Room, index) => ({
    ...room,
    displayName: roomMetadata[index % roomMetadata.length].name,
    displayCreator: roomMetadata[index % roomMetadata.length].creator,
    Icon: roomMetadata[index % roomMetadata.length].icon,
    viewers: roomMetadata[index % roomMetadata.length].viewers,
  }))

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} mode="push" />

        <main className="flex-1 p-8">
          <div className="mb-10">
            <h1 className="text-3xl font-bold tracking-tight">Публичные комнаты</h1>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <Card key={i} className="aspect-square p-6 flex flex-col gap-4">
                  <div className="flex justify-center mt-4">
                    <Skeleton className="h-16 w-16 rounded-full" />
                  </div>
                  <div className="flex flex-col gap-2 items-center">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                  <div className="mt-auto">
                    <Skeleton className="h-11 w-full rounded-lg" />
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {enrichedRooms.map((room) => {
                const RoomIcon = room.Icon
                return (
                  <Card
                    key={room.id}
                    // Добавили scale-100 и group-hover:scale-[1.02] для плавного увеличения
                    className="aspect-square flex flex-col group border-border bg-card hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 hover:scale-[1.02] rounded-2xl overflow-hidden cursor-pointer"
                  >
                    <CardHeader className="flex-1 flex flex-col items-center justify-center gap-5 p-6 text-center">
                      {/* Добавили group-hover:bg-primary group-hover:text-primary-foreground для иконки */}
                      <div className="p-4 rounded-full bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground scale-125">
                        <RoomIcon size={32} strokeWidth={1.5} />
                      </div>
                      <CardTitle className="text-xl font-semibold leading-tight line-clamp-2 px-1">
                        {room.displayName || "Default Room"}
                      </CardTitle>
                    </CardHeader>

                    <CardContent className="p-6 pt-0 mt-auto w-full">
                      <div className="flex justify-between items-center text-sm text-muted-foreground mb-5 border-t border-muted/50 pt-4">
                        <div className="flex items-center">
                          <Users size={14} className="mr-1.5 text-primary" />
                          <span>{room.viewers || 0} зрителей</span>
                        </div>
                        <span className="font-medium text-foreground">{room.creator}</span>
                      </div>
                      <Link to={`/watch/${room.id}`}>
                        <Button className="w-full h-11 text-base font-medium bg-secondary text-secondary-foreground transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground rounded-lg">
                          Войти
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default PublicRooms