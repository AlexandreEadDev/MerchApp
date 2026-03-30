export const runtime = "nodejs";

import { connectMongoose } from "@/server/db/mongoose";
import User from "@/server/models/User";
import { generateToken } from "@/server/auth/generateToken";
import { errorJson, json } from "../../_utils/http";

export async function POST(request) {
  try {
    await connectMongoose();
    const { email, password } = await request.json();

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return errorJson("Invalid Email or Password", 401);
    }

    return json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
      createdAt: user.createdAt,
    });
  } catch (e) {
    return errorJson(e?.message || "Server error", 500);
  }
}

