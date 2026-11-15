"use server";

import { getCurrentUser } from "@/actions/authentication/default-signup/getCurrentUser";
import { logOut } from "@/actions/session/logOut";
import Image from "next/image";
import Link from "next/link";

const NavigationBar = async () => {
  /* - Definições - */

  const user = await getCurrentUser();
  const isSubscribed = user?.profile?.isSubscribed;
  const avatar = user?.profile?.userAvatar ?? "/provisorio/spooky-sison.png";

  return (
    <nav className="fixed top-0 left-0 w-full bg-[#1A1A1A] shadow-sm z-50">
      <div className="flex items-center gap-8 max-w-7xl mx-auto px-5 py-2.5">
        {/* - Logo - */}

        <Link
          className="shrink-0"
          href="/"
        >
          <Image
            src="/logo/better-meal-logo.png"
            alt="Logo do BetterMeal"
            height={60}
            width={60}
          />
        </Link>

        {/* - Links  - */}

        <div className="flex items-center justify-end gap-8 ml-auto">
          <Link
            className="text-white font-semibold tracking-tight text-shadow-xs text-shadow-emerald-400/60 hover:text-shadow-white/60 hover:text-transparent hover:bg-clip-text hover:bg-linear-to-br hover:from-[#07BA61] hover:via-[#0ABC6C] hover:to-[#0EBA7B]"
            href="/"
          >
            Página Principal
          </Link>

          <Link
            className="text-white font-semibold tracking-tight text-shadow-xs text-shadow-emerald-400/60 hover:text-shadow-white/60 hover:text-transparent hover:bg-clip-text hover:bg-linear-to-br hover:from-[#07BA61] hover:via-[#0ABC6C] hover:to-[#0EBA7B]"
            href={!user ? "/cadastro" : isSubscribed ? "/dieta" : "/assinaturas"}
          >
            {isSubscribed ? "Minha Dieta" : "Inscrever-se"}
          </Link>
        </div>

        {user ? (
          /* - Se o usuário estiver logado - */

          <div className="flex items-center gap-8 shrink-0">
            {/* - Foto de perfil  - */}

            <Link href="/perfil">
              <Image
                className="aspect-square rounded-full border border-black cursor-pointer"
                src={avatar}
                alt="Logo do BetterMeal"
                height={50}
                width={50}
              />
            </Link>

            {/* - Botão  - */}

            <form action={logOut}>
              <button
                className="text-center text-white text-shadow-sm text-shadow-black/60 font-semibold px-4 py-2 bg-linear-to-br from-[#07BA61] via-[#0ABC6C] to-[#0EBA7B] hover:from-[#059650] hover:via-[#078F52] hover:to-[#0A9462] rounded-lg transition cursor-pointer"
                type="submit"
              >
                Sair
              </button>
            </form>
          </div>
        ) : (
          /* - Se o não usuário estiver logado - */

          <div className="flex items-center gap-8 shrink-0">
            {/* - Botão  - */}

            <Link
              className="text-center text-white text-shadow-sm text-shadow-black/60 font-semibold px-4 py-2 bg-linear-to-br from-[#07BA61] via-[#0ABC6C] to-[#0EBA7B] hover:from-[#059650] hover:via-[#078F52] hover:to-[#0A9462] rounded-lg transition cursor-pointer"
              href="/cadastro"
            >
              Cadastro
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export { NavigationBar };
