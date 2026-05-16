import { useNavigate } from "react-router-dom"
import axios from "axios"
import keycloak from "@/lib/keycloak.ts"
import type { VideoType } from "@/types/video/Video.ts"

const VideoCard = ({ video }: { video: VideoType }) => {
  const navigate = useNavigate();

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
      <div className="mt-3 flex gap-3">
        <div className="h-9 w-9 shrink-0 rounded-full bg-gradient-to-br from-primary/40 to-accent" />
        <div className="min-w-0">
          <h3 className="line-clamp-2 text-sm font-bold leading-tight text-foreground">
            {video.title}
          </h3>
          <p className="mt-1 text-xs text-muted-foreground">{video.ownerUsername}</p>
        </div>
      </div>
    </div>
  )
}

export default VideoCard