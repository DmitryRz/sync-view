import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs.tsx"
import Header from "@/components/layout/Header.tsx"
import { useState } from "react"
import Sidebar from "@/components/layout/Sidebar.tsx"
import VideoList from "@/components/VideoList.tsx"
import FriendsList from "@/components/FriendsList.tsx"
import { useParams } from "react-router-dom"
import { useGetProfile } from "@/hooks/useGetProfile.ts"
import { LoadingSpinner } from "@/components/ui/LoadingSpinner.tsx"
import { ErrorState } from "@/components/ui/ErrorState.tsx"

import keycloak from "@/lib/keycloak.ts"
import UploadAvatarModal from "@/components/modal/UploadAvatarModal.tsx"

const Profile = () => {
  const { userId } = useParams()
  const sub = keycloak.idTokenParsed?.sub

  const [isOpen, setIsOpen] = useState(false)

  const { user, loading: loadingProfile, error, getProfile } = useGetProfile(userId)

  if (loadingProfile) return <LoadingSpinner />
  if (error) return <ErrorState message={error.message} status={error.status} />


  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className="relative flex flex-1 overflow-hidden">
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} mode="fixed" />

        <div className="container mx-auto max-w-5xl py-8">
            <div className="mb-8 flex flex-col items-center gap-6 rounded-2xl border border-border bg-secondary/20 p-6 sm:flex-row">
              <Avatar className="h-32 w-32 border-4 border-background shadow-lg">
                <AvatarImage src={user?.avatar ?? undefined} alt="User" />
                <AvatarFallback className="text-4xl">U</AvatarFallback>
              </Avatar>
              <div className="flex-1 text-center sm:text-left">
                <h1 className="text-3xl font-bold">{user?.username}</h1>
                {/*<p className="mt-1 text-muted-foreground">*/}
                {/*  Краткое описание профиля или статус пользователя.*/}
                {/*</p>*/}
                {userId === sub && (
                  <div className="mt-4 flex justify-center gap-2 sm:justify-start">
                    <UploadAvatarModal refetch={getProfile} />
                  </div>
                )}
              </div>
            </div>

          <Tabs defaultValue="videos" className="w-full">
            <TabsList className="bg-secondary/40">
              <TabsTrigger value="videos">Видео</TabsTrigger>
              <TabsTrigger value="friends">Друзья</TabsTrigger>
            </TabsList>
            <TabsContent value="videos" className="mt-6">
              <VideoList username={user?.username} />
            </TabsContent>
            <TabsContent value="friends" className="mt-6">
              <FriendsList />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default Profile