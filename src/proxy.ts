import { NextRequest, NextResponse } from "next/server";

const proxy = async (request: NextRequest) => {
  /* - Definições - */

  const { origin } = request.nextUrl;
  const pathname = decodeURIComponent(request.nextUrl.pathname);

  const publicRoutes = ["/", "/cadastro(.*)", "/assinaturas(.*)", "/api/verificar-plano(.*)", "/api/webhook"];

  const isPublicRoute = (pathname: string) => {
    return publicRoutes.some((route) => new RegExp(`^${route}$`).test(pathname));
  };

  /* - Checagem Simples: Só verifica se o cookie existe. A validação da sessão fica sob responsabilidade das páginas e rotas protegidas. - */

  const sessionId = request.cookies.get("validSessionId")?.value;
  const hasSessionCookie = sessionId ? true : false;

  if (!isPublicRoute(pathname) && !hasSessionCookie) {
    return NextResponse.redirect(new URL("/cadastro", origin));
  }

  if (pathname === "/cadastro" && hasSessionCookie) {
    return NextResponse.redirect(new URL("/dieta", origin));
  }

  /* - Dieta: só entra quem tem assinatura ativa - */

  if (pathname === "/dieta" && hasSessionCookie) {
    try {
      // 1. A rota de status identifica o usuário pela sessão, então o cookie precisa ser repassado na consulta

      const response = await fetch(`${origin}/api/planos/verificar-plano`, {
        headers: { cookie: request.headers.get("cookie") ?? "" },
      });

      if (!response.ok) {
        return NextResponse.redirect(new URL("/assinaturas", origin));
      }

      const data: { subscriptionActive: boolean } = await response.json();

      if (!data.subscriptionActive) {
        return NextResponse.redirect(new URL("/assinaturas", origin));
      }
    } catch {
      return NextResponse.redirect(new URL("/assinaturas", origin));
    }
  }

  return NextResponse.next();
};

export const config = {
  matcher: [
    // Pula arquivos internos do Next e estáticos
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Sempre roda nas rotas de API
    "/(api|trpc)(.*)",
  ],
};

export { proxy };
