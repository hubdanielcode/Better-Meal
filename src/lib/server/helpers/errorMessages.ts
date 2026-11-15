type ErrorCode = keyof typeof errorMessages;

const errorMessages = {
  alreadySubscribed: "Você já possui um plano ativo.",
  confirmationError: "Falha ao enviar o email de confirmação.",
  existingEmail: "Email já cadastrado.",
  invalidCredentials: "Email ou senha incorretos.",
  invalidData: "Erro ao validar os dados.",
  mealDataError: "Falha ao processar o plano alimentar. Por favor, tente novamente.",
  missingStripeSubscription: "Assinatura do stripe não encontrada",
  newPlanError: "Escolha um novo plano para continuar.",
  noProfile: "Perfil não encontrado.",
  noUser: "Usuário não encontrado.",
  notLoggedIn: "Entre na sua conta para assinar ou alterar um plano.",
  unexpectedError: "Ops! Parece que algo deu errado.",
} as const;

export { type ErrorCode, errorMessages };
