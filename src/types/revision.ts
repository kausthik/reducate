export interface RevisionRepositoryType {
  userId: string;
  studyId: string;
  revisionNumber: number;
  scheduledFor: Date;
  status?: "PENDING" | "COMPLETED" | "OVERDUE";
  completedAt?: Date;
}

export enum WantRevisionType {
  YES = "YES",
  NO = "NO"
}
