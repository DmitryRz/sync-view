import { useEffect, useRef } from "react";
import videojs from "video.js";
import type Player from "video.js/dist/types/player";
import "video.js/dist/video-js.css";
import { validateUrl } from "@/lib/validateVideoUrl.ts"

type Props = {
  src: string;
  poster?: string;
  playerRef: React.MutableRefObject<Player | null>;
};

export function VideoPlayer({ src, poster, playerRef }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    let isMounted = true

    if (!containerRef.current) return

    let player = playerRef.current

    if (!player) {
      const videoEl = document.createElement("video-js")
      videoEl.classList.add("vjs-big-play-centered", "vjs-fill", "[&_video]:object-contain")
      containerRef.current.appendChild(videoEl)

      player = videojs(videoEl, {
        controls: true,
        preload: "auto",
        poster,
        playbackRates: [0.5, 1, 1.25, 1.5, 2],
        controlBar: { fullscreenToggle: false },
      })
      playerRef.current = player
    }

    validateUrl(src).then(({ pureMimeType, isSupported }) => {
      if (!isMounted || !player) return

      if (isSupported) {
        player.error(undefined);
        player.src({ src, type: pureMimeType })
      } else {
        console.error(`Формат ${pureMimeType} не поддерживается плеером.`);
        player.src({ src: "" })
        player.reset();
        setTimeout(() => {
          if (!isMounted || !player) return;
          player.error(`Формат видео (${pureMimeType || "неизвестен"}) не поддерживается.`);
        }, 0);
      }
    })

    return () => {
      isMounted = false
      if (playerRef.current) {
        playerRef.current.dispose()
        playerRef.current = null
      }
    }
  }, [src, poster, playerRef])

  return <div ref={containerRef} data-vjs-player className="h-full w-full" />
}