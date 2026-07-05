export interface RevisionRepositoryType {
  userId: string;
  studyId: string;
  revisionNumber: number;
  scheduledFor: Date;
  status?: "PENDING" | "COMPLETED" | "OVERDUE";
  completedAt?: Date;
}