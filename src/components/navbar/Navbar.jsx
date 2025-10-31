import { NavLink } from 'react-router-dom'

export default function Navbar() {
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'Pesan', path: '/pesan' },
    { name: 'Histori', path: '/history' },
    { name: 'About', path: '/about' },
  ];

  // Navbar: neutral white header with black text; active link turns blue
  const base = 'text-black hover:text-blue-600 transition px-3 py-1 rounded';
  const active = 'text-blue-600 bg-blue-50 font-semibold ring-1 ring-blue-100/40';

  return (
    <nav className="bg-white text-blue-950">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
        <h1 className="text-xl font-bold tracking-wide text-blue-950">Griyo Dahar</h1>

        <div className="flex gap-2 items-center">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) => `${base} ${isActive ? active : ''}`}
              aria-current={({ isActive }) => (isActive ? 'page' : undefined)}
            >
              {({ isActive }) => (
                <span className="flex items-center">
                  <span
                    className={`w-2 h-2 rounded-full mr-2 transition-colors duration-150 ${
                      isActive ? 'bg-blue-500 animate-bounce' : 'bg-transparent'
                    }`} 
                    aria-hidden
                  />
                  {item.name}
                </span>
              )}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  )
}
