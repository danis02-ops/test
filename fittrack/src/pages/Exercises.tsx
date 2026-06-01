import { useState } from 'react';
import { useExercises } from '../hooks/useExercises';
import { useWorkouts } from '../hooks/useWorkouts';
import type { ExerciseCategory } from '../types';

const CATEGORIES: ExerciseCategory[] = ['Brust','Rücken','Beine','Schultern','Arme','Bauch','Sonstiges'];

export default function Exercises() {
  const { exercises, addExercise, deleteExercise } = useExercises();
  const { workouts } = useWorkouts();
  const [newName, setNewName] = useState('');
  const [newCat, setNewCat] = useState<ExerciseCategory>('Sonstiges');
  const [filter, setFilter] = useState('');

  const usedIds = new Set(workouts.flatMap(w => w.sets.map(s => s.exerciseId)));
  const filtered = exercises.filter(e => e.name.toLowerCase().includes(filter.toLowerCase()));
  const byCategory = CATEGORIES.map(cat => ({ cat, items: filtered.filter(e => e.category === cat) })).filter(g => g.items.length > 0);

  const handleAdd = () => {
    if (!newName.trim()) return;
    addExercise({ name: newName.trim(), category: newCat });
    setNewName('');
  };

  return (
    <div className="space-y-5">
      <h1 className="text-xl font-bold">Übungs-Bibliothek</h1>
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 space-y-3">
        <p className="text-sm font-medium text-gray-400">Neue Übung</p>
        <input
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
          placeholder="Name der Übung"
          value={newName}
          onChange={e => setNewName(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleAdd()}
        />
        <div className="flex gap-2">
          <select
            className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
            value={newCat}
            onChange={e => setNewCat(e.target.value as ExerciseCategory)}
          >
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <button onClick={handleAdd}
            className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
            Hinzufügen
          </button>
        </div>
      </div>
      <input
        className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
        placeholder="Übungen durchsuchen..."
        value={filter}
        onChange={e => setFilter(e.target.value)}
      />
      {byCategory.map(({ cat, items }) => (
        <div key={cat} className="space-y-1">
          <p className="text-xs text-gray-500 font-medium uppercase tracking-wide px-1">{cat}</p>
          {items.map(ex => (
            <div key={ex.id} className="flex items-center justify-between bg-gray-900 border border-gray-800 rounded-lg px-4 py-2.5">
              <span className="text-sm">{ex.name}</span>
              {!usedIds.has(ex.id) && (
                <button onClick={() => deleteExercise(ex.id)}
                  className="text-xs text-gray-600 hover:text-red-400 transition-colors">Löschen</button>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
