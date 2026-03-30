export const runtime = "nodejs";

import { connectMongoose } from "@/server/db/mongoose";
import Product from "@/server/models/Product";
import { errorJson, json } from "../../_utils/http";

export async function GET(_request, { params }) {
  try {
    await connectMongoose();
    const product = await Product.findById(params.id);
    if (!product) return errorJson("Product not Found", 404);
    return json(product);
  } catch (e) {
    return errorJson(e?.message || "Server error", 500);
  }
}

