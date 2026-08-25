import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

import RevisionItem from "../revision-item";
import { getTodayRevisions } from "@/src/lib/server/revision";
import NoRevisionsLeft from "@/components/ui/no-revision-left";
import { todaysCompletedRevisionCount } from "@/src/actions/revision.action";


type RevisionCardProps = {
  revisions: Awaited<
    ReturnType<typeof getTodayRevisions>
  >;
};

export default async function RevisionCard({
  revisions,
}: RevisionCardProps) {
  const revisionCount =  await todaysCompletedRevisionCount()

  return (
    <Card className="ml-5 mr-2.5">
      <CardHeader>
        <CardTitle>Today's Revisions</CardTitle>

        <CardDescription>
          Complete today's scheduled revision topics.
        </CardDescription>
      </CardHeader>

      <CardContent>
        {(revisions.length!==0)? 
        <ScrollArea className="h-[420px] space-y-3">
          {revisions.map((revision, idx) => (
            <RevisionItem
              index = {idx}
              revisionCount = {revisionCount}
              key={revision._id}
              id={revision._id}
              title={revision.studyId.title}
              subject={revision.studyId.subject}
              source={
                revision.studyId.sources?.[0]?.name ??
                "No Source"
              }
            />
          ))}
        </ScrollArea> : <NoRevisionsLeft/>
       } 
      </CardContent>
    </Card>
  );
}