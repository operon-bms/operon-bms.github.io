export default function StatusBadge({ status, size = 'sm' }) {
  const config = {
    ok: { bg: 'bg-emerald-100', text: 'text-emerald-700', dot: 'bg-ok', label: 'Normal' },
    warning: { bg: 'bg-amber-100', text: 'text-amber-700', dot: 'bg-warn', label: 'Warning' },
    critical: { bg: 'bg-red-100', text: 'text-red-700', dot: 'bg-crit', label: 'Critical' },
    normal: { bg: 'bg-emerald-100', text: 'text-emerald-700', dot: 'bg-ok', label: 'Normal' },
  }[status] || { bg: 'bg-gray-100', text: 'text-gray-600', dot: 'bg-gray-400', label: status };

  const sizeClasses = size === 'xs' ? 'text-[10px] px-1.5 py-0.5' : 'text-xs px-2 py-1';

  return (
    <span className={`inline-flex items-center gap-1 ${config.bg} ${config.text} ${sizeClasses} rounded-full font-medium`}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot} ${status !== 'ok' && status !== 'normal' ? 'animate-pulse-dot' : ''}`} />
      {config.label}
    </span>
  );
}
