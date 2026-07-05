"use client";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

import CompleteTaskDialog from "./complete-task-dialog";

interface PlannerTaskItemProps {
  title: string;
  subject: string;
  difficulty: string;
  completed: boolean;
}

export default function PlannerTaskItem({
  title,
  subject,
  difficulty,
  completed,
}: PlannerTaskItemProps) {
  return (
    <div className="flex items-center justify-between rounded-xl border p-4">

      <div className="flex items-center gap-4">

        <Checkbox checked={completed} />

        <div>

          <h3 className="font-medium">
            {title}
          </h3>

          <div className="mt-2 flex gap-2">

            <Badge variant="secondary">
              {subject}
            </Badge>

            <Badge variant="outline">
              {difficulty}
            </Badge>

          </div>

        </div>

      </div>

      {!completed && (
        <CompleteTaskDialog />
      )}

    </div>
  );
}