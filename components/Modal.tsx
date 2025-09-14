import React, { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-xl w-full max-w-md m-4 relative animate-fade-in-up"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6">
           <h3 className="text-xl font-semibold text-neutral-800">{title}</h3>
        </div>

        <div className="px-6 pb-2">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;