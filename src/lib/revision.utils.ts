import { Difficulty } from "@/src/types/study";


const REVISION_SCHEDULE = {
  [Difficulty.EASY]: [1, 3, 7, 14, 30, 60, 90],
  [Difficulty.MEDIUM]: [1, 3, 7, 14, 30, 60, 60],
  [Difficulty.HARD]: [1, 3, 7, 14, 30, 45, 60, 30],
} as const;

export function getRevisionGap(
  difficulty: Difficulty,
  revisionNumber: number
) {
  const schedule = REVISION_SCHEDULE[difficulty];

  return (
    schedule[revisionNumber - 1] ??
    schedule[schedule.length - 1]
  );
}

export function getNextRevisionDate(
  difficulty: Difficulty,
  revisionNumber: number
) {
  const days = getRevisionGap(difficulty, revisionNumber);

  const date = new Date();
  date.setDate(date.getDate() + days);

  console.log("now the revision data will be ", date)

  return date;
}

