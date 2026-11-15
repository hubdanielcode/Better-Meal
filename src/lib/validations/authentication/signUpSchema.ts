import z from "zod";

const signUpSchema = z.object({
  // 1. Email

  email: z.email(),

  // 2. Senha

  password: z.string().min(6, "Sua senha deve conter um mínimo de 6 caracteres").max(30, "Sua senha não deve exceder um limite de 30 caracteres"),
});

export { signUpSchema };
