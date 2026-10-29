import { createFileRoute } from "@tanstack/react-router";
import type { UIMessage } from "ai";

const VISITOR_RE = /^[a-zA-Z0-9-]{16,64}$/;

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: { messages?: UIMessage[]; visitorId?: string };
        try {
          body = await request.json();
        } catch {
          return Response.json({ error: "Invalid request" }, { status: 400 });
        }
        const { messages, visitorId } = body;
        if (!Array.isArray(messages) || messages.length === 0 || messages.length > 60 || !visitorId || !VISITOR_RE.test(visitorId)) {
          return Response.json({ error: "Invalid request" }, { status: 400 });
        }
        const last = messages[messages.length - 1];
        const text = last?.parts?.map((p) => (p.type === "text" ? p.text : "")).join("") ?? "";
        if (last?.role !== "user" || !text.trim() || text.length > 2000) {
          return Response.json({ error: "Please send a question under 2000 characters." }, { status: 400 });
        }

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const { error: userErr } = await supabaseAdmin
          .from("visitor_chat_messages")
          .upsert({ visitor_id: visitorId, message_id: last.id, role: "user", message: last as never }, { onConflict: "visitor_id,message_id" });
        if (userErr) console.error("save user message failed", userErr);

        const { streamPortfolioChat } = await import("@/server/ai/portfolio-chat");
        return streamPortfolioChat(request, messages, async ({ messages: all }) => {
          const reply = all[all.length - 1];
          if (!reply || reply.role !== "assistant") return;
          const { error } = await supabaseAdmin
            .from("visitor_chat_messages")
            .upsert({ visitor_id: visitorId, message_id: reply.id, role: "assistant", message: reply as never }, { onConflict: "visitor_id,message_id" });
          if (error) console.error("save assistant message failed", error);
        });
      },
    },
  },
});
