import { planTypeProps } from "../../types/plans";

const planTypes: planTypeProps[] = [
  {
    name: "Plano Semanal",
    interval: "semana",
    isPopular: false,
    description: "Ideal para experimentar o planejamento alientar com IA e organizar suas refeições para os próximos dias.",
    price: 9.99,
    features: [
      "Planos alimentares personalizados por IA",
      "Planejamento de refeições para a semana",
      "Orientações nutricionais via IA",
      "Acesso a todas as funcionalidades durante 7 dias",
      "Cancele quando quiser",
    ],
  },

  {
    name: "Plano Mensal",
    interval: "mês",
    isPopular: true,
    description: "Perfeito para manter a sua alimentação organizada durante todo o mês com praticidade e flexibilidade para adaptar a sua rotina.",
    price: 39.99,
    features: [
      "Tudo do plano semanal",
      "Planejamento alimentar para o mês inteiro",
      "Geração ilimitada de planos com IA",
      "Personalização de refeições conforme as suas preferências",
      "Reorganização de refeições ao longo do mês",
    ],
  },

  {
    name: "Plano Anual",
    interval: "ano",
    isPopular: false,
    description: "Para quem busca praticidade a longo prazo, com ferramentas inteligentes para planejar a alimentação durante todo o ano.",
    price: 289.99,
    features: [
      "Tudo do plano mensal",
      "Acesso durante 12 meses",
      "Geração ilimitada de planos com IA durante a assinatura",
      "Mais economia em comparação com o plano mensal",
      "Menos renovações para administrar",
    ],
  },
];

export { planTypes };
