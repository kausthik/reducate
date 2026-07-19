import {
  BookOpen,
  RotateCcw,
  ListTodo,
  ClockAlert,
  CalendarClock,
} from "lucide-react";

import { getDashboardStatsAction } from "@/src/actions/stats.action";

import StatCard from "./stat-card";

export default async function StatsSection() {
  const dashboardStats = await getDashboardStatsAction();

  const stats = [
    {
      title: "Topics Studied",
      value: dashboardStats.topicsStudied,
      description: "Across all subjects",
      icon: BookOpen,
    },
    {
      title: "Topics Revised",
      value: dashboardStats.topicsRevised,
      description: "Successfully revised",
      icon: RotateCcw,
    },
    {
      title: "Planner Progress",
      value: `${dashboardStats.plannerProgress}%`,
      description: "Overall completion",
      icon: ListTodo,
    },
    {
      title: "Overdue Revisions",
      value: dashboardStats.overdueRevisions,
      description: "Need attention",
      icon: ClockAlert,
    },
    {
      title: "Overdue Planners",
      value: dashboardStats.overduePlanners,
      description: "Past due date",
      icon: CalendarClock,
    },
  ];

  return (
    <section className="grid gap-5 p-3 mb-5 sm:grid-cols-2 xl:grid-cols-5">
      {stats.map((stat) => (
        <StatCard
          key={stat.title}
          {...stat}
        />
      ))}
    </section>
  );
}