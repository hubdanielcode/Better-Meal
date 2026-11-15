import { cookies } from "next/headers";
import { createSession } from "@/actions/session/createSession";
import { findOrCreateOAuthUser } from "@/actions/authentication/oauth-signup/findOrCreateOAuthUser";
import { NextRequest, NextResponse } from "next/server";

const GET = async (request: NextRequest) => {
  const cookieStore = await cookies();

  const validConfirmationString = cookieStore.get("gmailAuthenticationKey")?.value;
  try {
    const confirmationString = request.nextUrl.searchParams.get("state");
    const code = request.nextUrl.searchParams.get("code");

    cookieStore.delete("gmailAuthenticationKey");

    if (!validConfirmationString || !code || validConfirmationString !== confirmationString) {
      return NextResponse.redirect(new URL("/cadastro?erro=google", request.nextUrl));
    }

    const data = {
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI!,
      grant_type: "authorization_code",
      code: code,
    };

    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },

      body: new URLSearchParams(data),
    });

    if (!tokenResponse.ok) {
      return NextResponse.redirect(new URL("/cadastro?erro=google", request.nextUrl));
    }

    const tokenData: { access_token?: string; error?: string } = await tokenResponse.json();

    if (!tokenData.access_token) {
      return NextResponse.redirect(new URL("/cadastro?erro=google", request.nextUrl));
    }

    const googleResponse = await fetch("https://openidconnect.googleapis.com/v1/userinfo", {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    });

    if (!googleResponse.ok) {
      return NextResponse.redirect(new URL("/cadastro?erro=google", request.nextUrl));
    }

    const googleData: {
      name: string;
      picture: string;
      email: string;
      email_verified: boolean;
    } = await googleResponse.json();

    const avatar = googleData.picture;
    const validEmail = googleData.email_verified ? googleData.email : null;

    if (!validEmail) {
      return NextResponse.redirect(new URL("/cadastro?erro=google", request.nextUrl));
    }

    const user = await findOrCreateOAuthUser(validEmail, avatar);
    const expiresAt = new Date(Date.now() + 60 * 60 * 24 * 7 * 1000);

    const newSession = await createSession({ userId: user.id, expiresAt: expiresAt });

    cookieStore.set("validSessionId", newSession.id, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      expires: expiresAt,
    });

    return NextResponse.redirect(new URL("/assinaturas", request.nextUrl));
  } catch {
    return NextResponse.redirect(new URL("/cadastro?erro=google", request.nextUrl));
  }
};

export { GET };
