"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

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

export default function PlannerForm() {
  const [plannerName, setPlannerName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [startDate, setStartDate] = useState("");
  const [dueDate, setDueDate] = useState("");

  const [json, setJson] = useState("");

  function loadExample() {
    setJson(EXAMPLE_JSON);
  }

  function validateJson() {
    try {
      const parsed = JSON.parse(json);

      if (!Array.isArray(parsed)) {
        alert("JSON must be an array.");
        return;
      }

      alert("✅ Valid JSON");
      console.log(parsed);
    } catch {
      alert("❌ Invalid JSON");
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const tasks = JSON.parse(json);

      console.log({
        plannerName,
        imageUrl,
        startDate,
        dueDate,
        tasks,
      });

      alert("Planner logged to console.");
    } catch {
      alert("Please enter valid planner JSON.");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8"
    >
      <div className="space-y-6">

        <div className="grid gap-2">
          <Label>Planner Name</Label>

          <Input
            value={plannerName}
            onChange={(e) =>
              setPlannerName(e.target.value)
            }
            placeholder="Striver A2Z DSA Sheet"
          />
        </div>

        <div className="grid gap-2">
          <Label>Cover Image URL</Label>

          <Input
            value={imageUrl}
            onChange={(e) =>
              setImageUrl(e.target.value)
            }
            placeholder="https://..."
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="grid gap-2">
            <Label>Start Date</Label>

            <Input
              type="date"
              value={startDate}
              onChange={(e) =>
                setStartDate(e.target.value)
              }
            />
          </div>

          <div className="grid gap-2">
            <Label>Due Date</Label>

            <Input
              type="date"
              value={dueDate}
              onChange={(e) =>
                setDueDate(e.target.value)
              }
            />
          </div>
        </div>

      </div>

      <Separator />

      <div className="space-y-4">

        <div>
          <h3 className="font-semibold">
            Planner Roadmap (JSON)
          </h3>

          <p className="text-sm text-muted-foreground">
            Paste a JSON array of planner tasks.
          </p>
        </div>

        <Textarea
          value={json}
          onChange={(e) =>
            setJson(e.target.value)
          }
          className="min-h-[320px] font-mono"
          placeholder={`[
  {
    "subject":"DSA",
    "title":"Arrays",
    "difficulty":"EASY"
  }
]`}
        />

        <div className="flex gap-3">
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

      <Separator />

      <div className="flex justify-end gap-3">
        <Button
          type="button"
          variant="outline"
        >
          Cancel
        </Button>

        <Button type="submit">
          Create Planner
        </Button>
      </div>
    </form>
  );
}