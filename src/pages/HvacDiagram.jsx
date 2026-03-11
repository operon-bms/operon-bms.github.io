import { useParams, useNavigate } from 'react-router-dom';
import { useLiveData } from '../hooks/useLiveData';
import { ChevronRight, Loader2 } from 'lucide-react';
import { useState } from 'react';

export default function HvacDiagram() {
  const { buildingId } = useParams();
  const { getBuildingData } = useLiveData();
  const navigate = useNavigate();
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState(null);

  const building = getBuildingData(buildingId || 'one-taikoo-place');
  if (!building) return <div className="p-8 text-gray-500">Building not found</div>;

  const s = building.sensors;
  const names = { 'one-taikoo-place': 'One Taikoo Place', 'pacific-centre': 'Pacific Centre', 'harbour-view': 'Harbour View Tower', 'central-plaza': 'Central Plaza', 'kowloon-bay': 'Kowloon Bay Centre', 'aberdeen-industrial': 'Aberdeen Industrial' };

  const handleAnalyze = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setAnalysis("Pre-cooling phase active. AHU-GF-R2-1 operating with supply air at " + s.saTemp.value.toFixed(1) + "°C versus 16°C setpoint. CHW pumps running, Chiller-1 operational. VSD temperature elevated at " + s.vsdTemp.value.toFixed(1) + "°C — monitor for continued rise. CO₂ at " + Math.round(s.co2.value) + " ppm approaching threshold. Recommend reviewing fresh air damper position and considering setpoint adjustments during peak hours.");
    }, 2000);
  };

  const boxStyle = (status) => `${status === 'warning' ? 'stroke-amber-400' : status === 'critical' ? 'stroke-red-400' : 'stroke-emerald-400'}`;

  return (
    <div className="animate-fade-in">
      <div className="flex items-center gap-1.5 text-sm text-gray-500 mb-4">
        <button onClick={() => navigate('/portfolio')} className="hover:text-accent">Portfolio</button>
        <ChevronRight size={14} />
        <button onClick={() => navigate(`/building/${buildingId}`)} className="hover:text-accent">{names[buildingId] || buildingId}</button>
        <ChevronRight size={14} />
        <span className="text-gray-900 font-medium">HVAC Diagram</span>
      </div>

      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">HVAC System Diagram</h1>
          <p className="text-sm text-gray-500">{names[buildingId] || buildingId} — Live sensor overlay</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium px-3 py-1.5 rounded-full bg-accent/10 text-accent">{building.phase}</span>
          <span className="flex items-center gap-1.5 text-xs text-ok font-medium"><span className="w-2 h-2 rounded-full bg-ok animate-pulse-dot" /> LIVE</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* SVG Diagram */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-4 overflow-hidden">
          <svg viewBox="0 0 800 500" className="w-full h-auto" style={{ minHeight: 350 }}>
            {/* Background grid */}
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#f1f5f9" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="800" height="500" fill="url(#grid)" />

            {/* Cooling Tower */}
            <rect x="560" y="30" width="160" height="80" rx="8" fill="white" stroke="#94a3b8" strokeWidth="2" />
            <text x="640" y="55" textAnchor="middle" className="text-xs" fill="#64748b" fontWeight="600" fontSize="12">Cooling Tower</text>
            <circle cx="590" cy="80" r="5" fill={s.raTemp.status === 'ok' ? '#16a34a' : '#d97706'} />
            <text x="600" y="84" fontSize="10" fill="#374151" fontFamily="DM Mono">{s.raTemp.value.toFixed(1)}°C</text>

            {/* CW Pump */}
            <circle cx="480" cy="70" r="30" fill="white" stroke="#94a3b8" strokeWidth="2" />
            <text x="480" y="65" textAnchor="middle" fontSize="10" fill="#64748b" fontWeight="600">CW</text>
            <text x="480" y="78" textAnchor="middle" fontSize="10" fill="#64748b" fontWeight="600">Pump</text>
            <circle cx="460" cy="52" r="4" fill="#16a34a" />

            {/* Pipe: CW Pump to Cooling Tower (orange) */}
            <line x1="510" y1="70" x2="560" y2="70" stroke="#f97316" strokeWidth="3" className="pipe-flow" />
            {/* Pipe: Cooling Tower to Chiller (orange) */}
            <line x1="640" y1="110" x2="640" y2="160" stroke="#f97316" strokeWidth="3" className="pipe-flow" />
            <line x1="640" y1="160" x2="500" y2="160" stroke="#f97316" strokeWidth="3" className="pipe-flow" />
            <line x1="500" y1="160" x2="500" y2="200" stroke="#f97316" strokeWidth="3" className="pipe-flow" />

            {/* Chiller 1 */}
            <rect x="80" y="180" width="180" height="90" rx="8" fill="white" stroke="#94a3b8" strokeWidth="2" />
            <text x="170" y="210" textAnchor="middle" fontSize="13" fill="#0f172a" fontWeight="700">Chiller-1</text>
            <circle cx="110" cy="240" r="5" fill={s.vsdTemp.status === 'ok' ? '#16a34a' : s.vsdTemp.status === 'warning' ? '#d97706' : '#dc2626'} />
            <text x="122" y="244" fontSize="10" fill="#374151" fontFamily="DM Mono">VSD {s.vsdTemp.value.toFixed(1)}°C</text>
            <text x="110" y="258" fontSize="9" fill="#94a3b8">0 kW → Running</text>

            {/* Chiller 2 */}
            <rect x="400" y="180" width="180" height="90" rx="8" fill="white" stroke="#94a3b8" strokeWidth="2" />
            <text x="490" y="210" textAnchor="middle" fontSize="13" fill="#0f172a" fontWeight="700">Chiller-2</text>
            <circle cx="430" cy="240" r="5" fill="#16a34a" />
            <text x="442" y="244" fontSize="10" fill="#374151" fontFamily="DM Mono">VSD 42.1°C</text>
            <text x="430" y="258" fontSize="9" fill="#94a3b8">85 kW → Running</text>

            {/* CHW Pump */}
            <circle cx="340" cy="340" r="30" fill="white" stroke="#94a3b8" strokeWidth="2" />
            <text x="340" y="335" textAnchor="middle" fontSize="10" fill="#64748b" fontWeight="600">CHW</text>
            <text x="340" y="348" textAnchor="middle" fontSize="10" fill="#64748b" fontWeight="600">Pump</text>
            <circle cx="320" cy="318" r="4" fill="#16a34a" />

            {/* Pipe: Chillers to CHW Pump (blue) */}
            <line x1="170" y1="270" x2="170" y2="340" stroke="#3b82f6" strokeWidth="3" className="pipe-flow" />
            <line x1="170" y1="340" x2="310" y2="340" stroke="#3b82f6" strokeWidth="3" className="pipe-flow" />
            <line x1="490" y1="270" x2="490" y2="340" stroke="#3b82f6" strokeWidth="3" className="pipe-flow" />
            <line x1="490" y1="340" x2="370" y2="340" stroke="#3b82f6" strokeWidth="3" className="pipe-flow" />

            {/* AHU */}
            <rect x="250" y="410" width="260" height="76" rx="8" fill="white" stroke="#94a3b8" strokeWidth="2" />
            <text x="380" y="435" textAnchor="middle" fontSize="13" fill="#0f172a" fontWeight="700">AHU-GF-R2-1</text>
            <circle cx="280" cy="460" r="5" fill={s.saTemp.status === 'ok' ? '#16a34a' : '#d97706'} />
            <text x="292" y="464" fontSize="10" fill="#374151" fontFamily="DM Mono">SA {s.saTemp.value.toFixed(1)}°C</text>
            <circle cx="400" cy="460" r="5" fill={s.co2.status === 'ok' ? '#16a34a' : s.co2.status === 'warning' ? '#d97706' : '#dc2626'} />
            <text x="412" y="464" fontSize="10" fill="#374151" fontFamily="DM Mono">CO₂ {Math.round(s.co2.value)}</text>

            {/* Pipe: CHW Pump to AHU (blue) */}
            <line x1="340" y1="370" x2="340" y2="410" stroke="#3b82f6" strokeWidth="3" className="pipe-flow" />

            {/* Pipe: CW loop back */}
            <line x1="480" y1="40" x2="480" y2="70" stroke="#f97316" strokeWidth="3" className="pipe-flow-reverse" />
            <line x1="170" y1="180" x2="170" y2="130" stroke="#f97316" strokeWidth="3" className="pipe-flow-reverse" />
            <line x1="170" y1="130" x2="450" y2="130" stroke="#f97316" strokeWidth="3" className="pipe-flow-reverse" />
            <line x1="450" y1="130" x2="450" y2="70" stroke="#f97316" strokeWidth="3" className="pipe-flow-reverse" />

            {/* Legend */}
            <line x1="30" y1="490" x2="50" y2="490" stroke="#3b82f6" strokeWidth="3" />
            <text x="55" y="494" fontSize="10" fill="#64748b">CHW Loop</text>
            <line x1="130" y1="490" x2="150" y2="490" stroke="#f97316" strokeWidth="3" />
            <text x="155" y="494" fontSize="10" fill="#64748b">CW Loop</text>
          </svg>
        </div>

        {/* AI Analysis Panel */}
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">AI System Analysis</h3>
          {!analysis && !analyzing && (
            <div className="text-center py-12">
              <p className="text-xs text-gray-500 mb-4">Run AI analysis on current HVAC state</p>
              <button onClick={handleAnalyze} className="px-4 py-2 bg-accent text-white text-xs font-medium rounded-lg hover:bg-blue-700 transition-colors">Analyse Current State</button>
            </div>
          )}
          {analyzing && (
            <div className="text-center py-12">
              <Loader2 size={24} className="text-accent mx-auto mb-3 animate-spin" />
              <p className="text-xs text-gray-500">Analysing HVAC system...</p>
            </div>
          )}
          {analysis && (
            <div className="animate-fade-in">
              <p className="text-sm text-gray-700 leading-relaxed">{analysis}</p>
              <button onClick={handleAnalyze} className="mt-4 text-xs text-accent hover:underline">Re-analyse →</button>
            </div>
          )}

          {/* Quick stats */}
          <div className="mt-6 pt-4 border-t border-gray-100 space-y-3">
            <div className="flex justify-between text-xs">
              <span className="text-gray-500">Energy Score</span>
              <span className="font-medium">{building.energyScore}/100</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-500">Equipment Items</span>
              <span className="font-medium">{building.equipment.length}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-500">Pending Recs</span>
              <span className="font-medium text-accent">{building.pendingRecs}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-500">Saved Today</span>
              <span className="font-medium text-ok">{building.energySavedToday} kWh</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
