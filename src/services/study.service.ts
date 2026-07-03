import studyRepository from "@/src/repositories/study.repository";
import { CreateStudyInput } from "@/src/zod/study.schema"

class StudyService {
 async createStudy(data: CreateStudyInput, userId: string) {
     return studyRepository.create(data, userId);
 }

  async getAllStudies(userId: string) {
      return studyRepository.findByUser(userId);
  }

  async getStudyById(id: string) {
       return studyRepository.findById(id);
  }

  async updateStudy(id : string, data: CreateStudyInput) {
       return studyRepository.update(id, data);
  }

  async deleteStudy(id : string) {
     return studyRepository.delete(id);
  }
}

export default new StudyService();