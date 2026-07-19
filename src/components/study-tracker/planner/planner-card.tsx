import Image from "next/image";
import Link from "next/link";


import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

interface PlannerCardProps {
  id: string;
  title: string;
  image: string;
  progress: number;
  completed: number;
  total: number;
  dueDate: string;
  status: string;
}

export default function PlannerCard({
  id,
  title,
  image,
  progress,
  completed,
  total,
  dueDate,
  status,
}: PlannerCardProps) {
   const targetDate = new Date("7/31/2026");
   const currentDate = new Date();
   const diffInMs = targetDate.getTime() - currentDate.getTime();
   const daysRemaining = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
   const learningFactor = ((total - completed)/daysRemaining).toFixed(2);
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg m-3 p-5">
      <div className="relative h-44">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
      </div>

      <CardHeader className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">
            {title}
          </h3>

          <Badge>{status}</Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <Progress value={progress} />

        <div className="flex justify-between text-sm text-muted-foreground">
          <span>
            {completed} / {total} Tasks
          </span>

          <span>{progress}% | {learningFactor}</span>
        </div>
       
        <div className="text-sm text-muted-foreground">
          Due: {dueDate}
        </div>
      </CardContent>

      <CardFooter>
        <Button asChild className="w-full">
         <Link href={`/study-tracker/planner/${id}`}>
              view planner
        </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}