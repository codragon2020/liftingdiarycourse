import { format, differenceInMinutes } from "date-fns";
import { CheckCircle2, Clock, Dumbbell, Loader2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
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

function getTotalSets(workout: WorkoutWithDetails): number {
  return workout.workoutExercises.reduce(
    (total, exercise) => total + exercise.sets.length,
    0
  );
}

function getTotalVolume(workout: WorkoutWithDetails): number {
  return workout.workoutExercises.reduce((total, exercise) => {
    return (
      total +
      exercise.sets.reduce((setTotal, set) => {
        const reps = set.reps ?? 0;
        const weight = set.weight ?? 0;
        return setTotal + reps * weight;
      }, 0)
    );
  }, 0);
}

export function WorkoutCard({ workout }: WorkoutCardProps) {
  const startTime = format(workout.startedAt, "h:mm a");
  const endTime = workout.completedAt
    ? format(workout.completedAt, "h:mm a")
    : null;
  const duration = formatDuration(workout.startedAt, workout.completedAt);
  const totalSets = getTotalSets(workout);
  const totalVolume = getTotalVolume(workout);
  const exerciseCount = workout.workoutExercises.length;

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <CardTitle className="text-xl">
              {workout.name || "Untitled Workout"}
            </CardTitle>
            <CardDescription className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              {startTime}
              {endTime && ` - ${endTime}`}
              {duration && (
                <Badge variant="secondary" className="ml-1">
                  {duration}
                </Badge>
              )}
            </CardDescription>
          </div>
          {workout.completedAt ? (
            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
              <CheckCircle2 className="h-3 w-3 mr-1" />
              Completed
            </Badge>
          ) : (
            <Badge variant="outline" className="text-amber-600 border-amber-300">
              <Loader2 className="h-3 w-3 mr-1 animate-spin" />
              In Progress
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-4 pt-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Dumbbell className="h-4 w-4" />
            <span>{exerciseCount} exercise{exerciseCount !== 1 && "s"}</span>
          </div>
          <Separator orientation="vertical" className="h-4" />
          <span>{totalSets} set{totalSets !== 1 && "s"}</span>
          {totalVolume > 0 && (
            <>
              <Separator orientation="vertical" className="h-4" />
              <span>{totalVolume.toLocaleString()} lbs total</span>
            </>
          )}
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="pt-4 space-y-6">
        {workout.workoutExercises.map((workoutExercise, index) => (
          <div key={workoutExercise.id} className="space-y-3">
            {index > 0 && <Separator className="my-4" />}
            <div className="flex items-center justify-between">
              <h4 className="font-semibold">{workoutExercise.exercise.name}</h4>
              <Badge variant="outline" className="text-xs">
                {workoutExercise.sets.length} set{workoutExercise.sets.length !== 1 && "s"}
              </Badge>
            </div>
            {workoutExercise.notes && (
              <p className="text-sm text-muted-foreground italic">
                {workoutExercise.notes}
              </p>
            )}
            {workoutExercise.sets.length > 0 && (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
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
                        <TableCell className="font-medium">{set.setNumber}</TableCell>
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
              </div>
            )}
          </div>
        ))}
        {workout.workoutExercises.length === 0 && (
          <div className="flex flex-col items-center justify-center py-6 text-muted-foreground">
            <Dumbbell className="h-8 w-8 mb-2 opacity-50" />
            <p className="text-sm">No exercises logged yet</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
