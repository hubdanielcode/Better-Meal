"use client";

import { planTypes } from "../../subscription/utils/constants/planTypes";
import { ProfileProps } from "../types/profile";
import { Spinner } from "@/shared/components/Spinner";
import { useState } from "react";
import { useSubscriptionStatus } from "../../subscription/hooks/useSubscriptionStatus";
import Image from "next/image";

const Profile = ({ userEmail, userAvatar }: ProfileProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedInterval, setSelectedInterval] = useState<string | undefined>(undefined);
  const { data, isLoading, error, isError } = useSubscriptionStatus();

  if (!data) {
    return false;
  }

  const currentPlan = planTypes.find((plan) => plan.interval === data.subscription.activePlan);

  const currentInterval = selectedInterval ?? data.subscription.activePlan;
  const selectedPlan = planTypes.find((plan) => plan.interval === currentInterval);

  return (
    <div className="flex items-center justify-center max-w-full min-h-[calc(100vh-7rem)] p-8">
      <div className="flex flex-col md:flex-row flex-1 h-auto md:h-85 bg-[#1A1A1A] border border-emerald-950 rounded-xl shadow-md shadow-black/60">
        {/* - Informações do usuário - */}

        <div className="flex flex-col items-center w-full md:w-1/4 my-10 mx-4">
          {userAvatar ? (
            <Image
              className="aspect-square rounded-full"
              src={userAvatar}
              alt="Foto do usuário"
              height={120}
              width={120}
            />
          ) : (
            <div className="aspect-square h-30 w-30 rounded-full bg-gray-400" />
          )}

          <div className="flex flex-col items-center text-gray-300 tracking-tight">
            <h1 className="text-xl font-bold text-shadow-sm text-shadow-emerald-700/60 py-2">Daniel Lorenzo</h1>

            <p className="text-lg font-semibold text-shadow-sm text-shadow-emerald-700/60">{userEmail}</p>
          </div>
        </div>

        {/* - Detalhes da inscrição - */}

        <div className="flex flex-col items-start justify-start w-full md:w-2/4 bg-[#CCCCCC] px-4 tracking-tight">
          <h1 className="text-3xl font-bold text-emerald-600 text-shadow-sm text-shadow-black/60 my-6">Detalhes da Inscrição</h1>

          {isLoading ? (
            <div>
              <Spinner /> <p>Carregando detalhes da inscrição...</p>
            </div>
          ) : isError ? (
            <span>{error?.message}</span>
          ) : data.subscription.activePlan ? (
            <div className="flex flex-col w-full bg-white border border-emerald-950 rounded-xl shadow-md shadow-black/60 p-6">
              <span className="text-emerald-600 font-semibold text-xl text-shadow-sm text-shadow-black/60 mb-4">Plano Atual</span>

              <div className="flex center-center px-8 pb-2">
                <span className="font-semibold text-lg text-shadow-xs text-shadow-black/60 text-black">Nome: </span>
                <p className="font-semibold text-lg text-gray-600 mt-0.5 ml-1">{currentPlan?.name}</p>
              </div>

              <div className="flex center-center px-8 pb-2">
                <span className="font-semibold text-lg text-shadow-xs text-shadow-black/60 text-black">Preço: </span>
                <p className="font-semibold text-lg text-gray-600 mt-0.5 ml-1"> R$ {currentPlan?.price}</p>
              </div>

              <div className="flex center-center px-8 pb-2">
                <span className="font-semibold text-lg text-shadow-xs text-shadow-black/60 text-black">Status: </span>
                <p className="font-semibold text-lg text-gray-600 mt-0.5 ml-1">{currentPlan?.status}</p>
              </div>
            </div>
          ) : (
            <p className="text-lg font-semibold text-gray-600 text-shadow-sm text-shadow-black/40 px-10 py-2">Plano não encontrado.</p>
          )}
        </div>

        {/* - Alterar meu plano - */}

        <div className="flex flex-col shrink-0 bg-white border-l border-emerald-950 rounded-r-xl px-4">
          <h2 className="text-2xl font-bold text-emerald-600 text-shadow-sm text-shadow-black/60 tracking-tight my-6">Alterar Meu Plano</h2>

          <div className="relative w-full">
            <div
              className="flex w-full font-semibold px-4 py-2 bg-gray-200 hover:bg-black/20 border border-emerald-950 rounded-xl shadow-md shadow-black/60 cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span>{selectedPlan ? `${selectedPlan.name} - R$ ${selectedPlan.price}/${selectedPlan.interval}` : "Selecione um novo plano"}</span>

              <span className="ml-auto"> &gt; </span>
            </div>

            {isOpen ? (
              <div className="absolute left-0 right-0 top-full z-20 mt-1 flex flex-col items-start justify-start font-semibold bg-[#1A1A1A] rounded-xl border border-emerald-950 cursor-pointer">
                {/* - Dropdown  - */}

                <ul className="flex flex-col w-full text-white rounded-xl overflow-hidden">
                  {planTypes.map((plan) => (
                    <li
                      className={`hover:text-black hover:bg-linear-to-br hover:from-[#07BA61] hover:via-[#0ABC6C] hover:to-[#0EBA7B] px-4 py-2 ${
                        currentInterval === plan.interval ? "text-black bg-linear-to-br from-[#07BA61] via-[#0ABC6C] to-[#0EBA7B]" : ""
                      }`}
                      key={plan.interval}
                      onClick={() => {
                        setSelectedInterval(plan.interval);
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
