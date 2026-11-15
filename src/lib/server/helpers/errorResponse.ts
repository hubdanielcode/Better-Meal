import { NextResponse } from "next/server";
import { errorMessages, type ErrorCode } from "./errorMessages";

const errorResponse = (error: ErrorCode, status: number, message?: string) => {
  return NextResponse.json({ error, message: message ?? errorMessages[error] }, { status });
};

export { errorResponse };
