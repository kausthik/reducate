import Image from "next/image";

import {
  Calendar,
  CheckCircle2,
  Clock3,
  Target,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
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
  const remainingTasks =
    totalTasks - completedTasks;

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <div className="grid lg:grid-cols-[380px_1fr]">
          <div className="relative h-72 lg:h-full">
            <Image
              src={image}
              alt={title}
              fill
              priority
              sizes="(max-width:1024px) 100vw, 380px"
              className="object-cover"
            />
          </div>

          <CardContent className="flex flex-col justify-between p-8">
            <div className="space-y-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold">
                    {title}
                  </h1>

                  <p className="mt-2 text-muted-foreground">
                    Stay consistent and finish every topic.
                  </p>
                </div>

                <Badge
                  variant={
                    status === "COMPLETED"
                      ? "default"
                      : "secondary"
                  }
                  className="px-4 py-1"
                >
                  {status}
                </Badge>
              </div>

              <div className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />

                  <span>
                    Started: {startDate}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Clock3 className="h-4 w-4" />

                  <span>
                    Due: {dueDate}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm font-medium">
                  <span>
                    Progress
                  </span>

                  <span>
                    {progress}%
                  </span>
                </div>

                <Progress value={progress} />

                <p className="text-sm text-muted-foreground">
                  {completedTasks} of {totalTasks} topics completed
                </p>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-muted-foreground">
                Completed
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                {completedTasks}
              </h2>
            </div>

            <CheckCircle2 className="h-10 w-10 text-green-600" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-muted-foreground">
                Remaining
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                {remainingTasks}
              </h2>
            </div>

            <Clock3 className="h-10 w-10 text-orange-500" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-muted-foreground">
                Total Topics
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                {totalTasks}
              </h2>
            </div>

            <Target className="h-10 w-10 text-blue-600" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}