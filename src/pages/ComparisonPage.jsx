import { Check, X, Minus, Sparkles, Lock } from 'lucide-react';

export default function ComparisonPage() {
  const features = [
    {
      category: 'Pricing & Engagement',
      items: [
        { feature: 'Pilot fee', competitor: 'USD $76,000+ upfront', operon: 'HKD 88,000 (50% on signing)' },
        { feature: 'AI / LLM costs', competitor: 'Client pays separately', operon: 'All included (fair-use)' },
        { feature: 'Ready on real data', competitor: 'After full payment', operon: 'Week 1' },
        { feature: 'Contract commitment', competitor: '12 months minimum', operon: '8-week pilot, then month-to-month' },
      ],
    },
    {
      category: 'Phase 1 — MVP Capabilities',
      items: [
        { feature: 'Real-time sensor dashboard', competitor: true, operon: true },
        { feature: 'Intelligent alert system', competitor: true, operon: true },
        { feature: 'AI recommendations', competitor: true, operon: true },
        { feature: 'Morning briefing & shift handover', competitor: false, operon: true },
        { feature: 'Tenant complaint intelligence', competitor: false, operon: true },
        { feature: 'Repair quote validator', competitor: false, operon: true },
        { feature: 'Water tank guardian (HK)', competitor: false, operon: true },
        { feature: 'EPD compliance autopilot', competitor: 'partial', operon: true },
        { feature: 'WSD water testing schedule', competitor: false, operon: true },
        { feature: 'Monthly bill explainer', competitor: false, operon: true },
        { feature: 'CLP / HKE tariff intelligence', competitor: false, operon: true },
        { feature: 'HK vendor network', competitor: false, operon: 'Pre-integrated' },
      ],
    },
    {
      category: 'Phase 2 — Autonomous Execution',
      premium: true,
      items: [
        { feature: 'Predictive maintenance', competitor: 'Roadmap', operon: 'Phase 2' },
        { feature: 'Autonomous HVAC control', competitor: false, operon: 'Phase 2' },
        { feature: 'Work order automation', competitor: false, operon: 'Phase 2' },
        { feature: 'ML fine-tuned per equipment', competitor: false, operon: 'Phase 2' },
        { feature: 'On-premise AI deployment', competitor: false, operon: 'Phase 2' },
        { feature: 'Tenant environment reports', competitor: false, operon: 'Phase 2' },
      ],
    },
    {
      category: 'Data & Security',
      items: [
        { feature: 'No data sent to 3rd-party AI', competitor: false, operon: true },
        { feature: 'BYOC (Bring Your Own Cloud)', competitor: false, operon: true },
        { feature: 'Role-based access control', competitor: true, operon: true },
        { feature: 'Full audit logging', competitor: 'partial', operon: true },
      ],
    },
  ];

  const renderValue = (val, isPremium = false) => {
    if (typeof val === 'boolean') {
      return val ? (
        <Check size={18} className="text-ok mx-auto" />
      ) : (
        <X size={18} className="text-gray-300 mx-auto" />
      );
    }
    if (val === 'partial') {
      return <Minus size={18} className="text-amber-400 mx-auto" />;
    }
    if (val === 'Phase 2') {
      return (
        <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-700">
          <Sparkles size={11} className="text-amber-500" />
          Phase 2
        </span>
      );
    }
    return <span className="text-sm text-gray-700">{val}</span>;
  };

  return (
    <div className="animate-fade-in max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Operon vs Traditional Platforms</h1>
        <p className="text-sm text-gray-500">See why Operon is architecturally different — not just another monitoring dashboard</p>
      </div>

      {/* Key differentiators */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl border-2 border-blue-300 p-5">
          <h3 className="text-sm font-bold text-blue-700 mb-2">AUTONOMOUS AGENT</h3>
          <p className="text-sm text-gray-700">
            Others show you what's happening. Operon already fixed it while you slept — 17 actions completed overnight.
          </p>
        </div>
        <div className="bg-gradient-to-br from-emerald-50 to-white rounded-xl border-2 border-emerald-300 p-5">
          <h3 className="text-sm font-bold text-emerald-700 mb-2">223% YEAR 1 ROI</h3>
          <p className="text-sm text-gray-700">
            HKD 2.04M annual savings on a 10-building portfolio. Payback in Month 1. Conservative estimate.
          </p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-white rounded-xl border-2 border-purple-300 p-5">
          <h3 className="text-sm font-bold text-purple-700 mb-2">HONG KONG NATIVE</h3>
          <p className="text-sm text-gray-700">
            EPD compliance, WSD water tanks, CLP/HKE tariffs, gravity-fed tank systems — built for HK from day one.
          </p>
        </div>
      </div>

      {/* Comparison table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-8">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4 w-2/5">Feature</th>
              <th className="text-center text-xs font-semibold text-gray-400 uppercase tracking-wider px-6 py-4 w-[30%]">
                Traditional BMS
              </th>
              <th className="text-center text-xs font-semibold text-blue-700 uppercase tracking-wider px-6 py-4 w-[30%] bg-blue-50">
                Operon
              </th>
            </tr>
          </thead>
          <tbody>
            {features.map((category) => (
              <>
                <tr key={category.category}>
                  <td colSpan="3" className="px-6 py-3 bg-gray-50/70">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-gray-900">{category.category}</h3>
                      {category.premium && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gradient-to-r from-amber-100 to-yellow-100 border border-amber-300 rounded-full text-[10px] font-semibold text-amber-800">
                          <Sparkles size={10} className="text-amber-500" />
                          PREMIUM
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
                {category.items.map((item, itemIdx) => (
                  <tr key={`${category.category}-${itemIdx}`} className={itemIdx < category.items.length - 1 ? 'border-b border-gray-100' : ''}>
                    <td className="px-6 py-3.5 text-sm text-gray-900">{item.feature}</td>
                    <td className="px-6 py-3.5 text-center">
                      {renderValue(item.competitor)}
                    </td>
                    <td className="px-6 py-3.5 text-center bg-blue-50/30">
                      {renderValue(item.operon, category.premium)}
                    </td>
                  </tr>
                ))}
              </>
            ))}
          </tbody>
        </table>
      </div>

      {/* Investment comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-gray-50 rounded-xl border border-gray-200 p-6">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Traditional Approach</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-gray-600">Platform licence</span><span className="font-mono font-medium text-gray-900">HKD 593,000+</span></div>
            <div className="flex justify-between"><span className="text-gray-600">AI / API costs</span><span className="font-mono font-medium text-gray-900">Additional</span></div>
            <div className="flex justify-between"><span className="text-gray-600">Live on real data</span><span className="font-mono font-medium text-gray-900">After full payment</span></div>
            <div className="flex justify-between"><span className="text-gray-600">FM headcount change</span><span className="font-mono font-medium text-gray-500">Better tools, same workload</span></div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl border-2 border-blue-300 p-6">
          <h3 className="text-sm font-semibold text-blue-700 uppercase tracking-wider mb-4">Operon Pilot</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-gray-600">8-week pilot</span><span className="font-mono font-bold text-blue-700">HKD 88,000</span></div>
            <div className="flex justify-between"><span className="text-gray-600">AI / API costs</span><span className="font-mono font-bold text-ok">Included</span></div>
            <div className="flex justify-between"><span className="text-gray-600">Live on real data</span><span className="font-mono font-bold text-ok">Week 1</span></div>
            <div className="flex justify-between"><span className="text-gray-600">FM headcount change</span><span className="font-mono font-bold text-ok">50–60% reduction</span></div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="bg-gradient-to-r from-gray-900 to-navy-900 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold mb-2">Ready to see the difference?</h3>
            <p className="text-sm text-gray-400">Start your 8-week pilot — HKD 44,000 to begin, live on real data in Week 1</p>
          </div>
          <button className="px-6 py-3 bg-white text-gray-900 text-sm font-bold rounded-lg hover:bg-gray-100 transition-colors">
            Schedule Scoping Call
          </button>
        </div>
      </div>
    </div>
  );
}
