import { ActivePlan } from "@/prisma/generated/prisma/enums";

export interface planTypeProps {
  name: string;
  interval: ActivePlan;
  isPopular: boolean;
  description: string;
  price: number;
  status: "Ativo" | "Inativo";
  features: string[];
}

export interface SubscriptionStatusResponseProps {
  subscription: {
    activePlan: ActivePlan;
  };

  isError?: string;
}
