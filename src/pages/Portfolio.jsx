import { useNavigate } from 'react-router-dom';
import { Building2, Zap, TrendingDown, Bell, Activity, ChevronRight } from 'lucide-react';
import { useLiveData } from '../hooks/useLiveData';
import EnergyGauge from '../components/EnergyGauge';
import SensorMetric from '../components/SensorMetric';
import StatusBadge from '../components/StatusBadge';

export default function Portfolio() {
  const { buildingData } = useLiveData();
  const navigate = useNavigate();

  const totalCostSaved = buildingData.reduce((s, b) => s + b.costSavedToday, 0);
  const warningCount = buildingData.filter(b => b.energyScore < 80 && b.energyScore >= 60).length;
  const criticalCount = buildingData.filter(b => b.energyScore < 60).length;

  const stats = [
    { icon: Building2, label: 'Buildings Monitored', value: '6', bg: 'bg-blue-50', color: 'text-accent' },
    { icon: Zap, label: 'AI Actions Today', value: '17 auto, 3 pending', bg: 'bg-emerald-50', color: 'text-ok' },
    { icon: TrendingDown, label: 'Energy Saved This Week', value: `1,847 kWh / HKD ${totalCostSaved.toLocaleString()}`, bg: 'bg-emerald-50', color: 'text-emerald-600' },
    { icon: Bell, label: 'Active Alerts', value: `${warningCount} warn, ${criticalCount} critical`, bg: 'bg-amber-50', color: 'text-warn' },
  ];

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Portfolio Overview</h1>
        <p className="text-sm text-gray-500 mt-1">Real-time status across all managed facilities</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((s, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-200 p-4 card-hover">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg ${s.bg} flex items-center justify-center`}>
                <s.icon size={18} className={s.color} />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">{s.label}</p>
                <p className="text-sm font-semibold text-gray-900 mt-0.5">{s.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button onClick={() => navigate('/predictive')} className="w-full mb-6 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-4 flex items-center gap-3 card-hover text-left">
        <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center shrink-0">
          <Activity size={18} className="text-warn" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-amber-900">⚡ Predictive Alert: Pacific Centre — Chiller-3 bearing fault predicted</p>
          <p className="text-xs text-amber-700 mt-0.5">94% confidence • Est. 8–14 days to failure • Savings: HKD 18,500–33,000</p>
        </div>
        <ChevronRight size={18} className="text-amber-400 shrink-0" />
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {buildingData.map(b => {
          const isCrit = b.energyScore < 60;
          const isWarn = b.energyScore < 80 && !isCrit;
          const border = isCrit ? 'border-red-300' : isWarn ? 'border-amber-200' : 'border-gray-200';
          return (
            <button key={b.id} onClick={() => navigate(`/building/${b.id}`)} className={`bg-white rounded-xl border ${border} p-5 card-hover text-left w-full`}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="text-base font-semibold text-gray-900">{b.name}</h3>
                    {b.pendingRecs > 0 && <span className="bg-accent text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">{b.pendingRecs}</span>}
                  </div>
                  <p className="text-xs text-gray-500">{b.type} • {b.floors}F</p>
                  <div className="flex items-center gap-2.5 mt-3 flex-wrap">
                    {Object.entries(b.sensors).map(([k, s]) => <SensorMetric key={k} {...s} compact />)}
                  </div>
                  <div className="flex items-center gap-3 mt-3 flex-wrap">
                    <StatusBadge status={isCrit ? 'critical' : isWarn ? 'warning' : 'ok'} size="xs" />
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${b.basEnabled ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-gray-500'}`}>BAS {b.basEnabled ? 'On' : 'Off'}</span>
                    <span className="flex items-center gap-1 text-[10px] text-ok"><span className="w-1.5 h-1.5 rounded-full bg-ok animate-pulse-dot" />AI Running</span>
                  </div>
                </div>
                <EnergyGauge score={b.energyScore} size={64} />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
