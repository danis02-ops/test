import { useNavigate } from 'react-router-dom';
import { useWorkouts } from '../hooks/useWorkouts';
import { useExercises } from '../hooks/useExercises';

export default function History() {
  const { workouts, deleteWorkout } = useWorkouts();
  const { exercises } = useExercises();
  const navigate = useNavigate();
  const sorted = [...workouts].sort((a, b) => b.date.localeCompare(a.date));

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Workout wirklich löschen?')) deleteWorkout(id);
  };

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Workout-Historie</h1>
      {sorted.length === 0 ? (
        <div className="text-center text-gray-500 py-16">
          <p className="text-4xl mb-3">📋</p>
          <p className="font-medium">Keine Workouts vorhanden</p>
          <p className="text-sm mt-1">Starte dein erstes Workout!</p>
        </div>
      ) : sorted.map(w => {
        const exIds = [...new Set(w.sets.map(s => s.exerciseId))];
        const volume = w.sets.reduce((acc, s) => acc + s.reps * s.weightKg, 0);
        return (
          <button key={w.id} onClick={() => navigate(`/workout/${w.id}`)}
            className="w-full bg-gray-900 border border-gray-800 rounded-xl p-4 text-left hover:border-blue-600 transition-colors">
            <div className="flex justify-between items-start">
              <div className="flex-1 min-w-0">
                <p className="font-semibold truncate">{w.name}</p>
                <p className="text-sm text-gray-400 mt-0.5">
                  {exIds.map(id => exercises.find(e => e.id === id)?.name).filter(Boolean).join(', ')}
                </p>
                <p className="text-xs text-blue-400 mt-1">{volume.toLocaleString('de-DE')} kg Volumen</p>
              </div>
              <div className="flex flex-col items-end gap-2 ml-3 shrink-0">
                <p className="text-xs text-gray-500">{new Date(w.date).toLocaleDateString('de-DE')}</p>
                <button onClick={e => handleDelete(w.id, e)}
                  className="text-xs text-gray-600 hover:text-red-400 transition-colors">Löschen</button>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
