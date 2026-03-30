import mongoose from "mongoose";

mongoose.set("strictQuery", false);

const MONGO_URL = process.env.MONGO_URL;

let globalWithMongoose = global;

if (!globalWithMongoose.__mongoose) {
  globalWithMongoose.__mongoose = { conn: null, promise: null };
}

export async function connectMongoose() {
  if (globalWithMongoose.__mongoose.conn) return globalWithMongoose.__mongoose.conn;

  if (!MONGO_URL) {
    const err = new Error(
      "Missing MONGO_URL. Set it in apps/web/.env.local (dev) or Vercel Environment Variables (prod)."
    );
    err.status = 500;
    throw err;
  }

  if (!globalWithMongoose.__mongoose.promise) {
    globalWithMongoose.__mongoose.promise = mongoose
      .connect(MONGO_URL, {
        dbName: "MerchX",
      })
      .then((m) => m);
  }

  globalWithMongoose.__mongoose.conn = await globalWithMongoose.__mongoose.promise;
  return globalWithMongoose.__mongoose.conn;
}

