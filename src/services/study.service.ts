import studyRepository from "@/src/repositories/study.repository";
import { CreateStudyInput } from "@/src/zod/study.schema";
import { getNextRevisionDate } from "../lib/revision.utils";
import revisionService from "./revision.service";

class StudyService {

  async createStudy(
  data: CreateStudyInput,
  userId: string
) {
  const normalizedTitle = data.title.trim().toLowerCase();

  const existingStudy =
    await studyRepository.findByNormalizedTitle(
      userId,
      data.subject,
      normalizedTitle
    );

  if (existingStudy) {
    throw new Error("Topic already exists.");
  }

  const study = await studyRepository.create({
    userId,
    normalizedTitle,
    ...data,
  });

  await revisionService.createRevision({
    userId,
    studyId: study._id.toString(),
    revisionNumber: 1,
    scheduledFor: getNextRevisionDate(
      data.difficulty,
      1
    ),
  });

  return study;
}

  async getAllTodayStudies(userId: string) {
    return studyRepository.findAllOfToday(userId);
  }

  async getStudyById(id: string) {
    return studyRepository.findById(id);
  }

  async deleteStudy(id: string) {
  await revisionService.deleteByStudyId(id);

  return studyRepository.delete(id);
}
}

export default new StudyService();