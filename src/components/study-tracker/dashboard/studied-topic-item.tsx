"use client"

import { Badge } from "@/components/ui/badge";
import { BookOpen } from "lucide-react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deleteStudyAction } from "@/src/actions/study.action";
interface StudiedTopicItemProps {
  id: string;
  subject: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
}

const difficultyColor = {
  Easy: "bg-green-100 text-green-700",
  Medium: "bg-yellow-100 text-yellow-700",
  Hard: "bg-red-100 text-red-700",
};

export default function StudiedTopicItem({
  id,
  subject,
  title,
  difficulty,
}: StudiedTopicItemProps) {
  return (
    <div className="flex items-center justify-between rounded-xl border p-4 transition-colors hover:bg-muted/40">
      <div className="flex items-center gap-4">
        <div className="rounded-lg bg-primary/10 p-2">
          <BookOpen className="size-5 text-primary" />
        </div>

        <div>
          <h3 className="font-medium">{title}</h3>

          <p className="text-sm text-muted-foreground">
            {subject}
          </p>
        </div>
      </div>

     <div className="flex items-center gap-2">
  <Badge
    variant="secondary"
    className={difficultyColor[difficulty]}
  >
    {difficulty}
  </Badge>

  <Button
    variant="ghost"
    size="icon"
    onClick={async () => {
      await deleteStudyAction(id);
    }}
  >
    <Trash2 className="h-4 w-4 text-red-500" />
  </Button>
</div>
    </div>
  );
}