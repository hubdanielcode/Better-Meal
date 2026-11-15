import { ActivePlan } from "@/prisma/generated/prisma/enums";
import { priceIdMap } from "../constants/priceIdMap";

type onlyPaidPlanTypes = Exclude<ActivePlan, "nenhum">;

const getPriceIdFromType = (planType: onlyPaidPlanTypes) => priceIdMap[planType];

export { getPriceIdFromType };
