"use client";

import { useState } from "react";
import Link from "next/link";

const MainPage = () => {
  const [signedIn, setSignedIn] = useState<boolean>(true);

  return (
    <div className="flex flex-col px-4 pb-8 sm:pb-12 lg:pb-16 max-w-7xl mx-auto">
      {/* - Seção 1: Card Central - */}

      <section className="flex flex-col items-center justify-center w-full text-white bg-linear-to-br from-[#07BA61] via-[#0ABC6C] to-[#0EBA7B] rounded-xl shadow-lg shadow-black/40 mb-10">
        <h1 className="text-4xl font-bold mt-6 text-shadow-lg text-shadow-emerald-950/60">Planos Personalizados</h1>

        <p className="text-xl mt-4 mb-1 text-shadow-sm text-shadow-black/60">Deixe o planejamento para a nossa Inteligência Artificial</p>

        <p className="mt-1 mb-6 text-shadow-sm text-shadow-black/60">Apenas foque em segui-lo e alcançar seu objetivo!</p>

        <Link
          href={signedIn ? "/dieta" : "/cadastro"}
          className="group bg-gray-100 hover:bg-gray-300 px-4 py-2 rounded-lg shadow-md shadow-black/40 mb-6 transition cursor-pointer"
        >
          <span className="text-transparent text-shadow-xs text-shadow-emerald-950/50 font-semibold bg-clip-text bg-linear-to-br from-[#07BA61] via-[#0ABC6C] to-[#0EBA7B] group-hover:from-[#059650] group-hover:via-[#078F52] group-hover:to-[#0A9462]">
            Preparar Minha Dieta
          </span>
        </Link>
      </section>

      {/* - Seção 2: Como Funciona - */}

      <section
        className="mb-10"
        id="howItWorks"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-semibold">Como Funciona</h2>

          <p className="mt-2 text-gray-600">Siga o passo a passo para obter o seu plano alimentar personalizado</p>
        </div>

        <div className="flex flex-col md:flex-row items-start justify-center space-y-6 md:space-y-0 md:space-x-6">
          {/* - Passo 1: Criar Conta - */}

          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center bg-linear-to-br from-[#07BA61] via-[#0ABC6C] to-[#0EBA7B] h-16 w-16 rounded-full shadow-md shadow-black/40 mb-4">
              {/* - Ícone do Passo 1 - */}

              <svg
                className="h-9 w-9 drop-shadow-xs drop-shadow-black/60"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth={2}
                strokeLinejoin="round"
                strokeLinecap="round"
              >
                <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14v7m-3-3h6" />
              </svg>
            </div>

            <h3 className="text-lg font-semibold">Criar Conta</h3>

            <span className="text-center text-gray-600 mt-2 max-w-md">Entre ou cadastre-se para acessar o seu plano personalizado.</span>
          </div>

          {/* - Passo 2: Definir Preferências - */}

          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center bg-linear-to-br from-[#07BA61] via-[#0ABC6C] to-[#0EBA7B] h-16 w-16 rounded-full shadow-md shadow-black/40 mb-4">
              {/* - Ícone do Passo 2 - */}

              <svg
                className="h-9 w-9 drop-shadow-xs drop-shadow-black/60"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth={2}
                strokeLinejoin="round"
                strokeLinecap="round"
              >
                <path d="M9 17v-6a2 2 0 012-2h2a2 2 0 012 2v6" />

                <path d="M9 13h6" />
              </svg>
            </div>

            <h3 className="text-lg font-semibold">Definir Suas Preferências</h3>

            <span className="text-center text-gray-600 mt-2 max-w-md">
              Insira suas preferências alimentares e objetivos para construirmos o seu plano.
            </span>
          </div>

          {/* - Passo 3: Obter Planos - */}

          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center bg-linear-to-br from-[#07BA61] via-[#0ABC6C] to-[#0EBA7B] h-16 w-16 rounded-full shadow-md shadow-black/40 mb-4">
              {/* - Ícone do Passo 3 - */}

              <svg
                className="h-9 w-9 drop-shadow-xs drop-shadow-black/60"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth={2}
                strokeLinejoin="round"
                strokeLinecap="round"
              >
                <path d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h3 className="text-lg font-semibold">Obter Plano Personalizado</h3>

            <span className="text-center text-gray-600 mt-2 max-w-md">Receba seu plano personalizado semanalmente em sua conta.</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MainPage;
