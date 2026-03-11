import { useState } from 'react';
import { Check, X, Clock, Zap, Wrench, Wind, Droplets } from 'lucide-react';

const categoryIcon = {
  Setpoint: Zap,
  Schedule: Clock,
  Maintenance: Wrench,
  IAQ: Wind,
};

const priorityColors = {
  1: 'bg-red-100 text-red-700 border-red-200',
  2: 'bg-amber-100 text-amber-700 border-amber-200',
  3: 'bg-yellow-100 text-yellow-700 border-yellow-200',
};

export default function RecommendationCard({ rec, onApprove, onReject }) {
  const [state, setState] = useState(rec.status);
  const [showRejectInput, setShowRejectInput] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  
  const Icon = categoryIcon[rec.category] || Zap;

  const handleApprove = () => {
    setState('approved');
    onApprove?.(rec.id);
  };

  const handleReject = () => {
    if (!showRejectInput) {
      setShowRejectInput(true);
      return;
    }
    setState('rejected');
    onReject?.(rec.id, rejectReason);
  };

  if (state === 'approved') {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 animate-fade-in">
        <div className="flex items-center gap-2 text-ok font-medium">
          <Check size={18} strokeWidth={2.5} />
          <span>Approved — {rec.action}</span>
        </div>
        <p className="text-xs text-emerald-600 mt-1">Monitoring impact. Est. +{rec.energyImpact} kWh saved.</p>
      </div>
    );
  }

  if (state === 'rejected') {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-4 animate-fade-in opacity-60">
        <div className="flex items-center gap-2 text-crit font-medium">
          <X size={18} strokeWidth={2.5} />
          <span>Rejected — {rec.action}</span>
        </div>
        {rejectReason && <p className="text-xs text-red-500 mt-1">Reason: {rejectReason}</p>}
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 card-hover">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          {/* Top badges */}
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${priorityColors[rec.priority]}`}>
              P{rec.priority}
            </span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
              rec.confidence >= 85 ? 'bg-emerald-100 text-emerald-700' : rec.confidence >= 70 ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
            }`}>
              {rec.confidence}% confidence
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 flex items-center gap-1">
              <Icon size={10} /> {rec.category}
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-50 text-blue-600">
              {rec.equipment}
            </span>
          </div>
          {/* Action text */}
          <p className="text-sm font-semibold text-gray-900 mb-1">{rec.action}</p>
          <p className="text-xs text-gray-500 leading-relaxed">{rec.detail}</p>
          {/* Energy impact */}
          <div className="flex items-center gap-1 mt-2">
            <Zap size={12} className={rec.energyImpact >= 0 ? 'text-ok' : 'text-warn'} />
            <span className={`text-xs font-medium ${rec.energyImpact >= 0 ? 'text-ok' : 'text-warn'}`}>
              {rec.energyImpact >= 0 ? '+' : ''}{rec.energyImpact} kWh
            </span>
            <span className="text-xs text-gray-400 ml-1">est. savings</span>
            {rec.timestamp && <span className="text-[10px] text-gray-400 ml-auto">{rec.timestamp}</span>}
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100">
        {state === 'pending' && (
          <>
            <button
              onClick={handleApprove}
              className="flex items-center gap-1.5 px-4 py-1.5 bg-accent text-white text-xs font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Check size={14} /> Approve
            </button>
            <button
              onClick={handleReject}
              className="flex items-center gap-1.5 px-4 py-1.5 border border-red-200 text-crit text-xs font-medium rounded-lg hover:bg-red-50 transition-colors"
            >
              <X size={14} /> Reject
            </button>
            {showRejectInput && (
              <input
                type="text"
                value={rejectReason}
                onChange={e => setRejectReason(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleReject()}
                placeholder="Reason (optional)..."
                className="flex-1 text-xs border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-accent"
                autoFocus
              />
            )}
          </>
        )}
        {state === 'monitoring' && (
          <span className="flex items-center gap-1.5 text-xs text-amber-600 font-medium">
            <Clock size={14} className="animate-pulse-dot" /> Monitoring...
          </span>
        )}
      </div>
    </div>
  );
}
