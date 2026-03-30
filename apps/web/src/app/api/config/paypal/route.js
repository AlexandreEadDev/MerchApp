export const runtime = "nodejs";

import { json } from "../../_utils/http";

export async function GET() {
  return json(process.env.PAYPAL_CLIENT_ID || "");
}

