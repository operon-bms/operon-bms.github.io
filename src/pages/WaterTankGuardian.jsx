import { useState } from 'react';
import { Droplets, AlertTriangle, CheckCircle, TrendingUp, TrendingDown, Clock, Wrench } from 'lucide-react';

export default function WaterTankGuardian() {
  const [showOverflowAlert, setShowOverflowAlert] = useState(true);

  const tanks = [
    {
      id: 'rooftop-a',
      name: 'Rooftop Tank A',
      building: 'One Taikoo Place',
      level: 78,
      status: 'normal',
      fillRate: 2.3,
      estFull: 10.8,
      lastOverflow: 'Never',
      capacity: '50,000L',
    },
    {
      id: 'rooftop-b',
      name: 'Rooftop Tank B',
      building: 'One Taikoo Place',
      level: 45,
      status: 'normal',
      fillRate: 1.1,
      estFull: 24.1,
      lastOverflow: 'Never',
      capacity: '50,000L',
    },
    {
      id: 'break-tank',
      name: 'Break Tank (Basement)',
      building: 'One Taikoo Place',
      level: 62,
      status: 'normal',
      fillRate: 3.2,
      estFull: 8.2,
      lastOverflow: 'Never',
      capacity: '120,000L',
      pumpStatus: 'Running',
    },
    {
      id: 'pacific-rooftop',
      name: 'Rooftop Tank',
      building: 'Pacific Centre',
      level: 91,
      status: 'overflow-risk',
      fillRate: 8.7,
      normalFillRate: 2.1,
      estOverflow: 52,
      lastOverflow: 'Never',
      capacity: '80,000L',
      diagnosis: 'Float valve stuck open',
      autoAction: 'Backup shutoff triggered',
    },
  ];

  const waterQuality = {
    building: 'One Taikoo Place',
    lastTested: '8 Mar 2026',
    nextTest: '11 Apr 2026',
    parameters: [
      { name: 'Turbidity', value: 0.3, unit: 'NTU', limit: 5, status: 'ok' },
      { name: 'Residual Chlorine', value: 0.2, unit: 'mg/L', limit: '≥0.2', status: 'ok' },
      { name: 'pH', value: 7.4, unit: '', limit: '6.5–9.5', status: 'ok' },
      { name: 'E.coli', value: 'Not detected', unit: '', limit: 'Not detected', status: 'ok' },
    ],
  };

  const consumptionAnomaly = {
    building: 'Pacific Centre',
    avg30days: 18400,
    avg7days: 24100,
    increase: 31,
    overnightActual: 3200,
    overnightExpected: '400–600',
    diagnosis: 'Probable pipe leak or running fixture',
    estimatedLoss: 4200,
  };

  const getLevelColor = (level, status) => {
    if (status === 'overflow-risk') return 'bg-red-500';
    if (level > 85) return 'bg-amber-500';
    if (level > 70) return 'bg-blue-400';
    return 'bg-blue-500';
  };

  const getStatusBadge = (status) => {
    if (status === 'overflow-risk') return 'bg-red-100 text-red-700 border-red-200';
    if (status === 'normal') return 'bg-emerald-100 text-emerald-700 border-emerald-200';
    return 'bg-gray-100 text-gray-700 border-gray-200';
  };

  return (
    <div className="animate-fade-in max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Intelligent Water Tank Guardian</h1>
        <p className="text-sm text-gray-500">Real-time overflow prevention and water quality compliance — Hong Kong WSD compliant</p>
      </div>

      {/* Overflow alert */}
      {showOverflowAlert && (
        <div className="bg-gradient-to-r from-red-50 to-amber-50 border-2 border-red-300 rounded-xl p-6 mb-6 animate-fade-in">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center shrink-0">
              <AlertTriangle size={24} className="text-red-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-bold text-red-900">Overflow Risk Detected — Pacific Centre Rooftop Tank</h2>
                <button
                  onClick={() => setShowOverflowAlert(false)}
                  className="text-red-400 hover:text-red-600"
                >
                  ×
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-red-800 mb-2">
                    <span className="font-semibold">Current level:</span> 91% (normal shutoff: 85%)
                  </p>
                  <p className="text-sm text-red-800">
                    <span className="font-semibold">Fill rate:</span> {consumptionAnomaly.building === 'Pacific Centre' ? '8.7' : '2.3'}%/hr abnormally high
                  </p>
                  <p className="text-xs text-red-700 mt-1">
                    Normal fill rate: +2.1%/hr
                  </p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-red-900 mb-2">DIAGNOSIS</p>
                  <p className="text-sm text-red-800">Float valve appears stuck open — inlet not closing at 85% setpoint</p>
                  <p className="text-lg font-bold text-red-700 mt-2">
                    PROJECTED OVERFLOW: In approximately 52 minutes
                  </p>
                </div>
              </div>
              <div className="bg-white/70 rounded-lg p-4 mb-4">
                <p className="text-sm font-semibold text-gray-900 mb-2">AUTO-ACTIONS TAKEN</p>
                <div className="space-y-1 text-sm text-gray-700">
                  <p className="flex items-center gap-2">
                    <CheckCircle size={14} className="text-ok" />
                    Backup shutoff valve triggered (electrical solenoid)
                  </p>
                  <p className="flex items-center gap-2">
                    <CheckCircle size={14} className="text-ok" />
                    Pump speed reduced to minimum
                  </p>
                  <p className="flex items-center gap-2">
                    <CheckCircle size={14} className="text-ok" />
                    Site technician notified via WhatsApp
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-700 mb-1">FM ACTION REQUIRED</p>
                  <p className="text-sm font-medium text-gray-900">Float valve inspection and replacement</p>
                  <p className="text-xs text-gray-500">Estimated repair: HKD 800–1,500</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500 mb-1">OVERFLOW PREVENTED</p>
                  <p className="text-lg font-bold text-ok">HKD 150,000–400,000</p>
                  <p className="text-xs text-gray-500">potential damage avoided</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tank levels */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {tanks.map(tank => (
          <div
            key={tank.id}
            className={`bg-white rounded-xl border-2 p-4 ${
              tank.status === 'overflow-risk' ? 'border-red-300' : 'border-gray-200'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-gray-900">{tank.name}</h3>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium border ${getStatusBadge(tank.status)}`}>
                {tank.status === 'overflow-risk' ? '⚠️ RISK' : '✓ NORMAL'}
              </span>
            </div>
            <p className="text-xs text-gray-500 mb-3">{tank.building}</p>
            
            {/* Water level visualization */}
            <div className="relative h-32 bg-gray-100 rounded-lg mb-3 overflow-hidden">
              <div
                className={`absolute bottom-0 left-0 right-0 ${getLevelColor(tank.level, tank.status)} transition-all duration-1000`}
                style={{ height: `${Math.min(tank.level, 100)}%` }}
              >
                {/* Wave animation */}
                <svg className="absolute top-0 left-0 w-full" viewBox="0 0 200 8" preserveAspectRatio="none" style={{ height: '8px', transform: 'translateY(-4px)' }}>
                  <path d="M0,4 C25,0 50,8 75,4 C100,0 125,8 150,4 C175,0 200,8 200,4 L200,8 L0,8 Z" fill="currentColor" className="opacity-40">
                    <animateTransform attributeName="transform" type="translate" from="-100,0" to="0,0" dur="3s" repeatCount="indefinite" />
                  </path>
                  <path d="M0,4 C25,8 50,0 75,4 C100,8 125,0 150,4 C175,8 200,0 200,4 L200,8 L0,8 Z" fill="currentColor" className="opacity-20">
                    <animateTransform attributeName="transform" type="translate" from="0,0" to="-100,0" dur="4s" repeatCount="indefinite" />
                  </path>
                </svg>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-bold text-gray-900 drop-shadow-lg">{tank.level}%</span>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-500">Capacity</span>
                <span className="font-medium text-gray-900">{tank.capacity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Fill rate</span>
                <span className={`font-medium ${tank.fillRate > 5 ? 'text-red-600' : 'text-gray-900'}`}>
                  {tank.fillRate > 5 ? '+' : ''}{tank.fillRate}%/hr
                </span>
              </div>
              {tank.normalFillRate && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Normal rate</span>
                  <span className="font-medium text-gray-900">+{tank.normalFillRate}%/hr</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-500">
                  {tank.status === 'overflow-risk' ? 'Est. overflow' : 'Est. full'}
                </span>
                <span className={`font-medium ${tank.status === 'overflow-risk' ? 'text-red-700' : 'text-gray-900'}`}>
                  {tank.estOverflow ? `in ${tank.estOverflow} min` : `${tank.estFull} hrs`}
                </span>
              </div>
              {tank.pumpStatus && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Pump</span>
                  <span className="flex items-center gap-1 text-ok font-medium">
                    <CheckCircle size={10} /> {tank.pumpStatus}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Water quality */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Droplets size={20} className="text-blue-500" />
            <h2 className="text-lg font-bold text-gray-900">Water Quality Compliance</h2>
          </div>
          <span className="text-xs text-gray-500">
            Last tested: {waterQuality.lastTested} • Next due: {waterQuality.nextTest}
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {waterQuality.parameters.map(param => (
            <div key={param.name} className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 text-center">
              <p className="text-xs text-gray-600 mb-1">{param.name}</p>
              <p className="text-xl font-bold text-gray-900">
                {param.value} <span className="text-xs font-normal text-gray-500">{param.unit}</span>
              </p>
              <p className="text-[10px] text-gray-500 mt-1">Limit: {param.limit}</p>
              <p className="text-[10px] text-ok font-medium mt-2 flex items-center justify-center gap-1">
                <CheckCircle size={10} /> Compliant
              </p>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between">
          <p className="text-xs text-gray-500">
            Next mandatory WSD test: <span className="font-medium text-gray-900">{waterQuality.nextTest}</span> ({waterQuality.nextTest.includes('Apr') ? '31 days' : '4 days'})
          </p>
          <button className="px-4 py-2 bg-accent text-white text-xs font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-1">
            <Wrench size={14} /> Book WSD-Approved Contractor
          </button>
        </div>
      </div>

      {/* Consumption anomaly */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center shrink-0">
            <TrendingUp size={18} className="text-amber-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-amber-900 mb-3">Water Consumption Anomaly — Pacific Centre</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              <div className="bg-white/70 rounded-lg p-3">
                <p className="text-xs text-gray-500 mb-1">30-day avg</p>
                <p className="text-lg font-mono font-bold text-gray-900">{consumptionAnomaly.avg30days.toLocaleString()} L/day</p>
              </div>
              <div className="bg-white/70 rounded-lg p-3">
                <p className="text-xs text-gray-500 mb-1">7-day avg</p>
                <p className="text-lg font-mono font-bold text-amber-700">{consumptionAnomaly.avg7days.toLocaleString()} L/day</p>
                <p className="text-xs text-amber-600 font-medium">↑ {consumptionAnomaly.increase}%</p>
              </div>
              <div className="bg-white/70 rounded-lg p-3">
                <p className="text-xs text-gray-500 mb-1">Overnight (00:00–06:00)</p>
                <p className="text-lg font-mono font-bold text-red-600">{consumptionAnomaly.overnightActual.toLocaleString()} L</p>
                <p className="text-xs text-gray-500">Expected: {consumptionAnomaly.overnightExpected} L</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-amber-900 mb-1">DIAGNOSIS</p>
                <p className="text-sm text-amber-800">{consumptionAnomaly.diagnosis}</p>
                <p className="text-xs text-amber-700 mt-1">Recommended check: Basement plant room, floors 12–15 (highest pressure zone)</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500 mb-1">ESTIMATED LOSS</p>
                <p className="text-lg font-bold text-amber-700">HKD {consumptionAnomaly.estimatedLoss.toLocaleString()}/month</p>
                <p className="text-xs text-gray-500">in excess water bills + potential structural damage</p>
              </div>
            </div>
            <button className="mt-4 px-4 py-2 bg-amber-600 text-white text-xs font-medium rounded-lg hover:bg-amber-700 transition-colors flex items-center gap-1">
              <Wrench size={14} /> Raise Inspection Work Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
