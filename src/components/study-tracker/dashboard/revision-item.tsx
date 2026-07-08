"use client";


import { completeRevisionAction } from "@/src/actions/revision.action";
import { useState, useTransition } from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Link2 } from "lucide-react";
import CompleteRevisionDialog from "./complete-revision-dialog";

interface RevisionItemProps {
  id: string;
  title: string;
  subject: string;
  source: string;
}

export default function RevisionItem({
  id,
  title,
  subject,
  source,
}: RevisionItemProps) {
  const [checked, setChecked] = useState(false);
  const [isPending, startTransition] = useTransition();

  return (
    <div className="mt-2 flex items-start gap-4 rounded-xl border p-4 transition-colors hover:bg-muted/40">
      <CompleteRevisionDialog
      onConfirm={() => {
    startTransition(async () => {
    await completeRevisionAction(id);
    setChecked(true);
  });
}}
  >
    <div>
  <Checkbox
        className="mt-1"
        checked={checked}
        disabled={isPending}
      />
      </div>
    </CompleteRevisionDialog>

      <div className="flex-1">
        <h3 className="font-medium">{title}</h3>

        <div className="mt-2 flex items-center gap-2">
          <Badge variant="outline">
            {subject}
          </Badge>

          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Link2 className="size-3.5" />
            {source}
          </div>
        </div>
      </div>
    </div>
  );
}