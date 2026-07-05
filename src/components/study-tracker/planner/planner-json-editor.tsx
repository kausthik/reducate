"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface PlannerJsonEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const EXAMPLE_JSON = `[
  {
    "subject": "DSA",
    "title": "Arrays",
    "difficulty": "EASY"
  },
  {
    "subject": "DSA",
    "title": "Binary Search",
    "difficulty": "MEDIUM"
  },
  {
    "subject": "OPERATING_SYSTEM",
    "title": "Deadlock",
    "difficulty": "HARD"
  }
]`;

export default function PlannerJsonEditor({
  value,
  onChange,
}: PlannerJsonEditorProps) {
  function loadExample() {
    onChange(EXAMPLE_JSON);
  }

  function validateJson() {
    try {
      const parsed = JSON.parse(value);

      if (!Array.isArray(parsed)) {
        alert("JSON must be an array.");
        return;
      }

      alert("✅ Valid Planner JSON");
      console.log(parsed);
    } catch (error) {
      console.error(error);
      alert("❌ Invalid JSON");
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <Label className="text-base font-semibold">
          Planner Roadmap (JSON)
        </Label>

        <p className="text-sm text-muted-foreground">
          Paste a JSON array containing planner tasks.
        </p>
      </div>

      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-h-[350px] font-mono text-sm"
        spellCheck={false}
        placeholder={`[
  {
    "subject": "DSA",
    "title": "Arrays",
    "difficulty": "EASY"
  }
]`}
      />

      <div className="flex flex-wrap gap-3">
        <Button
          type="button"
          variant="secondary"
          onClick={loadExample}
        >
          Load Example
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={validateJson}
        >
          Validate JSON
        </Button>
      </div>
    </div>
  );
}