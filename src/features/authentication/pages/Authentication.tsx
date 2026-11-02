"use client";

import { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { IoMdArrowDropright } from "react-icons/io";
import { Eye, EyeClosed } from "lucide-react";
import Link from "next/link";

const Authentication = () => {
  const [isPassword, setIsPassword] = useState<boolean>(true);

  return (
    <div className="flex flex-col items-center justify-start min-h-[calc(100vh-7rem)] max-w-full">
      <div className="flex flex-col shrink-0 md:min-w-sm bg-linear-to-br from-[#07BA61] via-[#0ABC6C] to-[#0EBA7B] shadow-lg shadow-black/60 rounded-xl p-6">
        {/* - Título - */}

        <div className="flex flex-col items-center justify-center py-4 space-y-1">
          <h1 className="text-white text-2xl font-bold text-center text-shadow-sm text-shadow-emerald-950 tracking-tight">Criar sua Conta</h1>
          <p className="text-sm text-gray-100 text-shadow-sm text-shadow-black/40">para continuar em BetterMeal</p>
        </div>

        {/* - Formas de Login - */}

        <div className="flex flex-col md:flex-row items-center justify-center md:space-x-6">
          <button
            className="flex items-center justify-center text-center text-sm font-semibold tracking-tight bg-gray-100 hover:bg-gray-300 rounded-lg shadow-md shadow-black/40 px-4 py-2 mb-3 transition cursor-pointer"
            type="button"
          >
            <FaGithub className="h-5 w-5 mr-2.5" /> GitHub
          </button>

          <button
            className="flex items-center justify-center text-center text-sm font-semibold tracking-tight bg-gray-100 hover:bg-gray-300 rounded-lg shadow-md shadow-black/40 px-4 py-2 mb-3 transition cursor-pointer"
            type="button"
          >
            <FcGoogle className="h-5 w-5 mr-2.5" /> Gmail
          </button>
        </div>

        {/* - Divisória - */}

        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-white shadow-sm shadow-black/60" />
          <span className="text-white tracking-tight text-shadow-sm text-shadow-emerald-950">ou</span>
          <div className="flex-1 h-px bg-white shadow-sm shadow-black/60" />
        </div>

        {/* - Campos - */}

        <label
          className="text-lg text-white font-semibold text-shadow-md text-shadow-black/60 tracking-tight"
          htmlFor="email"
        >
          Seu Email
        </label>

        <div className="flex items-center mt-2 mb-6 text-sm tracking-tight bg-white border border-emerald-950 rounded-lg px-4 py-2">
          <input
            className="text-black placeholder:text-gray-500 bg-transparent w-full outline-none focus:outline-none focus:ring-2 focus:ring-emerald-600"
            name="email"
            id="email"
            type="email"
            placeholder="Digite seu endereço de email"
          />
        </div>

        <label
          className="text-lg text-white font-semibold text-shadow-md text-shadow-black/60 tracking-tight"
          htmlFor="password"
        >
          Sua Senha
        </label>

        <div className="flex items-center mt-2 text-sm tracking-tight bg-white border border-emerald-950 rounded-lg px-4 py-2">
          <input
            className="text-black placeholder:text-gray-500 bg-transparent w-full outline-none focus:outline-none focus:ring-2 focus:ring-emerald-600"
            name="password"
            id="password"
            type={isPassword ? "password" : "text"}
            placeholder="•••••••••••••••••••••"
          />

          <button
            className="cursor-pointer"
            type="button"
            aria-label={isPassword ? "Mostrar senha" : "Ocultar senha"}
            onClick={() => setIsPassword(!isPassword)}
          >
            {isPassword ? <EyeClosed className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
          </button>
        </div>

        {/* - Botão de confirmar - */}

        <button className="flex items-center justify-center w-full text-white font-semibold tracking-tight bg-[#1A1A1A] hover:bg-black shadow-md shadow-black/60 rounded-lg mt-6 px-4 py-2 transition cursor-pointer">
          Continuar
          <IoMdArrowDropright className="h-6 w-6 pt-1" />
        </button>

        {/* - Link - */}

        <span className="mt-4 mx-auto text-white text-shadow-sm text-shadow-black/40 text-sm">
          Possui uma conta?
          <Link
            className="font-bold hover:underline"
            href="/dieta"
          >
            Entrar
          </Link>
        </span>
      </div>
    </div>
  );
};

export { Authentication };
