import { getCurrentUser } from "@/actions/authentication/default-signup/getCurrentUser";
import { errorMessages } from "@/lib/server/helpers/errorMessages";
import { errorResponse } from "@/lib/server/helpers/errorResponse";
import { prisma } from "@/lib/server/services/prisma";
import { NextResponse } from "next/server";

const GET = async () => {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return errorResponse("noUser", 404, errorMessages.noUser);
    }

    const userProfile = await prisma.profile.findUnique({
      where: { userId: user.id },
      select: { activePlan: true },
    });

    if (!userProfile) {
      return errorResponse("noProfile", 404, errorMessages.noProfile);
    }

    return NextResponse.json({ subscription: userProfile });
  } catch {
    return errorResponse("unexpectedError", 500, errorMessages.unexpectedError);
  }
};

export { GET };
