import {
  Pencil,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";

type Props = {
  importantDate: any;
};

export default function PastImportantDateItem({
  importantDate,
}: Props) {
  return (
    <div className="flex items-center justify-between rounded-lg border p-3">
      <div>
        <h4 className="font-medium">
          {importantDate.title}
        </h4>

        <p className="text-sm text-muted-foreground">
          {new Date(
            importantDate.date
          ).toLocaleDateString()}
        </p>
      </div>

      <div className="flex gap-2">
        <Button
          size="icon"
          variant="outline"
        >
          <Pencil className="h-4 w-4" />
        </Button>

        <Button
          size="icon"
          variant="destructive"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}