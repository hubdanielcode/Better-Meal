import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const GET = async () => {
  const confirmationString = crypto.randomUUID();
  const cookieStore = await cookies();

  cookieStore.set("githubAuthenticationKey", confirmationString, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 5 * 60,
  });

  const params = new URLSearchParams({
    client_id: process.env.GITHUB_CLIENT_ID!,
    redirect_uri: process.env.GITHUB_REDIRECT_URI!,
    scope: "read:user user:email",
    state: confirmationString,
  });

  return NextResponse.redirect(`https://github.com/login/oauth/authorize?${params}`);
};

export { GET };
