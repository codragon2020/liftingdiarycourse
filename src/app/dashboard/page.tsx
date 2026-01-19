import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { parseISO, isValid } from "date-fns";

import { getWorkoutsByDate } from "@/src/lib/queries/workouts";
import { DatePicker } from "@/src/components/dashboard/date-picker";
import { WorkoutList } from "@/src/components/dashboard/workout-list";

interface DashboardPageProps {
  searchParams: Promise<{ date?: string }>;
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

  return (
    <main className="container mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Workout Dashboard</h1>
        <DatePicker date={selectedDate} />
      </div>
      <WorkoutList workouts={workouts} selectedDate={selectedDate} />
    </main>
  );
}
