export default function DashboardHeader() {
  return (
    <div className="flex-col justify-center p-2 m-2">
        <h1 className="text-3xl font-bold tracking-tight text-center p-1">
          Study Tracker
        </h1>

        <p className="text-muted-foreground text-center p-1">
          Track your study, revisions and planners.
        </p>
    </div>
  );
}