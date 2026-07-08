import { getUserPlannersAction } from "@/src/actions/planner.action";

import PlannerCard from "@/src/components/study-tracker/planner/planner-card";
import CreatePlannerDialog from "@/src/components/study-tracker/planner/create-planner-dialog";

export default async function PlannerPage() {
  const planners =
    await getUserPlannersAction();

  return (
    <div className="space-y-6 m-3">

      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold p-2 underline ml-2">
          PLANNERS
        </h1>
        <CreatePlannerDialog />
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {planners.map((planner) => {
          const progress =
            Math.round(
              (planner.completedTasks /
                planner.totalTasks) *
                100
            );

          return (
            <PlannerCard
              key={planner._id}
              id={planner._id}
              title={planner.title}
              image={planner.imageUrl ?? "/planner.jpg"}
              progress={progress}
              completed={planner.completedTasks}
              total={planner.totalTasks}
              dueDate={new Date(
                planner.dueDate
              ).toLocaleDateString()}
              status={
                progress === 100
                  ? "Completed"
                  : "In Progress"
              }
            />
          );
        })}
      </div>
    </div>
  );
}