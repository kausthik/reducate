import { Badge } from "@/components/ui/badge";
import CompleteTaskDialog from "./complete-task-dialog";
import { PlannerTaskStatus } from "@/src/types/planner";

interface PlannerTaskItemProps {
  task: {
    _id: string;
    title: string;
    subject: string;
    difficulty: string;
    status: PlannerTaskStatus;
  };
}

export default function PlannerTaskItem({
  task,
}: PlannerTaskItemProps) {
  return (
    <div className="flex items-center justify-between rounded-xl border p-3 transition-colors hover:bg-muted/40 m-3">
      <div className="space-y-2">
        <h3 className="font-medium">
          {task.title}
        </h3>

        <div className="flex items-center gap-2">
          <Badge variant="outline">
            {task.subject}
          </Badge>

          <Badge>
            {task.difficulty}
          </Badge>
        </div>
      </div>

      {task.status === PlannerTaskStatus.PENDING ? (
        <CompleteTaskDialog
          taskId={task._id}
        />
      ) : (
        <Badge className="bg-green-600 hover:bg-green-600">
          Completed
        </Badge>
      )}
    </div>
  );
}