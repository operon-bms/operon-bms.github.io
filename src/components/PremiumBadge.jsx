import { Sparkles, Lock } from 'lucide-react';

export default function PremiumBadge({ label = 'Phase 2', tooltip = 'Available after 60-day pilot validation', inline = false }) {
  if (inline) {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gradient-to-r from-amber-100 to-yellow-100 border border-amber-300 rounded-full text-[10px] font-semibold text-amber-800 ml-2">
        <Sparkles size={10} className="text-amber-500" />
        {label}
      </span>
    );
  }

  return (
    <div className="relative group">
      <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-amber-50 via-yellow-50 to-amber-50 border border-amber-200 rounded-lg shadow-sm">
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-5 rounded-md bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center shadow-sm">
            <Sparkles size={11} className="text-white" />
          </div>
          <span className="text-xs font-bold text-amber-800 tracking-wide uppercase">{label}</span>
        </div>
        <Lock size={12} className="text-amber-500" />
      </div>
      {/* Tooltip */}
      <div className="absolute left-0 top-full mt-1 hidden group-hover:block z-50">
        <div className="bg-gray-900 text-white text-[11px] px-3 py-2 rounded-lg shadow-xl max-w-[240px] leading-relaxed">
          {tooltip}
          <div className="absolute -top-1 left-4 w-2 h-2 bg-gray-900 rotate-45" />
        </div>
      </div>
    </div>
  );
}
