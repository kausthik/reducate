import {
  getUpcomingImportantDatesAction,
} from "@/src/actions/important-date.action";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import AddImportantDateDialog from "./add-important-date-dialog";
import ImportantDateItem from "./important-date-item";
import PastImportantDatesDialog from "./past-important-dates-dialog";

export default async function ImportantDatesCard() {
  const dates =
    await getUpcomingImportantDatesAction();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>
            Important Dates
          </CardTitle>

          <CardDescription>
            Upcoming interviews, exams and deadlines.
          </CardDescription>
        </div>

        <AddImportantDateDialog />
      </CardHeader>

     <CardContent className="space-y-3">
  {dates.length === 0 ? (
    <p className="text-sm text-muted-foreground">
      No upcoming dates.
    </p>
  ) : (
    dates.map((item) => (
      <ImportantDateItem
  key={item._id.toString()}
  id={item._id.toString()}
  title={item.title}
  description={item.description}
  category={item.category}
  priority={item.priority}
  date={item.date.toISOString()}
/>
    ))
  )}
</CardContent>
      <div className="flex items-center gap-2">
         <PastImportantDatesDialog />
         <AddImportantDateDialog />
    </div>
    </Card>
  );
}