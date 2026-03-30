export const runtime = "nodejs";

import { connectMongoose } from "@/server/db/mongoose";
import Product from "@/server/models/Product";
import { requireUser } from "@/server/auth/requireUser";
import { errorJson, json } from "../../../_utils/http";

export async function POST(request, { params }) {
  try {
    const user = await requireUser(request);
    await connectMongoose();

    const { rating, comment } = await request.json();
    const product = await Product.findById(params.id);
    if (!product) return errorJson("Product not Found", 404);

    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === user._id.toString()
    );
    if (alreadyReviewed) return errorJson("Product Already Reviewed", 400);

    const review = {
      name: user.name,
      rating: Number(rating),
      comment,
      user: user._id,
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    return json({ message: "Reviewed Added" }, { status: 201 });
  } catch (e) {
    const status = e?.status || 500;
    return errorJson(e?.message || "Server error", status);
  }
}

