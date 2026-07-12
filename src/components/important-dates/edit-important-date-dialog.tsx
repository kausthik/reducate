"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { Pencil } from "lucide-react";

import {
  ImportantDateCategory,
  ImportantDatePriority,
} from "@/src/types/important-date";

import ImportantDateForm from "./important-date-form";

type Props = {
  importantDate: {
    id: string;
    title: string;
    description: string;
    category: ImportantDateCategory;
    priority: ImportantDatePriority;
    date: string,
  };
};

export default function EditImportantDateDialog({
  importantDate,
}: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
        >
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            Edit Important Date
          </DialogTitle>

          <DialogDescription>
            Update your important date.
          </DialogDescription>
        </DialogHeader>

        <ImportantDateForm
          mode="edit"
          importantDate={importantDate}
        />
      </DialogContent>
    </Dialog>
  );
}