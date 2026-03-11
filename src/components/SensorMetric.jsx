export default function SensorMetric({ label, value, unit, status, compact = false }) {
  const statusColor = {
    ok: 'bg-ok',
    warning: 'bg-warn',
    critical: 'bg-crit',
  }[status] || 'bg-gray-400';

  const statusBorder = {
    ok: 'border-emerald-100',
    warning: 'border-amber-100',
    critical: 'border-red-100',
  }[status] || 'border-gray-100';

  const statusLabel = {
    ok: 'Normal',
    warning: 'Warning',
    critical: 'Elevated',
  }[status] || 'Unknown';

  const pulseClass = status === 'critical' ? 'pulse-crit' : status === 'warning' ? 'pulse-warn' : '';

  if (compact) {
    return (
      <div className="flex items-center gap-1.5" title={`${label}: ${value}${unit}`}>
        <span className={`w-2 h-2 rounded-full ${statusColor} ${status !== 'ok' ? 'animate-pulse-dot' : ''}`} />
        <span className="text-[11px] text-gray-500 font-mono">{typeof value === 'number' ? (unit === 'ppm' ? value : value.toFixed(1)) : value}</span>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-xl border ${statusBorder} p-4 ${pulseClass} transition-all duration-500`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">{label}</span>
        <span className={`w-2.5 h-2.5 rounded-full ${statusColor} ${status !== 'ok' ? 'animate-pulse-dot' : ''}`} />
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-mono font-medium sensor-value tabular-nums">
          {typeof value === 'number' ? (unit === 'ppm' ? Math.round(value) : value.toFixed(1)) : value}
        </span>
        <span className="text-sm text-gray-400">{unit}</span>
      </div>
      <p className={`text-xs mt-1 font-medium ${status === 'ok' ? 'text-ok' : status === 'warning' ? 'text-warn' : 'text-crit'}`}>
        {statusLabel}
      </p>
    </div>
  );
}
