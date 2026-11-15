import { useMutation } from "@tanstack/react-query";
import { MealPlanInputProps, MealPlanResponseProps } from "../types/mealPlan";
import { generateMealPlanAction as generateMealPlanMutation } from "@/actions/users/meals/generateMealPlan";

const useGenerateMealPlan = () => {
  const { mutate, isPending, data, isSuccess } = useMutation<MealPlanResponseProps, Error, MealPlanInputProps>({
    mutationFn: generateMealPlanMutation,
  });

  return { mutate, isPending, data, isSuccess };
};

export { useGenerateMealPlan };
