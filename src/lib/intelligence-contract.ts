import { z } from "zod";

const confidenceSchema = z.enum(["low", "medium", "high"]);

const forbiddenMarketClaims =
  /\b(price target|share price|stock price|market cap target|buy rating|sell rating|hold rating|eps forecast|ticker)\b/i;

const cleanText = z.string().min(1).max(1400).refine(
  (value) => !forbiddenMarketClaims.test(value),
  "Speculative equity-market claims are not allowed in Horizon 28 outputs.",
);

export const macroMetricSchema = z.object({
  metric: cleanText,
  value: cleanText,
  unit: z.string().max(80).optional(),
  sourceBasis: cleanText,
  confidence: confidenceSchema,
});

export const scenarioSchema = z.object({
  name: cleanText,
  probability: z.number().min(0).max(100),
  thesis: cleanText,
  indicators: z.array(cleanText).min(2).max(6),
  executiveMove: cleanText,
});

export const intelligenceRunSchema = z
  .object({
    generatedAt: z.string(),
    summaryBullets: z.array(cleanText).min(3).max(5),
    scenarios2028: z.array(scenarioSchema).length(2),
    macroMetrics: z.array(macroMetricSchema).min(3).max(12),
    computeConstraints: z.array(cleanText).min(2).max(8),
    policySignals: z.array(cleanText).min(2).max(8),
    executiveActions: z.array(cleanText).min(3).max(7),
    excludedClaims: z.array(z.string().max(500)).max(12).default([]),
  })
  .superRefine((run, context) => {
    const probabilityTotal = run.scenarios2028.reduce(
      (sum, scenario) => sum + scenario.probability,
      0,
    );

    if (probabilityTotal < 95 || probabilityTotal > 105) {
      context.addIssue({
        code: "custom",
        message: "The two 2028 scenario probabilities should sum to ~100.",
        path: ["scenarios2028"],
      });
    }
  });

export type IntelligenceRun = z.infer<typeof intelligenceRunSchema>;

export const mockIntelligenceRun: IntelligenceRun = {
  generatedAt: new Date().toISOString(),
  summaryBullets: [
    "Export-control risk is broadening from named chips toward cloud access, tooling, and operational capacity.",
    "Advanced packaging, HBM supply, and datacenter power are more actionable bottlenecks than benchmark movement.",
    "Open-weight model progress increases the odds that private enterprise AI deployments accelerate before 2028.",
  ],
  scenarios2028: [
    {
      name: "Managed Acceleration",
      probability: 58,
      thesis:
        "Frontier AI deployment remains concentrated among operators with reliable compute, power, and compliance posture.",
      indicators: [
        "Controls expand without full US-China technology decoupling",
        "Compute contracts become board-level diligence artifacts",
        "Auditable AI workflows become mandatory in regulated enterprises",
      ],
      executiveMove:
        "Secure compute partnerships and prioritize vendors with verifiable governance infrastructure.",
    },
    {
      name: "Diffuse Breakout",
      probability: 42,
      thesis:
        "Open models and inference efficiency spread capability faster than hardware scarcity can contain it.",
      indicators: [
        "Open models close domain-specific performance gaps",
        "Inference cost declines outpace procurement cycles",
        "Private deployments become default for sensitive workflows",
      ],
      executiveMove:
        "Invest in proprietary data loops, distribution, and workflow integration before model access commoditizes.",
    },
  ],
  macroMetrics: [
    {
      metric: "Compute Constraint Index",
      value: "72",
      unit: "0-100",
      sourceBasis:
        "Composite of packaging pressure, memory availability, and datacenter power lead times.",
      confidence: "medium",
    },
    {
      metric: "Planning horizon",
      value: "24",
      unit: "months",
      sourceBasis: "Internal Horizon 28 strategy window through 2028.",
      confidence: "high",
    },
    {
      metric: "Scenario spread",
      value: "16",
      unit: "percentage points",
      sourceBasis:
        "Difference between managed acceleration and diffuse breakout probabilities.",
      confidence: "medium",
    },
  ],
  computeConstraints: [
    "Advanced accelerator access remains gated by packaging throughput and memory allocation.",
    "Power procurement timelines are long enough to affect AI capital planning through 2028.",
  ],
  policySignals: [
    "US export controls continue to expand beyond a single-chip framing.",
    "Enterprise compliance requirements are converging around auditability and traceability.",
  ],
  executiveActions: [
    "Ask every AI vendor for evidence of compute access, power access, and export-control exposure.",
    "Add model governance and source traceability to procurement scoring.",
    "Reserve capital for infrastructure-constrained winners rather than model wrappers alone.",
  ],
  excludedClaims: [
    "Equity recommendations, price targets, and unsupported ticker forecasts are excluded by contract.",
  ],
};
