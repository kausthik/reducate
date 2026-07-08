import { auth } from "@/src/lib/auth";
import { connectDB } from "@/src/lib/mongodb";
import studyService from "@/src/services/study.service";

export async function getTodayStudies() {
  await connectDB();

  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  return studyService.getAllTodayStudies(
    session.user.id
  );
}