import { MealGenerator } from "@/features/users/meals/components/MealGenerator";
import { PreferencesForm } from "@/features/users/meals/components/PreferencesForm";

const MealsPage = () => {
  return (
    <div className="flex flex-col md:flex-row flex-1 border border-emerald-950 rounded-xl shadow-md shadow-black/60 mx-auto">
      <PreferencesForm />
      <MealGenerator />
    </div>
  );
};

export default MealsPage;
