import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Clock, AlertTriangle, Zap, TrendingUp, Droplets, Thermometer, FileText, ChevronRight, MessageSquare } from 'lucide-react';

export default function OvernightSummary() {
  const navigate = useNavigate();
  const [expandedActions, setExpandedActions] = useState(new Set());
  const [decisionsCompleted, setDecisionsCompleted] = useState(new Set());

  const toggleExpand = (id) => {
    setExpandedActions(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const markDecisionDone = (id) => {
    setDecisionsCompleted(prev => new Set(prev).add(id));
  };

  const overnightActions = [
    {
      category: 'CHW Setpoint Optimisation',
      count: 4,
      buildings: ['1U Mall', 'Pacific Centre', 'Harbour View Tower'],
      icon: Thermometer,
      color: 'blue',
      details: [
        { time: '01:23', building: '1U Mall', action: 'CHW setpoint raised 0.5°C (low occupancy)', saving: 'HKD 47' },
        { time: '02:47', building: 'Pacific Centre', action: 'CHW setpoint raised 1.0°C (night mode)', saving: 'HKD 83' },
        { time: '03:15', building: 'Harbour View Tower', action: 'CHW setpoint adjusted 0.3°C', saving: 'HKD 31' },
        { time: '04:52', building: '1U Mall', action: 'CHW setpoint lowered 0.5°C (pre-cool)', saving: 'HKD 22' },
      ]
    },
    {
      category: 'AHU Fan Speed Optimisation',
      count: 3,
      buildings: ['Central Plaza', 'Kowloon Bay Centre'],
      icon: Zap,
      color: 'amber',
      details: [
        { time: '00:45', building: 'Central Plaza', action: 'AHU-02 fan speed reduced to 65%', saving: 'HKD 34' },
        { time: '02:30', building: 'Central Plaza', action: 'AHU-03 fan speed reduced to 60%', saving: 'HKD 29' },
        { time: '03:00', building: 'Kowloon Bay Centre', action: 'AHU-GF-01 fan speed reduced to 55%', saving: 'HKD 18' },
      ]
    },
    {
      category: 'Fresh Air Adjustment (CO₂ Spike)',
      count: 1,
      buildings: ['Aberdeen Industrial'],
      icon: TrendingUp,
      color: 'emerald',
      details: [
        { time: '02:14', building: 'Aberdeen Industrial', action: 'Fresh air damper opened 35% (CO₂: 1,340 ppm)', saving: 'N/A - compliance' },
      ]
    },
    {
      category: 'TES Charging Schedule Shift',
      count: 1,
      buildings: ['1U Mall'],
      icon: Clock,
      color: 'purple',
      details: [
        { time: '04:00', building: '1U Mall', action: 'TES charging shifted 45 min earlier (weather forecast adjustment)', saving: 'HKD 127' },
      ]
    },
  ];

  const decisions = [
    {
      id: 'wo',
      title: 'Approve Work Order WO-2026-0847',
      building: 'Pacific Centre',
      urgency: 'high',
      timeEstimate: '30 sec',
      description: 'Chiller-3 bearing replacement — CoolTech HK',
      cost: 'HKD 9,800',
      savings: 'Saves HKD 18,500–33,000 vs emergency',
      link: '/predictive',
    },
    {
      id: 'energy',
      title: 'Review 1U Mall Energy Schedule Change',
      building: '1U Mall',
      urgency: 'medium',
      timeEstimate: '1 min',
      description: 'Proposed AHU operating hours adjustment for CNY period',
      cost: 'N/A',
      savings: 'Est. HKD 340/day savings',
      link: '/building/1u-mall/recommendations',
    },
    {
      id: 'epd',
      title: 'Sign Off EPD Monthly Report',
      building: 'Portfolio',
      urgency: 'low',
      timeEstimate: '2 min',
      description: 'February 2026 IAQ compliance report — 6 buildings',
      cost: 'N/A',
      savings: 'Compliance requirement',
      link: '/compliance',
    },
  ];

  const totalSavings = overnightActions.reduce((sum, action) => {
    return sum + action.details.reduce((s, d) => {
      const val = parseFloat(d.saving.replace('HKD ', '').replace('N/A', '0'));
      return s + (isNaN(val) ? 0 : val);
    }, 0);
  }, 0);

  return (
    <div className="animate-fade-in max-w-5xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Good Morning</h1>
        <p className="text-sm text-gray-500">FacilityAI ran your buildings last night — here's what happened</p>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-br from-emerald-50 to-white rounded-xl border border-emerald-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle size={18} className="text-ok" />
            <span className="text-xs font-medium text-emerald-700">ACTIONS COMPLETED</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">17</p>
          <p className="text-xs text-gray-500 mt-1">automated overnight</p>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl border border-blue-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle size={18} className="text-accent" />
            <span className="text-xs font-medium text-blue-700">FAULTS DETECTED</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">1</p>
          <p className="text-xs text-gray-500 mt-1">vendor contacted</p>
        </div>
        <div className="bg-gradient-to-br from-amber-50 to-white rounded-xl border border-amber-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock size={18} className="text-amber-600" />
            <span className="text-xs font-medium text-amber-700">DECISIONS NEEDED</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">{decisions.length - decisionsCompleted.size}</p>
          <p className="text-xs text-gray-500 mt-1">~4 min total</p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-white rounded-xl border border-purple-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp size={18} className="text-purple-600" />
            <span className="text-xs font-medium text-purple-700">NIGHT SAVINGS</span>
          </div>
          <p className="text-3xl font-bold text-ok">HKD {totalSavings.toFixed(0)}</p>
          <p className="text-xs text-gray-500 mt-1">optimisation savings</p>
        </div>
      </div>

      {/* Overnight actions */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">17 Actions Taken Automatically</h2>
          <span className="text-xs text-gray-500">00:00 – 06:00 tonight</span>
        </div>

        <div className="space-y-3">
          {overnightActions.map((action, idx) => {
            const Icon = action.icon;
            const isExpanded = expandedActions.has(action.category);
            return (
              <div
                key={action.category}
                className={`border rounded-lg transition-all ${isExpanded ? 'border-accent bg-blue-50/30' : 'border-gray-200 hover:border-gray-300'}`}
              >
                <button
                  onClick={() => toggleExpand(action.category)}
                  className="w-full flex items-center gap-3 p-3 text-left"
                >
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                    action.color === 'blue' ? 'bg-blue-100 text-blue-700' :
                    action.color === 'amber' ? 'bg-amber-100 text-amber-700' :
                    action.color === 'emerald' ? 'bg-emerald-100 text-emerald-700' :
                    'bg-purple-100 text-purple-700'
                  }`}>
                    <Icon size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{action.category}</p>
                    <p className="text-xs text-gray-500">{action.buildings.join(', ')} • {action.count} actions</p>
                  </div>
                  <ChevronRight size={16} className={`text-gray-400 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                </button>
                {isExpanded && (
                  <div className="px-3 pb-3 pt-0 ml-12">
                    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                      <table className="w-full text-xs">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="text-left font-medium text-gray-500 px-3 py-2">Time</th>
                            <th className="text-left font-medium text-gray-500 px-3 py-2">Building</th>
                            <th className="text-left font-medium text-gray-500 px-3 py-2">Action</th>
                            <th className="text-right font-medium text-gray-500 px-3 py-2">Impact</th>
                          </tr>
                        </thead>
                        <tbody>
                          {action.details.map((detail, i) => (
                            <tr key={i} className={i < action.details.length - 1 ? 'border-b border-gray-100' : ''}>
                              <td className="px-3 py-2 text-gray-900 font-mono">{detail.time}</td>
                              <td className="px-3 py-2 text-gray-700">{detail.building}</td>
                              <td className="px-3 py-2 text-gray-700">{detail.action}</td>
                              <td className={`px-3 py-2 text-right font-medium ${detail.saving.includes('HKD') ? 'text-ok' : 'text-gray-500'}`}>
                                {detail.saving}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Fault detected */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-6">
        <div className="flex items-start gap-3">
          <AlertTriangle size={20} className="text-amber-600 mt-0.5 shrink-0" />
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-amber-900 mb-2">1 Fault Detected — Vendor Awaiting Confirmation</h3>
            <div className="bg-white/70 rounded-lg p-3 mb-3">
              <p className="text-sm font-medium text-gray-900">Pacific Centre Chiller-3: Bearing wear signature</p>
              <p className="text-xs text-gray-600 mt-1">
                Detected at 13:22 yesterday • Confidence: 94% • Days to failure: 8–14
              </p>
              <div className="flex items-center gap-2 mt-2 text-xs">
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full font-medium">Vendor contacted</span>
                <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full font-medium">Work order drafted</span>
              </div>
            </div>
            <button
              onClick={() => navigate('/predictive')}
              className="text-xs font-medium text-amber-800 hover:text-amber-900 flex items-center gap-1"
            >
              View fault details <ChevronRight size={12} />
            </button>
          </div>
        </div>
      </div>

      {/* Decisions needed */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">3 Decisions Need You</h2>
          <span className="text-xs text-gray-500">Estimated time: 4 minutes</span>
        </div>

        <div className="space-y-3">
          {decisions.map(decision => {
            const isDone = decisionsCompleted.has(decision.id);
            return (
              <div
                key={decision.id}
                className={`border rounded-lg p-4 transition-all ${
                  isDone ? 'border-emerald-200 bg-emerald-50/50' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    isDone ? 'bg-ok text-white' : 'bg-gray-100 text-gray-400'
                  }`}>
                    {isDone ? <CheckCircle size={16} /> : <Clock size={16} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className={`text-sm font-medium ${isDone ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                        {decision.title}
                      </p>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                        decision.urgency === 'high' ? 'bg-red-100 text-red-700' :
                        decision.urgency === 'medium' ? 'bg-amber-100 text-amber-700' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {decision.urgency}
                      </span>
                    </div>
                    <p className={`text-xs ${isDone ? 'text-gray-400' : 'text-gray-500'}`}>
                      {decision.building} • {decision.description}
                    </p>
                    <div className="flex items-center gap-3 mt-2 text-xs">
                      <span className={`font-medium ${decision.cost.includes('HKD') ? 'text-gray-900' : 'text-gray-500'}`}>
                        {decision.cost}
                      </span>
                      <span className="text-ok font-medium">{decision.savings}</span>
                      <span className="text-gray-400">~{decision.timeEstimate}</span>
                    </div>
                  </div>
                  {isDone ? (
                    <span className="text-xs text-ok font-medium shrink-0">Done ✓</span>
                  ) : (
                    <button
                      onClick={() => { markDecisionDone(decision.id); navigate(decision.link); }}
                      className="px-4 py-2 bg-accent text-white text-xs font-medium rounded-lg hover:bg-blue-700 transition-colors shrink-0 flex items-center gap-1"
                    >
                      Review <ChevronRight size={12} />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer stat comparison */}
      <div className="bg-gradient-to-r from-gray-900 to-navy-900 rounded-xl p-5 text-white">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-xs text-gray-400 mb-1">Without FacilityAI</p>
            <p className="text-2xl font-bold font-mono text-gray-300">~45 min</p>
            <p className="text-[10px] text-gray-500">manual morning rounds</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-1">With FacilityAI</p>
            <p className="text-2xl font-bold font-mono text-ok">4 min</p>
            <p className="text-[10px] text-gray-500">review + 3 taps</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-1">Time Recovered</p>
            <p className="text-2xl font-bold font-mono text-accent">41 min</p>
            <p className="text-[10px] text-gray-500">every morning</p>
          </div>
        </div>
      </div>
    </div>
  );
}
