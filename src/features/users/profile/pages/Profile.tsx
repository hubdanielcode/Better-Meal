"use client";

import Image from "next/image";
import { planTypes } from "../../subscription/utils/constants/planTypes";
import { useState } from "react";

const Profile = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedPlan, setSelectedPlan] = useState<string>("");

  return (
    <div className="flex items-center justify-center max-w-full min-h-[calc(100vh-7rem)] p-8">
      <div className="flex flex-col md:flex-row flex-1 h-auto md:h-85 bg-[#1A1A1A] border border-emerald-950 rounded-xl shadow-md shadow-black/60">
        {/* - Informações do usuário - */}

        <div className="flex flex-col items-center w-full md:w-1/4 my-10 mx-4">
          <Image
            className="aspect-square rounded-full"
            src="/provisorio/spooky-sison.png"
            alt="Foto do usuário"
            height={120}
            width={120}
          />

          <div className="flex flex-col items-center text-emerald-600 tracking-tight">
            <h1 className="text-2xl text-shadow-sm text-shadow-white/60 font-bold py-2">Daniel Lorenzo</h1>

            <p className="text-lg font-semibold text-shadow-sm text-shadow-white/60">danlorenzo.of@gmail.com</p>
          </div>
        </div>

        {/* - Detalhes da inscrição - */}

        <div className="flex flex-col items-start justify-start w-full md:w-2/4 bg-[#CCCCCC] px-4">
          <h1 className="text-3xl font-bold text-emerald-600 text-shadow-md text-shadow-black/60 tracking-tight my-6">Detalhes da Inscrição</h1>

          <div className="flex flex-col w-full bg-white border border-emerald-950 rounded-xl shadow-md shadow-black/60 p-6">
            <span className="text-emerald-600 font-semibold text-xl text-shadow-sm text-shadow-black/60">Plano Atual</span>

            <span className="text-gray-600 font-semibold text-lg text-shadow-sm text-shadow-black/40 mt-6 px-8">
              {selectedPlan ?? "Plano não encontrado"}
            </span>
          </div>
        </div>

        {/* - Alterar meu plano - */}

        <div className="flex flex-col shrink-0 bg-white border-l border-emerald-950 rounded-r-xl px-4">
          <h2 className="text-2xl font-bold text-emerald-600 text-shadow-md text-shadow-black/60 tracking-tight my-6">Alterar Meu Plano</h2>

          <div className="relative w-full">
            <div
              className="flex w-full font-semibold px-4 py-2 bg-gray-200 hover:bg-black/20 border border-emerald-950 rounded-xl shadow-md shadow-black/60 cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span>Selecione um novo plano</span>

              <span className="ml-auto"> &gt; </span>
            </div>

            {isOpen ? (
              <div className="absolute left-0 right-0 top-full z-20 mt-1 flex flex-col items-start justify-start font-semibold bg-[#1A1A1A] rounded-xl border border-emerald-950 cursor-pointer">
                {/* - Dropdown  - */}

                <ul className="flex flex-col w-full text-white rounded-xl overflow-hidden">
                  {planTypes.map((plan) => (
                    <li
                      className={`hover:text-black hover:bg-linear-to-br hover:from-[#07BA61] hover:via-[#0ABC6C] hover:to-[#0EBA7B] px-4 py-2 ${
                        selectedPlan === plan.interval ? "text-black bg-linear-to-br from-[#07BA61] via-[#0ABC6C] to-[#0EBA7B]" : ""
                      }`}
                      key={plan.interval}
                      onClick={() => {
                        setSelectedPlan(plan.interval);
                        setIsOpen(false);
                      }}
                    >
                      {plan.name} - R$ {plan.price}/{plan.interval}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              ""
            )}
          </div>

          {/* - Botões - */}

          <div className="flex items-center gap-4 mt-auto mb-10">
            <button
              className="whitespace-nowrap text-white text-shadow-sm text-shadow-black/60 font-semibold bg-linear-to-br from-[#07BA61] via-[#0ABC6C] to-[#0EBA7B] hover:from-[#059650] hover:via-[#078F52] hover:to-[#0A9462] shadow-md shadow-black/60 px-4 py-2 rounded-lg transition cursor-pointer"
              type="button"
            >
              Salvar Alterações
            </button>

            <button
              className="whitespace-nowrap text-white text-shadow-sm text-shadow-black/60 font-semibold bg-linear-to-br from-[#E11D48] via-[#E8294F] to-[#EF3A5C] hover:from-[#BE123C] hover:via-[#C41A40] hover:to-[#CC2347] shadow-md shadow-black/60 px-4 py-2 rounded-lg transition cursor-pointer"
              type="button"
            >
              Cancelar Assinatura
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Profile };
