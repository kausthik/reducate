"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";

export default function CompleteTaskDialog() {

  const [sourceType, setSourceType] = useState("");

  const [sourceName, setSourceName] = useState("");

  const [url, setUrl] = useState("");

  function handleSubmit() {
    console.log({
      sourceType,
      sourceName,
      url,
    });
  }

  return (
    <Dialog>

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
            Add the study source used for this topic.
          </DialogDescription>

        </DialogHeader>

        <div className="space-y-5">

          <div>

            <Label>
              Source Type
            </Label>

            <Select
              onValueChange={setSourceType}
            >

              <SelectTrigger>

                <SelectValue placeholder="Select Type" />

              </SelectTrigger>

              <SelectContent>

                <SelectItem value="YOUTUBE">
                  YouTube
                </SelectItem>

                <SelectItem value="BOOK">
                  Book
                </SelectItem>

                <SelectItem value="WEBSITE">
                  Website
                </SelectItem>

                <SelectItem value="COURSE">
                  Course
                </SelectItem>

              </SelectContent>

            </Select>

          </div>

          <div>

            <Label>
              Source Name
            </Label>

            <Input
              value={sourceName}
              onChange={(e) =>
                setSourceName(e.target.value)
              }
            />

          </div>

          <div>

            <Label>
              URL
            </Label>

            <Input
              value={url}
              onChange={(e) =>
                setUrl(e.target.value)
              }
            />

          </div>

          <Button
            onClick={handleSubmit}
            className="w-full"
          >
            Complete Task
          </Button>

        </div>

      </DialogContent>

    </Dialog>
  );
}