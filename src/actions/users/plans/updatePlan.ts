import { ActivePlan } from "@/prisma/generated/prisma/enums";

const updatePlan = async (newPlan: ActivePlan) => {
  await fetch("/api/alterar-plano", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newPlan),
  });
};

export { updatePlan };
