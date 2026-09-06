import React from 'react';

/**
 * Home Screen Component
 * Dashboard with balance, P&L, open positions, and economic calendar
 */

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  changeColor: 'green' | 'red';
  subtitle?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, changeColor, subtitle }) => (
  <div className="bg-gray-800 rounded-lg p-4 flex-1">
    <p className="text-gray-400 text-sm mb-2">{title}</p>
    <p className="text-white text-2xl font-bold">{value}</p>
    <p className={`text-sm ${changeColor === 'green' ? 'text-green-400' : 'text-red-400'}`}>
      {change}
    </p>
    {subtitle && <p className="text-gray-500 text-xs mt-1">{subtitle}</p>}
  </div>
);

interface HomeScreenProps {
  balance: number;
  equity: number;
  todayPL: number;
  dailyRiskUsed: number;
  openPositions: number;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  balance,
  equity,
  todayPL,
  dailyRiskUsed,
  openPositions,
}) => {
  return (
    <div className="pb-20 bg-black min-h-screen">
      {/* Header */}
      <div className="bg-gray-900 p-4 pt-6">
        <p className="text-gray-400 text-sm">Xush kelibsiz</p>
        <h1 className="text-white text-2xl font-bold mt-2">Azizbek ✨</h1>
      </div>

      {/* Main Stats */}
      <div className="p-4 space-y-3">
        {/* Row 1 */}
        <div className="flex gap-3">
          <StatCard
            title="Balans"
            value={`$${balance.toLocaleString()}`}
            change="+2.84% bu oy"
            changeColor="green"
          />
          <StatCard
            title="Kapital"
            value={`$${equity.toLocaleString()}`}
            change="+$246.80"
            changeColor="green"
          />
        </div>

        {/* Row 2 */}
        <div className="flex gap-3">
          <StatCard
            title="Bugungi Foyda/Zarar"
            value={`$${todayPL}`}
            change="+0.86%"
            changeColor="green"
            subtitle="Bugun"
          />
          <StatCard
            title="Kunlik Xavf"
            value={`${dailyRiskUsed.toFixed(1)}%`}
            change="5% chegarasidan"
            changeColor="green"
            subtitle="42% ishlatildi"
          />
        </div>
      </div>

      {/* Warning Alert */}
      <div className="mx-4 mt-4 bg-yellow-900 bg-opacity-30 border border-yellow-600 rounded-lg p-3">
        <p className="text-yellow-400 text-sm">
          ⚠️ News Fader yuqori ta'sirli USD yangiliklaridan oldin avtomatik ravishda pauza qildi.
        </p>
        <a href="#" className="text-yellow-300 text-xs mt-2 inline-block underline">
          EA ni ko'rish ›
        </a>
      </div>

      {/* Quick Status */}
      <div className="mx-4 mt-6">
        <h2 className="text-white font-bold mb-3">Bugun bir qarashda</h2>
        <div className="space-y-2">
          <div className="bg-gray-800 p-3 rounded-lg flex items-center justify-between hover:bg-gray-700 cursor-pointer">
            <div className="flex items-center gap-3">
              <span className="text-xl">📊</span>
              <span className="text-white text-sm">{openPositions} ta ochiq pozitsiya</span>
            </div>
            <span className="text-gray-400">›</span>
          </div>
          <div className="bg-gray-800 p-3 rounded-lg flex items-center justify-between hover:bg-gray-700 cursor-pointer">
            <div className="flex items-center gap-3">
              <span className="text-xl">🤖</span>
              <span className="text-white text-sm">2 ta faol EA</span>
            </div>
            <span className="text-gray-400">›</span>
          </div>
          <div className="bg-gray-800 p-3 rounded-lg flex items-center justify-between hover:bg-gray-700 cursor-pointer">
            <div className="flex items-center gap-3">
              <span className="text-xl">📡</span>
              <span className="text-white text-sm">Sog'lom MT5 ulanishi</span>
            </div>
            <span className="text-gray-400">›</span>
          </div>
        </div>
      </div>

      {/* Economic Calendar */}
      <div className="mx-4 mt-6 pb-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-white font-bold">Yuqori ta'sirga ega taqvim</h2>
          <a href="#" className="text-blue-400 text-xs">Barcha tadbirlar ›</a>
        </div>
        <div className="space-y-2">
          <div className="bg-gray-800 p-3 rounded-lg text-sm">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-gray-400">09:30</span>
              <span className="bg-blue-600 text-white px-2 py-0.5 rounded text-xs">USD</span>
            </div>
            <p className="text-gray-300 text-xs">Fermer xo'jaligidan tashqari ish ta'minlash</p>
            <p className="text-green-400 text-xs mt-1">162 ming</p>
          </div>
          <div className="bg-gray-800 p-3 rounded-lg text-sm">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-gray-400">11:00</span>
              <span className="bg-blue-600 text-white px-2 py-0.5 rounded text-xs">USD</span>
            </div>
            <p className="text-gray-300 text-xs">ISM xizmatlari PMI</p>
            <p className="text-green-400 text-xs mt-1">55.4</p>
          </div>
        </div>
      </div>
    </div>
  );
};
