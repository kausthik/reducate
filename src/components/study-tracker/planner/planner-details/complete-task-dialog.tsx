"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { completePlannerTaskAction } from "@/src/actions/planner.action";
import { SourceType } from "@/src/types/study";

interface CompleteTaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  plannerTaskId: string;
  taskTitle: string;
}

export default function CompleteTaskDialog({
  open,
  onOpenChange,
  plannerTaskId,
  taskTitle,
}: CompleteTaskDialogProps) {
  const router = useRouter();

  const [isPending, startTransition] =
    useTransition();

  const [sourceName, setSourceName] =
    useState("");

  const [sourceUrl, setSourceUrl] =
    useState("");

  function handleComplete() {
    startTransition(async () => {
      try {
        await completePlannerTaskAction(
          plannerTaskId,
          [
            {
              type: SourceType.YOUTUBE,
              name: sourceName,
              url: sourceUrl || undefined,
            },
          ]
        );

        toast.success(
          "Task completed successfully."
        );

        onOpenChange(false);

        setSourceName("");
        setSourceUrl("");

        router.refresh();
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "Something went wrong."
        );
      }
    });
  }

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Complete Task
          </DialogTitle>

          <DialogDescription>
            Add the learning source used for{" "}
            <strong>{taskTitle}</strong>.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <Input
            placeholder="Source Name (e.g. Striver A2Z)"
            value={sourceName}
            onChange={(e) =>
              setSourceName(e.target.value)
            }
          />

          <Input
            placeholder="Source URL (optional)"
            value={sourceUrl}
            onChange={(e) =>
              setSourceUrl(e.target.value)
            }
          />
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() =>
              onOpenChange(false)
            }
          >
            Cancel
          </Button>

          <Button
            disabled={
              isPending ||
              sourceName.trim() === ""
            }
            onClick={handleComplete}
          >
            {isPending
              ? "Completing..."
              : "Complete Task"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}