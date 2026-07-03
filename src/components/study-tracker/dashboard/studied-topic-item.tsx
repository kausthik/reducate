import { Badge } from "@/components/ui/badge";
import { BookOpen } from "lucide-react";

interface StudiedTopicItemProps {
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

      <Badge
        variant="secondary"
        className={difficultyColor[difficulty]}
      >
        {difficulty}
      </Badge>
    </div>
  );
}