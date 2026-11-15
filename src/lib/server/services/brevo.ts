import "server-only";
import { errorResponse } from "../helpers/errorResponse";
import { errorMessages } from "../helpers/errorMessages";

interface ConfirmationEmailProps {
  toEmail: string;
  confirmationLink: string;
}

const sendConfirmationEmail = async ({ toEmail, confirmationLink }: ConfirmationEmailProps) => {
  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      accept: "application/json",
      "api-key": process.env.BREVO_API_KEY!,
      "content-type": "application/json",
    },

    body: JSON.stringify({
      sender: { name: "BetterMeal", email: process.env.BREVO_SENDER_EMAIL! },
      to: [{ email: toEmail }],
      subject: "Confirme o seu email no BetterMeal",
      htmlContent: `<p>Recebemos um pedido para definir uma senha na sua conta do BetterMeal.</p><p><a href="${confirmationLink}">Clique aqui para confirmar</a>. O link expira em 30 minutos.</p><p>Se não foi você, ignore este email.</p>`,
    }),
  });

  if (!response.ok) {
    return errorResponse("confirmationError", 400, errorMessages.confirmationError);
  }
};

export { sendConfirmationEmail };
