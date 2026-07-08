import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";


import StudiedTopicItem from "./studied-topic-item";
import { RegisterStudiedTopic } from "./study/add-topic-dialog";
import { getTodayStudies } from "@/src/lib/server/study";

type StudiedTopicsCardProps = {
  studies: Awaited<
    ReturnType<typeof getTodayStudies>
  >;
};
export  default function StudiedTopicsCard({
  studies,
}: StudiedTopicsCardProps) {  
  return (
    <Card className="ml-5 mr-2.5">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Studied Topics</CardTitle>

          <CardDescription>
            Topics you've completed Today.
          </CardDescription>
        </div>
       <RegisterStudiedTopic/>
      </CardHeader>

      <CardContent className="space-y-3">
        {studies.map((study) => (
         <StudiedTopicItem
          key={study._id}
          id={study._id}
          subject={study.subject}
          title={study.title}
          difficulty={study.difficulty}
          />
        ))}
      </CardContent>
    </Card>
  );
}