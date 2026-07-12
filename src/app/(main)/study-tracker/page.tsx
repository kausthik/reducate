import { getUpcomingImportantDatesAction } from "@/src/actions/important-date.action";
import ImportantDatesCard from "@/src/components/important-dates/important-dates-card";
import DashboardHeader from "@/src/components/study-tracker/dashboard/dashboard-header";
import RevisionCard from "@/src/components/study-tracker/dashboard/revision-card";
import StatsSection from "@/src/components/study-tracker/dashboard/stat-section";
import StudiedTopicsCard from "@/src/components/study-tracker/dashboard/studies-topics-card";
import { getTodayRevisions } from "@/src/lib/server/revision";

import { getTodayStudies } from "@/src/lib/server/study";

export default async function Page() {
  const studies = await getTodayStudies();
  const revisions = await getTodayRevisions();
  const dates = await getUpcomingImportantDatesAction();

  return (
    <div className="space-y-6">
  <DashboardHeader />

  <StatsSection />

  <div className="grid gap-6 xl:grid-cols-3 p-3">
      <StudiedTopicsCard studies={studies} />
     <RevisionCard revisions={revisions} />
     <ImportantDatesCard />
</div>
</div>
  );
}