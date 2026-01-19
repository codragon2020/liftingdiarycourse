import { WorkoutCard } from "./workout-card";
import { EmptyState } from "./empty-state";
import type { WorkoutWithDetails } from "@/src/lib/queries/workouts";

interface WorkoutListProps {
  workouts: WorkoutWithDetails[];
  selectedDate: Date;
}

export function WorkoutList({ workouts, selectedDate }: WorkoutListProps) {
  if (workouts.length === 0) {
    return <EmptyState date={selectedDate} />;
  }

  return (
    <div className="space-y-4">
      {workouts.map((workout) => (
        <WorkoutCard key={workout.id} workout={workout} />
      ))}
    </div>
  );
}
