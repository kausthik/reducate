"use client";

import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";

import { Difficulty, Subject } from "@/src/types/study";

import CompleteTaskDialog from "./complete-task-dialog";

interface PlannerTaskItemProps {
  id: string;
  title: string;
  subject: Subject;
  difficulty: Difficulty;
  completed: boolean;
}

export default function PlannerTaskItem({
  id,
  title,
  subject,
  difficulty,
  completed,
}: PlannerTaskItemProps) {
  const [open, setOpen] = useState(false);

  function handleCheckedChange(checked: boolean) {
    if (!completed && checked) {
      setOpen(true);
    }
  }

  return (
    <>
      <Card className="transition-colors hover:bg-muted/40">
        <CardContent className="flex items-center justify-between py-4">
          <div className="flex items-center gap-4">
            <Checkbox
              checked={completed}
              onCheckedChange={handleCheckedChange}
            />

            <div>
              <h3
                className={`font-medium ${
                  completed
                    ? "text-muted-foreground line-through"
                    : ""
                }`}
              >
                {title}
              </h3>

              <div className="mt-2 flex gap-2">
                <Badge variant="secondary">
                  {subject}
                </Badge>

                <Badge variant="outline">
                  {difficulty}
                </Badge>
              </div>
            </div>
          </div>

          {!completed && (
            <Badge>
              Pending
            </Badge>
          )}

          {completed && (
            <Badge variant="secondary">
              Completed
            </Badge>
          )}
        </CardContent>
      </Card>

      <CompleteTaskDialog
        open={open}
        onOpenChange={setOpen}
        plannerTaskId={id}
        taskTitle={title}
      />
    </>
  );
}