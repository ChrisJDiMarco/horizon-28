import {
  getPipelineStatus,
  runHorizonPipeline,
} from "@/lib/intelligence-pipeline";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function GET() {
  return Response.json({
    service: "Horizon 28 Intelligence Pipeline",
    status: getPipelineStatus(),
    trigger: "POST /api/intelligence/run",
  });
}

export async function POST() {
  const result = await runHorizonPipeline();

  return Response.json(result, {
    status: result.ok ? 200 : 500,
  });
}
