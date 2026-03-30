export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { connectMongoose } from "@/server/db/mongoose";
import { errorJson, json } from "../_utils/http";

export async function GET() {
  try {
    await connectMongoose();
    return json({ ok: true, mongo: "connected" });
  } catch (e) {
    return errorJson(e?.message || "healthcheck failed", 500, {
      ok: false,
      mongo: "error",
    });
  }
}

