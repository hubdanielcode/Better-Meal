import { getCurrentUser } from "@/actions/authentication/default-signup/getCurrentUser";
import { redirect } from "next/navigation";

const protectedLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getCurrentUser();

  /* - Sem usuário logado, volta para a home - */

  if (!user) {
    redirect("/");
  }

  return <>{children}</>;
};

export default protectedLayout;
