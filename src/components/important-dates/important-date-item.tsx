"use client"

import { CalendarDays } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { getRelativeDate } from "@/src/lib/date";
import { ImportantDatePriority, ImportantDateCategory } from "@/src/types/important-date";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deleteImportantDateAction } from "@/src/actions/important-date.action";
import { toast } from "sonner";
import EditImportantDateDialog from "./edit-important-date-dialog";

type Props = {
  id: string;
  title: string;
  description: string;
  category: ImportantDateCategory;
  priority: ImportantDatePriority;
  date: string;
};

const priorityColor = {
  HIGH: "destructive",
  MEDIUM: "secondary",
  LOW: "outline",
} as const;

export default function ImportantDateItem({
  id,
  title,
  category,
  priority,
  description,
  date,
}: Props) {

    async function handleDelete() {
    try {
      await deleteImportantDateAction(id);
      toast.success("Important date deleted.");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong.");
      }
    }
  }
  
  return (
    <div className="flex items-center justify-between rounded-lg border p-3">
      <div className="space-y-1">
        <h4 className="font-medium">
          {title}
        </h4>

        <div className="flex gap-2">
          <Badge variant="secondary">
            {category}
          </Badge>

          <Badge variant={priorityColor[priority]}>
             {priority}
        </Badge>
        </div>
      </div>

      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <CalendarDays className="h-4 w-4" />
        {getRelativeDate(new Date(date))}
      </div>
      <div className="flex items-center gap-2">
  <EditImportantDateDialog
    importantDate={{
      id,
      title,
      description,
      category,
      priority,
      date,
    }}
  />

  <Button
    variant="destructive"
    size="icon"
    onClick={handleDelete}
  >
    <Trash2 className="h-4 w-4" />
  </Button>
</div>
    </div>
  );
}