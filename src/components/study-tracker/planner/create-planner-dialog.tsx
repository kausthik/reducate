"use client";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import PlannerForm from "./planner-form";

export default function CreatePlannerDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Planner
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>Create Planner</DialogTitle>

          <DialogDescription>
            Create a roadmap by providing planner details and importing
            planner tasks using JSON.
          </DialogDescription>
        </DialogHeader>

        <PlannerForm />
      </DialogContent>
    </Dialog>
  );
}