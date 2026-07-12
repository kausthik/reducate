"use client";

import { CalendarPlus } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import ImportantDateForm from "./important-date-form";

export default function AddImportantDateDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <CalendarPlus className="mr-2 h-4 w-4" />
          Add Date
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            Add Important Date
          </DialogTitle>

          <DialogDescription>
            Add an upcoming interview, exam, contest,
            deadline or personal reminder.
          </DialogDescription>
        </DialogHeader>

        <ImportantDateForm mode="create" />
      </DialogContent>
    </Dialog>
  );
}