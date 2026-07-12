import importantDateRepository from "@/src/repositories/important-date.repository";

import { CreateImportantDateInput } from "@/src/zod/important-date.schema";

class ImportantDateService {
  async createImportantDate(
    data: CreateImportantDateInput,
    userId: string
  ) {
    return importantDateRepository.create({
      userId,
      ...data,
    });
  }

  getImportantDateById(id: string) {
    return importantDateRepository.findById(id);
  }

  getUpcomingImportantDates(userId: string) {
    return importantDateRepository.findUpcoming(userId);
  }

  getPastImportantDates(userId: string) {
    return importantDateRepository.findPast(userId);
  }

  updateImportantDate(
    id: string,
    data: Partial<CreateImportantDateInput>
  ) {
    return importantDateRepository.update(id, data);
  }

  deleteImportantDate(id: string) {
    return importantDateRepository.delete(id);
  }
}

export default new ImportantDateService();