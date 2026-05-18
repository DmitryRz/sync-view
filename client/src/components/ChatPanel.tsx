import { useState } from "react";
import { Smile, Send, ChevronRight, UserPlus, UserMinus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { MessageResponseDto, RoomEventDto } from "@/types/websocket/types.ts";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.tsx";
export type ChatVariant = "theater" | "side" | "overlay";


export function ChatPanel({
                            variant,
                            onCollapse,
                            messages,
                            onSendMessage,
                            roomEvents,
                          }: {
  variant: ChatVariant;
  onCollapse: () => void;
  messages: MessageResponseDto[];
  onSendMessage: (message: string) => void;
  roomEvents: RoomEventDto[];
}) {
  const [text, setText] = useState("");

  const send = () => {
    if (!text.trim()) return;
    onSendMessage(text);
    setText("");
  };

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
          <span className="text-sm font-semibold">Чат в реальном времени</span>
        </div>
        <Button variant="ghost" size="icon" onClick={onCollapse} aria-label="Свернуть">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex-1 space-y-1.5 overflow-y-auto px-3 py-3 text-sm">
        {messages.map((m) => (
          <div key={m.id} className="flex items-start space-x-2 leading-snug">
            {m.authorAvatar ? (
                <Avatar className="h-6 w-6 rounded-full">
                  <AvatarImage src={m.authorAvatar} alt={m.authorName} />
                  <AvatarFallback>{m.authorName.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
              ) : (
                <div className="h-6 w-6 rounded-full bg-gray-300 flex items-center justify-center text-xs font-semibold">
                  {m.authorName.charAt(0).toUpperCase()}
                </div>
              )
            }
            <div>
              <span className="font-semibold text-blue-500">{m.authorName}</span>
              <span className="mx-1 text-muted-foreground">:</span>
              <span className="text-foreground/90">{m.content}</span>
            </div>
          </div>
        ))}
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