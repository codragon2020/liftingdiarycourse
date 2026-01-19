import 'dotenv/config';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

const USER_ID = 'user_38Tp12awMG8zstHuMOZG1QT0jAz';

async function seed() {
  console.log('🌱 Seeding database...');

  // Exercises already inserted - skipping
  console.log('Exercises already exist, skipping...');

  // Insert workouts (skipping if already done)
  console.log('Inserting workouts...');
  try {
    await sql`
      INSERT INTO workouts (id, user_id, name, started_at, completed_at, created_at, updated_at) VALUES
      ('a1a2b3c4-2222-4000-8000-000000000001', ${USER_ID}, 'Push Day', '2025-01-15 09:00:00', '2025-01-15 10:15:00', '2025-01-15 09:00:00', '2025-01-15 10:15:00'),
      ('a1a2b3c4-2222-4000-8000-000000000002', ${USER_ID}, 'Pull Day', '2025-01-16 09:00:00', '2025-01-16 10:30:00', '2025-01-16 09:00:00', '2025-01-16 10:30:00'),
      ('a1a2b3c4-2222-4000-8000-000000000003', ${USER_ID}, 'Leg Day', '2025-01-17 09:00:00', NULL, '2025-01-17 09:00:00', '2025-01-17 09:00:00')
    `;
  } catch (e) {
    if (e.code === '23505') {
      console.log('Workouts already exist, skipping...');
    } else {
      throw e;
    }
  }

  // Insert workout_exercises
  console.log('Inserting workout exercises...');
  await sql`
    INSERT INTO workout_exercises (id, workout_id, exercise_id, "order", notes, created_at) VALUES
    ('b1a2b3c4-3333-4000-8000-000000000001', 'a1a2b3c4-2222-4000-8000-000000000001', 'e1a2b3c4-1111-4000-8000-000000000001', 1, 'Warm up with empty bar', '2025-01-15 09:00:00'),
    ('b1a2b3c4-3333-4000-8000-000000000002', 'a1a2b3c4-2222-4000-8000-000000000001', 'e1a2b3c4-1111-4000-8000-000000000004', 2, 'Focus on form', '2025-01-15 09:30:00'),
    ('b1a2b3c4-3333-4000-8000-000000000003', 'a1a2b3c4-2222-4000-8000-000000000002', 'e1a2b3c4-1111-4000-8000-000000000003', 1, NULL, '2025-01-16 09:00:00'),
    ('b1a2b3c4-3333-4000-8000-000000000004', 'a1a2b3c4-2222-4000-8000-000000000002', 'e1a2b3c4-1111-4000-8000-000000000005', 2, 'Keep back straight', '2025-01-16 09:45:00'),
    ('b1a2b3c4-3333-4000-8000-000000000005', 'a1a2b3c4-2222-4000-8000-000000000003', 'e1a2b3c4-1111-4000-8000-000000000002', 1, 'ATG squats', '2025-01-17 09:00:00')
  `;

  // Insert sets
  console.log('Inserting sets...');
  await sql`
    INSERT INTO sets (id, workout_exercise_id, set_number, reps, weight, distance, created_at) VALUES
    ('c1a2b3c4-4444-4000-8000-000000000001', 'b1a2b3c4-3333-4000-8000-000000000001', 1, 12, 135, NULL, '2025-01-15 09:05:00'),
    ('c1a2b3c4-4444-4000-8000-000000000002', 'b1a2b3c4-3333-4000-8000-000000000001', 2, 10, 155, NULL, '2025-01-15 09:10:00'),
    ('c1a2b3c4-4444-4000-8000-000000000003', 'b1a2b3c4-3333-4000-8000-000000000001', 3, 8, 175, NULL, '2025-01-15 09:15:00'),
    ('c1a2b3c4-4444-4000-8000-000000000004', 'b1a2b3c4-3333-4000-8000-000000000002', 1, 10, 95, NULL, '2025-01-15 09:35:00'),
    ('c1a2b3c4-4444-4000-8000-000000000005', 'b1a2b3c4-3333-4000-8000-000000000002', 2, 8, 105, NULL, '2025-01-15 09:40:00'),
    ('c1a2b3c4-4444-4000-8000-000000000006', 'b1a2b3c4-3333-4000-8000-000000000003', 1, 5, 225, NULL, '2025-01-16 09:05:00'),
    ('c1a2b3c4-4444-4000-8000-000000000007', 'b1a2b3c4-3333-4000-8000-000000000003', 2, 5, 275, NULL, '2025-01-16 09:12:00'),
    ('c1a2b3c4-4444-4000-8000-000000000008', 'b1a2b3c4-3333-4000-8000-000000000003', 3, 3, 315, NULL, '2025-01-16 09:20:00'),
    ('c1a2b3c4-4444-4000-8000-000000000009', 'b1a2b3c4-3333-4000-8000-000000000004', 1, 10, 135, NULL, '2025-01-16 09:50:00'),
    ('c1a2b3c4-4444-4000-8000-000000000010', 'b1a2b3c4-3333-4000-8000-000000000004', 2, 10, 135, NULL, '2025-01-16 09:55:00'),
    ('c1a2b3c4-4444-4000-8000-000000000011', 'b1a2b3c4-3333-4000-8000-000000000005', 1, 8, 185, NULL, '2025-01-17 09:05:00'),
    ('c1a2b3c4-4444-4000-8000-000000000012', 'b1a2b3c4-3333-4000-8000-000000000005', 2, 6, 225, NULL, '2025-01-17 09:12:00')
  `;

  console.log('✅ Seeding complete!');
  console.log('Summary:');
  console.log('  - 5 exercises');
  console.log('  - 3 workouts (Push Day, Pull Day, Leg Day)');
  console.log('  - 5 workout exercises');
  console.log('  - 12 sets');
}

seed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
  });
