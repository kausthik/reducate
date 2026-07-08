import DashboardHeader from "@/src/components/study-tracker/dashboard/dashboard-header";
import RevisionCard from "@/src/components/study-tracker/dashboard/revision-card";
import StatsSection from "@/src/components/study-tracker/dashboard/stat-section";
import StudiedTopicsCard from "@/src/components/study-tracker/dashboard/studies-topics-card";
import { getTodayRevisions } from "@/src/lib/server/revision";

import { getTodayStudies } from "@/src/lib/server/study";

export default async function Page() {
  const studies = await getTodayStudies();
  const revisions = await getTodayRevisions();

  return (
    <div>
      <DashboardHeader />
      <StatsSection />

      <div className="grid gap-6 lg:grid-cols-2">
        <StudiedTopicsCard studies={studies} />
       <RevisionCard revisions={revisions} />
      </div>
    </div>
  );
}