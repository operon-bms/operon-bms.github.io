import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, ComposedChart } from 'recharts';

// Generate mock 24h energy data
function generateEnergyData() {
  const data = [];
  for (let h = 0; h < 24; h++) {
    const hour = h.toString().padStart(2, '0') + ':00';
    const isPeak = h >= 9 && h <= 18;
    const isNight = h < 6 || h > 22;
    
    const baseline = isNight ? 35 + Math.random() * 10 : isPeak ? 75 + Math.random() * 15 : 50 + Math.random() * 15;
    const actual = baseline * (0.85 + Math.random() * 0.2);
    const peak = isPeak ? baseline * 1.15 : baseline * 0.95;
    const available = baseline * 1.3;
    
    data.push({
      hour,
      baseline: Math.round(baseline * 10) / 10,
      actual: Math.round(actual * 10) / 10,
      peak: Math.round(peak * 10) / 10,
      available: Math.round(available * 10) / 10,
      confidenceLow: Math.round(actual * 0.9 * 10) / 10,
      confidenceHigh: Math.round(actual * 1.1 * 10) / 10,
    });
  }
  return data;
}

const energyData = generateEnergyData();

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white/95 backdrop-blur-sm border border-gray-200 rounded-lg p-3 shadow-lg text-xs">
      <p className="font-medium text-gray-900 mb-1">{label}</p>
      {payload.map(entry => (
        <p key={entry.dataKey} className="flex items-center gap-2" style={{ color: entry.color }}>
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
          {entry.name}: <span className="font-mono font-medium">{entry.value} kWh</span>
        </p>
      ))}
    </div>
  );
};

export default function EnergyChart({ height = 300 }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-gray-900">Hourly Energy Forecast — Tuesday</h3>
          <p className="text-xs text-gray-500 mt-0.5">Live data • 93% confidence</p>
        </div>
        <span className="text-[10px] font-medium px-2 py-1 bg-emerald-50 text-ok rounded-full">LIVE</span>
      </div>
      <ResponsiveContainer width="100%" height={height}>
        <ComposedChart data={energyData} margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis dataKey="hour" tick={{ fontSize: 10, fill: '#94a3b8' }} tickLine={false} axisLine={{ stroke: '#e2e8f0' }} interval={2} />
          <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} tickLine={false} axisLine={false} unit=" kWh" width={55} />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
          <Area type="monotone" dataKey="confidenceHigh" stroke="none" fill="#2563eb" fillOpacity={0.06} name="Confidence Band" />
          <Area type="monotone" dataKey="confidenceLow" stroke="none" fill="#ffffff" fillOpacity={1} />
          <Line type="monotone" dataKey="peak" stroke="#dc2626" strokeWidth={1.5} strokeDasharray="6 3" dot={false} name="Peak (Operating)" />
          <Line type="monotone" dataKey="available" stroke="#2563eb" strokeWidth={1.5} strokeDasharray="6 3" dot={false} name="Available" />
          <Line type="monotone" dataKey="actual" stroke="#16a34a" strokeWidth={2} dot={false} name="Actual" />
          <Line type="monotone" dataKey="baseline" stroke="#94a3b8" strokeWidth={1.5} strokeDasharray="4 2" dot={false} name="Baseline" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
