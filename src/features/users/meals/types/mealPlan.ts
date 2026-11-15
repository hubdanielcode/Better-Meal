export type WeekDayProps = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";

export type MealProps = {
  Meal: string;
  Instructions: string;
};

export interface DailyMealPlanProps {
  Breakfast: MealProps;
  Lunch: MealProps;
  Dinner: MealProps;
  Snacks?: MealProps;
}

export type WeeklyMealPlanProps = Partial<Record<WeekDayProps, DailyMealPlanProps>>;

export interface MealPlanInputProps {
  dietType: string;
  calories: number;
  allergies: string;
  cuisine: string;
  snacks: string;
  days?: number;
}

export interface MealPlanResponseProps {
  mealPlan?: WeeklyMealPlanProps;
  error?: string;
}

export interface PreferencesFormProps {
  mutate: (payload: MealPlanInputProps) => void;
  isPending: boolean;
  isSuccess: boolean;
}

export interface MealGeneratorProps {
  data: MealPlanResponseProps | undefined;
  isPending: boolean;
  isSuccess: boolean;
}
