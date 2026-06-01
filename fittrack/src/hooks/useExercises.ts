import { useState, useEffect } from 'react';
import type { Exercise } from '../types';
import { defaultExercises } from '../data/defaultExercises';

const KEY = 'ft_exercises';

export function useExercises() {
  const [exercises, setExercises] = useState<Exercise[]>(() => {
    const stored = localStorage.getItem(KEY);
    return stored ? JSON.parse(stored) : defaultExercises;
  });

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(exercises));
  }, [exercises]);

  const addExercise = (ex: Omit<Exercise, 'id'>) => {
    setExercises(prev => [...prev, { ...ex, id: crypto.randomUUID() }]);
  };

  const deleteExercise = (id: string) => {
    setExercises(prev => prev.filter(e => e.id !== id));
  };

  return { exercises, addExercise, deleteExercise };
}
