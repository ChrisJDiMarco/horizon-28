import type { LucideIcon } from "lucide-react";
import {
  Activity,
  Cpu,
  Factory,
  Gauge,
  Globe2,
  Landmark,
  RadioTower,
  ShieldAlert,
  Workflow,
  Zap,
} from "lucide-react";

export type RiskLevel = "Low" | "Watch" | "Elevated" | "Critical";

export type IntelligenceUpdate = {
  id: string;
  source: string;
  title: string;
  summary: string;
  timestamp: string;
  risk: RiskLevel;
  action: string;
};

export type SupplyChainNode = {
  name: string;
  signal: string;
  metric: string;
  delta: string;
  risk: RiskLevel;
};

export type RadarItem = {
  jurisdiction: string;
  policy: string;
  implication: string;
  risk: RiskLevel;
};

export type ScenarioProjection = {
  name: string;
  probability: number;
  thesis: string;
  indicators: string[];
  executiveMove: string;
};

export type OrchestrationStep = {
  name: string;
  owner: string;
  purpose: string;
  icon: LucideIcon;
};

export const runSummary = {
  generatedAt: "06:40 ET",
  horizon: "24 months",
  confidence: 82,
  scenarioTilt: "Managed acceleration",
  boardQuestion: "Where does constrained compute change our capital allocation?",
};

export const headlineMetrics = [
  {
    label: "Transformative AI Window",
    value: "24 mo",
    detail: "Planning horizon to 2028",
    icon: RadioTower,
  },
  {
    label: "Compute Constraint Index",
    value: "72",
    detail: "+8 since last run",
    icon: Cpu,
  },
  {
    label: "Policy Volatility",
    value: "High",
    detail: "Export controls remain active",
    icon: Landmark,
  },
  {
    label: "Verified Macro Signals",
    value: "18",
    detail: "No stock-price projections",
    icon: ShieldAlert,
  },
];

export const intelligenceFeed: IntelligenceUpdate[] = [
  {
    id: "feed-001",
    source: "Perplexity sweep",
    title: "US export-control language is widening from chips to operational capacity.",
    summary:
      "Recent policy movement points toward controls on advanced accelerator access, cloud pathways, and manufacturing tooling, not a narrow chip-only regime.",
    timestamp: "Today 06:12",
    risk: "Elevated",
    action:
      "Audit any China-linked AI workloads that depend on US-origin cloud, tooling, or accelerator supply.",
  },
  {
    id: "feed-002",
    source: "Supply chain monitor",
    title: "Advanced packaging remains the gating layer behind frontier inference capacity.",
    summary:
      "HBM availability, CoWoS-style packaging throughput, and substrate allocation are more constraining than raw model demand in the next two quarters.",
    timestamp: "Today 05:58",
    risk: "Watch",
    action:
      "Treat packaging and memory exposure as first-order diligence items in AI infrastructure deals.",
  },
  {
    id: "feed-003",
    source: "Model-release tracker",
    title: "Open-weight systems are narrowing deployment gaps for enterprise edge cases.",
    summary:
      "The relevant impact is not a single benchmark jump; it is the lower integration cost for private, domain-specific assistants.",
    timestamp: "Yesterday 19:44",
    risk: "Low",
    action:
      "Move internal workflows with sensitive data toward evaluated private-model pilots.",
  },
];

export const supplyChainNodes: SupplyChainNode[] = [
  {
    name: "Advanced accelerators",
    signal: "Demand remains structurally above available frontier supply.",
    metric: "GPU delivery queues",
    delta: "+6 wk",
    risk: "Elevated",
  },
  {
    name: "HBM memory",
    signal: "Memory allocation is the quiet bottleneck for inference expansion.",
    metric: "Supplier tightness",
    delta: "High",
    risk: "Watch",
  },
  {
    name: "TSMC packaging",
    signal: "Packaging capacity determines practical AI cluster delivery dates.",
    metric: "CoWoS pressure",
    delta: "+11%",
    risk: "Elevated",
  },
  {
    name: "Power interconnect",
    signal: "Grid access and datacenter power contracts are becoming strategic assets.",
    metric: "Lead time",
    delta: "18-36 mo",
    risk: "Critical",
  },
];

export const exportRadar: RadarItem[] = [
  {
    jurisdiction: "United States",
    policy: "AI chip export-control expansion",
    implication:
      "Compliance risk moves upstream into cloud access, resellers, and accelerator leasing.",
    risk: "Elevated",
  },
  {
    jurisdiction: "China",
    policy: "Domestic accelerator substitution",
    implication:
      "Short-term performance gap persists, but software optimization can soften hardware constraints.",
    risk: "Watch",
  },
  {
    jurisdiction: "EU",
    policy: "AI Act implementation pressure",
    implication:
      "Enterprise buyers will prefer vendors with auditable model governance and scenario controls.",
    risk: "Watch",
  },
];

export const scenarios: ScenarioProjection[] = [
  {
    name: "Managed Acceleration",
    probability: 58,
    thesis:
      "Frontier capability compounds, but governments and compute scarcity keep deployment concentrated among capitalized operators.",
    indicators: [
      "Export controls expand without full decoupling",
      "Datacenter power becomes a board-level constraint",
      "Enterprise AI procurement shifts toward audited workflows",
    ],
    executiveMove:
      "Secure compute partners, harden model governance, and reserve capital for infrastructure-heavy winners.",
  },
  {
    name: "Diffuse Breakout",
    probability: 42,
    thesis:
      "Open models, cheaper inference, and software optimization spread capability faster than hardware bottlenecks can contain it.",
    indicators: [
      "Open-weight models match frontier classes in narrow domains",
      "Inference cost curves fall faster than policy response",
      "Private deployments become default for regulated work",
    ],
    executiveMove:
      "Invest in proprietary data loops and workflow distribution before model access commoditizes.",
  },
];

export const orchestrationSteps: OrchestrationStep[] = [
  {
    name: "Ingestion",
    owner: "Perplexity API",
    purpose: "Real-time policy, model-release, and semiconductor source gathering.",
    icon: Globe2,
  },
  {
    name: "Synthesis",
    owner: "Claude Sonnet",
    purpose: "Noise reduction into the two-scenario 2028 executive framework.",
    icon: Workflow,
  },
  {
    name: "Extraction",
    owner: "Gemini",
    purpose: "Strict macro metrics only; speculative stock pricing is stripped.",
    icon: Gauge,
  },
  {
    name: "Persistence",
    owner: "Supabase",
    purpose: "Daily runs, source traces, and scenario deltas stored for trend review.",
    icon: Factory,
  },
];

export const operatingPriorities = [
  {
    label: "Board priority",
    value: "Reprice compute dependency in every AI-adjacent deal.",
    icon: Activity,
  },
  {
    label: "Diligence priority",
    value: "Ask vendors to prove chip access, power access, and export-control exposure.",
    icon: ShieldAlert,
  },
  {
    label: "Execution priority",
    value: "Convert daily signal into scenario moves, not passive news consumption.",
    icon: Zap,
  },
];
