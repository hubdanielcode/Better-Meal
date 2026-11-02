import { planTypeProps } from "../types/plans";

const PlanCard = ({ name, interval, isPopular, description, price, features }: planTypeProps) => {
  return (
    <div className="flex flex-col flex-1 items-start p-6 space-y-4 text-white bg-[#1A1A1A] border border-gray-600 rounded-xl transition hover:scale-[1.05] shadow-md shadow-black/60">
      <h1 className="text-2xl font-semibold tracking-tight text-shadow-xs text-shadow-emerald-400/60">{name}</h1>

      <div className="text-emerald-600 font-bold text-shadow-sm text-shadow-white/60 tracking-tight">
        <span className="text-5xl">R$ {price}</span> / {interval}
      </div>

      <span className="text-white tracking-tight text-shadow-xs text-shadow-emerald-400/40">{description}</span>

      <div className="flex flex-col flex-1 justify-between w-full gap-6">
        <ul className="mt-6 space-y-4">
          {features.map((feature) => (
            <li
              className="flex text-sm"
              key={feature}
            >
              <svg
                className="shrink-0 w-6 h-6 text-emerald-600"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>

              <span className="text-shadow-sm text-shadow-emerald-400/20 ml-3">{feature}</span>
            </li>
          ))}
        </ul>

        <button
          className={`block text-black tracking-tight font-semibold px-4 py-2 rounded-lg transition cursor-pointer hover:scale-[1.025] ${interval === "mês" ? "bg-linear-to-r from-[#07BA61] via-[#0ABC6C] to-[#0EBA7B] hover:from-[#059650] hover:via-[#078F52] hover:to-[#0A9462]" : "bg-linear-to-r from-emerald-300 via-green-300 to-emerald-200 hover:from-emerald-400 hover:via-green-400 hover:to-emerald-300"}`}
          type="button"
        >
          {`Inscrever-se no ${name}`}
        </button>
      </div>
    </div>
  );
};

export { PlanCard };
