CREATE TABLE public.visitor_chat_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  visitor_id text NOT NULL,
  message_id text NOT NULL,
  role text NOT NULL,
  message jsonb NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (visitor_id, message_id)
);
GRANT ALL ON public.visitor_chat_messages TO service_role;
ALTER TABLE public.visitor_chat_messages ENABLE ROW LEVEL SECURITY;
CREATE INDEX visitor_chat_messages_visitor_idx ON public.visitor_chat_messages (visitor_id, created_at);