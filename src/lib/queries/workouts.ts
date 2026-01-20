import { db } from "@/src/db";
import { workouts, workoutExercises } from "@/src/db/schema";
import { and, eq, gte, lt, asc } from "drizzle-orm";
import { startOfDay, endOfDay } from "date-fns";

export async function getWorkoutsByDate(userId: string, date: Date) {
  const dayStart = startOfDay(date);
  const dayEnd = endOfDay(date);

  return db.query.workouts.findMany({
    where: and(
      eq(workouts.userId, userId),
      gte(workouts.startedAt, dayStart),
      lt(workouts.startedAt, dayEnd)
    ),
    with: {
      workoutExercises: {
        with: {
          exercise: true,
          sets: {
            orderBy: (sets, { asc }) => [asc(sets.setNumber)],
          },
        },
        orderBy: [asc(workoutExercises.order)],
      },
    },
    orderBy: [asc(workouts.startedAt)],
  });
}

// Type export for use in components
export type WorkoutWithDetails = Awaited<
  ReturnType<typeof getWorkoutsByDate>
>[number];
