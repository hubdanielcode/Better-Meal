import { Spinner } from "@/shared/components/Spinner";
import { DailyMealPlanProps, MealGeneratorProps, WeekDayProps } from "../types/mealPlan";
import { dayNamesMask } from "@/shared/utils/masks";

const dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] as const satisfies readonly WeekDayProps[];

const MealGenerator = ({ data, isPending, isSuccess }: MealGeneratorProps) => {
  const getMealPlanForSpecificDay = (day: WeekDayProps): DailyMealPlanProps | undefined => {
    if (!data?.mealPlan) {
      return undefined;
    }

    return data.mealPlan[day];
  };

  return (
    <div className="w-full md:w-2/3 lg:w-3/4 h-150 md:h-auto flex flex-col bg-[#1A1A1A] rounded-r-lg p-6">
      <h1 className="text-2xl font-bold text-transparent tracking-tight text-shadow-xs text-shadow-white/40 bg-clip-text bg-linear-to-br from-[#07BA61] via-[#0ABC6C] to-[#0EBA7B] mb-6">
        Plano Alimentar
      </h1>

      {data?.mealPlan && isSuccess ? (
        <div className="relative flex-1 min-h-0">
          <div className="absolute inset-0 overflow-y-auto">
            <div className="space-y-6">
              {dayNames.map((day) => {
                const mealPlan = getMealPlanForSpecificDay(day);

                if (!mealPlan) {
                  return null;
                }

                return (
                  <div
                    className="bg-white shadow-md p-4 border border-emerald-300 mr-6 mt-2"
                    key={day}
                  >
                    <h2 className="text-xl font-bold tracking-tight text-emerald-600 text-shadow-sm text-shadow-black/40 mb-3">
                      {dayNamesMask[day]}
                    </h2>

                    <div className="space-y-4 tracking-tight">
                      <div className="font-semibold leading-snug text-gray-900">
                        <strong className="font-bold text-emerald-700">Café da manhã: </strong>
                        {mealPlan.Breakfast.Meal}
                        <p className="text-sm font-normal leading-relaxed text-gray-600 pt-1.5">{mealPlan.Breakfast.Instructions}</p>
                      </div>

                      <div className="font-semibold leading-snug text-gray-900">
                        <strong className="font-bold text-emerald-700">Almoço: </strong>
                        {mealPlan.Lunch.Meal}
                        <p className="text-sm font-normal leading-relaxed text-gray-600 pt-1.5">{mealPlan.Lunch.Instructions}</p>
                      </div>

                      <div className="font-semibold leading-snug text-gray-900">
                        <strong className="font-bold text-emerald-700">Jantar: </strong>
                        {mealPlan.Dinner.Meal}
                        <p className="text-sm font-normal leading-relaxed text-gray-600 pt-1.5">{mealPlan.Dinner.Instructions}</p>
                      </div>

                      {mealPlan.Snacks && (
                        <div className="font-semibold leading-snug text-gray-900">
                          <strong className="font-bold text-emerald-700">Lanche: </strong>
                          {mealPlan.Snacks.Meal}
                          <p className="text-sm font-normal leading-relaxed text-gray-600 pt-1.5">{mealPlan.Snacks.Instructions}</p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : isPending ? (
        <div className="flex items-center space-x-2">
          <Spinner />
          <p className="text-white font-semibold tracking-tight text-shadow-xs text-shadow-emerald-400/60">Por favor, aguarde...</p>
        </div>
      ) : (
        <p className="text-white font-semibold tracking-tight text-shadow-xs text-shadow-emerald-400/60">
          Gere um plano de alimentação para vê-lo aqui.
        </p>
      )}
    </div>
  );
};

export { MealGenerator };
