import { StatusBar } from "expo-status-bar";
import { useMemo, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  SafeAreaProvider,
  SafeAreaView,
} from "react-native-safe-area-context";
import {
  ArrowUpRight,
  CheckCircle2,
  ChevronRight,
  RefreshCcw,
} from "lucide-react-native";
import {
  actionQueue,
  feed,
  metrics,
  radarSignals,
  scenarios,
  summary,
  type RiskLevel,
} from "./src/data/horizon";

type TabKey = "brief" | "scenarios" | "radar";

const tabs: Array<{ key: TabKey; label: string }> = [
  { key: "brief", label: "Brief" },
  { key: "scenarios", label: "Scenarios" },
  { key: "radar", label: "Radar" },
];

const riskColors: Record<RiskLevel, { text: string; border: string; bg: string }> =
  {
    Low: { text: "#9cf6d0", border: "#2dd4bf55", bg: "#14b8a611" },
    Watch: { text: "#a5f3fc", border: "#67e8f955", bg: "#06b6d411" },
    Elevated: { text: "#fde68a", border: "#f59e0b66", bg: "#f59e0b12" },
    Critical: { text: "#fecdd3", border: "#fb718566", bg: "#fb718512" },
  };

export default function App() {
  const [activeTab, setActiveTab] = useState<TabKey>("brief");
  const [runCount, setRunCount] = useState(1);

  const refreshedAt = useMemo(() => {
    if (runCount === 1) {
      return summary.generatedAt;
    }

    return new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }, [runCount]);

  return (
    <SafeAreaProvider>
      <SafeAreaView edges={["top", "bottom"]} style={styles.safeArea}>
        <StatusBar style="light" />
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <View style={styles.titleRow}>
              <View style={styles.productMark}>
                <Text style={styles.productMarkText}>HORIZON 28</Text>
              </View>
              <Pressable
                accessibilityRole="button"
                onPress={() => setRunCount((count) => count + 1)}
                style={({ pressed }) => [
                  styles.iconButton,
                  pressed && styles.pressed,
                ]}
              >
                <RefreshCcw color="#e4e4e7" size={17} strokeWidth={1.8} />
              </Pressable>
            </View>

            <Text style={styles.kicker}>Executable intelligence feed</Text>
            <Text style={styles.heroTitle}>
              Daily scenario planning for transformative AI.
            </Text>
            <Text style={styles.heroCopy}>
              Today's run turns policy shocks, compute constraints, and model
              releases into board-level moves.
            </Text>
          </View>

          <View style={styles.statusGrid}>
            <StatusCell label="Run" value={refreshedAt} />
            <StatusCell label="Confidence" value={`${summary.confidence}%`} />
            <StatusCell label="Tilt" value={summary.tilt} />
          </View>

          <View style={styles.tabBar}>
            {tabs.map((tab) => (
              <Pressable
                accessibilityRole="tab"
                accessibilityState={{ selected: activeTab === tab.key }}
                key={tab.key}
                onPress={() => setActiveTab(tab.key)}
                style={[
                  styles.tabButton,
                  activeTab === tab.key && styles.tabButtonActive,
                ]}
              >
                <Text
                  style={[
                    styles.tabButtonText,
                    activeTab === tab.key && styles.tabButtonTextActive,
                  ]}
                >
                  {tab.label}
                </Text>
              </Pressable>
            ))}
          </View>

          {activeTab === "brief" ? <BriefView /> : null}
          {activeTab === "scenarios" ? <ScenarioView /> : null}
          {activeTab === "radar" ? <RadarView /> : null}
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

function BriefView() {
  return (
    <View style={styles.stack}>
      <View style={styles.metricGrid}>
        {metrics.map((metric) => (
          <View key={metric.label} style={styles.metricCard}>
            <View style={styles.cardTopRow}>
              <Text style={styles.mutedLabel}>{metric.label}</Text>
              <metric.icon color="#d4d4d8" size={17} strokeWidth={1.8} />
            </View>
            <Text style={styles.metricValue}>{metric.value}</Text>
            <Text style={styles.metricDetail}>{metric.detail}</Text>
          </View>
        ))}
      </View>

      <View style={styles.panel}>
        <SectionHeader eyebrow="Central feed" title="Executable Intelligence" />
        {feed.map((item) => (
          <View key={item.id} style={styles.feedItem}>
            <View style={styles.feedMetaRow}>
              <RiskTag risk={item.risk} />
              <Text style={styles.timeText}>{item.time}</Text>
            </View>
            <Text style={styles.sourceText}>{item.source}</Text>
            <Text style={styles.feedTitle}>{item.title}</Text>
            <Text style={styles.bodyText}>{item.summary}</Text>
            <View style={styles.actionStrip}>
              <ArrowUpRight color="#67e8f9" size={16} strokeWidth={1.8} />
              <Text style={styles.actionText}>{item.action}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.panel}>
        <SectionHeader eyebrow="Decision queue" title="Executive Actions" />
        {actionQueue.map((action) => (
          <View key={action.title} style={styles.actionCard}>
            <View style={styles.actionIcon}>
              <action.icon color="#f4f4f5" size={18} strokeWidth={1.8} />
            </View>
            <View style={styles.actionContent}>
              <Text style={styles.feedTitle}>{action.title}</Text>
              <Text style={styles.sourceText}>
                {action.owner} / {action.deadline}
              </Text>
              <Text style={styles.bodyText}>{action.rationale}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

function ScenarioView() {
  return (
    <View style={styles.stack}>
      <View style={styles.boardQuestion}>
        <Text style={styles.mutedLabel}>Board question</Text>
        <Text style={styles.boardQuestionText}>{summary.boardQuestion}</Text>
        <View style={styles.confidenceTrack}>
          <View
            style={[
              styles.confidenceFill,
              { width: `${summary.confidence}%` },
            ]}
          />
        </View>
      </View>

      {scenarios.map((scenario) => (
        <View key={scenario.name} style={styles.panel}>
          <View style={styles.scenarioHeader}>
            <View style={styles.scenarioTitleBlock}>
              <Text style={styles.mutedLabel}>2028 scenario</Text>
              <Text style={styles.scenarioTitle}>{scenario.name}</Text>
            </View>
            <Text style={styles.probability}>{scenario.probability}%</Text>
          </View>
          <Text style={styles.bodyText}>{scenario.thesis}</Text>
          <View style={styles.indicatorStack}>
            {scenario.indicators.map((indicator) => (
              <View key={indicator} style={styles.indicatorRow}>
                <ChevronRight color="#facc15" size={16} strokeWidth={2} />
                <Text style={styles.indicatorText}>{indicator}</Text>
              </View>
            ))}
          </View>
          <View style={styles.moveBox}>
            <CheckCircle2 color="#9cf6d0" size={17} strokeWidth={1.8} />
            <Text style={styles.moveText}>{scenario.move}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

function RadarView() {
  return (
    <View style={styles.stack}>
      {radarSignals.map((signal) => (
        <View key={signal.label} style={styles.panel}>
          <View style={styles.radarHeader}>
            <View style={styles.radarIcon}>
              <signal.icon color="#f4f4f5" size={18} strokeWidth={1.8} />
            </View>
            <View style={styles.radarTitleBlock}>
              <Text style={styles.sourceText}>{signal.jurisdiction}</Text>
              <Text style={styles.feedTitle}>{signal.label}</Text>
            </View>
            <RiskTag risk={signal.risk} />
          </View>
          <Text style={styles.radarSignal}>{signal.signal}</Text>
          <Text style={styles.bodyText}>{signal.implication}</Text>
        </View>
      ))}

      <View style={styles.panel}>
        <SectionHeader eyebrow="Output contract" title="Extraction Guardrail" />
        <Text style={styles.bodyText}>
          No equity targets, unsupported price forecasts, EPS claims, or ticker
          recommendations pass the mobile briefing contract.
        </Text>
      </View>
    </View>
  );
}

function SectionHeader({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.eyebrow}>{eyebrow}</Text>
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
  );
}

function StatusCell({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.statusCell}>
      <Text style={styles.statusLabel}>{label}</Text>
      <Text style={styles.statusValue}>{value}</Text>
    </View>
  );
}

function RiskTag({ risk }: { risk: RiskLevel }) {
  const colors = riskColors[risk];

  return (
    <View
      style={[
        styles.riskTag,
        {
          backgroundColor: colors.bg,
          borderColor: colors.border,
        },
      ]}
    >
      <Text style={[styles.riskTagText, { color: colors.text }]}>{risk}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#050505",
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  header: {
    paddingTop: 18,
    paddingBottom: 18,
  },
  titleRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  productMark: {
    backgroundColor: "#67e8f91a",
    borderColor: "#67e8f966",
    borderRadius: 6,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  productMarkText: {
    color: "#cffafe",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 2.4,
  },
  iconButton: {
    alignItems: "center",
    backgroundColor: "#ffffff10",
    borderColor: "#ffffff1f",
    borderRadius: 7,
    borderWidth: 1,
    height: 38,
    justifyContent: "center",
    width: 38,
  },
  pressed: {
    opacity: 0.68,
  },
  kicker: {
    color: "#71717a",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 2.2,
    marginTop: 20,
    textTransform: "uppercase",
  },
  heroTitle: {
    color: "#fafafa",
    fontSize: 36,
    fontWeight: "800",
    lineHeight: 40,
    marginTop: 10,
  },
  heroCopy: {
    color: "#a1a1aa",
    fontSize: 16,
    lineHeight: 23,
    marginTop: 12,
  },
  statusGrid: {
    flexDirection: "row",
    gap: 9,
  },
  statusCell: {
    backgroundColor: "#ffffff0e",
    borderColor: "#ffffff1a",
    borderRadius: 8,
    borderWidth: 1,
    flex: 1,
    minHeight: 76,
    padding: 12,
  },
  statusLabel: {
    color: "#71717a",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1.8,
    textTransform: "uppercase",
  },
  statusValue: {
    color: "#f4f4f5",
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 19,
    marginTop: 12,
  },
  tabBar: {
    backgroundColor: "#ffffff0a",
    borderColor: "#ffffff17",
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: "row",
    gap: 6,
    marginTop: 16,
    padding: 4,
  },
  tabButton: {
    alignItems: "center",
    borderColor: "transparent",
    borderRadius: 6,
    borderWidth: 1,
    flex: 1,
    paddingVertical: 10,
  },
  tabButtonActive: {
    backgroundColor: "#67e8f91a",
    borderColor: "#67e8f94d",
  },
  tabButtonText: {
    color: "#71717a",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.1,
    textTransform: "uppercase",
  },
  tabButtonTextActive: {
    color: "#cffafe",
  },
  stack: {
    gap: 14,
    marginTop: 14,
  },
  metricGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  metricCard: {
    backgroundColor: "#ffffff0e",
    borderColor: "#ffffff1a",
    borderRadius: 8,
    borderWidth: 1,
    padding: 14,
    width: "48.5%",
  },
  cardTopRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  mutedLabel: {
    color: "#71717a",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.1,
    textTransform: "uppercase",
  },
  metricValue: {
    color: "#fafafa",
    fontSize: 28,
    fontWeight: "800",
    marginTop: 16,
  },
  metricDetail: {
    color: "#a1a1aa",
    fontSize: 13,
    lineHeight: 18,
    marginTop: 10,
  },
  panel: {
    backgroundColor: "#ffffff0e",
    borderColor: "#ffffff1a",
    borderRadius: 8,
    borderWidth: 1,
    padding: 16,
  },
  sectionHeader: {
    borderBottomColor: "#ffffff14",
    borderBottomWidth: 1,
    paddingBottom: 14,
  },
  eyebrow: {
    color: "#71717a",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  sectionTitle: {
    color: "#fafafa",
    fontSize: 20,
    fontWeight: "800",
    marginTop: 8,
  },
  feedItem: {
    borderBottomColor: "#ffffff12",
    borderBottomWidth: 1,
    paddingVertical: 16,
  },
  feedMetaRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  riskTag: {
    borderRadius: 4,
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  riskTagText: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.4,
    textTransform: "uppercase",
  },
  timeText: {
    color: "#71717a",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.1,
    textTransform: "uppercase",
  },
  sourceText: {
    color: "#71717a",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.4,
    marginTop: 12,
    textTransform: "uppercase",
  },
  feedTitle: {
    color: "#fafafa",
    fontSize: 18,
    fontWeight: "800",
    lineHeight: 24,
    marginTop: 8,
  },
  bodyText: {
    color: "#a1a1aa",
    fontSize: 14,
    lineHeight: 21,
    marginTop: 10,
  },
  actionStrip: {
    alignItems: "flex-start",
    backgroundColor: "#02061770",
    borderColor: "#67e8f930",
    borderRadius: 7,
    borderWidth: 1,
    flexDirection: "row",
    gap: 10,
    marginTop: 14,
    padding: 12,
  },
  actionText: {
    color: "#e4e4e7",
    flex: 1,
    fontSize: 13,
    lineHeight: 19,
  },
  actionCard: {
    alignItems: "flex-start",
    borderBottomColor: "#ffffff12",
    borderBottomWidth: 1,
    flexDirection: "row",
    gap: 12,
    paddingVertical: 15,
  },
  actionIcon: {
    alignItems: "center",
    backgroundColor: "#ffffff10",
    borderColor: "#ffffff1a",
    borderRadius: 7,
    borderWidth: 1,
    height: 38,
    justifyContent: "center",
    marginTop: 4,
    width: 38,
  },
  actionContent: {
    flex: 1,
  },
  boardQuestion: {
    backgroundColor: "#ffffff0e",
    borderColor: "#ffffff1a",
    borderRadius: 8,
    borderWidth: 1,
    padding: 16,
  },
  boardQuestionText: {
    color: "#fafafa",
    fontSize: 23,
    fontWeight: "800",
    lineHeight: 29,
    marginTop: 10,
  },
  confidenceTrack: {
    backgroundColor: "#ffffff14",
    borderRadius: 4,
    height: 8,
    marginTop: 18,
    overflow: "hidden",
  },
  confidenceFill: {
    backgroundColor: "#67e8f9",
    height: 8,
  },
  scenarioHeader: {
    alignItems: "flex-start",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  scenarioTitleBlock: {
    flex: 1,
    paddingRight: 14,
  },
  scenarioTitle: {
    color: "#fafafa",
    fontSize: 23,
    fontWeight: "800",
    lineHeight: 29,
    marginTop: 8,
  },
  probability: {
    color: "#cffafe",
    fontSize: 34,
    fontWeight: "800",
  },
  indicatorStack: {
    gap: 12,
    marginTop: 16,
  },
  indicatorRow: {
    alignItems: "flex-start",
    flexDirection: "row",
    gap: 8,
  },
  indicatorText: {
    color: "#e4e4e7",
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
  moveBox: {
    alignItems: "flex-start",
    backgroundColor: "#10b98112",
    borderColor: "#34d39933",
    borderRadius: 7,
    borderWidth: 1,
    flexDirection: "row",
    gap: 10,
    marginTop: 18,
    padding: 12,
  },
  moveText: {
    color: "#ecfdf5",
    flex: 1,
    fontSize: 13,
    lineHeight: 19,
  },
  radarHeader: {
    alignItems: "flex-start",
    flexDirection: "row",
    gap: 12,
  },
  radarIcon: {
    alignItems: "center",
    backgroundColor: "#ffffff10",
    borderColor: "#ffffff1a",
    borderRadius: 7,
    borderWidth: 1,
    height: 38,
    justifyContent: "center",
    width: 38,
  },
  radarTitleBlock: {
    flex: 1,
  },
  radarSignal: {
    color: "#fafafa",
    fontSize: 17,
    fontWeight: "800",
    lineHeight: 23,
    marginTop: 16,
  },
});
