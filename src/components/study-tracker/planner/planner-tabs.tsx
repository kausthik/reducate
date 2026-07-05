"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function PlannerTabs() {
  return (
    <Tabs defaultValue="ongoing">
      <TabsList>
        <TabsTrigger value="upcoming">
          Upcoming
        </TabsTrigger>

        <TabsTrigger value="ongoing">
          Ongoing
        </TabsTrigger>

        <TabsTrigger value="completed">
          Completed
        </TabsTrigger>

        <TabsTrigger value="overdue">
          Overdue
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}