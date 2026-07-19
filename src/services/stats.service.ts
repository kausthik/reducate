import { statsRepository } from "@/src/repositories/stats.repository";

class StatsService {
  async getDashboardStats(userId: string) {
    return statsRepository.getDashboardStats(userId);
  }
}

export const statsService = new StatsService();