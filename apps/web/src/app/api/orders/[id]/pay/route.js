export const runtime = "nodejs";

import { connectMongoose } from "@/server/db/mongoose";
import Order from "@/server/models/Order";
import { requireUser } from "@/server/auth/requireUser";
import { errorJson, json } from "../../../_utils/http";

export async function PUT(request, { params }) {
  try {
    await requireUser(request);
    await connectMongoose();

    const paymentResult = await request.json();
    const order = await Order.findById(params.id);
    if (!order) return errorJson("Order Not Found", 404);

    order.isPaid = true;
    order.paidAt = new Date();
    order.paymentResult = {
      id: paymentResult.id,
      status: paymentResult.status,
      update_time: paymentResult.update_time,
      email_address: paymentResult.email_address,
    };

    const updated = await order.save();
    return json(updated);
  } catch (e) {
    const status = e?.status || 500;
    return errorJson(e?.message || "Server error", status);
  }
}

