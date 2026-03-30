export const runtime = "nodejs";

import { connectMongoose } from "@/server/db/mongoose";
import Order from "@/server/models/Order";
import { requireUser } from "@/server/auth/requireUser";
import { errorJson, json } from "../_utils/http";

export async function POST(request) {
  try {
    const user = await requireUser(request);
    await connectMongoose();

    const body = await request.json();
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = body;

    if (orderItems && orderItems.length === 0) {
      return errorJson("No order items", 400);
    }

    const order = new Order({
      orderItems,
      user: user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const created = await order.save();
    return json(created, { status: 201 });
  } catch (e) {
    const status = e?.status || 500;
    return errorJson(e?.message || "Server error", status);
  }
}

export async function GET(request) {
  try {
    const user = await requireUser(request);
    await connectMongoose();
    const orders = await Order.find({ user: user._id }).sort({ _id: -1 });
    return json(orders);
  } catch (e) {
    const status = e?.status || 500;
    return errorJson(e?.message || "Server error", status);
  }
}

