import { getUserPlannersAction } from "@/src/actions/planner.action";
import PlannerCard from "./planner-card";


interface PlannerListProps {
  planners: Awaited<
    ReturnType<typeof getUserPlannersAction>
  >;
}

export default function PlannerList({
  planners,
}: PlannerListProps) {
  return (
    <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {planners.map((planner) => {
        const progress = Math.round(
          (planner.completedTasks / planner.totalTasks) * 100
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
    </section>
  );
}