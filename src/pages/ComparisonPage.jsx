import { Check, X } from 'lucide-react';

export default function ComparisonPage() {
  const features = [
    {
      category: 'Pricing & Setup',
      items: [
        { feature: 'Upfront cost', competitor: 'USD $76,000', facilityai: 'HKD 0' },
        { feature: 'AI/LLM costs', competitor: 'You pay Claude separately', facilityai: 'Included' },
        { feature: 'Ready by', competitor: 'Sep 2026', facilityai: 'Week 1 pilot' },
        { feature: 'Contract term', competitor: '12 months minimum', facilityai: 'Month-to-month' },
      ],
    },
    {
      category: 'Core Capabilities',
      items: [
        { feature: 'Real-time monitoring', competitor: true, facilityai: true },
        { feature: 'HVAC diagram visualisation', competitor: true, facilityai: true },
        { feature: 'AI recommendations', competitor: true, facilityai: true },
        { feature: 'Energy optimisation', competitor: true, facilityai: true },
        { feature: 'Predictive maintenance', competitor: 'Roadmap', facilityai: '✓ Live' },
        { feature: 'Vendor matching', competitor: false, facilityai: '✓ Live' },
        { feature: 'Work order automation', competitor: false, facilityai: '✓ Live' },
      ],
    },
    {
      category: 'Hong Kong Specific',
      items: [
        { feature: 'EPD IAQ compliance reports', competitor: '80% done', facilityai: '✓ Auto-generated' },
        { feature: 'WSD water tank monitoring', competitor: false, facilityai: '✓ Live' },
        { feature: 'CLP/HKE tariff intelligence', competitor: false, facilityai: '✓ Live' },
        { feature: 'HK vendor network', competitor: 'Limited', facilityai: 'Pre-integrated' },
      ],
    },
    {
      category: 'Business Impact',
      items: [
        { feature: 'FM headcount reduction', competitor: 'Better tools', facilityai: 'Fewer people needed' },
        { feature: 'ROI calculator', competitor: false, facilityai: '✓ Live' },
        { feature: 'Autonomous overnight actions', competitor: false, facilityai: '✓ Live' },
        { feature: 'Repair quote validation', competitor: false, facilityai: '✓ Live' },
      ],
    },
  ];

  return (
    <div className="animate-fade-in max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">FacilityAI vs Competitors</h1>
        <p className="text-sm text-gray-500">See why FacilityAI is fundamentally different — not just another monitoring dashboard</p>
      </div>

      {/* Key differentiators */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl border-2 border-blue-300 p-5">
          <h3 className="text-sm font-bold text-blue-700 mb-2">AUTONOMOUS AGENT</h3>
          <p className="text-sm text-gray-700">
            Competitor shows you what's happening. FacilityAI already fixed it while you slept.
          </p>
        </div>
        <div className="bg-gradient-to-br from-emerald-50 to-white rounded-xl border-2 border-emerald-300 p-5">
          <h3 className="text-sm font-bold text-emerald-700 mb-2">PAYS FOR ITSELF</h3>
          <p className="text-sm text-gray-700">
            Live ROI calculator shows immediate savings. Most customers see positive cash flow from month 1.
          </p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-white rounded-xl border-2 border-purple-300 p-5">
          <h3 className="text-sm font-bold text-purple-700 mb-2">HONG KONG BUILT</h3>
          <p className="text-sm text-gray-700">
            EPD compliance, WSD water tanks, CLP tariffs — built for HK from day one, not retrofitted.
          </p>
        </div>
      </div>

      {/* Comparison table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-8">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4 w-1/3">Feature</th>
              <th className="text-center text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4 w-1/3">
                <span className="text-gray-400">Competitor Platform</span>
              </th>
              <th className="text-center text-xs font-semibold text-blue-700 uppercase tracking-wider px-6 py-4 w-1/3 bg-blue-50">
                FacilityAI
              </th>
            </tr>
          </thead>
          <tbody>
            {features.map((category, catIdx) => (
              <tr key={category.category}>
                <td colSpan="3" className="px-6 py-3 bg-gray-50/50">
                  <h3 className="text-sm font-bold text-gray-900">{category.category}</h3>
                </td>
              </tr>
            ))}
            {features.flatMap((category, catIdx) => 
              category.items.map((item, itemIdx) => (
                <tr key={`${catIdx}-${itemIdx}`} className={itemIdx < category.items.length - 1 ? 'border-b border-gray-100' : ''}>
                  <td className="px-6 py-4 text-sm text-gray-900">{item.feature}</td>
                  <td className="px-6 py-4 text-center">
                    {typeof item.competitor === 'boolean' ? (
                      item.competitor ? (
                        <Check size={18} className="text-ok mx-auto" />
                      ) : (
                        <X size={18} className="text-gray-300 mx-auto" />
                      )
                    ) : (
                      <span className="text-sm text-gray-600">{item.competitor}</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-center bg-blue-50/30">
                    {typeof item.facilityai === 'boolean' ? (
                      item.facilityai ? (
                        <Check size={18} className="text-ok mx-auto" />
                      ) : (
                        <X size={18} className="text-gray-300 mx-auto" />
                      )
                    ) : (
                      <span className="text-sm font-medium text-blue-700">{item.facilityai}</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Bottom CTA */}
      <div className="bg-gradient-to-r from-gray-900 to-navy-900 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold mb-2">Ready to see the difference?</h3>
            <p className="text-sm text-gray-400">Start your Week 1 pilot — no upfront cost, no commitment</p>
          </div>
          <button className="px-6 py-3 bg-white text-gray-900 text-sm font-bold rounded-lg hover:bg-gray-100 transition-colors">
            Start Free Pilot
          </button>
        </div>
      </div>
    </div>
  );
}
