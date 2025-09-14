import React from 'react';
import { View } from '../types';
import { NAV_ITEMS } from '../constants';

interface BottomNavProps {
  currentView: View;
  setView: (view: View) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ currentView, setView }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 h-20 bg-white border-t border-neutral-200 flex md:hidden justify-around items-center z-20">
      {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => setView(id)}
          className={`flex flex-col items-center justify-center w-full h-full transition-colors duration-200 ${
            currentView === id ? 'text-indigo-600' : 'text-neutral-500'
          }`}
        >
          <div className={`p-2 rounded-full transition-colors ${currentView === id ? 'bg-indigo-100' : ''}`}>
             <Icon />
          </div>
          <span className="text-xs font-semibold mt-1">{label}</span>
        </button>
      ))}
    </nav>
  );
};

export default BottomNav;
