import "dotenv/config";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { exercises, workouts, workoutExercises, sets } from "./schema";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle({ client: sql });

const USER_ID = "user_38Tp12awMG8zstHuMOZG1QT0jAz";

async function seed() {
  console.log("🌱 Seeding database...");

  // Insert exercises
  console.log("Inserting exercises...");
  await db.insert(exercises).values([
    {
      id: "e1a2b3c4-1111-4000-8000-000000000001",
      userId: USER_ID,
      name: "Bench Press",
      createdAt: new Date("2025-01-10T08:00:00Z"),
      updatedAt: new Date("2025-01-10T08:00:00Z"),
    },
    {
      id: "e1a2b3c4-1111-4000-8000-000000000002",
      userId: USER_ID,
      name: "Squat",
      createdAt: new Date("2025-01-10T08:00:00Z"),
      updatedAt: new Date("2025-01-10T08:00:00Z"),
    },
    {
      id: "e1a2b3c4-1111-4000-8000-000000000003",
      userId: USER_ID,
      name: "Deadlift",
      createdAt: new Date("2025-01-10T08:00:00Z"),
      updatedAt: new Date("2025-01-10T08:00:00Z"),
    },
    {
      id: "e1a2b3c4-1111-4000-8000-000000000004",
      userId: USER_ID,
      name: "Overhead Press",
      createdAt: new Date("2025-01-10T08:00:00Z"),
      updatedAt: new Date("2025-01-10T08:00:00Z"),
    },
    {
      id: "e1a2b3c4-1111-4000-8000-000000000005",
      userId: USER_ID,
      name: "Barbell Row",
      createdAt: new Date("2025-01-10T08:00:00Z"),
      updatedAt: new Date("2025-01-10T08:00:00Z"),
    },
  ]);

  // Insert workouts
  console.log("Inserting workouts...");
  await db.insert(workouts).values([
    {
      id: "w1a2b3c4-2222-4000-8000-000000000001",
      userId: USER_ID,
      name: "Push Day",
      startedAt: new Date("2025-01-15T09:00:00Z"),
      completedAt: new Date("2025-01-15T10:15:00Z"),
      createdAt: new Date("2025-01-15T09:00:00Z"),
      updatedAt: new Date("2025-01-15T10:15:00Z"),
    },
    {
      id: "w1a2b3c4-2222-4000-8000-000000000002",
      userId: USER_ID,
      name: "Pull Day",
      startedAt: new Date("2025-01-16T09:00:00Z"),
      completedAt: new Date("2025-01-16T10:30:00Z"),
      createdAt: new Date("2025-01-16T09:00:00Z"),
      updatedAt: new Date("2025-01-16T10:30:00Z"),
    },
    {
      id: "w1a2b3c4-2222-4000-8000-000000000003",
      userId: USER_ID,
      name: "Leg Day",
      startedAt: new Date("2025-01-17T09:00:00Z"),
      completedAt: null,
      createdAt: new Date("2025-01-17T09:00:00Z"),
      updatedAt: new Date("2025-01-17T09:00:00Z"),
    },
  ]);

  // Insert workout_exercises
  console.log("Inserting workout exercises...");
  await db.insert(workoutExercises).values([
    {
      id: "we1a2b3c4-3333-4000-8000-000000000001",
      workoutId: "w1a2b3c4-2222-4000-8000-000000000001",
      exerciseId: "e1a2b3c4-1111-4000-8000-000000000001",
      order: 1,
      notes: "Warm up with empty bar",
      createdAt: new Date("2025-01-15T09:00:00Z"),
    },
    {
      id: "we1a2b3c4-3333-4000-8000-000000000002",
      workoutId: "w1a2b3c4-2222-4000-8000-000000000001",
      exerciseId: "e1a2b3c4-1111-4000-8000-000000000004",
      order: 2,
      notes: "Focus on form",
      createdAt: new Date("2025-01-15T09:30:00Z"),
    },
    {
      id: "we1a2b3c4-3333-4000-8000-000000000003",
      workoutId: "w1a2b3c4-2222-4000-8000-000000000002",
      exerciseId: "e1a2b3c4-1111-4000-8000-000000000003",
      order: 1,
      notes: null,
      createdAt: new Date("2025-01-16T09:00:00Z"),
    },
    {
      id: "we1a2b3c4-3333-4000-8000-000000000004",
      workoutId: "w1a2b3c4-2222-4000-8000-000000000002",
      exerciseId: "e1a2b3c4-1111-4000-8000-000000000005",
      order: 2,
      notes: "Keep back straight",
      createdAt: new Date("2025-01-16T09:45:00Z"),
    },
    {
      id: "we1a2b3c4-3333-4000-8000-000000000005",
      workoutId: "w1a2b3c4-2222-4000-8000-000000000003",
      exerciseId: "e1a2b3c4-1111-4000-8000-000000000002",
      order: 1,
      notes: "ATG squats",
      createdAt: new Date("2025-01-17T09:00:00Z"),
    },
  ]);

  // Insert sets
  console.log("Inserting sets...");
  await db.insert(sets).values([
    {
      id: "s1a2b3c4-4444-4000-8000-000000000001",
      workoutExerciseId: "we1a2b3c4-3333-4000-8000-000000000001",
      setNumber: 1,
      reps: 12,
      weight: "135",
      distance: null,
      createdAt: new Date("2025-01-15T09:05:00Z"),
    },
    {
      id: "s1a2b3c4-4444-4000-8000-000000000002",
      workoutExerciseId: "we1a2b3c4-3333-4000-8000-000000000001",
      setNumber: 2,
      reps: 10,
      weight: "155",
      distance: null,
      createdAt: new Date("2025-01-15T09:10:00Z"),
    },
    {
      id: "s1a2b3c4-4444-4000-8000-000000000003",
      workoutExerciseId: "we1a2b3c4-3333-4000-8000-000000000001",
      setNumber: 3,
      reps: 8,
      weight: "175",
      distance: null,
      createdAt: new Date("2025-01-15T09:15:00Z"),
    },
    {
      id: "s1a2b3c4-4444-4000-8000-000000000004",
      workoutExerciseId: "we1a2b3c4-3333-4000-8000-000000000002",
      setNumber: 1,
      reps: 10,
      weight: "95",
      distance: null,
      createdAt: new Date("2025-01-15T09:35:00Z"),
    },
    {
      id: "s1a2b3c4-4444-4000-8000-000000000005",
      workoutExerciseId: "we1a2b3c4-3333-4000-8000-000000000002",
      setNumber: 2,
      reps: 8,
      weight: "105",
      distance: null,
      createdAt: new Date("2025-01-15T09:40:00Z"),
    },
    {
      id: "s1a2b3c4-4444-4000-8000-000000000006",
      workoutExerciseId: "we1a2b3c4-3333-4000-8000-000000000003",
      setNumber: 1,
      reps: 5,
      weight: "225",
      distance: null,
      createdAt: new Date("2025-01-16T09:05:00Z"),
    },
    {
      id: "s1a2b3c4-4444-4000-8000-000000000007",
      workoutExerciseId: "we1a2b3c4-3333-4000-8000-000000000003",
      setNumber: 2,
      reps: 5,
      weight: "275",
      distance: null,
      createdAt: new Date("2025-01-16T09:12:00Z"),
    },
    {
      id: "s1a2b3c4-4444-4000-8000-000000000008",
      workoutExerciseId: "we1a2b3c4-3333-4000-8000-000000000003",
      setNumber: 3,
      reps: 3,
      weight: "315",
      distance: null,
      createdAt: new Date("2025-01-16T09:20:00Z"),
    },
    {
      id: "s1a2b3c4-4444-4000-8000-000000000009",
      workoutExerciseId: "we1a2b3c4-3333-4000-8000-000000000004",
      setNumber: 1,
      reps: 10,
      weight: "135",
      distance: null,
      createdAt: new Date("2025-01-16T09:50:00Z"),
    },
    {
      id: "s1a2b3c4-4444-4000-8000-000000000010",
      workoutExerciseId: "we1a2b3c4-3333-4000-8000-000000000004",
      setNumber: 2,
      reps: 10,
      weight: "135",
      distance: null,
      createdAt: new Date("2025-01-16T09:55:00Z"),
    },
    {
      id: "s1a2b3c4-4444-4000-8000-000000000011",
      workoutExerciseId: "we1a2b3c4-3333-4000-8000-000000000005",
      setNumber: 1,
      reps: 8,
      weight: "185",
      distance: null,
      createdAt: new Date("2025-01-17T09:05:00Z"),
    },
    {
      id: "s1a2b3c4-4444-4000-8000-000000000012",
      workoutExerciseId: "we1a2b3c4-3333-4000-8000-000000000005",
      setNumber: 2,
      reps: 6,
      weight: "225",
      distance: null,
      createdAt: new Date("2025-01-17T09:12:00Z"),
    },
  ]);

  console.log("✅ Seeding complete!");
  console.log("Summary:");
  console.log("  - 5 exercises");
  console.log("  - 3 workouts (Push Day, Pull Day, Leg Day)");
  console.log("  - 5 workout exercises");
  console.log("  - 12 sets");
}

seed()
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  });
