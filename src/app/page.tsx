import {
  AlertTriangle,
  ArrowUpRight,
  CalendarClock,
  CheckCircle2,
  ChevronRight,
  CircleDot,
  Database,
  LineChart,
  LockKeyhole,
  RefreshCcw,
} from "lucide-react";
import {
  exportRadar,
  headlineMetrics,
  intelligenceFeed,
  operatingPriorities,
  orchestrationSteps,
  runSummary,
  scenarios,
  supplyChainNodes,
  type RiskLevel,
} from "@/lib/intelligence";

const riskStyles: Record<RiskLevel, string> = {
  Low: "border-emerald-300/40 bg-emerald-300/10 text-emerald-100",
  Watch: "border-cyan-300/40 bg-cyan-300/10 text-cyan-100",
  Elevated: "border-amber-300/40 bg-amber-300/10 text-amber-100",
  Critical: "border-rose-300/50 bg-rose-300/10 text-rose-100",
};

function Panel({
  children,
  className = "",
}: Readonly<{
  children: React.ReactNode;
  className?: string;
}>) {
  return (
    <section
      className={`rounded-lg border border-white/10 bg-white/[0.055] shadow-2xl shadow-black/30 backdrop-blur-xl ${className}`}
    >
      {children}
    </section>
  );
}

function SectionTitle({
  eyebrow,
  title,
  icon: Icon,
}: Readonly<{
  eyebrow: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
}>) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-zinc-500">
          {eyebrow}
        </p>
        <h2 className="mt-2 text-lg font-semibold text-zinc-50">{title}</h2>
      </div>
      <div className="rounded-md border border-white/10 bg-black/20 p-2 text-zinc-300">
        <Icon className="h-4 w-4" />
      </div>
    </div>
  );
}

function RiskTag({ risk }: Readonly<{ risk: RiskLevel }>) {
  return (
    <span
      className={`inline-flex rounded-sm border px-2 py-1 font-mono text-[10px] uppercase tracking-[0.18em] ${riskStyles[risk]}`}
    >
      {risk}
    </span>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#060606] text-zinc-100">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:48px_48px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(125,211,252,0.14),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.055),transparent_34%)]" />

      <div className="relative mx-auto flex w-full max-w-[1500px] flex-col gap-5 px-4 py-5 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-5 border-b border-white/10 pb-5 xl:flex-row xl:items-end xl:justify-between">
          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-3">
              <div className="rounded-md border border-cyan-300/30 bg-cyan-300/10 px-3 py-2 font-mono text-xs uppercase tracking-[0.24em] text-cyan-100">
                Horizon 28
              </div>
              <div className="rounded-sm border border-white/10 bg-white/[0.06] px-2 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-400">
                Executable intelligence feed
              </div>
            </div>
            <h1 className="mt-5 max-w-5xl text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
              Daily scenario planning for the 24-month window to transformative
              AI.
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-zinc-400 sm:text-lg">
              Today&apos;s run tracks policy shocks, compute constraints, and
              model-release velocity across the decisions that change capital
              allocation, vendor diligence, and enterprise AI timing.
            </p>
          </div>

          <div className="grid w-full gap-3 sm:grid-cols-3 xl:max-w-xl">
            <div className="rounded-lg border border-white/10 bg-white/[0.055] p-4 backdrop-blur-xl">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                Run
              </p>
              <p className="mt-2 flex items-center gap-2 text-sm text-zinc-100">
                <CalendarClock className="h-4 w-4 text-cyan-200" />
                {runSummary.generatedAt}
              </p>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/[0.055] p-4 backdrop-blur-xl">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                Confidence
              </p>
              <p className="mt-2 flex items-center gap-2 text-sm text-zinc-100">
                <LineChart className="h-4 w-4 text-emerald-200" />
                {runSummary.confidence}%
              </p>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/[0.055] p-4 backdrop-blur-xl">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                Tilt
              </p>
              <p className="mt-2 flex items-center gap-2 text-sm text-zinc-100">
                <CircleDot className="h-4 w-4 text-amber-200" />
                {runSummary.scenarioTilt}
              </p>
            </div>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {headlineMetrics.map((metric) => (
            <Panel key={metric.label} className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-zinc-500">{metric.label}</p>
                  <p className="mt-3 text-3xl font-semibold text-white">
                    {metric.value}
                  </p>
                </div>
                <div className="rounded-md border border-white/10 bg-black/20 p-2 text-zinc-300">
                  <metric.icon className="h-5 w-5" />
                </div>
              </div>
              <p className="mt-4 text-sm text-zinc-400">{metric.detail}</p>
            </Panel>
          ))}
        </section>

        <section className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
          <Panel className="p-5">
            <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
              <SectionTitle
                eyebrow="Central feed"
                icon={RefreshCcw}
                title="Executable Intelligence"
              />
              <div className="rounded-sm border border-white/10 bg-black/30 px-3 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-400">
                Cron-ready daily sweep
              </div>
            </div>

            <div className="mt-6 divide-y divide-white/10 border-y border-white/10">
              {intelligenceFeed.map((item) => (
                <article
                  className="grid gap-4 py-5 lg:grid-cols-[0.18fr_1fr_0.34fr]"
                  key={item.id}
                >
                  <div className="space-y-3">
                    <RiskTag risk={item.risk} />
                    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                      {item.timestamp}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
                      {item.source}
                    </p>
                    <h3 className="mt-2 text-xl font-semibold leading-snug text-white">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-zinc-400">
                      {item.summary}
                    </p>
                  </div>
                  <div className="border-l border-white/10 pl-4">
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                      Action
                    </p>
                    <p className="mt-2 text-sm leading-6 text-zinc-200">
                      {item.action}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </Panel>

          <Panel className="p-5">
            <SectionTitle
              eyebrow="Model chain"
              icon={Database}
              title="Multi-Model Orchestration"
            />
            <div className="mt-6 grid gap-3">
              {orchestrationSteps.map((step, index) => (
                <div
                  className="grid grid-cols-[auto_1fr_auto] items-start gap-3 border-b border-white/10 pb-4 last:border-b-0 last:pb-0"
                  key={step.name}
                >
                  <div className="rounded-md border border-white/10 bg-black/20 p-2 text-zinc-200">
                    <step.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold text-white">{step.name}</h3>
                      <span className="rounded-sm border border-white/10 bg-white/[0.06] px-2 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-400">
                        {step.owner}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-zinc-400">
                      {step.purpose}
                    </p>
                  </div>
                  <span className="font-mono text-xs text-zinc-600">
                    0{index + 1}
                  </span>
                </div>
              ))}
            </div>
          </Panel>
        </section>

        <section className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr_0.85fr]">
          <Panel className="p-5">
            <SectionTitle
              eyebrow="Bottleneck map"
              icon={AlertTriangle}
              title="Global Compute Supply Chain"
            />
            <div className="mt-6 space-y-4">
              {supplyChainNodes.map((node) => (
                <div
                  className="border-b border-white/10 pb-4 last:border-b-0 last:pb-0"
                  key={node.name}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-semibold text-white">{node.name}</h3>
                      <p className="mt-2 text-sm leading-6 text-zinc-400">
                        {node.signal}
                      </p>
                    </div>
                    <RiskTag risk={node.risk} />
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-3 font-mono text-xs">
                    <span className="text-zinc-500">{node.metric}</span>
                    <span className="text-right text-zinc-200">
                      {node.delta}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Panel>

          <Panel className="p-5">
            <SectionTitle
              eyebrow="2028 framework"
              icon={CheckCircle2}
              title="Scenario Projections"
            />
            <div className="mt-6 grid gap-4 lg:grid-cols-2">
              {scenarios.map((scenario) => (
                <article
                  className="rounded-lg border border-white/10 bg-black/20 p-4"
                  key={scenario.name}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                        Probability
                      </p>
                      <h3 className="mt-2 text-xl font-semibold text-white">
                        {scenario.name}
                      </h3>
                    </div>
                    <p className="text-3xl font-semibold text-cyan-100">
                      {scenario.probability}%
                    </p>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-zinc-400">
                    {scenario.thesis}
                  </p>
                  <div className="mt-5 space-y-3">
                    {scenario.indicators.map((indicator) => (
                      <div className="flex gap-3" key={indicator}>
                        <ChevronRight className="mt-0.5 h-4 w-4 text-amber-200" />
                        <p className="text-sm leading-6 text-zinc-300">
                          {indicator}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 border-t border-white/10 pt-4">
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                      Executive move
                    </p>
                    <p className="mt-2 text-sm leading-6 text-zinc-100">
                      {scenario.executiveMove}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </Panel>

          <Panel className="p-5">
            <SectionTitle
              eyebrow="Policy monitor"
              icon={LockKeyhole}
              title="Export Control Radar"
            />
            <div className="mt-6 space-y-4">
              {exportRadar.map((item) => (
                <div
                  className="border-b border-white/10 pb-4 last:border-b-0 last:pb-0"
                  key={`${item.jurisdiction}-${item.policy}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                        {item.jurisdiction}
                      </p>
                      <h3 className="mt-2 font-semibold text-white">
                        {item.policy}
                      </h3>
                    </div>
                    <RiskTag risk={item.risk} />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-zinc-400">
                    {item.implication}
                  </p>
                </div>
              ))}
            </div>
          </Panel>
        </section>

        <section className="grid gap-4 xl:grid-cols-[0.72fr_1.28fr]">
          <Panel className="p-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-zinc-500">
              Board question
            </p>
            <p className="mt-4 text-2xl font-semibold leading-snug text-white">
              {runSummary.boardQuestion}
            </p>
            <div className="mt-6 h-2 w-full overflow-hidden rounded-sm bg-white/10">
              <div
                className="h-full rounded-sm bg-[linear-gradient(90deg,#67e8f9,#fbbf24,#fb7185)]"
                style={{ width: `${runSummary.confidence}%` }}
              />
            </div>
            <p className="mt-3 text-sm text-zinc-500">
              Confidence is derived from source agreement, metric specificity,
              and policy-signal recency.
            </p>
          </Panel>

          <Panel className="p-5">
            <div className="grid gap-4 lg:grid-cols-3">
              {operatingPriorities.map((priority) => (
                <div
                  className="border-l border-white/10 pl-4"
                  key={priority.label}
                >
                  <priority.icon className="h-5 w-5 text-zinc-300" />
                  <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                    {priority.label}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-zinc-100">
                    {priority.value}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-col gap-3 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-zinc-500">
                No equity targets, unsupported price forecasts, or unverifiable
                metric claims passed today&apos;s extraction contract.
              </p>
              <a
                className="inline-flex w-fit items-center gap-2 rounded-md border border-white/15 bg-white/[0.06] px-3 py-2 text-sm font-medium text-zinc-100 transition hover:border-cyan-200/50 hover:bg-cyan-200/10"
                href="/api/intelligence/run"
              >
                Pipeline status
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </Panel>
        </section>
      </div>
    </main>
  );
}
