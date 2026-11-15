import { NewUser, SignUpApiResponseProps } from "@/features/authentication/types/signUp";
import { signUpAction as signUpMutation } from "@/actions/authentication/default-signup/signUp";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const useCreateProfile = () => {
  const router = useRouter();

  const { mutate, isPending, error } = useMutation<SignUpApiResponseProps, Error, NewUser>({
    mutationFn: async (newUser) => {
      const result = await signUpMutation(newUser);

      if (!result.success) {
        throw new Error(result.message);
      }

      return result;
    },

    onSuccess: () => {
      router.push("/assinaturas");
    },
  });

  return { mutate, isPending, error };
};

export { useCreateProfile };
