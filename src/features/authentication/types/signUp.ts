export interface NewUser {
  email: string;
  password: string;
}

export interface SignUpApiResponseProps {
  message: string;
  error?: string;
}
