const priceIdMap: Record<string, string> = {
  semana: process.env.STRIPE_PRICE_WEEKLY!,
  mês: process.env.STRIPE_PRICE_MONTHLY!,
  ano: process.env.STRIPE_PRICE_YEARLY!,
};

export { priceIdMap };
