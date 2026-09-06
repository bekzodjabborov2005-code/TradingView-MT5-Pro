import React, { useState } from 'react';

/**
 * Trade Screen Component
 * Order placement with lot size, SL/TP, and risk calculation
 */

interface TradeScreenProps {
  symbol: string;
  currentPrice: number;
  change: number;
}

export const TradeScreen: React.FC<TradeScreenProps> = ({
  symbol = 'EURUSD',
  currentPrice = 1.17184,
  change = 0.14,
}) => {
  const [lotSize, setLotSize] = useState(0.1);
  const [stopLoss, setStopLoss] = useState(1.16980);
  const [takeProfit, setTakeProfit] = useState(1.17540);
  const [orderType, setOrderType] = useState<'buy' | 'sell'>('buy');

  // Hisoblash
  const pipValue = Math.abs(currentPrice - stopLoss) * 10000;
  const maxLoss = (pipValue * lotSize * 10).toFixed(2);
  const riskReward = ((takeProfit - currentPrice) / (currentPrice - stopLoss)).toFixed(1);

  const quickLots = [0.01, 0.1, 0.5, 1.0];

  return (
    <div className="pb-24 bg-black min-h-screen">
      {/* Header - Narx va Change */}
      <div className="bg-gray-900 p-4 pt-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">{symbol}</p>
            <p className="text-white text-3xl font-bold">{currentPrice}</p>
          </div>
          <div className={`text-right ${change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            <p className="text-lg font-bold">{change > 0 ? '+' : ''}{change}%</p>
            <div className="w-16 h-8 bg-green-900 rounded"></div>
          </div>
        </div>
      </div>

      {/* Buyurtma turi */}
      <div className="p-4 space-y-3">
        <div className="flex gap-2">
          {['Bozor', 'Limit', 'Stop', 'Stop-Limit'].map((type) => (
            <button
              key={type}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                type === 'Bozor'
                  ? 'bg-white text-black'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Buy/Sell Tugmalari */}
      <div className="px-4 flex gap-3 mb-4">
        <button
          onClick={() => setOrderType('buy')}
          className={`flex-1 py-4 rounded-lg font-bold text-lg transition-all ${
            orderType === 'buy'
              ? 'bg-green-600 text-white'
              : 'bg-gray-800 text-gray-400 border border-green-600'
          }`}
        >
          ▲ SOTIB OLING {currentPrice}
        </button>
        <button
          onClick={() => setOrderType('sell')}
          className={`flex-1 py-4 rounded-lg font-bold text-lg transition-all ${
            orderType === 'sell'
              ? 'bg-red-600 text-white'
              : 'bg-gray-800 text-gray-400 border border-red-600'
          }`}
        >
          ▼ SOTISH {currentPrice}
        </button>
      </div>

      {/* Lot Hajmi */}
      <div className="px-4 mb-4">
        <p className="text-gray-400 text-sm mb-2">Lot Hajmi</p>
        <div className="flex items-center gap-3 bg-gray-800 rounded-lg p-3">
          <button className="text-white text-2xl w-10 h-10 bg-gray-700 rounded hover:bg-gray-600">
            −
          </button>
          <input
            type="number"
            value={lotSize}
            onChange={(e) => setLotSize(parseFloat(e.target.value))}
            className="flex-1 bg-transparent text-white text-2xl font-bold text-center outline-none"
          />
          <button className="text-white text-2xl w-10 h-10 bg-gray-700 rounded hover:bg-gray-600">
            +
          </button>
        </div>

        {/* Tez tanlash */}
        <div className="flex gap-2 mt-3">
          {quickLots.map((lot) => (
            <button
              key={lot}
              onClick={() => setLotSize(lot)}
              className={`flex-1 py-2 rounded text-sm font-medium transition-all ${
                lotSize === lot
                  ? 'bg-white text-black'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              {lot}
            </button>
          ))}
        </div>
      </div>

      {/* Stop Loss va Take Profit */}
      <div className="px-4 space-y-3 mb-4">
        <div>
          <p className="text-red-400 text-sm mb-2">Yo'qotishni to'xtatish (SL)</p>
          <input
            type="number"
            value={stopLoss}
            onChange={(e) => setStopLoss(parseFloat(e.target.value))}
            className="w-full bg-gray-800 border border-red-600 rounded-lg p-3 text-white font-bold outline-none focus:border-red-400"
          />
        </div>

        <div>
          <p className="text-green-400 text-sm mb-2">Foyda oling (TP)</p>
          <input
            type="number"
            value={takeProfit}
            onChange={(e) => setTakeProfit(parseFloat(e.target.value))}
            className="w-full bg-gray-800 border border-green-600 rounded-lg p-3 text-white font-bold outline-none focus:border-green-400"
          />
        </div>
      </div>

      {/* Risk/Reward va Maksimal Zarar */}
      <div className="px-4 flex gap-3 mb-4">
        <div className="flex-1 bg-gray-800 rounded-lg p-3">
          <p className="text-gray-400 text-xs mb-1">Xavf/Foyda</p>
          <p className="text-white text-xl font-bold">1:{riskReward}</p>
        </div>
        <div className="flex-1 bg-gray-800 rounded-lg p-3">
          <p className="text-gray-400 text-xs mb-1">Maks. Zarar</p>
          <p className="text-red-400 text-xl font-bold">−${maxLoss}</p>
        </div>
      </div>

      {/* Asosiy Tugma */}
      <div className="px-4 mb-4">
        <button
          className={`w-full py-4 rounded-lg font-bold text-lg text-white transition-all ${
            orderType === 'buy'
              ? 'bg-green-600 hover:bg-green-700'
              : 'bg-red-600 hover:bg-red-700'
          }`}
        >
          ⚡ {orderType === 'buy' ? 'SOTIB OLING' : 'SOTISH'} {symbol} Bozor
        </button>
      </div>

      {/* Ochiq Pozitsiyalar */}
      <div className="px-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-white font-bold">Ochiq Pozitsiyalar (2)</h2>
          <button className="text-red-400 text-sm hover:text-red-300">Hammasini yopish</button>
        </div>

        {/* Pozitsiya 1 */}
        <div className="bg-gray-800 rounded-lg p-3 mb-2">
          <div className="flex justify-between items-center mb-2">
            <div>
              <p className="text-white font-bold">EURUSD</p>
              <p className="text-gray-400 text-xs">0.10 lot</p>
            </div>
            <p className="text-green-400 font-bold">+9.20$</p>
          </div>
          <div className="grid grid-cols-4 gap-2 text-xs mb-2">
            <div className="bg-gray-700 p-2 rounded">
              <p className="text-gray-400">Kir</p>
              <p className="text-white font-bold">1.17092</p>
            </div>
            <div className="bg-gray-700 p-2 rounded">
              <p className="text-gray-400">SL</p>
              <p className="text-white font-bold">1.16980</p>
            </div>
            <div className="bg-gray-700 p-2 rounded">
              <p className="text-gray-400">TP</p>
              <p className="text-white font-bold">1.17540</p>
            </div>
            <div className="bg-gray-700 p-2 rounded">
              <p className="text-gray-400">Vaqt</p>
              <p className="text-white font-bold">08:42</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="flex-1 text-sm py-2 rounded border border-gray-600 text-gray-300 hover:bg-gray-700">
              SL/TP Edit
            </button>
            <button className="flex-1 text-sm py-2 rounded bg-red-600 text-white hover:bg-red-700">
              Yop
            </button>
          </div>
        </div>

        {/* Pozitsiya 2 */}
        <div className="bg-gray-800 rounded-lg p-3">
          <div className="flex justify-between items-center mb-2">
            <div>
              <p className="text-white font-bold">XAUUSD</p>
              <p className="text-gray-400 text-xs">0.02 lot</p>
            </div>
            <p className="text-green-400 font-bold">+6.40$</p>
          </div>
          <div className="grid grid-cols-4 gap-2 text-xs mb-2">
            <div className="bg-gray-700 p-2 rounded">
              <p className="text-gray-400">Kir</p>
              <p className="text-white font-bold">3550.40</p>
            </div>
            <div className="bg-gray-700 p-2 rounded">
              <p className="text-gray-400">SL</p>
              <p className="text-white font-bold">3560.00</p>
            </div>
            <div className="bg-gray-700 p-2 rounded">
              <p className="text-gray-400">TP</p>
              <p className="text-white font-bold">3530.00</p>
            </div>
            <div className="bg-gray-700 p-2 rounded">
              <p className="text-gray-400">Vaqt</p>
              <p className="text-white font-bold">09:10</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="flex-1 text-sm py-2 rounded border border-gray-600 text-gray-300 hover:bg-gray-700">
              SL/TP Edit
            </button>
            <button className="flex-1 text-sm py-2 rounded bg-red-600 text-white hover:bg-red-700">
              Yop
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
