import { useState } from "react";
import { Smile, Send, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import keycloak from "@/lib/keycloak.ts"


type ChatMessage = { id: string; user: string; color: string; text: string };
const initialMessages: ChatMessage[] = [

];

export type ChatVariant = "theater" | "side" | "overlay";

export function ChatPanel({
                            variant,
                            onCollapse,
                          }: {
  variant: ChatVariant;
  onCollapse: () => void;
}) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [text, setText] = useState("");

  const send = () => {
    if (!text.trim()) return;

    const username = keycloak.idTokenParsed?.preferred_username || "Аноним";

    const newMessage: ChatMessage = {
      id: crypto.randomUUID(),
      user: username,
      color: "text-blue-500",
      text: text.trim(),
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);

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
          <div key={m.id} className="leading-snug">
            <span className={cn("font-semibold", m.color)}>{m.user}</span>
            <span className="mx-1 text-muted-foreground">:</span>
            <span className="text-foreground/90">{m.text}</span>
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