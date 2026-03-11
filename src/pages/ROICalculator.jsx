import { useState } from 'react';
import { DollarSign, TrendingDown, TrendingUp, Building, Users, Calculator } from 'lucide-react';

export default function ROICalculator() {
  const [buildings, setBuildings] = useState(10);
  const [fmHeadcount, setFmHeadcount] = useState(5);
  const [avgSalary, setAvgSalary] = useState(35000);

  // Pricing tiers (HKD/month)
  const getSubscriptionCost = (n) => {
    if (n <= 5) return 45000;
    if (n <= 10) return 75000;
    if (n <= 20) return 135000;
    if (n <= 50) return 285000;
    return 520000;
  };

  const subscriptionCost = getSubscriptionCost(buildings);
  const currentFmCost = fmHeadcount * avgSalary;
  
  // With FacilityAI: typically reduces FM headcount by 50-60%
  const reducedHeadcount = Math.max(1, Math.round(fmHeadcount * 0.4));
  const remainingFmCost = reducedHeadcount * avgSalary;
  const totalCostWithFacilityAI = remainingFmCost + subscriptionCost;
  const monthlySavings = currentFmCost - totalCostWithFacilityAI;
  const annualSavings = monthlySavings * 12;
  const paybackMonths = subscriptionCost > 0 ? Math.ceil(subscriptionCost / Math.max(1, monthlySavings)) : 0;

  const formatHKD = (n) => `HKD ${n.toLocaleString('en-HK')}`;

  return (
    <div className="animate-fade-in max-w-5xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">ROI Calculator</h1>
        <p className="text-sm text-gray-500">See exactly how much FacilityAI saves your organisation</p>
      </div>

      {/* Input sliders */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <div className="flex items-center gap-2 mb-6">
          <Calculator size={20} className="text-accent" />
          <h2 className="text-lg font-bold text-gray-900">Your Portfolio Details</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Buildings */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Building size={16} className="text-gray-400" />
              <label className="text-sm font-medium text-gray-700">Number of Buildings</label>
            </div>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="1"
                max="50"
                value={buildings}
                onChange={(e) => setBuildings(parseInt(e.target.value))}
                className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <span className="text-2xl font-bold text-gray-900 w-16 text-right">{buildings}</span>
            </div>
            <p className="text-xs text-gray-500 mt-2">Drag to see economies of scale</p>
          </div>

          {/* FM Headcount */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Users size={16} className="text-gray-400" />
              <label className="text-sm font-medium text-gray-700">Current FM Headcount</label>
            </div>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="1"
                max="20"
                value={fmHeadcount}
                onChange={(e) => setFmHeadcount(parseInt(e.target.value))}
                className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <span className="text-2xl font-bold text-gray-900 w-16 text-right">{fmHeadcount}</span>
            </div>
            <p className="text-xs text-gray-500 mt-2">Full-time facility managers</p>
          </div>

          {/* Average Salary */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <DollarSign size={16} className="text-gray-400" />
              <label className="text-sm font-medium text-gray-700">Avg FM Salary (HKD)</label>
            </div>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="20000"
                max="60000"
                step="5000"
                value={avgSalary}
                onChange={(e) => setAvgSalary(parseInt(e.target.value))}
                className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <span className="text-lg font-bold text-gray-900 w-24 text-right">{formatHKD(avgSalary)}</span>
            </div>
            <p className="text-xs text-gray-500 mt-2">Per month</p>
          </div>
        </div>
      </div>

      {/* Cost comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Current state */}
        <div className="bg-gray-50 rounded-xl border border-gray-200 p-6">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Current Monthly Cost</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-700">FM Headcount ({fmHeadcount} people)</span>
              <span className="text-lg font-mono font-bold text-gray-900">{formatHKD(currentFmCost)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-700">FacilityAI subscription</span>
              <span className="text-lg font-mono font-bold text-gray-400">—</span>
            </div>
            <hr className="border-gray-300" />
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-900">Total</span>
              <span className="text-2xl font-mono font-bold text-gray-900">{formatHKD(currentFmCost)}</span>
            </div>
          </div>
        </div>

        {/* With FacilityAI */}
        <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl border-2 border-blue-300 p-6">
          <h3 className="text-sm font-semibold text-blue-700 uppercase tracking-wider mb-4">With FacilityAI</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-700">FM Headcount ({reducedHeadcount} people)</span>
              <span className="text-lg font-mono font-bold text-gray-900">{formatHKD(remainingFmCost)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-700">FacilityAI subscription ({buildings} bldg)</span>
              <span className="text-lg font-mono font-bold text-gray-900">{formatHKD(subscriptionCost)}</span>
            </div>
            <hr className="border-blue-200" />
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-900">Total</span>
              <span className="text-2xl font-mono font-bold text-blue-700">{formatHKD(totalCostWithFacilityAI)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Savings summary */}
      <div className={`rounded-xl border-2 p-6 mb-6 ${
        monthlySavings >= 0 
          ? 'bg-emerald-50 border-emerald-300' 
          : 'bg-amber-50 border-amber-300'
      }`}>
        <div className="flex items-center gap-3 mb-4">
          {monthlySavings >= 0 ? (
            <TrendingUp size={24} className="text-ok" />
          ) : (
            <TrendingDown size={24} className="text-amber-600" />
          )}
          <h3 className="text-lg font-bold text-gray-900">
            {monthlySavings >= 0 ? 'Monthly Savings' : 'Investment Required'}
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <p className="text-xs text-gray-500 mb-1">Monthly Savings</p>
            <p className={`text-3xl font-mono font-bold ${monthlySavings >= 0 ? 'text-ok' : 'text-amber-700'}`}>
              {formatHKD(Math.abs(monthlySavings))}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Annual Savings</p>
            <p className={`text-3xl font-mono font-bold ${monthlySavings >= 0 ? 'text-ok' : 'text-amber-700'}`}>
              {formatHKD(Math.abs(annualSavings))}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Payback Period</p>
            <p className={`text-3xl font-mono font-bold ${monthlySavings >= 0 ? 'text-ok' : 'text-amber-700'}`}>
              {monthlySavings >= 0 ? 'Immediate' : `${paybackMonths} months`}
            </p>
          </div>
        </div>
        {monthlySavings >= 0 && (
          <p className="text-sm text-ok font-medium mt-4">
            ✓ Positive cash flow from month 1 — FacilityAI pays for itself immediately
          </p>
        )}
      </div>

      {/* Headcount impact */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">FM Headcount Impact</h3>
        <div className="flex items-center gap-8">
          <div className="flex-1">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-500">Current</span>
              <span className="font-medium">{fmHeadcount} FMs</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div className="bg-gray-500 h-4 rounded-full" style={{ width: '100%' }} />
            </div>
          </div>
          <div className="text-gray-400">→</div>
          <div className="flex-1">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-500">With FacilityAI</span>
              <span className="font-medium text-ok">{reducedHeadcount} FMs</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div className="bg-ok h-4 rounded-full" style={{ width: `${(reducedHeadcount / fmHeadcount) * 100}%` }} />
            </div>
          </div>
          <div className="text-gray-400">=</div>
          <div className="text-center">
            <p className="text-3xl font-bold text-accent">{fmHeadcount - reducedHeadcount}</p>
            <p className="text-xs text-gray-500">FMs redeployed</p>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-4">
          FacilityAI automates routine monitoring, optimisation, and compliance tasks — allowing your FM team to focus on strategic work. 
          Typical reduction: 50–60% headcount while maintaining or improving building performance.
        </p>
      </div>

      {/* Pricing breakdown */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">FacilityAI Pricing Tiers</h3>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {[
            { range: '1–5', price: 45000 },
            { range: '6–10', price: 75000 },
            { range: '11–20', price: 135000 },
            { range: '21–50', price: 285000 },
            { range: '50+', price: 520000 },
          ].map((tier, i) => (
            <div
              key={tier.range}
              className={`border rounded-lg p-3 text-center transition-all ${
                buildings <= parseInt(tier.range.split('–')[1] || '999') && 
                buildings >= parseInt(tier.range.split('–')[0])
                  ? 'border-blue-400 bg-blue-50' 
                  : 'border-gray-200'
              }`}
            >
              <p className="text-xs text-gray-500 mb-1">{tier.range} buildings</p>
              <p className="text-sm font-bold text-gray-900">{formatHKD(tier.price)}</p>
              <p className="text-[10px] text-gray-400">per month</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-4">
          All tiers include: unlimited AI usage, predictive maintenance, vendor matching, HK compliance reports, 24/7 support.
          No hidden API costs — Claude usage is included.
        </p>
      </div>
    </div>
  );
}
