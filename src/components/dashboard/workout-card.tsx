import { format, differenceInMinutes } from "date-fns";
import { CheckCircle2, Clock } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { WorkoutWithDetails } from "@/src/lib/queries/workouts";

interface WorkoutCardProps {
  workout: WorkoutWithDetails;
}

function formatDuration(startedAt: Date, completedAt: Date | null): string {
  if (!completedAt) return "";
  const minutes = differenceInMinutes(completedAt, startedAt);
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (hours > 0) {
    return `${hours}h ${remainingMinutes}m`;
  }
  return `${remainingMinutes}m`;
}

export function WorkoutCard({ workout }: WorkoutCardProps) {
  const startTime = format(workout.startedAt, "h:mm a");
  const endTime = workout.completedAt
    ? format(workout.completedAt, "h:mm a")
    : "In Progress";
  const duration = formatDuration(workout.startedAt, workout.completedAt);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">
              {workout.name || "Untitled Workout"}
            </CardTitle>
            <CardDescription className="flex items-center gap-2 mt-1">
              <Clock className="h-4 w-4" />
              {startTime} - {endTime}
              {duration && <span className="text-muted-foreground">({duration})</span>}
            </CardDescription>
          </div>
          {workout.completedAt && (
            <div className="flex items-center gap-1 text-sm text-green-600">
              <CheckCircle2 className="h-4 w-4" />
              Completed
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {workout.workoutExercises.map((workoutExercise) => (
          <div key={workoutExercise.id} className="space-y-2">
            <h4 className="font-semibold">{workoutExercise.exercise.name}</h4>
            {workoutExercise.notes && (
              <p className="text-sm text-muted-foreground">
                Notes: {workoutExercise.notes}
              </p>
            )}
            {workoutExercise.sets.length > 0 && (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">Set</TableHead>
                    <TableHead className="w-[100px]">Reps</TableHead>
                    <TableHead className="w-[120px]">Weight</TableHead>
                    {workoutExercise.sets.some((s) => s.distance) && (
                      <TableHead className="w-[120px]">Distance</TableHead>
                    )}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {workoutExercise.sets.map((set) => (
                    <TableRow key={set.id}>
                      <TableCell>{set.setNumber}</TableCell>
                      <TableCell>{set.reps ?? "-"}</TableCell>
                      <TableCell>
                        {set.weight ? `${set.weight} lbs` : "-"}
                      </TableCell>
                      {workoutExercise.sets.some((s) => s.distance) && (
                        <TableCell>
                          {set.distance ? `${set.distance}` : "-"}
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        ))}
        {workout.workoutExercises.length === 0 && (
          <p className="text-sm text-muted-foreground">No exercises logged</p>
        )}
      </CardContent>
    </Card>
  );
}
