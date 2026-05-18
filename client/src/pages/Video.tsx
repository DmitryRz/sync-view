import Header from "@/components/layout/Header.tsx"
import Sidebar from "@/components/layout/Sidebar.tsx"
import { Link, useParams } from "react-router-dom"
import { useEffect, useRef, useState } from "react";
import {
  MessagesSquare,
  Maximize,
  Minimize,
  ThumbsUp,
  ThumbsDown,
  Share2,
  ChevronLeft,
  PanelRight,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { VideoPlayer } from "@/components/VideoPlayer.tsx"
import { ChatPanel, type ChatVariant } from "@/components/ChatPanel.tsx"
import axios from "axios"
import { LoadingSpinner } from "@/components/ui/LoadingSpinner.tsx"
import type { VideoType } from "@/types/video/Video.ts"
import keycloak from "@/lib/keycloak.ts";
import type Player from "video.js/dist/types/player";
import type { MessageResponseDto, RoomEventDto, VideoSignalDto } from "@/types/websocket/types.ts";
import { PlayerAction, RoomEventType } from "@/types/websocket/enums.ts";
import { useStomp } from "@/context/StompContext.ts"


const Video = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { roomId } = useParams();

  const [video, setVideo] = useState<VideoType | null>(null);
  const [loading, setLoading] = useState(true);

  const videoPlayerRef = useRef<Player | null>(null);
  const isUpdatingPlayer = useRef<boolean>(false);

  const [chatMessages, setChatMessages] = useState<MessageResponseDto[]>([]);
  const [roomEvents, setRoomEvents] = useState<RoomEventDto[]>([]);

  const userUuid = keycloak.idTokenParsed?.sub;

  const stompClient = useStomp();


  useEffect(() => {
    const fetchRoomAndVideo = async () => {
      try {
        setLoading(true);
        const roomResponse = await axios.get(`/api/rooms/${roomId}`);

        const videoId = roomResponse.data.videoId;

        const [videoDetailResponse, messagesResponse] = await Promise.all([
          axios.get(`/api/videos/${videoId}`),
          axios.get(`/api/rooms/${roomId}/messages`)
        ]);

        setVideo({
          ...videoDetailResponse.data,
          url: roomResponse.data.currentVideo
        });

        setChatMessages(messagesResponse.data.content);

      } catch (err) {
        console.error("Ошибка загрузки данных:", err);
      } finally {
        setLoading(false);
      }
    };

    if (roomId) {
      fetchRoomAndVideo();
    }
  }, [roomId]);

  useEffect(() => {
    if (!stompClient || !roomId || !keycloak.token) return;

    const topicPath = `/topic/${roomId}`;
    const userUuid = keycloak.idTokenParsed?.sub;

    const subscription = stompClient.subscribe(topicPath, (message) => {
      const parsedMessage = JSON.parse(message.body);
      if (parsedMessage.action) {
        const signal = parsedMessage as VideoSignalDto;
        if (signal.initiatorId !== userUuid && videoPlayerRef.current) {
          isUpdatingPlayer.current = true;
          switch (signal.action) {
            case PlayerAction.PLAY:
              videoPlayerRef.current.play();
              break;
            case PlayerAction.PAUSE:
              videoPlayerRef.current.pause();
              break;
            case PlayerAction.SEEK:
              videoPlayerRef.current.currentTime(signal.timestamp);
              break;
            case PlayerAction.RATE_CHANGE:
              videoPlayerRef.current.playbackRate(signal.playbackRate);
              break;
          }
          setTimeout(() => { isUpdatingPlayer.current = false; }, 100);
        }
      } else if (parsedMessage.type) {
        const event = parsedMessage as RoomEventDto;
        setRoomEvents((prev) => [...prev, event]);
        console.log(`User ${event.username} ${event.type === RoomEventType.JOIN ? "joined" : "left"} the room.`);
      } else {
        const chatMessage = parsedMessage as MessageResponseDto;
        setChatMessages((prev) => [...prev, chatMessage]);
      }
    });

    stompClient.publish({
      destination: `/app/room/${roomId}/join`,
      headers: { 'Authorization': `Bearer ${keycloak.token}` },
      skipContentLengthHeader: true,
    });

    return () => {
      if (stompClient) {
        subscription.unsubscribe();
      }
    };
  }, [stompClient, roomId, userUuid]);

  useEffect(() => {
    const player = videoPlayerRef.current;
    if (!player || !stompClient || !roomId || !keycloak.token) return;


    const sendPlayerSignal = (action: PlayerAction, currentTimestamp?: number, playbackRate?: number) => {
      if (!isUpdatingPlayer.current) {
        const actualTimestamp = currentTimestamp !== undefined ? currentTimestamp : (player.currentTime() ?? 0);
        const actualPlaybackRate = playbackRate !== undefined ? playbackRate : (player.playbackRate() ?? 1);

        const signal: VideoSignalDto = {
          action,
          timestamp: actualTimestamp,
          playbackRate: actualPlaybackRate,
          sentAt: Date.now(),
          initiatorId: userUuid || "unknown",
        };
        stompClient.publish({
          destination: `/app/room/${roomId}/player`,
          body: JSON.stringify(signal),
          headers: { 'Authorization': `Bearer ${keycloak.token}`, 'content-type': 'application/json' },
        });
      }
    };

    const handlePlay = () => sendPlayerSignal(PlayerAction.PLAY, player.currentTime());
    const handlePause = () => sendPlayerSignal(PlayerAction.PAUSE, player.currentTime());
    const handleSeeked = () => sendPlayerSignal(PlayerAction.SEEK, player.currentTime());
    const handleRateChange = () => sendPlayerSignal(PlayerAction.RATE_CHANGE, player.currentTime(), player.playbackRate());

    player.on('play', handlePlay);
    player.on('pause', handlePause);
    player.on('seeked', handleSeeked);
    player.on('ratechange', handleRateChange);

    return () => {
      player.off('play', handlePlay);
      player.off('pause', handlePause);
      player.off('seeked', handleSeeked);
      player.off('ratechange', handleRateChange);
    };
  }, [stompClient, roomId, userUuid]);

  const handleSendMessage = (message: string) => {
    if (stompClient && roomId && keycloak.token) {
      stompClient.publish({
        destination: `/app/room/${roomId}/chat`,
        body: JSON.stringify({ message: message }),
        headers: { 'Authorization': `Bearer ${keycloak.token}`, 'content-type': 'application/json' },
      });
    }
  };

  const [chatOpen, setChatOpen] = useState(true);
  const [variant, setVariant] = useState<ChatVariant>("theater");
  const [isFullscreen, setIsFullscreen] = useState(false);

  const stageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(orientation: landscape) and (max-height: 500px)");
    const apply = () => {
      if (mq.matches) setChatOpen(false);
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    const onChange = () => {
      const fs = !!document.fullscreenElement;
      setIsFullscreen(fs);
      if (fs) {
        setVariant((v) => (v === "theater" ? "side" : v));
        setChatOpen(true);
      } else {
        setVariant("theater");
      }
    };
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  const toggleFullscreen = async () => {
    if (!stageRef.current) return;
    if (!document.fullscreenElement) {
      await stageRef.current.requestFullscreen?.();
    } else {
      await document.exitFullscreen?.();
    }
  };

  const fsVariantLabel = variant === "side" ? "Сбоку" : "Поверх";

  if (loading) return <LoadingSpinner />;
  if (!video) return <div>...</div>;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header isOpen={isOpen} setIsOpen={setIsOpen} />
      <Sidebar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        mode="fixed"
      />

      <main className="mx-auto w-full max-w-[1800px] p-3 md:p-5">
        <div className="flex w-full flex-col gap-4 lg:flex-row lg:items-start">
          <div className="min-w-0 flex-1">
            <div
              ref={stageRef}
              className={cn(
                "relative overflow-hidden rounded-xl bg-black w-full flex",
                !isFullscreen && "aspect-video",
                isFullscreen && "h-screen w-screen rounded-none"
              )}
            >
              {/* Контейнер самого видео */}
              <div className={cn(
                "flex items-center justify-center",
                isFullscreen ? "h-full w-full" : "absolute inset-0"
              )}>
                <VideoPlayer
                  src={video.url}
                  playerRef={videoPlayerRef}
                />
              </div>

              {/* Кастомная панель сверху над плеером */}
              <div className={cn(
                "pointer-events-none absolute left-0 right-0 top-0 z-10 flex items-center justify-between p-3 transition-all",
                isFullscreen && variant === "side" && chatOpen && "right-[380px]"
              )}>
                <div className="pointer-events-auto flex items-center gap-2">
                  {!isFullscreen && (
                    <Button
                      asChild
                      variant="secondary"
                      size="sm"
                      className="bg-black/55 text-white backdrop-blur hover:bg-black/70"
                    >
                      <Link to="/">
                        <ChevronLeft className="mr-1 h-4 w-4" /> Назад
                      </Link>
                    </Button>
                  )}
                </div>
                <div className="pointer-events-auto flex items-center gap-2">
                  {isFullscreen && (
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() =>
                        setVariant((v) => (v === "side" ? "overlay" : "side"))
                      }
                      className="bg-black/55 text-white backdrop-blur hover:bg-black/70"
                    >
                      {variant === "side" ? (
                        <Layers className="mr-1 h-4 w-4" />
                      ) : (
                        <PanelRight className="mr-1 h-4 w-4" />
                      )}
                      Чат: {fsVariantLabel}
                    </Button>
                  )}
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={() => setChatOpen((c) => !c)}
                    className="bg-black/55 text-white backdrop-blur hover:bg-black/70"
                    aria-label="Переключить чат"
                    title="Чат"
                  >
                    <MessagesSquare className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={toggleFullscreen}
                    className="bg-black/55 text-white backdrop-blur hover:bg-black/70"
                    aria-label="Полный экран"
                    title="Полный экран"
                  >
                    {isFullscreen ? (
                      <Minimize className="h-4 w-4" />
                    ) : (
                      <Maximize className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Fullscreen: чат сбоку — полная высота, справа */}
              {isFullscreen && variant === "side" && chatOpen && (
                <div className="relative h-full w-[380px] border-l border-white/10 bg-card shrink-0 z-20">
                  <ChatPanel variant="side" onCollapse={() => setChatOpen(false)} messages={chatMessages} onSendMessage={handleSendMessage} roomEvents={roomEvents} />
                </div>
              )}

              {/* Fullscreen: чат поверх — ~1/2 высоты экрана, справа снизу */}
              {isFullscreen && variant === "overlay" && chatOpen && (
                <div className="absolute bottom-6 right-6 z-20 h-[50vh] w-[360px]">
                  <ChatPanel variant="overlay" onCollapse={() => setChatOpen(false)} messages={chatMessages} onSendMessage={handleSendMessage} roomEvents={roomEvents} />
                </div>
              )}
            </div>

            {!isFullscreen && (
              <div className="mt-4">
                <h1 className="text-xl font-bold leading-tight">{video.title}</h1>
                <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-accent" />
                    <div>
                      <div className="text-sm font-semibold">{video.ownerUsername}</div>
                      <div className="text-xs text-muted-foreground">412K подписчиков</div>
                    </div>
                    <Button className="ml-2 rounded-full">Подписаться</Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex overflow-hidden rounded-full bg-secondary">
                      <Button variant="ghost" className="gap-2 rounded-none px-4">
                        <ThumbsUp className="h-4 w-4" /> 12K
                      </Button>
                      <div className="w-px bg-border" />
                      <Button variant="ghost" className="rounded-none px-4">
                        <ThumbsDown className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button variant="secondary" className="gap-2 rounded-full">
                      <Share2 className="h-4 w-4" /> Поделиться
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {!isFullscreen && (
            <aside
              className={cn(
                "shrink-0 transition-all",
                chatOpen ? "lg:w-[380px]" : "lg:w-0 lg:overflow-hidden"
              )}
            >
              <div className="h-[70vh] lg:h-[calc(100vh-8rem)]">
                {chatOpen ? (
                  <ChatPanel variant="theater" onCollapse={() => setChatOpen(false)} messages={chatMessages} onSendMessage={handleSendMessage} roomEvents={roomEvents} />
                ) : null}
              </div>
            </aside>
          )}
        </div>
      </main>
    </div>
  )
}

export default Video