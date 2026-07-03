"use client"
import { useState } from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Link2 } from "lucide-react";

interface RevisionItemProps {
  title: string;
  subject: string;
  source: string;
}

export default function RevisionItem({
  title,
  subject,
  source,
}: RevisionItemProps) {
  const [checked, setChecked] = useState(false);

  return (
    <div className="flex items-start gap-4 rounded-xl border p-4 transition-colors hover:bg-muted/40 mt-2">
      <Checkbox className="mt-1" checked={checked}
      onCheckedChange={(value) => {
       console.log("kaushal", value)
      if (value) {
      const confirmed = window.confirm(
        "Have you really completed this revision?"
      );
      if (confirmed) {
        setChecked(true);
      } else {
        setChecked(false);
      }
    } else {
      setChecked(false);
    }
    }}
    />

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