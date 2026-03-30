export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { errorJson, json } from "../_utils/http";

export async function GET() {
  try {
    const { connectMongoose } = await import("@/server/db/mongoose");
    await connectMongoose();
    return json({ ok: true, mongo: "connected" });
  } catch (e) {
    return errorJson(e?.message || "healthcheck failed", 500, {
      ok: false,
      mongo: "error",
    });
  }
}

