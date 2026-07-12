"use client";

import { useState } from "react";
import { toast } from "sonner";

import {
  createImportantDateAction,
  updateImportantDateAction,
} from "@/src/actions/important-date.action";

import {
  ImportantDateCategory,
  ImportantDatePriority,
} from "@/src/types/important-date";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  mode: "create" | "edit";
  importantDate?: {
    id: string;
    title: string;
    description: string;
    category: ImportantDateCategory;
    priority: ImportantDatePriority;
    date: string;
  };
};

export default function ImportantDateForm({
  mode,
  importantDate,
}: Props) {
  const [title, setTitle] = useState(
    importantDate?.title ?? ""
  );

  const [description, setDescription] = useState(
    importantDate?.description ?? ""
  );

  const [category, setCategory] =
    useState<ImportantDateCategory>(
      importantDate?.category ??
        ImportantDateCategory.EXAM
    );

  const [priority, setPriority] =
    useState<ImportantDatePriority>(
      importantDate?.priority ??
        ImportantDatePriority.MEDIUM
    );

  const [date, setDate] = useState(
    importantDate?.date
      ? new Date(importantDate.date)
          .toISOString()
          .split("T")[0]
      : ""
  );

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    try {
      const payload = {
        title,
        description,
        category,
        priority,
        date: new Date(date),
      };

      if (mode === "create") {
        await createImportantDateAction(payload);

        toast.success(
          "Important date created."
        );

        setTitle("");
        setDescription("");
        setCategory(
          ImportantDateCategory.EXAM
        );
        setPriority(
          ImportantDatePriority.MEDIUM
        );
        setDate("");
      } else {
        await updateImportantDateAction(
          importantDate!.id,
          payload
        );

        toast.success(
          "Important date updated."
        );
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong.");
      }
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div className="grid gap-2">
        <Label>Title</Label>

        <Input
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
        />
      </div>

      <div className="grid gap-2">
        <Label>Description</Label>

        <Textarea
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label>Category</Label>

          <Select
            value={category}
            onValueChange={(value) =>
              setCategory(
                value as ImportantDateCategory
              )
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              {Object.values(
                ImportantDateCategory
              ).map((item) => (
                <SelectItem
                  key={item}
                  value={item}
                >
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <Label>Priority</Label>

          <Select
            value={priority}
            onValueChange={(value) =>
              setPriority(
                value as ImportantDatePriority
              )
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              {Object.values(
                ImportantDatePriority
              ).map((item) => (
                <SelectItem
                  key={item}
                  value={item}
                >
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-2">
        <Label>Date</Label>

        <Input
          type="date"
          value={date}
          onChange={(e) =>
            setDate(e.target.value)
          }
        />
      </div>

      <div className="flex justify-end">
        <Button type="submit">
          {mode === "create"
            ? "Add Important Date"
            : "Update Important Date"}
        </Button>
      </div>
    </form>
  );
}