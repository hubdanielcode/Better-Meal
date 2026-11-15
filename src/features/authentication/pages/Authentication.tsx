"use client";

import { Eye, EyeClosed } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { IoMdArrowDropright } from "react-icons/io";
import { useCreateProfile } from "@/features/users/profile/hooks/useCreateProfile";
import { useSignIn } from "../hooks/useSignIn";
import { useState } from "react";

const Authentication = () => {
  /* - Estados - */

  const [isPassword, setIsPassword] = useState<boolean>(true);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  /* - Definições - */

  const { error: signUpError, isPending: isSignUpPending, mutate: signUp } = useCreateProfile();
  const { error: signInError, isPending: isSignInPending, mutate: signIn } = useSignIn();

  /* - Funções - */

  // 1. Fazer o cadastro

  const handleSignUp = () => {
    if (!email.trim() && !password.trim()) {
      setError("Preencha os campos.");
      return;
    }

    if (!email.trim()) {
      setError("Digite o seu email.");
      return;
    }

    if (!password.trim()) {
      setError("Digite a sua senha.");
      return;
    }

    if (password.length <= 5) {
      setError("A senha deve conter, pelo menos, 6 caracteres.");
      return;
    }

    setError("");

    /* - O redirecionamento para /assinaturas é feito no onSuccess do useCreateProfile - */

    signUp({ email: email.trim(), password });
  };

  // 2. Entrar no aplicativo

  const handleSignIn = () => {
    if (!email.trim() && !password.trim()) {
      setError("Preencha os campos.");
      return;
    }

    if (!email.trim()) {
      setError("Digite o seu email.");
      return;
    }

    if (!password.trim()) {
      setError("Digite a sua senha.");
      return;
    }

    if (password.length <= 5) {
      setError("A senha deve conter, pelo menos, 6 caracteres.");
      return;
    }

    setError("");

    setError("");

    /* - O redirecionamento para /dieta é feito no onSuccess do useSignIn, exceto quando o email de confirmação é enviado - */

    signIn({ email: email.trim(), password });
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-[calc(100vh-7rem)] max-w-full">
      <div className="flex flex-col shrink-0 md:min-w-sm bg-linear-to-br from-[#07BA61] via-[#0ABC6C] to-[#0EBA7B] shadow-lg shadow-black/60 rounded-xl p-6">
        {/* - Título - */}

        <div className="flex flex-col items-center justify-center py-4 space-y-1">
          <h1 className="text-white text-2xl font-bold text-center text-shadow-sm text-shadow-emerald-950 tracking-tight">Criar sua Conta</h1>
          <p className="text-gray-100 text-shadow-sm text-shadow-black/40">para continuar em BetterMeal</p>
        </div>

        {/* - Formas de Cadastro - */}

        <div className="flex flex-col md:flex-row items-center justify-center md:space-x-6">
          <button
            className="flex items-center justify-center text-center text-sm font-semibold tracking-tight bg-gray-100 hover:bg-gray-300 rounded-lg shadow-md shadow-black/40 px-4 py-2 mb-3 transition cursor-pointer"
            type="button"
            onClick={() => (window.location.href = "/api/cadastro-github/github")}
          >
            <FaGithub className="h-5 w-5 mr-2.5" /> GitHub
          </button>

          <button
            className="flex items-center justify-center text-center text-sm font-semibold tracking-tight bg-gray-100 hover:bg-gray-300 rounded-lg shadow-md shadow-black/40 px-4 py-2 mb-3 transition cursor-pointer"
            type="button"
            onClick={() => (window.location.href = "/api/cadastro-gmail/gmail")}
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
          className="text-white font-semibold text-shadow-md text-shadow-black/60 tracking-tight"
          htmlFor="email"
        >
          Seu Email
        </label>

        <div className="flex items-center my-2 text-sm tracking-tight bg-white border border-emerald-950 rounded-lg px-4 py-2">
          <input
            className="text-black placeholder:text-gray-500 bg-transparent w-full outline-none focus:outline-none"
            name="email"
            id="email"
            type="email"
            placeholder="Digite seu endereço de email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <label
          className="text-white font-semibold text-shadow-md text-shadow-black/60 tracking-tight"
          htmlFor="password"
        >
          Sua Senha
        </label>

        <div className="flex items-center my-2 text-sm tracking-tight bg-white border border-emerald-950 rounded-lg px-4 py-2">
          <input
            className="text-black placeholder:text-gray-500 bg-transparent w-full outline-none focus:outline-none"
            name="password"
            id="password"
            type={isPassword ? "password" : "text"}
            placeholder="•••••••••••••••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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

        {/* - Seção de erro - */}

        <div className="flex items-center justify-center min-h-20">
          {(signInError || signUpError) && (
            <p className="flex items-center justify-center w-full py-3 text-white text-sm font-semibold text-shadow-sm text-shadow-black/40 bg-emerald-700/80 rounded-lg">
              {signInError?.message || signUpError?.message}
            </p>
          )}
        </div>

        {/* - Botão de cadastrar - */}

        <button
          className="flex items-center justify-center w-full text-white font-semibold tracking-tight bg-[#1A1A1A] hover:bg-black shadow-md shadow-black/60 rounded-lg px-4 py-2 transition cursor-pointer"
          type="button"
          disabled={isSignUpPending}
          onClick={handleSignUp}
        >
          Cadastrar
          <IoMdArrowDropright className="h-6 w-6 pt-1" />
        </button>

        {/* - Botão de entrar - */}

        <span className="mt-4 mx-auto text-white text-shadow-sm text-shadow-black/40 text-sm">
          Possui uma conta? {""}
          <button
            className="font-bold hover:underline cursor-pointer text-shadow-sm text-shadow-black/40"
            type="button"
            disabled={isSignInPending}
            onClick={handleSignIn}
          >
            Entrar
          </button>
        </span>
      </div>
    </div>
  );
};

export { Authentication };
