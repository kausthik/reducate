import { auth } from "@/src/lib/auth";

export async function getSessionUserId() {
  const session = await auth();

  if (!session?.user?.id) {
    return null;
  }

  return session.user.id;
}