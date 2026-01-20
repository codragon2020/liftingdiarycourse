import { format, isToday, isPast, isFuture } from "date-fns";
import { Dumbbell, CalendarX, CalendarClock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface EmptyStateProps {
  date: Date;
}

export function EmptyState({ date }: EmptyStateProps) {
  const formattedDate = format(date, "EEEE, MMMM d, yyyy");
  const isTodayDate = isToday(date);
  const isPastDate = isPast(date) && !isTodayDate;
  const isFutureDate = isFuture(date);

  const getIcon = () => {
    if (isFutureDate) return CalendarClock;
    if (isPastDate) return CalendarX;
    return Dumbbell;
  };

  const getTitle = () => {
    if (isFutureDate) return "Future date selected";
    if (isPastDate) return "No workouts recorded";
    return "No workouts yet today";
  };

  const getMessage = () => {
    if (isFutureDate) {
      return "You're viewing a future date. Workouts can only be logged for today or past dates.";
    }
    if (isPastDate) {
      return `No workouts were logged on ${formattedDate}.`;
    }
    return "Start your first workout of the day to begin tracking your progress.";
  };

  const Icon = getIcon();

  return (
    <Card className="border-dashed">
      <CardContent className="flex flex-col items-center justify-center py-16">
        <div className="rounded-full bg-muted p-4 mb-6">
          <Icon className="h-10 w-10 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-semibold mb-2">{getTitle()}</h3>
        <p className="text-sm text-muted-foreground text-center max-w-sm mb-6">
          {getMessage()}
        </p>
        {isTodayDate && (
          <>
            <Separator className="w-24 mb-6" />
            <Button>
              <Dumbbell className="h-4 w-4 mr-2" />
              Start Workout
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}
