import { cookies } from "next/headers";
import { createSession } from "@/actions/session/createSession";
import { findOrCreateOAuthUser } from "@/actions/authentication/oauth-signup/findOrCreateOAuthUser";
import { NextRequest, NextResponse } from "next/server";

const GET = async (request: NextRequest) => {
  const cookieStore = await cookies();

  try {
    const validConfirmationString = cookieStore.get("githubAuthenticationKey")?.value;

    const confirmationString = request.nextUrl.searchParams.get("state");
    const code = request.nextUrl.searchParams.get("code");

    cookieStore.delete("githubAuthenticationKey");

    if (!validConfirmationString || !code || validConfirmationString !== confirmationString) {
      return NextResponse.redirect(new URL("/cadastro?erro=github", request.url));
    }

    const data = {
      client_id: process.env.GITHUB_CLIENT_ID!,
      client_secret: process.env.GITHUB_CLIENT_SECRET!,
      redirect_uri: process.env.GITHUB_REDIRECT_URI!,
      code: code,
    };

    const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },

      body: JSON.stringify(data),
    });

    if (!tokenResponse.ok) {
      return NextResponse.redirect(new URL("/cadastro?erro=github", request.url));
    }

    const tokenData: { access_token?: string; error?: string } = await tokenResponse.json();

    if (!tokenData.access_token) {
      return NextResponse.redirect(new URL("/cadastro?erro=github", request.url));
    }

    const githubResponse = await fetch("https://api.github.com/user", {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    });

    if (!githubResponse.ok) {
      return NextResponse.redirect(new URL("/cadastro?erro=github", request.url));
    }

    const githubData: { avatar_url: string } = await githubResponse.json();
    const avatar = githubData.avatar_url;

    const emailResponse = await fetch("https://api.github.com/user/emails", {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    });

    if (!emailResponse.ok) {
      return NextResponse.redirect(new URL("/cadastro?erro=github", request.url));
    }

    const emailData: { email: string; primary: boolean; verified: boolean }[] = await emailResponse.json();

    const primaryEmail = emailData.find((emails) => emails.primary && emails.verified);

    if (!primaryEmail) {
      return NextResponse.redirect(new URL("/cadastro?erro=github", request.url));
    }

    const validEmail = primaryEmail.email;

    const user = await findOrCreateOAuthUser(validEmail, avatar);
    const expiresAt = new Date(Date.now() + 60 * 60 * 24 * 7 * 1000);
    const newSession = await createSession({ userId: user.id, expiresAt: expiresAt });

    cookieStore.set("validSessionId", newSession.id, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      expires: expiresAt,
    });

    return NextResponse.redirect(new URL("/assinaturas", request.url));
  } catch {
    return NextResponse.redirect(new URL("/cadastro?erro=github", request.url));
  }
};

export { GET };
