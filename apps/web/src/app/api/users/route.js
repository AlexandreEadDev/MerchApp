export const runtime = "nodejs";

import { connectMongoose } from "@/server/db/mongoose";
import User from "@/server/models/User";
import { generateToken } from "@/server/auth/generateToken";
import { errorJson, json } from "../_utils/http";

export async function POST(request) {
  try {
    await connectMongoose();
    const { name, email, password } = await request.json();

    const userExists = await User.findOne({ email });
    if (userExists) return errorJson("User already exists", 400);

    const user = await User.create({ name, email, password });
    if (!user) return errorJson("Invalid User Data", 400);

    return json(
      {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      },
      { status: 201 }
    );
  } catch (e) {
    return errorJson(e?.message || "Server error", 500);
  }
}

