import { useEffect, useRef } from "react";
import videojs from "video.js";
import type Player from "video.js/dist/types/player";
import "video.js/dist/video-js.css";

type Props = {
  src: string;
  poster?: string;
  playerRef: React.MutableRefObject<Player | null>;
};

export function VideoPlayer({ src, poster, playerRef }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    if (playerRef.current) return;

    const videoEl = document.createElement("video-js");
    videoEl.classList.add("vjs-big-play-centered", "vjs-fill", "[&_video]:object-contain");
    containerRef.current.appendChild(videoEl);

    playerRef.current = videojs(videoEl, {
      controls: true,
      preload: "auto",
      poster,
      sources: [{ src, type: "video/mp4" }],
      playbackRates: [0.5, 1, 1.25, 1.5, 2],
      controlBar: {
        fullscreenToggle: false
      }
    });

    return () => {
      playerRef.current?.dispose();
      playerRef.current = null;
    };
  }, [src, poster, playerRef]);

  return <div ref={containerRef} data-vjs-player className="h-full w-full" />;
}