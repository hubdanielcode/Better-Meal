import { PlanCard } from "@/features/users/subscription/components/PlanCard";
import { planTypes } from "@/features/users/subscription/utils/constants/planTypes";

const Subscription = () => {
  return (
    <div className="flex flex-col items-center justify-start min-h-[calc(100vh-7rem)] max-w-full">
      <h1 className="text-4xl font-bold text-gray-900 text-shadow-sm text-shadow-white tracking-tight">Preço</h1>

      <p className="text-lg text-gray-600 text-shadow-sm text-shadow-white tracking-tight mt-2 mb-4">
        Comece com nosso plano semanal ou mude para o plano mensal ou anual quando estiver pronto.
      </p>

      <div className="flex flex-col md:flex-row max-w-7xl md:space-x-8 p-6">
        {planTypes.map((plan, key) => (
          <PlanCard
            key={key}
            name={plan.name}
            interval={plan.interval}
            isPopular={plan.isPopular}
            description={plan.description}
            price={plan.price}
            features={plan.features}
          />
        ))}
      </div>
    </div>
  );
};

export { Subscription };
