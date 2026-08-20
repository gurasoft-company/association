import { Link, useLocation } from 'react-router-dom';

const menuItems = [
  { path: '/', label: '📊 Dashboard' },
  { path: '/projets', label: '📋 Projets' },
  { path: '/dons', label: '💰 Dons' },
  { path: '/benevoles', label: '🤝 Bénévoles' },
  { path: '/besoins', label: '📦 Besoins' },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-gray-800 text-white p-4 overflow-y-auto">
      <div className="text-2xl font-bold mb-8 text-center">Admin</div>
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`block px-4 py-3 rounded-lg transition hover:bg-gray-700 ${
              location.pathname === item.path ? 'bg-gray-700' : ''
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}