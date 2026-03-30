export const runtime = "nodejs";

import { connectMongoose } from "@/server/db/mongoose";
import Product from "@/server/models/Product";
import { errorJson, json } from "../_utils/http";

export async function GET(request) {
  try {
    await connectMongoose();

    const { searchParams } = new URL(request.url);
    const pageSize = 3;
    const page = Number(searchParams.get("pageNumber")) || 1;
    const keyword = searchParams.get("keyword") || "";
    const size = searchParams.get("size");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const minRating = searchParams.get("minRating");
    const sort = searchParams.get("sort") || "new";

    const filter = {};
    if (keyword) filter.name = { $regex: keyword, $options: "i" };
    if (size) filter.sizes = Number(size);

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice !== null && minPrice !== "") filter.price.$gte = Number(minPrice);
      if (maxPrice !== null && maxPrice !== "") filter.price.$lte = Number(maxPrice);
    }

    if (minRating !== null && minRating !== "") {
      filter.rating = { $gte: Number(minRating) };
    }

    const sortSpec =
      sort === "price-asc"
        ? { price: 1 }
        : sort === "price-desc"
          ? { price: -1 }
          : sort === "rating-desc"
            ? { rating: -1 }
            : { _id: -1 };

    const count = await Product.countDocuments(filter);
    const products = await Product.find(filter)
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .sort(sortSpec);

    return json({ products, page, pages: Math.ceil(count / pageSize) });
  } catch (e) {
    return errorJson(e?.message || "Server error", 500);
  }
}

