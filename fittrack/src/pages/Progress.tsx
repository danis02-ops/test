import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useWorkouts } from '../hooks/useWorkouts';
import { useExercises } from '../hooks/useExercises';

export default function Progress() {
  const { workouts } = useWorkouts();
  const { exercises } = useExercises();
  const [selectedId, setSelectedId] = useState(exercises[0]?.id ?? '');

  const usedIds = [...new Set(workouts.flatMap(w => w.sets.map(s => s.exerciseId)))];
  const available = exercises.filter(e => usedIds.includes(e.id));

  const data = workouts
    .filter(w => w.sets.some(s => s.exerciseId === selectedId))
    .map(w => {
      const maxWeight = Math.max(...w.sets.filter(s => s.exerciseId === selectedId).map(s => s.weightKg));
      return {
        date: w.date,
        maxWeight,
        label: new Date(w.date).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit' }),
      };
    })
    .sort((a, b) => a.date.localeCompare(b.date));

  return (
    <div className="space-y-5">
      <h1 className="text-xl font-bold">Fortschritt</h1>
      {available.length === 0 ? (
        <div className="text-center text-gray-500 py-16">
          <p className="text-4xl mb-3">📈</p>
          <p>Noch keine Daten vorhanden.</p>
        </div>
      ) : (
        <>
          <select
            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
            value={selectedId}
            onChange={e => setSelectedId(e.target.value)}
          >
            {available.map(ex => <option key={ex.id} value={ex.id}>{ex.name}</option>)}
          </select>
          {data.length > 0 ? (
            <>
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
                <p className="text-xs text-gray-500 mb-3">Max. Gewicht (kg)</p>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="label" tick={{ fill: '#9CA3AF', fontSize: 11 }} />
                    <YAxis tick={{ fill: '#9CA3AF', fontSize: 11 }} />
                    <Tooltip
                      contentStyle={{ background: '#111827', border: '1px solid #374151', borderRadius: 8 }}
                      labelStyle={{ color: '#9CA3AF' }}
                      itemStyle={{ color: '#60A5FA' }}
                      formatter={(v) => [`${v ?? 0} kg`, 'Max. Gewicht']}
                    />
                    <Line type="monotone" dataKey="maxWeight" stroke="#3B82F6" strokeWidth={2} dot={{ fill: '#3B82F6' }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
                <div className="grid grid-cols-3 text-xs text-gray-500 px-4 py-2 border-b border-gray-800">
                  <span>Datum</span><span>Max. Gewicht</span><span>Sätze</span>
                </div>
                {[...data].reverse().map((d, i) => (
                  <div key={i} className="grid grid-cols-3 text-sm px-4 py-2 border-b border-gray-800 last:border-0">
                    <span>{d.label}</span>
                    <span className="text-blue-400">{d.maxWeight} kg</span>
                    <span className="text-gray-400">
                      {workouts.find(w => w.date === d.date)?.sets.filter(s => s.exerciseId === selectedId).length ?? 0}
                    </span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p className="text-center text-gray-500 py-8">Keine Daten für diese Übung.</p>
          )}
        </>
      )}
    </div>
  );
}
