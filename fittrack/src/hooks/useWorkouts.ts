import { useState, useEffect } from 'react';
import type { Workout } from '../types';

const KEY = 'ft_workouts';

export function useWorkouts() {
  const [workouts, setWorkouts] = useState<Workout[]>(() => {
    const stored = localStorage.getItem(KEY);
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(workouts));
  }, [workouts]);

  const saveWorkout = (w: Workout) => {
    setWorkouts(prev => {
      const idx = prev.findIndex(x => x.id === w.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = w;
        return next;
      }
      return [...prev, w];
    });
  };

  const deleteWorkout = (id: string) => {
    setWorkouts(prev => prev.filter(w => w.id !== id));
  };

  return { workouts, saveWorkout, deleteWorkout };
}
