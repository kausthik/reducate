import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";


import RevisionItem from "./revision-item";
import { ScrollArea } from "@/components/ui/scroll-area";

const revisions = [
  {
    title: "Binary Search",
    subject: "DSA",
    source: "Abdul Bari",
  },
  {
    title: "Deadlock",
    subject: "Operating System",
    source: "Gate Smashers",
  },
  {
    title: "Normalization",
    subject: "DBMS",
    source: "College Notes",
  },
];

export default function RevisionCard() {
  return (
    <Card className="ml-5 mr-2.5">
      <CardHeader>
        <CardTitle>Today's Revisions</CardTitle>

        <CardDescription>
          Complete today's scheduled revision topics.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-3">
        <ScrollArea className="h-[420px]">
        {revisions.map((revision) => (
          <RevisionItem
            key={revision.title}
            {...revision}
          />
        ))}
      </ScrollArea>
      </CardContent>
    </Card>
  );
}