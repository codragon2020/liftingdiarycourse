import { format } from "date-fns";
import { Dumbbell } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

interface EmptyStateProps {
  date: Date;
}

export function EmptyState({ date }: EmptyStateProps) {
  const formattedDate = format(date, "MMMM d, yyyy");

  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center py-12">
        <Dumbbell className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold mb-2">No workouts logged</h3>
        <p className="text-sm text-muted-foreground text-center">
          You haven&apos;t logged any workouts for {formattedDate}.
        </p>
      </CardContent>
    </Card>
  );
}
