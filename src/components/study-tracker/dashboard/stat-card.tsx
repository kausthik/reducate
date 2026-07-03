import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: number | string;
  description: string;
  icon: LucideIcon;
}

export default function StatCard({
  title,
  value,
  description,
  icon: Icon,
}: StatCardProps) {
  return (
    <Card className="transition-all hover:shadow-md">
      <CardContent className="flex items-start justify-between p-6">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">
            {title}
          </p>

          <h2 className="text-3xl font-bold">
            {value}
          </h2>

          <p className="text-xs text-muted-foreground">
            {description}
          </p>
        </div>

        <div className="rounded-lg bg-primary/10 p-3">
          <Icon className="size-5 text-primary" />
        </div>
      </CardContent>
    </Card>
  );
}