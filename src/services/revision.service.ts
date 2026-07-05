import revisionRepository from "@/src/repositories/revision.repository";
import { RevisionRepositoryType } from "../types/revision";

class RevisionService {
  createRevision(data: RevisionRepositoryType) {
    return revisionRepository.create(data);
  }

  getTodayRevisions(userId: string) {
    return revisionRepository.findToday(userId);
  }

  getRevisionById(id: string) {
    return revisionRepository.findById(id);
  }

  updateRevision(
    id: string,
    data: Partial<RevisionRepositoryType>
  ) {
    return revisionRepository.update(id, data);
  }

  deleteRevision(id: string) {
    return revisionRepository.delete(id);
  }
}

export default new RevisionService();