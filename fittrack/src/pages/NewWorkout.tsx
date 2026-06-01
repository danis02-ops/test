import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWorkouts } from '../hooks/useWorkouts';
import { useExercises } from '../hooks/useExercises';
import type { WorkoutSet } from '../types';

interface SetDraft {
  id: string;
  reps: string;
  weightKg: string;
}

interface ExerciseDraft {
  uid: string;
  exerciseId: string;
  sets: SetDraft[];
}

export default function NewWorkout() {
  const navigate = useNavigate();
  const { saveWorkout } = useWorkouts();
  const { exercises } = useExercises();
  const [name, setName] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [drafts, setDrafts] = useState<ExerciseDraft[]>([]);

  const addExercise = () => {
    if (exercises.length === 0) return;
    setDrafts(prev => [...prev, {
      uid: crypto.randomUUID(),
      exerciseId: exercises[0].id,
      sets: [{ id: crypto.randomUUID(), reps: '', weightKg: '' }],
    }]);
  };

  const removeExercise = (uid: string) => setDrafts(prev => prev.filter(d => d.uid !== uid));

  const changeExercise = (uid: string, exerciseId: string) =>
    setDrafts(prev => prev.map(d => d.uid === uid ? { ...d, exerciseId } : d));

  const addSet = (uid: string) =>
    setDrafts(prev => prev.map(d =>
      d.uid === uid ? { ...d, sets: [...d.sets, { id: crypto.randomUUID(), reps: '', weightKg: '' }] } : d
    ));

  const removeSet = (uid: string, setId: string) =>
    setDrafts(prev => prev.map(d =>
      d.uid === uid ? { ...d, sets: d.sets.filter(s => s.id !== setId) } : d
    ));

  const updateSet = (uid: string, setId: string, field: 'reps' | 'weightKg', value: string) =>
    setDrafts(prev => prev.map(d =>
      d.uid === uid
        ? { ...d, sets: d.sets.map(s => s.id === setId ? { ...s, [field]: value } : s) }
        : d
    ));

  const save = () => {
    if (!name.trim()) { alert('Bitte einen Namen eingeben.'); return; }
    const sets: WorkoutSet[] = drafts.flatMap((d, _di) =>
      d.sets.map((s, si) => ({
        id: s.id,
        exerciseId: d.exerciseId,
        setNumber: si + 1,
        reps: Number(s.reps) || 0,
        weightKg: Number(s.weightKg) || 0,
      }))
    );
    saveWorkout({ id: crypto.randomUUID(), name: name.trim(), date, sets });
    navigate('/history');
  };

  return (
    <div className="space-y-5">
      <h1 className="text-xl font-bold">Neues Workout</h1>
      <div className="space-y-3">
        <input
          className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
          placeholder="Workout-Name (z.B. Push Day)"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          type="date"
          className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
          value={date}
          onChange={e => setDate(e.target.value)}
        />
      </div>

      {drafts.map(d => (
        <div key={d.uid} className="bg-gray-900 border border-gray-800 rounded-xl p-4 space-y-3">
          <div className="flex items-center gap-2">
            <select
              className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
              value={d.exerciseId}
              onChange={e => changeExercise(d.uid, e.target.value)}
            >
              {exercises.map(ex => <option key={ex.id} value={ex.id}>{ex.name}</option>)}
            </select>
            <button onClick={() => removeExercise(d.uid)} className="text-red-400 hover:text-red-300 text-lg px-1">✕</button>
          </div>
          <div className="space-y-2">
            <div className="grid grid-cols-[2rem_1fr_1fr_1.5rem] gap-2 text-xs text-gray-500 px-1">
              <span>#</span><span>Wdh.</span><span>Gewicht (kg)</span><span></span>
            </div>
            {d.sets.map((s, si) => (
              <div key={s.id} className="grid grid-cols-[2rem_1fr_1fr_1.5rem] gap-2 items-center">
                <span className="text-xs text-gray-500 text-center">{si + 1}</span>
                <input type="number" min="0"
                  className="bg-gray-800 border border-gray-700 rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:border-blue-500"
                  placeholder="12" value={s.reps}
                  onChange={e => updateSet(d.uid, s.id, 'reps', e.target.value)}
                />
                <input type="number" min="0" step="0.5"
                  className="bg-gray-800 border border-gray-700 rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:border-blue-500"
                  placeholder="80" value={s.weightKg}
                  onChange={e => updateSet(d.uid, s.id, 'weightKg', e.target.value)}
                />
                <button onClick={() => d.sets.length > 1 && removeSet(d.uid, s.id)}
                  className="text-gray-600 hover:text-red-400 text-sm">✕</button>
              </div>
            ))}
          </div>
          <button onClick={() => addSet(d.uid)} className="text-blue-400 hover:text-blue-300 text-sm">+ Satz hinzufügen</button>
        </div>
      ))}

      <button onClick={addExercise}
        className="w-full border border-dashed border-gray-700 hover:border-blue-500 rounded-xl py-3 text-sm text-gray-400 hover:text-blue-400 transition-colors">
        + Übung hinzufügen
      </button>
      <button onClick={save}
        className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-xl transition-colors">
        Workout speichern
      </button>
    </div>
  );
}
