import type { LucideIcon } from "lucide-react-native";
import {
  Activity,
  Cpu,
  Factory,
  Globe2,
  Landmark,
  LockKeyhole,
  RadioTower,
  ShieldAlert,
  Zap,
} from "lucide-react-native";

export type RiskLevel = "Low" | "Watch" | "Elevated" | "Critical";

export type IntelligenceUpdate = {
  id: string;
  time: string;
  source: string;
  title: string;
  summary: string;
  action: string;
  risk: RiskLevel;
};

export type Metric = {
  label: string;
  value: string;
  detail: string;
  icon: LucideIcon;
};

export type Scenario = {
  name: string;
  probability: number;
  thesis: string;
  indicators: string[];
  move: string;
};

export type RadarSignal = {
  label: string;
  jurisdiction: string;
  signal: string;
  implication: string;
  risk: RiskLevel;
  icon: LucideIcon;
};

export type ActionItem = {
  title: string;
  owner: string;
  deadline: string;
  rationale: string;
  icon: LucideIcon;
};

export const summary = {
  generatedAt: "06:40 ET",
  horizon: "24 mo",
  confidence: 82,
  tilt: "Managed acceleration",
  boardQuestion: "Where does constrained compute change capital allocation?",
};

export const metrics: Metric[] = [
  {
    label: "AI window",
    value: "24 mo",
    detail: "Planning horizon to 2028",
    icon: RadioTower,
  },
  {
    label: "Compute index",
    value: "72",
    detail: "+8 since last run",
    icon: Cpu,
  },
  {
    label: "Policy volatility",
    value: "High",
    detail: "Export controls active",
    icon: Landmark,
  },
  {
    label: "Clean signals",
    value: "18",
    detail: "No stock-price claims",
    icon: ShieldAlert,
  },
];

export const feed: IntelligenceUpdate[] = [
  {
    id: "feed-001",
    time: "Today 06:12",
    source: "Policy sweep",
    title: "Export-control language is widening beyond named chips.",
    summary:
      "The practical risk surface now includes cloud access, accelerator leasing, resellers, and manufacturing tooling.",
    action:
      "Audit China-linked workloads for US-origin cloud, tooling, and accelerator exposure.",
    risk: "Elevated",
  },
  {
    id: "feed-002",
    time: "Today 05:58",
    source: "Supply chain monitor",
    title: "Advanced packaging remains the gating layer.",
    summary:
      "HBM availability and packaging throughput are tighter constraints than generic GPU demand in the next two quarters.",
    action:
      "Treat packaging and memory access as first-order AI infrastructure diligence.",
    risk: "Watch",
  },
  {
    id: "feed-003",
    time: "Yesterday 19:44",
    source: "Model tracker",
    title: "Open-weight systems are narrowing deployment gaps.",
    summary:
      "The near-term enterprise impact is cheaper private workflow deployment, not a single benchmark jump.",
    action:
      "Move sensitive internal workflows toward evaluated private-model pilots.",
    risk: "Low",
  },
];

export const scenarios: Scenario[] = [
  {
    name: "Managed Acceleration",
    probability: 58,
    thesis:
      "Frontier capability compounds, but governments and compute scarcity keep deployment concentrated among capitalized operators.",
    indicators: [
      "Export controls expand without full decoupling",
      "Datacenter power becomes a board-level constraint",
      "AI procurement shifts toward audited workflows",
    ],
    move:
      "Secure compute partners, harden governance, and reserve capital for infrastructure-heavy winners.",
  },
  {
    name: "Diffuse Breakout",
    probability: 42,
    thesis:
      "Open models, cheaper inference, and software optimization spread capability faster than hardware bottlenecks can contain it.",
    indicators: [
      "Open-weight systems match frontier models in narrow domains",
      "Inference costs fall faster than policy response",
      "Private deployment becomes default for regulated work",
    ],
    move:
      "Invest in proprietary data loops and workflow distribution before model access commoditizes.",
  },
];

export const radarSignals: RadarSignal[] = [
  {
    label: "Export controls",
    jurisdiction: "United States",
    signal: "AI chip controls are broadening toward operational capacity.",
    implication:
      "Compliance risk moves upstream into cloud paths and accelerator leasing.",
    risk: "Elevated",
    icon: LockKeyhole,
  },
  {
    label: "Substitution",
    jurisdiction: "China",
    signal: "Domestic accelerator substitution continues despite performance gaps.",
    implication:
      "Software optimization can soften hardware constraints in narrow deployment lanes.",
    risk: "Watch",
    icon: Factory,
  },
  {
    label: "Governance",
    jurisdiction: "European Union",
    signal: "AI Act implementation pressure is moving into procurement.",
    implication:
      "Vendors with auditable model governance become easier enterprise buys.",
    risk: "Watch",
    icon: Globe2,
  },
];

export const actionQueue: ActionItem[] = [
  {
    title: "Reprice compute dependency",
    owner: "Investment committee",
    deadline: "This week",
    rationale:
      "Deals that depend on scarce accelerators, HBM, packaging, or power need a higher diligence bar.",
    icon: Activity,
  },
  {
    title: "Verify vendor exposure",
    owner: "Enterprise AI lead",
    deadline: "Next board packet",
    rationale:
      "Ask vendors for chip access, power access, export-control exposure, and governance evidence.",
    icon: ShieldAlert,
  },
  {
    title: "Prioritize private workflows",
    owner: "Operations",
    deadline: "30 days",
    rationale:
      "Open-model progress makes sensitive internal workflow pilots more viable before 2028.",
    icon: Zap,
  },
];
