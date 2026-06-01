import { useParams, useNavigate } from 'react-router-dom';
import { useWorkouts } from '../hooks/useWorkouts';
import { useExercises } from '../hooks/useExercises';

export default function WorkoutDetail() {
  const { id } = useParams<{ id: string }>();
  const { workouts } = useWorkouts();
  const { exercises } = useExercises();
  const navigate = useNavigate();
  const workout = workouts.find(w => w.id === id);

  if (!workout) return (
    <div className="text-center text-gray-500 py-16">
      <p>Workout nicht gefunden.</p>
      <button onClick={() => navigate('/history')} className="text-blue-400 mt-2 text-sm">← Zurück</button>
    </div>
  );

  const exIds = [...new Set(workout.sets.map(s => s.exerciseId))];

  return (
    <div className="space-y-5">
      <button onClick={() => navigate(-1)} className="text-blue-400 text-sm">← Zurück</button>
      <div>
        <h1 className="text-xl font-bold">{workout.name}</h1>
        <p className="text-sm text-gray-400">
          {new Date(workout.date).toLocaleDateString('de-DE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>
      {exIds.map(exId => {
        const ex = exercises.find(e => e.id === exId);
        const sets = workout.sets.filter(s => s.exerciseId === exId);
        return (
          <div key={exId} className="bg-gray-900 border border-gray-800 rounded-xl p-4 space-y-3">
            <div className="flex justify-between items-center">
              <p className="font-semibold">{ex?.name ?? 'Unbekannte Übung'}</p>
              <span className="text-xs text-gray-500 bg-gray-800 px-2 py-0.5 rounded-full">{ex?.category}</span>
            </div>
            <div className="space-y-1">
              <div className="grid grid-cols-3 text-xs text-gray-500 px-1">
                <span>Satz</span><span>Wdh.</span><span>Gewicht</span>
              </div>
              {sets.map(s => (
                <div key={s.id} className="grid grid-cols-3 text-sm bg-gray-800 rounded-lg px-3 py-2">
                  <span className="text-gray-400">{s.setNumber}</span>
                  <span>{s.reps}</span>
                  <span>{s.weightKg} kg</span>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
