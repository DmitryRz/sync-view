import { useState, useRef, useEffect } from "react";
import { Smile, Send, ChevronRight, UserPlus, UserMinus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { MessageResponseDto, RoomEventDto } from "@/types/websocket/types.ts";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.tsx";
import { RoomEventType } from "@/types/websocket/enums.ts";

export type ChatVariant = "theater" | "side" | "overlay";

type ChatItem =
  | { type: "message"; data: MessageResponseDto }
  | { type: "event"; data: RoomEventDto };

export function ChatPanel({
                            variant,
                            onCollapse,
                            timeline, // Принимаем готовый массив
                            onSendMessage,
                          }: {
  variant: ChatVariant;
  onCollapse: () => void;
  timeline: ChatItem[];
  onSendMessage: (message: string) => void;
}) {
  const [text, setText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const send = () => {
    if (!text.trim()) return;
    onSendMessage(text);
    setText("");
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const threshold = 100;

    const isAtBottom =
      container.scrollHeight - container.scrollTop <= container.clientHeight + threshold;

    if (isAtBottom) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [timeline]);

  return (
    <div
      className={cn(
        "flex h-full w-full flex-col overflow-hidden border-border",
        variant === "overlay"
          ? "rounded-xl border bg-background/45 backdrop-blur-[2px] shadow-2xl"
          : "border bg-card",
        variant !== "overlay" && "rounded-xl"
      )}
    >
      <div className="flex h-12 shrink-0 items-center justify-between border-b border-border px-3">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          <span className="text-sm font-semibold">Чат</span>
        </div>
        <Button variant="ghost" size="icon" onClick={onCollapse} aria-label="Свернуть">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex-1 flex flex-col justify-end min-h-0">
        <div
          ref={scrollContainerRef}
          className="overflow-y-auto px-3 py-3 text-sm space-y-2.5"
        >
          {timeline.map((item, index) => {
            if (item.type === "event") {
              const isJoin = item.data.type === RoomEventType.JOIN;
              return (
                <div
                  key={`event-${item.data.userId}-${index}`}
                  className="flex items-center justify-center gap-1.5 py-1 text-xs text-muted-foreground bg-muted/30 rounded-md px-2"
                >
                  {isJoin ? (
                    <UserPlus className="h-3.5 w-3.5 text-emerald-500" />
                  ) : (
                    <UserMinus className="h-3.5 w-3.5 text-rose-500" />
                  )}
                  <span>
              Пользователь <strong className="text-foreground/80">{item.data.username}</strong>{" "}
                    {isJoin ? "вошел в комнату" : "покинул комнату"}
            </span>
                </div>
              );
            }

            const m = item.data;
            return (
              <div key={`msg-${m.id || index}`} className="flex items-start space-x-2 leading-snug min-w-0">
                {m.authorAvatar ? (
                  <Avatar className="h-6 w-6 rounded-full shrink-0">
                    <AvatarImage src={m.authorAvatar} alt={m.authorName} />
                    <AvatarFallback>{m.authorName.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                ) : (
                  <div className="h-6 w-6 rounded-full bg-gray-300 flex items-center justify-center text-xs font-semibold shrink-0">
                    {m.authorName.charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="min-w-0 break-words">
                  <span className="font-semibold text-blue-500">{m.authorName}</span>
                  <span className="mx-1 text-muted-foreground">:</span>
                  <span className="text-foreground/90">{m.content}</span>
                </div>
              </div>
            );
          })}

          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="shrink-0 border-t border-border p-2">
        <div className="flex items-center gap-1 rounded-full border border-border bg-background/60 pl-3 pr-1">
          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Сказать что-нибудь..."
            className="h-9 border-0 bg-transparent px-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Эмодзи">
            <Smile className="h-4 w-4" />
          </Button>
          <Button size="icon" className="h-8 w-8 rounded-full" onClick={send} aria-label="Отправить">
            <Send className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}