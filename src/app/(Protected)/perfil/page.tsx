import { getCurrentUser } from "@/actions/authentication/default-signup/getCurrentUser";
import { Profile } from "@/features/users/profile/pages/Profile";
import { redirect } from "next/navigation";

const profilePage = async () => {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/cadastro");
  }

  return (
    <div>
      <Profile
        userAvatar={user.profile?.userAvatar ?? null}
        userEmail={user.email}
        activePlan={user.profile?.activePlan ?? "nenhum"}
      />
    </div>
  );
};

export default profilePage;
