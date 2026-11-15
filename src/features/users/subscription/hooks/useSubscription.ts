import { ActivePlan } from "@/prisma/generated/prisma/enums";
import { subscribeToPlanAction as subscribeToPlanMutation } from "@/actions/users/subscriptions/subscribeToPlan";
import { SubscriptionSuccessResponseProps } from "../types/subscription";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useSubscription = () => {
  const { mutate, isPending, isError } = useMutation<SubscriptionSuccessResponseProps, Error, ActivePlan>({
    mutationFn: async (planType: ActivePlan) => {
      const result = await subscribeToPlanMutation(planType);

      if (!result.success || !result.url) {
        throw new Error(result.message);
      }
      return result;
    },

    onMutate: () => {
      toast.loading("Processando sua assinatura...");
    },

    onSuccess: (data) => {
      window.location.href = data.url;
    },

    onError: () => {
      toast.error("Ops! Parece que algo deu errado.");
    },
  });

  return { mutate, isPending, isError };
};

export { useSubscription };
