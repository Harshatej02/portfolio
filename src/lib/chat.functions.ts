import { createServerFn } from "@tanstack/react-start";

export const getChatHistory = createServerFn({ method: "POST" })
  .inputValidator((input: { visitorId: string }) => {
    if (!/^[a-zA-Z0-9-]{16,64}$/.test(input?.visitorId ?? "")) throw new Error("Invalid visitor");
    return input;
  })
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: rows, error } = await supabaseAdmin
      .from("visitor_chat_messages")
      .select("message")
      .eq("visitor_id", data.visitorId)
      .order("created_at", { ascending: true })
      .limit(100);
    if (error) {
      console.error("load chat failed", error);
      return { messagesJson: "[]", error: "Could not load your earlier chat." as string | null };
    }
    return { messagesJson: JSON.stringify(rows.map((r) => r.message)), error: null as string | null };
  });
