import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { useServerFn } from "@tanstack/react-start";
import { BarChart3, RotateCcw } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { Conversation, ConversationContent, ConversationEmptyState, ConversationScrollButton } from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import { PromptInput, PromptInputFooter, PromptInputSubmit, PromptInputTextarea } from "@/components/ai-elements/prompt-input";
import { Shimmer } from "@/components/ai-elements/shimmer";
import { getChatHistory } from "@/lib/chat.functions";

const KEY = "portfolio-visitor-id";
const SUGGESTIONS = ["What projects has Harsha built?", "Which ML tools does he use?", "Tell me about his internships"];

function newId() {
  return crypto.randomUUID();
}

export function AskPortfolio() {
  const [visitorId, setVisitorId] = useState<string | null>(null);
  const [initial, setInitial] = useState<UIMessage[] | null>(null);
  const loadHistory = useServerFn(getChatHistory);

  useEffect(() => {
    let id = localStorage.getItem(KEY);
    if (!id) {
      id = newId();
      localStorage.setItem(KEY, id);
    }
    setVisitorId(id);
    loadHistory({ data: { visitorId: id } })
      .then((r) => setInitial(JSON.parse(r.messagesJson) as UIMessage[]))
      .catch(() => setInitial([]));
  }, [loadHistory]);

  const restart = () => {
    const id = newId();
    localStorage.setItem(KEY, id);
    setVisitorId(id);
    setInitial([]);
  };

  if (!visitorId || !initial) {
    return <div className="glass flex h-[520px] items-center justify-center rounded-2xl text-sm text-muted-foreground">Loading assistant…</div>;
  }
  return <ChatWindow key={visitorId} visitorId={visitorId} initial={initial} onRestart={restart} />;
}

function ChatWindow({ visitorId, initial, onRestart }: { visitorId: string; initial: UIMessage[]; onRestart: () => void }) {
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const transport = useMemo(() => new DefaultChatTransport({ api: "/api/chat", body: { visitorId } }), [visitorId]);
  const { messages, sendMessage, status, stop } = useChat({
    id: visitorId,
    messages: initial,
    transport,
    onError: (e) => setError(e.message || "Something went wrong. Please try again."),
  });
  const busy = status === "submitted" || status === "streaming";

  const send = (text: string) => {
    const t = text.trim();
    if (!t || busy) return;
    setError(null);
    sendMessage({ text: t });
    setInput("");
  };

  return (
    <div className="glass flex h-[560px] flex-col overflow-hidden rounded-2xl">
      <div className="flex items-center justify-between border-b border-border px-5 py-3">
        <div className="flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <BarChart3 className="size-4" />
          </span>
          <div>
            <p className="text-sm font-semibold">Portfolio assistant</p>
            <p className="text-xs text-muted-foreground">Answers from Harsha's projects, skills & experience</p>
          </div>
        </div>
        {messages.length > 0 && (
          <button type="button" onClick={onRestart} className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-muted-foreground hover:bg-secondary hover:text-foreground">
            <RotateCcw className="size-3.5" /> New chat
          </button>
        )}
      </div>

      <Conversation className="flex-1">
        <ConversationContent>
          {messages.length === 0 ? (
            <ConversationEmptyState title="Ask me anything about Harsha's work" description="Projects, skills, internships, education…">
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {SUGGESTIONS.map((s) => (
                  <button key={s} type="button" onClick={() => send(s)} className="rounded-full border border-border px-3 py-1.5 text-xs hover:bg-secondary">
                    {s}
                  </button>
                ))}
              </div>
            </ConversationEmptyState>
          ) : (
            messages.map((m) => (
              <Message key={m.id} from={m.role}>
                <MessageContent className={m.role === "user" ? "bg-primary text-primary-foreground" : "bg-transparent"}>
                  {m.parts.map((p, i) => (p.type === "text" ? <MessageResponse key={i}>{p.text}</MessageResponse> : null))}
                </MessageContent>
              </Message>
            ))
          )}
          {status === "submitted" && (
            <Message from="assistant">
              <MessageContent className="bg-transparent">
                <Shimmer>Thinking…</Shimmer>
              </MessageContent>
            </Message>
          )}
          {error && <p className="text-sm text-destructive">{error}</p>}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>

      <div className="border-t border-border p-3">
        <PromptInput onSubmit={(msg) => send(msg.text ?? "")}>
          <PromptInputTextarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask about projects or experience…" maxLength={2000} />
          <PromptInputFooter className="justify-end">
            <PromptInputSubmit status={status} onStop={stop} disabled={!busy && !input.trim()} />
          </PromptInputFooter>
        </PromptInput>
      </div>
    </div>
  );
}
