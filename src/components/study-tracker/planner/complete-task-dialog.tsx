"use client";

import { useState, useTransition } from "react";

import { completePlannerTaskAction } from "@/src/actions/planner.action";

import { SourceType } from "@/src/types/study";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { toast } from "sonner";

interface CompleteTaskDialogProps {
  taskId: string;
}

export default function CompleteTaskDialog({
  taskId,
}: CompleteTaskDialogProps) {
  const [open, setOpen] = useState(false);

  const [type, setType] =
    useState<SourceType>(SourceType.YOUTUBE);

  const [name, setName] = useState("");

  const [url, setUrl] = useState("");

  const [isPending, startTransition] =
    useTransition();

  function handleSubmit() {
    startTransition(async () => {
      try {
        await completePlannerTaskAction(taskId, [
          {
            type,
            name,
            url: url || undefined,
          },
        ]);

        toast.success("Task completed.");

        setOpen(false);

        setName("");
        setUrl("");
        setType(SourceType.YOUTUBE);
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error("Something went wrong.");
        }
      }
    });
  }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        <Button size="sm">
          Complete
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Complete Task
          </DialogTitle>

          <DialogDescription>
            Add the source from which you studied
            this topic.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label>Source Type</Label>

            <Select
              value={type}
              onValueChange={(value) =>
                setType(value as SourceType)
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="YOUTUBE">
                  YouTube
                </SelectItem>

                <SelectItem value="WEBSITE">
                  Website
                </SelectItem>

                <SelectItem value="BOOK">
                  Book
                </SelectItem>

                <SelectItem value="COURSE">
                  Course
                </SelectItem>

                <SelectItem value="NOTES">
                  Notes
                </SelectItem>

                <SelectItem value="LEETCODE">
                  LeetCode
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Source Name</Label>

            <Input
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              placeholder="Abdul Bari"
            />
          </div>

          <div>
            <Label>URL</Label>

            <Input
              value={url}
              onChange={(e) =>
                setUrl(e.target.value)
              }
              placeholder="https://..."
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>

          <Button
            disabled={isPending}
            onClick={handleSubmit}
          >
            Complete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}