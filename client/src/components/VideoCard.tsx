import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import keycloak from "@/lib/keycloak.ts"
import type { VideoType } from "@/types/video/Video.ts"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.tsx"

const VideoCard = ({ video }: { video: VideoType }) => {
  const navigate = useNavigate();
  const sub = keycloak.idTokenParsed?.sub;

  const handleVideoClick = async (e: React.MouseEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "/api/rooms",
        {
          videoId: video.id,
          name: "default_name"
        },
        {
          headers: {
            'Authorization': `Bearer ${keycloak.token}`
          }
        }
      );

      const roomId = response.data.id;

      navigate(`/watch/${roomId}`);
    } catch (error) {
      console.error("Ошибка при создании комнаты:", error);
    }
  };

  return (
    <div onClick={handleVideoClick} className="group block cursor-pointer">
      <div className="relative aspect-video overflow-hidden rounded-xl bg-secondary">
        <img
          src="https://placehold.co/600x400?text=Preview"
          alt={video.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        />
        {video.duration && (
          <span className="absolute bottom-2 right-2 rounded bg-black/80 px-1.5 py-0.5 text-xs font-medium text-white">
            {video.duration}
          </span>
        )}
      </div>
      <div className="mt-3 flex items-start gap-3">
        <Avatar className="h-9 w-9 shrink-0">
          <AvatarImage src={`/api/users/${sub}/avatar`} alt={video.ownerUsername} />
          <AvatarFallback>{video.ownerUsername[0].toUpperCase()}</AvatarFallback>
        </Avatar>

        <div className="min-w-0 flex-1">
          <h3 className="line-clamp-2 text-sm font-bold leading-tight text-foreground">
            {video.title}
          </h3>
          <p className="mt-1 text-xs text-muted-foreground">{video.ownerUsername}</p>
        </div>

        <div className="shrink-0 mb-0.5">
          <Link
            to={`/video/${video.id}`}
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center rounded-lg bg-secondary px-3 py-1.5 text-xs font-medium text-secondary-foreground hover:bg-secondary/80 transition-colors whitespace-nowrap"
          >
            <span className="hidden sm:inline">Смотреть одному</span>
            <span className="sm:hidden">Смотреть</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default VideoCard