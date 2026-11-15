"use client";

import { MealGenerator } from "@/features/users/meals/components/MealGenerator";
import { PreferencesForm } from "@/features/users/meals/components/PreferencesForm";
import { useGenerateMealPlan } from "@/features/users/meals/hooks/useGenerateMealPlan";

const MealsPage = () => {
  const { mutate, isPending, data, isSuccess } = useGenerateMealPlan();

  return (
    <div className="flex flex-col md:flex-row flex-1 border border-emerald-950 rounded-xl shadow-md shadow-black/60 mx-auto">
      <PreferencesForm
        mutate={mutate}
        isPending={isPending}
        isSuccess={isSuccess}
      />
      <MealGenerator
        data={data}
        isPending={isPending}
        isSuccess={isSuccess}
      />
    </div>
  );
};

export default MealsPage;
