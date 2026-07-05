import PlannerHeader from "@/src/components/study-tracker/planner/planner-header";
import PlannerTabs from "@/src/components/study-tracker/planner/planner-tabs";
import PlannerList from "@/src/components/study-tracker/planner/planner-list";
export default function PlannerPage() {
  return (
    <main className="container mx-auto space-y-8 px-6 py-8">

      <PlannerHeader />

      <PlannerTabs />

      <PlannerList />

    </main>
  );
}