import revisionRepository from "@/src/repositories/revision.repository";
import { RevisionRepositoryType } from "../types/revision";
import studyRepository from "../repositories/study.repository";
import { getNextRevisionDate } from "../lib/revision.utils";

class RevisionService {
  async createRevision(data: RevisionRepositoryType) {
    return revisionRepository.create(data);
  }

async completeRevision(id: string) {
  const revision = await revisionRepository.findById(id);

  if (!revision) {
    throw new Error("Revision not found.");
  }

  await revisionRepository.complete(id);

  const study = await studyRepository.findById(
    revision.studyId.toString()
  );

  if (!study) {
    throw new Error("Study not found.");
  }

  const nextRevisionNumber =
    revision.revisionNumber + 1;

  await revisionRepository.create({
    userId: revision.userId.toString(),
    studyId: revision.studyId.toString(),
    revisionNumber: nextRevisionNumber,
    scheduledFor: getNextRevisionDate(
      study.difficulty,
      nextRevisionNumber
    ),
  });

  return revision;
}

  async getTodayRevisions(userId: string) {
    return revisionRepository.findTodayRevisions(userId);
  }

  async getRevisionById(id: string) {
    return revisionRepository.findById(id);
  }

  async deleteByStudyId(studyId: string) {
  return revisionRepository.deleteByStudyId(studyId);
}

  async updateRevision(
    id: string,
    data: Partial<RevisionRepositoryType>
  ) {
    return revisionRepository.update(id, data);
  }

  async deleteRevision(id: string) {
    return revisionRepository.delete(id);
  }
}

export default new RevisionService();