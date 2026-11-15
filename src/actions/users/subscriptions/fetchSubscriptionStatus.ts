const fetchSubscriptionStatus = async () => {
  const response = await fetch("/api/assinaturas/status-da-assinatura");

  if (!response.ok) {
    throw new Error("Ops... Parece que algo deu errado!");
  }

  return response.json();
};

export { fetchSubscriptionStatus };
