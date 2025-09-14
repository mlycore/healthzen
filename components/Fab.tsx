import React from 'react';
import { PlusIcon } from './icons/HealthIcons';

interface FabProps {
  onClick: () => void;
}

const Fab: React.FC<FabProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="absolute bottom-6 right-6 md:bottom-8 md:right-8 bg-indigo-500 text-white w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg hover:bg-indigo-600 transition-all duration-300 transform hover:scale-105 active:scale-95 z-10"
      aria-label="Add new entry"
    >
      <PlusIcon />
    </button>
  );
};

export default Fab;
