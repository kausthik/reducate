import { auth } from "@/src/lib/auth";
import { connectDB } from "@/src/lib/mongodb";
import revisionService from "@/src/services/revision.service";

export async function getTodayRevisions() {
  await connectDB();

  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  return revisionService.getTodayRevisions(
    session.user.id
  );
}