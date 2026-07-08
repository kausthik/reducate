import {
  getPlannerByIdAction,
  getPlannerTasksAction,
} from "@/src/actions/planner.action";

import PlannerTaskItem from "@/src/components/study-tracker/planner/planner-task-item";

interface PageProps {
  params: Promise<{
    plannerId: string;
  }>;
}

export default async function PlannerPage({
  params,
}: PageProps) {
  const { plannerId } = await params;

  const planner =
    await getPlannerByIdAction(plannerId);

  const tasks =
    await getPlannerTasksAction(plannerId);

  return (
    <div className="space-y-6 m-3">
      <div>
        <h1 className="text-3xl font-bold p-1 text-center">
          {planner.title}
        </h1>

        <p className="p-1 text-center  text-red-500 font-bold">
          {planner.completedTasks} /{" "}
          {planner.totalTasks} Completed
        </p>
      </div>

      <div className="space-y-3">
        {tasks.map((task) => (
          <PlannerTaskItem
            key={task._id}
            task={task}
          />
        ))}
      </div>
    </div>
  );
}