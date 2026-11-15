import { MealPlanInputProps } from "@/features/users/meals/types/mealPlan";

const generateMealPlan = async (payload: MealPlanInputProps) => {
  const response = await fetch("/api/dieta/gerar-dieta", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  return response.json();
};

export { generateMealPlan as generateMealPlanAction };
