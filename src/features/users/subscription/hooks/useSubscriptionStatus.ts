import { fetchSubscriptionStatus } from "@/actions/users/subscriptions/fetchSubscriptionStatus";
import { useQuery } from "@tanstack/react-query";
import { SubscriptionStatusResponseProps } from "../types/plans";

const useSubscriptionStatus = () => {
  const { data, isLoading, error, isError } = useQuery<SubscriptionStatusResponseProps, Error>({
    queryFn: fetchSubscriptionStatus,
    queryKey: ["subscription"],
    staleTime: 5 * 60 * 1000,
  });

  return { data, isLoading, error, isError };
};

export { useSubscriptionStatus };
