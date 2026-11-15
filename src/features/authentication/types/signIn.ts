export type SignInFailureCodeProps = "invalidData" | "invalidCredentials" | "unexpectedError";

export type SignInResultProps =
  | { success: false; code: SignInFailureCodeProps; message: string }
  | { success: true; confirmationEmailSent: true; message: string }
  | { success: true; id: string; email: string; message: string };

export interface SignInApiResponseProps {
  message: string;
  error?: string;
  id?: string;
  email?: string;
  confirmationEmailSent?: boolean;
}
