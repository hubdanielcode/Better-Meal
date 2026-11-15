import { CredentialsPprops } from "../types/credentials";
import { SignInApiResponseProps } from "../types/signIn";
import { signInAction as signInMutation } from "../../../actions/authentication/default-signup/signIn";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const useSignIn = () => {
  const router = useRouter();

  const { mutate, isPending, error, data } = useMutation<SignInApiResponseProps, Error, CredentialsPprops>({
    mutationFn: async (credentials) => {
      const result = await signInMutation(credentials);

      if (!result.success) {
        throw new Error(result.message);
      }

      return result;
    },

    onSuccess: (data) => {
      if (!data.confirmationEmailSent) {
        router.push("/dieta");
        router.refresh();
      }
    },
  });

  return { mutate, isPending, error, data };
};

export { useSignIn };
