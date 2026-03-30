export const runtime = "nodejs";

import { connectMongoose } from "@/server/db/mongoose";
import Order from "@/server/models/Order";
import { requireUser } from "@/server/auth/requireUser";
import { errorJson, json } from "../../_utils/http";

export async function GET(request, { params }) {
  try {
    await requireUser(request);
    await connectMongoose();

    const order = await Order.findById(params.id).populate("user", "name email");
    if (!order) return errorJson("Order Not Found", 404);
    return json(order);
  } catch (e) {
    const status = e?.status || 500;
    return errorJson(e?.message || "Server error", status);
  }
}

