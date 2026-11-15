import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const GET = async () => {
  const confirmationString = crypto.randomUUID();

  const cookieStore = await cookies();
  cookieStore.set("gmailAuthenticationKey", confirmationString, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 5 * 60,
  });

  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID!,
    redirect_uri: process.env.GOOGLE_REDIRECT_URI!,
    response_type: "code",
    scope: "openid email profile",
    state: confirmationString,
  });

  return NextResponse.redirect(`https://accounts.google.com/o/oauth2/v2/auth?${params}`);
};

export { GET };
