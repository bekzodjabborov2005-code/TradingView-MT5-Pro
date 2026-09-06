import React, { useState } from 'react';

/**
 * Navigation Bar Component
 * Bottom navigation with 5 tabs: Home, Analysis, Trade, EA, Account
 */
interface NavItem {
  id: string;
  label: string;
  icon: string;
  badge?: number;
}

interface NavigationBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const NavigationBar: React.FC<NavigationBarProps> = ({ activeTab, onTabChange }) => {
  const navItems: NavItem[] = [
    { id: 'home', label: 'Uy', icon: '🏠' },
    { id: 'analysis', label: 'Tahlil', icon: '📈' },
    { id: 'trade', label: 'Savdo', icon: '💼', badge: 2 },
    { id: 'ea', label: 'EA', icon: '🤖' },
    { id: 'account', label: 'Hisob', icon: '👤' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 px-4 py-3">
      <div className="flex justify-around items-center">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all ${
              activeTab === item.id
                ? 'bg-white bg-opacity-10'
                : 'hover:bg-gray-800'
            }`}
          >
            <span className="text-2xl">{item.icon}</span>
            <span className="text-xs text-gray-400">{item.label}</span>
            {item.badge && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {item.badge}
              </span>
            )}
          </button>
        ))}
      </div>
    </nav>
  );
};
