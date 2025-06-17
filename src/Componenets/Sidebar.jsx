import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => setIsOpen(prev => !prev);

  const navItems = [
    { to: '/home', label: 'Home' },
    { to: '/home/upload', label: 'Upload' },
    { to: '/home/settings', label: 'Settings' },
  ];

  return (
    <div className="relative h-screen flex">
      {/* Sidebar (absolute, doesn't push content) */}
      <div
        className={`bg-gray-800 text-white fixed top-0 left-0 h-full transition-all duration-300 z-20 ${
          isOpen ? 'w-48' : 'w-0 overflow-hidden'
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <span className="text-lg font-bold">Menu</span>
          <button onClick={toggleSidebar} className="text-sm">×</button>
        </div>
        <nav className="flex flex-col p-4 space-y-2">
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `px-3 py-2 rounded hover:bg-gray-700 ${isActive ? 'bg-gray-700' : ''}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Main content wrapper */}
      <div className={`flex-1 transition-all duration-300 ${isOpen ? 'ml-48' : 'ml-0'}`}>
        <header className="bg-white shadow px-4 py-3">
          <button onClick={toggleSidebar} className="text-gray-800 font-bold">☰</button>
        </header>
        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Sidebar;
