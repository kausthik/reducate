import {
  getPastImportantDatesAction,
} from "@/src/actions/important-date.action";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import PastImportantDateItem from "./past-important-date-item";

export default async function PastImportantDatesDialog() {
  const dates =
    await getPastImportantDatesAction();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
        >
          View Past
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            Past Important Dates
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          {dates.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No past dates.
            </p>
          ) : (
            dates.map((item) => (
              <PastImportantDateItem
                key={item._id.toString()}
                importantDate={item}
              />
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}