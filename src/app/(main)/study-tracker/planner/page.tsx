import { getUserPlannersAction } from "@/src/actions/planner.action";

import PlannerCard from "@/src/components/study-tracker/planner/planner-card";
import PlannerHeader from "@/src/components/study-tracker/planner/planner-header";

export default async function PlannerPage() {
  const planners =
    await getUserPlannersAction();
    console.log("here is your planners")
    console.log(planners)

  return (
    <div className="space-y-6 m-3">
       <PlannerHeader/>
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