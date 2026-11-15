import { DailyMealPlanProps, WeekDayProps } from "@/features/users/meals/types/mealPlan";

const dayNamesMask: Record<WeekDayProps, string> = {
  Monday: "Segunda-feira",
  Tuesday: "Terça-feira",
  Wednesday: "Quarta-feira",
  Thursday: "Quinta-feira",
  Friday: "Sexta-feira",
  Saturday: "Sábado",
  Sunday: "Domingo",
};

const mealNamesMask: Record<keyof DailyMealPlanProps, string> = {
  Breakfast: "Café da manhã",
  Lunch: "Almoço",
  Dinner: "Jantar",
  Snacks: "Lanches",
};

export { dayNamesMask, mealNamesMask };
