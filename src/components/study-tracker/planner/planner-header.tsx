import CreatePlannerDialog from "./create-planner-dialog";


export default function PlannerHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Planner
        </h1>

        <p className="text-muted-foreground">
          Organize your study roadmap and track your progress.
        </p>
      </div>

      <CreatePlannerDialog />
    </div>
  );
}