import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface PlannerOverviewProps {
  title: string;
  image: string;
  progress: number;
  completedTasks: number;
  totalTasks: number;
  startDate: string;
  dueDate: string;
  status: string;
}

export default function PlannerOverview({
  title,
  image,
  progress,
  completedTasks,
  totalTasks,
  startDate,
  dueDate,
  status,
}: PlannerOverviewProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col gap-8 md:flex-row">
          <div className="relative h-56 w-full overflow-hidden rounded-xl md:w-96">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
            />
          </div>

          <div className="flex flex-1 flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">
                  {title}
                </h1>

                <Badge>
                  {status}
                </Badge>
              </div>

              <div className="grid gap-2 text-sm text-muted-foreground">
                <p>
                  <strong>Started:</strong> {startDate}
                </p>

                <p>
                  <strong>Due:</strong> {dueDate}
                </p>

                <p>
                  <strong>Progress:</strong> {completedTasks} / {totalTasks} Tasks
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Progress value={progress} />

              <p className="text-right text-sm text-muted-foreground">
                {progress}%
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}