import {
  BookOpen,
  RotateCcw,
  ListTodo,
  ClockAlert,
  CalendarClock,
} from "lucide-react";

import StatCard from "./stat-card";

const stats = [
  {
    title: "Topics Studied",
    value: 126,
    description: "Across all subjects",
    icon: BookOpen,
  },
  {
    title: "Topics Revised",
    value: 94,
    description: "Successfully revised",
    icon: RotateCcw,
  },
  {
    title: "Planner Progress",
    value: "72%",
    description: "Overall completion",
    icon: ListTodo,
  },
  {
    title: "Overdue Revisions",
    value: 8,
    description: "Need attention",
    icon: ClockAlert,
  },
  {
    title: "Overdue Planners",
    value: 2,
    description: "Past due date",
    icon: CalendarClock,
  },
];

export default function StatsSection() {
  return (
    <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-5 p-3 mb-5">
      {stats.map((stat) => (
        <StatCard
          key={stat.title}
          {...stat}
        />
      ))}
    </section>
  );
}