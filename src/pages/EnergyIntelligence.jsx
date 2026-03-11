import { useState } from 'react';
import { CloudSun, BatteryCharging, Zap, Loader2 } from 'lucide-react';
import EnergyChart from '../components/EnergyChart';

export default function EnergyIntelligence() {
  const [timeRange, setTimeRange] = useState('24h');
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleAnalyze = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setAnalysisResult([
        { action: 'Shift TES discharge to 14:00–16:00 peak window', saving: '31.5 kWh', confidence: 88 },
        { action: 'Reduce cooling tower fan to 75% staging', saving: '14.3 kWh', confidence: 84 },
        { action: 'Adjust AHU supply temp +1.5°C during low occupancy', saving: '9.6 kWh', confidence: 85 },
      ]);
    }, 2000);
  };

  const phases = [
    { name: 'Pre-Cool (06:00–09:00)', expected: '180 kWh', actual: '165 kWh', delta: '-8%', ok: true },
    { name: 'Peak Operations (09:00–18:00)', expected: '520 kWh', actual: '545 kWh', delta: '+5%', ok: false },
    { name: 'Wind-Down (18:00–22:00)', expected: '120 kWh', actual: '108 kWh', delta: '-10%', ok: true },
    { name: 'Night Mode (22:00–06:00)', expected: '85 kWh', actual: '79 kWh', delta: '-7%', ok: true },
  ];

  return (
    <div className="animate-fade-in">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Energy Intelligence</h1>
      <p className="text-sm text-gray-500 mb-6">AI-optimised energy analysis and forecasting</p>

      {/* Notices */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-lg px-4 py-2.5 text-xs text-blue-800 flex-1">
          <CloudSun size={16} className="shrink-0" />
          <span><strong>Weather Adjusted</strong> — 28.5°C forecast (−5% from −1.5°C) via sensor/open-meteo</span>
        </div>
        <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-lg px-4 py-2.5 text-xs text-amber-800 flex-1">
          <BatteryCharging size={16} className="shrink-0" />
          <span><strong>TES Charging Active</strong> — charging hours (22:00–09:00) show high power for ice production</span>
        </div>
      </div>

      {/* Time range tabs */}
      <div className="flex gap-1 mb-4 bg-gray-100 p-1 rounded-lg w-fit">
        {['24h', '7d', '30d'].map(t => (
          <button key={t} onClick={() => setTimeRange(t)} className={`text-xs font-medium px-4 py-1.5 rounded-md transition-colors ${timeRange === t ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>{t}</button>
        ))}
      </div>

      {/* Chart + AI panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <div className="lg:col-span-2">
          <EnergyChart height={320} />
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">AI Recommendations</h3>
          {!analysisResult && !analyzing && (
            <div className="text-center py-8">
              <Zap size={32} className="text-gray-300 mx-auto mb-3" />
              <p className="text-xs text-gray-500 mb-4">Run AI analysis on current energy data</p>
              <button onClick={handleAnalyze} className="px-4 py-2 bg-accent text-white text-xs font-medium rounded-lg hover:bg-blue-700 transition-colors">Run AI Analysis</button>
            </div>
          )}
          {analyzing && (
            <div className="text-center py-8">
              <Loader2 size={24} className="text-accent mx-auto mb-3 animate-spin" />
              <p className="text-xs text-gray-500">Analysing energy patterns...</p>
            </div>
          )}
          {analysisResult && (
            <div className="space-y-3 animate-fade-in">
              {analysisResult.map((r, i) => (
                <div key={i} className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs font-medium text-gray-900">{r.action}</p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="text-[10px] font-medium text-ok">+{r.saving}</span>
                    <span className="text-[10px] text-gray-400">•</span>
                    <span className="text-[10px] text-gray-500">{r.confidence}% confidence</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Phase Energy Profile */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Phase Energy Profile</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500">Phase</th>
                <th className="text-right py-2 px-3 text-xs font-semibold text-gray-500">Expected</th>
                <th className="text-right py-2 px-3 text-xs font-semibold text-gray-500">Actual</th>
                <th className="text-right py-2 px-3 text-xs font-semibold text-gray-500">Delta</th>
              </tr>
            </thead>
            <tbody>
              {phases.map((p, i) => (
                <tr key={i} className="border-b border-gray-50">
                  <td className="py-2.5 px-3 text-gray-900 font-medium">{p.name}</td>
                  <td className="py-2.5 px-3 text-right font-mono text-gray-600">{p.expected}</td>
                  <td className="py-2.5 px-3 text-right font-mono text-gray-900">{p.actual}</td>
                  <td className={`py-2.5 px-3 text-right font-mono font-medium ${p.ok ? 'text-ok' : 'text-crit'}`}>{p.delta}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Anomaly */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full bg-warn animate-pulse-dot" />
          <h3 className="text-sm font-semibold text-amber-900">Anomaly Detected</h3>
        </div>
        <p className="text-xs text-amber-800">Energy usage 5% above baseline during Peak Operations phase. Contributing factors: elevated outdoor temp (+5°C) and Chiller-2 COP degradation. AI recommendations have been generated to address this.</p>
      </div>
    </div>
  );
}
