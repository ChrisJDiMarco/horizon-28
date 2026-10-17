import { createClient } from "@supabase/supabase-js";
import {
  intelligenceRunSchema,
  mockIntelligenceRun,
  type IntelligenceRun,
} from "@/lib/intelligence-contract";

const REQUIRED_MODEL_KEYS = [
  "PERPLEXITY_API_KEY",
  "ANTHROPIC_API_KEY",
  "GEMINI_API_KEY",
] as const;

type RequiredModelKey = (typeof REQUIRED_MODEL_KEYS)[number];

type PipelineResult = {
  ok: true;
  mode: "live" | "mock";
  missingKeys: string[];
  storage: "inserted" | "skipped" | "failed";
  run: IntelligenceRun;
  diagnostics: {
    sourceChars: number;
    synthesisChars: number;
    startedAt: string;
    finishedAt: string;
  };
};

type PipelineFailure = {
  ok: false;
  mode: "live";
  missingKeys: string[];
  error: string;
};

export function getPipelineStatus() {
  const missingModelKeys = getMissingModelKeys();
  const missingStorageKeys = getMissingStorageKeys();

  return {
    readyForLiveRun: missingModelKeys.length === 0,
    readyForSupabase: missingStorageKeys.length === 0,
    missingModelKeys,
    missingStorageKeys,
    defaultModels: {
      perplexity: process.env.PERPLEXITY_MODEL ?? "sonar-pro",
      anthropic: process.env.ANTHROPIC_MODEL ?? "claude-3-5-sonnet-latest",
      gemini: process.env.GEMINI_MODEL ?? "gemini-2.5-flash",
    },
  };
}

export async function runHorizonPipeline(): Promise<
  PipelineResult | PipelineFailure
> {
  const startedAt = new Date().toISOString();
  const missingKeys = getMissingModelKeys();

  if (missingKeys.length > 0) {
    return {
      ok: true,
      mode: "mock",
      missingKeys,
      storage: "skipped",
      run: withFreshTimestamp(mockIntelligenceRun),
      diagnostics: {
        sourceChars: 0,
        synthesisChars: 0,
        startedAt,
        finishedAt: new Date().toISOString(),
      },
    };
  }

  try {
    const sourceText = await ingestWithPerplexity();
    const synthesis = await synthesizeWithAnthropic(sourceText);
    const extractedRun = await extractWithGemini(synthesis);
    const run = intelligenceRunSchema.parse(extractedRun);
    const storage = await persistRun(run, sourceText, synthesis);

    return {
      ok: true,
      mode: "live",
      missingKeys: [],
      storage,
      run,
      diagnostics: {
        sourceChars: sourceText.length,
        synthesisChars: synthesis.length,
        startedAt,
        finishedAt: new Date().toISOString(),
      },
    };
  } catch (error) {
    return {
      ok: false,
      mode: "live",
      missingKeys: [],
      error: error instanceof Error ? error.message : "Unknown pipeline error",
    };
  }
}

function getMissingModelKeys(): RequiredModelKey[] {
  return REQUIRED_MODEL_KEYS.filter((key) => !process.env[key]);
}

function getMissingStorageKeys() {
  return ["SUPABASE_URL", "SUPABASE_SERVICE_ROLE_KEY"].filter(
    (key) => !process.env[key],
  );
}

function withFreshTimestamp(run: IntelligenceRun): IntelligenceRun {
  return {
    ...run,
    generatedAt: new Date().toISOString(),
  };
}

async function ingestWithPerplexity() {
  const response = await fetch("https://api.perplexity.ai/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.PERPLEXITY_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.PERPLEXITY_MODEL ?? "sonar-pro",
      temperature: 0.15,
      messages: [
        {
          role: "system",
          content:
            "You are a real-time research collector. Return concise, sourced notes. Do not provide investment advice.",
        },
        {
          role: "user",
          content:
            "Collect the latest verifiable developments on US-China AI chip export controls, Chinese AI lab breakthroughs, advanced semiconductor supply chains, TSMC packaging capacity, Nvidia accelerator supply, HBM memory, datacenter power constraints, and major AI model releases. Focus on macro trends and compute metrics.",
        },
      ],
    }),
    signal: AbortSignal.timeout(45_000),
  });

  const data = await parseProviderResponse(response, "Perplexity");
  const content = data.choices?.[0]?.message?.content;

  if (typeof content !== "string" || content.length < 100) {
    throw new Error("Perplexity returned an empty or malformed research sweep.");
  }

  return content;
}

async function synthesizeWithAnthropic(sourceText: string) {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": process.env.ANTHROPIC_API_KEY ?? "",
      "anthropic-version": "2023-06-01",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.ANTHROPIC_MODEL ?? "claude-3-5-sonnet-latest",
      max_tokens: 1800,
      temperature: 0.2,
      system:
        "You are a VC macro-analyst. Convert noisy AI policy, compute, and model-release updates into actionable business intelligence for enterprise leaders. Use a two-scenario 2028 framework. Do not include equity recommendations, stock price targets, or speculative ticker forecasts.",
      messages: [
        {
          role: "user",
          content: `Raw research sweep:\n\n${sourceText}\n\nSummarize into executive intelligence with scenario logic, compute constraints, policy implications, and concrete business actions.`,
        },
      ],
    }),
    signal: AbortSignal.timeout(45_000),
  });

  const data = await parseProviderResponse(response, "Anthropic");
  const content = data.content?.find(
    (part: { type?: string; text?: unknown }) => part.type === "text",
  )?.text;

  if (typeof content !== "string" || content.length < 100) {
    throw new Error("Anthropic returned an empty or malformed synthesis.");
  }

  return content;
}

async function extractWithGemini(synthesis: string) {
  const model = process.env.GEMINI_MODEL ?? "gemini-2.5-flash";
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        generationConfig: {
          temperature: 0,
          responseMimeType: "application/json",
        },
        contents: [
          {
            role: "user",
            parts: [
              {
                text: `Extract strict JSON from this synthesis. Include only verifiable macro trends, compute constraints, policy signals, scenario probabilities, and executive actions. Exclude all stock recommendations, ticker claims, share-price forecasts, EPS forecasts, or unsupported pricing speculation.

Return exactly this JSON shape:
{
  "generatedAt": "ISO timestamp",
  "summaryBullets": ["3-5 bullets"],
  "scenarios2028": [
    {"name": "scenario name", "probability": 58, "thesis": "text", "indicators": ["2-6 indicators"], "executiveMove": "text"},
    {"name": "scenario name", "probability": 42, "thesis": "text", "indicators": ["2-6 indicators"], "executiveMove": "text"}
  ],
  "macroMetrics": [{"metric": "text", "value": "text", "unit": "optional text", "sourceBasis": "text", "confidence": "low|medium|high"}],
  "computeConstraints": ["2-8 items"],
  "policySignals": ["2-8 items"],
  "executiveActions": ["3-7 items"],
  "excludedClaims": ["claims removed because they were speculative or unverifiable"]
}

Synthesis:
${synthesis}`,
              },
            ],
          },
        ],
      }),
      signal: AbortSignal.timeout(45_000),
    },
  );

  const data = await parseProviderResponse(response, "Gemini");
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

  if (typeof text !== "string") {
    throw new Error("Gemini returned no JSON text.");
  }

  return JSON.parse(extractJsonObject(text));
}

async function persistRun(
  run: IntelligenceRun,
  sourceText: string,
  synthesis: string,
): Promise<PipelineResult["storage"]> {
  const { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY } = process.env;

  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    return "skipped";
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: {
      persistSession: false,
    },
  });

  const { error } = await supabase.from("horizon28_intelligence_runs").insert({
    generated_at: run.generatedAt,
    payload: run,
    source_text: sourceText,
    synthesis_text: synthesis,
  });

  return error ? "failed" : "inserted";
}

async function parseProviderResponse(response: Response, provider: string) {
  const text = await response.text();

  if (!response.ok) {
    throw new Error(`${provider} request failed: ${response.status} ${text}`);
  }

  try {
    return JSON.parse(text);
  } catch {
    throw new Error(`${provider} returned non-JSON response.`);
  }
}

function extractJsonObject(value: string) {
  const trimmed = value.trim().replace(/^```json\s*/i, "").replace(/```$/i, "");
  const firstBrace = trimmed.indexOf("{");
  const lastBrace = trimmed.lastIndexOf("}");

  if (firstBrace === -1 || lastBrace === -1 || lastBrace <= firstBrace) {
    throw new Error("Gemini extraction did not contain a JSON object.");
  }

  return trimmed.slice(firstBrace, lastBrace + 1);
}
