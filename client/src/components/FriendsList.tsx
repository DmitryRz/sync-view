import { Users } from "lucide-react"
import { useParams } from "react-router-dom"
import keycloak from "@/lib/keycloak.ts"

const FriendsList = () => {
  const {userId} = useParams()
  const sub = keycloak.tokenParsed?.sub


  return (
    <div className="flex h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-secondary/10 p-8 text-center animate-in fade-in zoom-in duration-300">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
        <Users className="h-8 w-8 text-primary" />
      </div>
      <h3 className="text-xl font-semibold">Пока нет друзей</h3>
      {userId === sub ? (
        <>
          <p className="mt-2 max-w-sm text-muted-foreground">
            Вы еще не добавили ни одного друга. Начните общаться и обмениваться видео с другими пользователями.
          </p>
          {/*<Button className="mt-6" variant="secondary">*/}
          {/*  Найти пользователей*/}
          {/*</Button>*/}
        </>
      ) : (
        <>
          <p className="mt-2 max-w-sm text-muted-foreground">
            Пользователь пока не добавил никого в список друзей
          </p>
          {/*<Button className="mt-6" variant="secondary">*/}
          {/*  Добавить в друзья*/}
          {/*</Button>*/}
        </>
      )}

    </div>

  )
}

export default FriendsList