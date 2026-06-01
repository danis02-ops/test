export type ExerciseCategory = 'Brust' | 'Rücken' | 'Beine' | 'Schultern' | 'Arme' | 'Bauch' | 'Sonstiges';

export interface Exercise {
  id: string;
  name: string;
  category: ExerciseCategory;
}

export interface WorkoutSet {
  id: string;
  exerciseId: string;
  setNumber: number;
  reps: number;
  weightKg: number;
}

export interface Workout {
  id: string;
  name: string;
  date: string;
  sets: WorkoutSet[];
}
