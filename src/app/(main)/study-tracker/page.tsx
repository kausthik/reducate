import DashboardHeader from "@/src/components/study-tracker/dashboard/dashboard-header";
import RevisionCard from "@/src/components/study-tracker/dashboard/revision-card";
import StatsSection from "@/src/components/study-tracker/dashboard/stat-section";
import StudiedTopicsCard from "@/src/components/study-tracker/dashboard/studies-topics-card";

export default function page(){
    return(
         <div>
        <DashboardHeader />
        <StatsSection />

        <div className="grid gap-6 lg:grid-cols-2">
        <StudiedTopicsCard />
        <RevisionCard />
        </div>
       </div>
    )
}
