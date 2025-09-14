import React from 'react';
import { View } from '../types';
import { NAV_ITEMS } from '../constants';

interface SidebarProps {
  currentView: View;
  setView: (view: View) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView }) => {
  return (
    <nav className="bg-white w-20 lg:w-64 hidden md:flex flex-col h-full shadow-lg border-r border-neutral-200">
      <div className="flex items-center justify-center lg:justify-start lg:pl-6 h-20 border-b border-neutral-200">
        <div className="bg-indigo-500 rounded-full h-10 w-10 flex items-center justify-center">
          <span className="text-white font-bold text-2xl">H</span>
        </div>
        <h1 className="hidden lg:block ml-4 text-2xl font-bold text-neutral-800">HealthZen</h1>
      </div>
      <ul className="flex-1 flex flex-col items-center lg:items-stretch py-4">
        {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
          <li key={id} className="px-3 py-2">
            <button
              onClick={() => setView(id)}
              className={`flex items-center justify-center lg:justify-start w-full p-3 rounded-lg transition-colors duration-200 group ${
                currentView === id
                  ? 'text-indigo-600'
                  : 'text-neutral-500 hover:bg-neutral-100 hover:text-neutral-800'
              }`}
            >
              <div className={`relative flex items-center justify-center p-2 rounded-full transition-colors ${currentView === id ? 'bg-indigo-100' : ''}`}>
                 <Icon />
              </div>
              <span className={`hidden lg:inline ml-4 font-semibold ${currentView === id ? 'text-indigo-600' : 'text-neutral-700 group-hover:text-neutral-900'}`}>{label}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;