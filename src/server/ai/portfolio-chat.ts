import { createOpenAI } from "@ai-sdk/openai";
import { convertToModelMessages, generateId, streamText, type UIMessage } from "ai";

import { certifications, education, experience, profile, projects, skills } from "@/lib/portfolio";
import {
  createLovableAiGatewayRunIdFetch,
  getLovableAiGatewayRunId,
  withLovableAiGatewayRunIdHeader,
} from "./run-id";
import { soilErosionPaper } from "./soil-erosion-paper";

const MODEL = "openai/gpt-6-astra";

function buildInstructions() {
  const content = { profile, skills, projects, experience, education, certifications };
  return `You are the portfolio assistant for ${profile.name}, answering questions from visitors to their portfolio website.
Answer ONLY using the portfolio content below. If the answer is not in it, say you don't have that information and suggest contacting ${profile.name.split(" ").pop()} via email (${profile.email}) or LinkedIn.
Never invent employers, dates, metrics, links or skills. Be concise, friendly and professional; refer to ${profile.name} in the third person. Use short markdown lists when helpful.

PORTFOLIO CONTENT (JSON):
${JSON.stringify(content, null, 2)}

FULL TEXT OF THE SOIL EROSION PROJECT RESEARCH PAPER (written by Harsha and teammates):
${soilErosionPaper}`;
}

export async function streamPortfolioChat(
  request: Request,
  messages: UIMessage[],
  onFinish: (args: { messages: UIMessage[] }) => Promise<void>,
) {
  const apiKey = process.env["LOVABLE_API_KEY"];
  if (!apiKey) return Response.json({ error: "AI is not configured." }, { status: 500 });

  const runIdFetch = createLovableAiGatewayRunIdFetch(getLovableAiGatewayRunId(request));
  const provider = createOpenAI({
    baseURL: "https://ai.gateway.lovable.dev/v1",
    apiKey,
    headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
    fetch: runIdFetch.fetch,
  });

  const result = streamText({
    model: provider.responses(MODEL),
    instructions: buildInstructions(),
    messages: await convertToModelMessages(messages),
    abortSignal: request.signal,
    providerOptions: {
      openai: {
        store: false,
        forceReasoning: true,
        reasoningEffort: "low",
        reasoningSummary: "auto",
        include: ["reasoning.encrypted_content"],
      },
    },
  });

  return withLovableAiGatewayRunIdHeader(
    result.toUIMessageStreamResponse({
      originalMessages: messages,
      sendReasoning: false,
      generateMessageId: generateId,
      onFinish,
      onError: (error) => {
        console.error("portfolio chat error", error);
        const status = (error as { statusCode?: number })?.statusCode;
        if (status === 429) return "Too many questions right now — please try again in a minute.";
        if (status === 402 || status === 403) return "The assistant is temporarily unavailable.";
        return "Something went wrong answering that. Please try again.";
      },
    }),
    runIdFetch,
  );
}
