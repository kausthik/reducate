"use client"

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
import NoStudyToday from "@/components/ui/no-study-today";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { plannerRoute } from "@/lib/routes";

type StudiedTopicsCardProps = {
  studies: Awaited<
    ReturnType<typeof getTodayStudies>
  >;
};
export  default function StudiedTopicsCard({
  studies,
}: StudiedTopicsCardProps) {  
  const router = useRouter();
  return (
    <Card className="ml-5 mr-2.5">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Studied Topics</CardTitle>

          <CardDescription>
            Topics you've completed Today.
          </CardDescription>
        </div>
        <Button onClick={()=>{
          router.push(plannerRoute)
        }}>Planners</Button>
       <RegisterStudiedTopic/>
      </CardHeader>

      <CardContent className="space-y-3">
        {(studies.length===0)? <NoStudyToday/> : 
        studies.map((study) => (
         <StudiedTopicItem
          key={study._id}
          id={study._id}
          subject={study.subject}
          title={study.title}
          difficulty={study.difficulty}
          />
        ))
      }
      </CardContent>
    </Card>
  );
}