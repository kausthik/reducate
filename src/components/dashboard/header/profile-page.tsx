import { Header } from "./header";
import Overview from "@/src/components/dashboard/overview-section/overview";
import ProblemBreakdown from "@/src/components/dashboard/problemBreakdown/problem-breakdown";
import LanguageUsage from "@/src/components/dashboard/language-usage/language-usage";

export function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 space-y-6">
      <Header />
      <Overview />
      <div className="grid md:grid-cols-2 gap-6">
        <ProblemBreakdown />
        <LanguageUsage />
      </div>
    </div>
  );
}