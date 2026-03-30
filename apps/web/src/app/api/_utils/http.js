import { NextResponse } from "next/server";

export function json(data, init) {
  return NextResponse.json(data, init);
}

export function errorJson(message, status = 500, extra = {}) {
  return NextResponse.json({ message, ...extra }, { status });
}

