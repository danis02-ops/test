import { useNavigate } from 'react-router-dom';
import { useWorkouts } from '../hooks/useWorkouts';
import { useExercises } from '../hooks/useExercises';

export default function Dashboard() {
  const { workouts } = useWorkouts();
  const { exercises } = useExercises();
  const navigate = useNavigate();

  const recent = [...workouts]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Dashboard</h1>
        <button
          onClick={() => navigate('/workout/new')}
          className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          + Workout starten
        </button>
      </div>

      {recent.length === 0 ? (
        <div className="text-center text-gray-500 py-16">
          <p className="text-4xl mb-3">🏋️</p>
          <p className="font-medium">Noch keine Workouts</p>
          <p className="text-sm mt-1">Starte dein erstes Training!</p>
        </div>
      ) : (
        <div className="space-y-3">
          <h2 className="text-sm text-gray-400 font-medium uppercase tracking-wide">Letzte Workouts</h2>
          {recent.map(w => {
            const exIds = [...new Set(w.sets.map(s => s.exerciseId))];
            const volume = w.sets.reduce((acc, s) => acc + s.reps * s.weightKg, 0);
            return (
              <button
                key={w.id}
                onClick={() => navigate(`/workout/${w.id}`)}
                className="w-full bg-gray-900 border border-gray-800 rounded-xl p-4 text-left hover:border-blue-600 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold">{w.name}</p>
                    <p className="text-sm text-gray-400 mt-0.5">{exIds.length} Übung{exIds.length !== 1 ? 'en' : ''}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">{new Date(w.date).toLocaleDateString('de-DE')}</p>
                    <p className="text-xs text-blue-400 mt-0.5">{volume.toLocaleString('de-DE')} kg Vol.</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
          <p className="text-2xl font-bold text-blue-400">{workouts.length}</p>
          <p className="text-sm text-gray-400">Workouts gesamt</p>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
          <p className="text-2xl font-bold text-blue-400">{exercises.length}</p>
          <p className="text-sm text-gray-400">Übungen</p>
        </div>
      </div>
    </div>
  );
}
