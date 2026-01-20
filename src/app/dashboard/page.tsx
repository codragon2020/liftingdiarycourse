import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { parseISO, isValid, format, isToday } from "date-fns";
import { CalendarDays, Dumbbell, Flame, Target } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getWorkoutsByDate } from "@/src/lib/queries/workouts";
import { DatePicker } from "@/src/components/dashboard/date-picker";
import { WorkoutList } from "@/src/components/dashboard/workout-list";
import type { WorkoutWithDetails } from "@/src/lib/queries/workouts";

interface DashboardPageProps {
  searchParams: Promise<{ date?: string }>;
}

function calculateStats(workouts: WorkoutWithDetails[]) {
  const totalWorkouts = workouts.length;
  const completedWorkouts = workouts.filter((w) => w.completedAt).length;
  const totalExercises = workouts.reduce(
    (total, w) => total + w.workoutExercises.length,
    0
  );
  const totalSets = workouts.reduce(
    (total, w) =>
      total +
      w.workoutExercises.reduce((t, e) => t + e.sets.length, 0),
    0
  );
  const totalVolume = workouts.reduce(
    (total, w) =>
      total +
      w.workoutExercises.reduce(
        (t, e) =>
          t +
          e.sets.reduce((s, set) => s + (set.reps ?? 0) * (set.weight ?? 0), 0),
        0
      ),
    0
  );

  return { totalWorkouts, completedWorkouts, totalExercises, totalSets, totalVolume };
}

export default async function DashboardPage({
  searchParams,
}: DashboardPageProps) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const params = await searchParams;
  const dateParam = params.date;

  // Parse date from URL or default to today
  let selectedDate = new Date();
  if (dateParam) {
    const parsedDate = parseISO(dateParam);
    if (isValid(parsedDate)) {
      selectedDate = parsedDate;
    }
  }

  const workouts = await getWorkoutsByDate(userId, selectedDate);
  const stats = calculateStats(workouts);
  const isTodaySelected = isToday(selectedDate);
  const formattedDate = format(selectedDate, "EEEE, MMMM d, yyyy");

  return (
    <main className="container mx-auto py-8 px-4 space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            {isTodaySelected && (
              <Badge variant="secondary">Today</Badge>
            )}
          </div>
          <p className="text-muted-foreground flex items-center gap-2">
            <CalendarDays className="h-4 w-4" />
            {formattedDate}
          </p>
        </div>
        <DatePicker date={selectedDate} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Workouts</CardTitle>
            <Dumbbell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalWorkouts}</div>
            <p className="text-xs text-muted-foreground">
              {stats.completedWorkouts} completed
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Exercises</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalExercises}</div>
            <p className="text-xs text-muted-foreground">
              across all workouts
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Sets</CardTitle>
            <Flame className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalSets}</div>
            <p className="text-xs text-muted-foreground">
              sets completed
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Volume</CardTitle>
            <Dumbbell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.totalVolume.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              lbs lifted
            </p>
          </CardContent>
        </Card>
      </div>

      <Separator />

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold tracking-tight">
            {isTodaySelected ? "Today's Workouts" : "Workouts"}
          </h2>
          {workouts.length > 0 && (
            <Badge variant="outline">
              {workouts.length} workout{workouts.length !== 1 && "s"}
            </Badge>
          )}
        </div>
        <WorkoutList workouts={workouts} selectedDate={selectedDate} />
      </div>
    </main>
  );
}
