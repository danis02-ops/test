import { NavLink, Outlet } from 'react-router-dom';

const links = [
  { to: '/',           label: 'Home'        },
  { to: '/history',    label: 'Historie'    },
  { to: '/progress',   label: 'Fortschritt' },
  { to: '/exercises',  label: 'Übungen'     },
];

export default function Layout() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col items-center">
      <div className="w-full max-w-lg flex flex-col min-h-screen">
        <header className="px-4 py-3 bg-gray-900 border-b border-gray-800 flex items-center gap-2">
          <span className="text-blue-500 font-bold text-lg">💪 FitTrack</span>
        </header>
        <main className="flex-1 p-4">
          <Outlet />
        </main>
        <nav className="bg-gray-900 border-t border-gray-800 flex">
          {links.map(l => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                `flex-1 text-center py-3 text-xs font-medium transition-colors ${
                  isActive ? 'text-blue-400' : 'text-gray-500 hover:text-gray-300'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
}
