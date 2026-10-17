import { runHorizonPipeline } from "@/lib/intelligence-pipeline";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;

  if (secret) {
    const authHeader = request.headers.get("authorization");
    const expected = `Bearer ${secret}`;

    if (authHeader !== expected) {
      return Response.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }
  }

  const result = await runHorizonPipeline();

  return Response.json(result, {
    status: result.ok ? 200 : 500,
  });
}
