import jwt from "jsonwebtoken";
import { connectMongoose } from "../db/mongoose";
import User from "../models/User";

export async function requireUser(request) {
  const auth = request.headers.get("authorization") || "";
  if (!auth.startsWith("Bearer ")) {
    const err = new Error("Not Authorized, no token");
    err.status = 401;
    throw err;
  }

  const token = auth.slice("Bearer ".length);
  try {
    if (!process.env.JWT_SECRET) {
      const err = new Error(
        "Missing JWT_SECRET. Set it in apps/web/.env.local (dev) or Vercel Environment Variables (prod)."
      );
      err.status = 500;
      throw err;
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    await connectMongoose();
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      const err = new Error("User Not Found");
      err.status = 404;
      throw err;
    }
    return user;
  } catch (e) {
    const err = new Error("Not Authorized, token failed");
    err.status = 401;
    throw err;
  }
}

