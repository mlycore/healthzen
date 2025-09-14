import React from 'react';
import { View } from '../types';
import { VIEW_TITLES } from '../constants';

interface HeaderProps {
    currentView: View;
}

const Header: React.FC<HeaderProps> = ({ currentView }) => {
    return (
        <header className="bg-white h-20 flex items-center px-4 md:px-8 shadow-sm z-10">
            <h2 className="text-2xl font-semibold text-neutral-800">{VIEW_TITLES[currentView]}</h2>
        </header>
    );
};

export default Header;