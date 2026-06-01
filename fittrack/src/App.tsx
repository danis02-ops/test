import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import NewWorkout from './pages/NewWorkout';
import History from './pages/History';
import WorkoutDetail from './pages/WorkoutDetail';
import Progress from './pages/Progress';
import Exercises from './pages/Exercises';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/workout/new" element={<NewWorkout />} />
          <Route path="/workout/:id" element={<WorkoutDetail />} />
          <Route path="/history" element={<History />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/exercises" element={<Exercises />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
