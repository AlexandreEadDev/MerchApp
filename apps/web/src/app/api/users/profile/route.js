export const runtime = "nodejs";

import { connectMongoose } from "@/server/db/mongoose";
import User from "@/server/models/User";
import { generateToken } from "@/server/auth/generateToken";
import { requireUser } from "@/server/auth/requireUser";
import { errorJson, json } from "../../_utils/http";

export async function GET(request) {
  try {
    const authUser = await requireUser(request);
    await connectMongoose();
    const user = await User.findById(authUser._id);
    if (!user) return errorJson("User Not Found", 404);

    return json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      createdAt: user.createdAt,
    });
  } catch (e) {
    const status = e?.status || 500;
    return errorJson(e?.message || "Server error", status);
  }
}

export async function PUT(request) {
  try {
    const authUser = await requireUser(request);
    await connectMongoose();
    const user = await User.findById(authUser._id);
    if (!user) return errorJson("User Not Found", 404);

    const body = await request.json();
    user.name = body.name || user.name;
    user.email = body.email || user.email;
    if (body.password) user.password = body.password;
    const updatedUser = await user.save();

    return json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      createdAt: updatedUser.createdAt,
      token: generateToken(updatedUser._id),
    });
  } catch (e) {
    const status = e?.status || 500;
    return errorJson(e?.message || "Server error", status);
  }
}

