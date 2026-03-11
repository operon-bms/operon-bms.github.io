import { useState } from 'react';
import { DollarSign, TrendingDown, TrendingUp, Building, Users, Calculator, Droplets, Wrench, Shield } from 'lucide-react';

export default function ROICalculator() {
  const [buildings, setBuildings] = useState(10);
  const [fmHeadcount, setFmHeadcount] = useState(5);
  const [avgSalary, setAvgSalary] = useState(35000);

  // Pricing tiers per proposal §9 (HKD/month)
  const getSubscriptionCost = (n) => {
    if (n <= 5) return 38000;
    if (n <= 10) return 62000;
    if (n <= 20) return 110000;
    if (n <= 50) return 210000;
    return null; // Custom pricing
  };

  const subscriptionCost = getSubscriptionCost(buildings);
  const isCustomPricing = subscriptionCost === null;
  const effectiveSubscription = isCustomPricing ? 350000 : subscriptionCost;

  // Headcount optimisation — per proposal: 5 staff → 2 staff
  const reducedHeadcount = Math.max(1, Math.round(fmHeadcount * 0.4));
  const currentFmCost = fmHeadcount * avgSalary;
  const remainingFmCost = reducedHeadcount * avgSalary;
  const headcountSaving = currentFmCost - remainingFmCost;

  // Incident prevention — per proposal §8
  const waterTankSaving = Math.round(buildings * 0.2 * 200000); // 2 events/yr per 10 bldgs, HKD 200K avg
  const emergencyRepairSaving = Math.round(buildings * 0.4 * 35000); // 4 events/yr per 10 bldgs

  // Procurement intelligence — per proposal §8
  const quoteValidationSaving = Math.round(buildings * 0.3 * 25000); // 3/yr per 10 bldgs

  // Compliance & energy
  const complianceSaving = Math.round(buildings * 17000); // HKD 170K/yr per 10 bldgs

  const totalAnnualSaving = (headcountSaving * 12) + waterTankSaving + emergencyRepairSaving + quoteValidationSaving + complianceSaving;
  const totalAnnualCost = (effectiveSubscription * 12);
  const netBenefit = totalAnnualSaving - totalAnnualCost;
  const roi = totalAnnualCost > 0 ? Math.round((netBenefit / totalAnnualCost) * 100) : 0;

  const formatHKD = (n) => `HKD ${Math.abs(n).toLocaleString('en-HK')}`;

  return (
    <div className="animate-fade-in max-w-5xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">ROI Calculator</h1>
        <p className="text-sm text-gray-500">See exactly how Operon pays for itself — input your own numbers</p>
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
              <label className="text-sm font-medium text-gray-700">Avg FM Salary (HKD/mo)</label>
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

      {/* Savings breakdown */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">Annual Savings Breakdown</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-3">
              <Users size={16} className="text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">Headcount optimisation</p>
                <p className="text-xs text-gray-500">{fmHeadcount} staff → {reducedHeadcount} staff ({fmHeadcount - reducedHeadcount} redeployed)</p>
              </div>
            </div>
            <span className="text-lg font-mono font-bold text-ok">{formatHKD(headcountSaving * 12)}</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg">
            <div className="flex items-center gap-3">
              <Droplets size={16} className="text-emerald-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">Incident prevention</p>
                <p className="text-xs text-gray-500">Water tank overflow + emergency repairs prevented</p>
              </div>
            </div>
            <span className="text-lg font-mono font-bold text-ok">{formatHKD(waterTankSaving + emergencyRepairSaving)}</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
            <div className="flex items-center gap-3">
              <Wrench size={16} className="text-amber-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">Procurement intelligence</p>
                <p className="text-xs text-gray-500">Contractor overquotes caught and challenged</p>
              </div>
            </div>
            <span className="text-lg font-mono font-bold text-ok">{formatHKD(quoteValidationSaving)}</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
            <div className="flex items-center gap-3">
              <Shield size={16} className="text-purple-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">Compliance & energy</p>
                <p className="text-xs text-gray-500">EPD violation avoidance + energy optimisation</p>
              </div>
            </div>
            <span className="text-lg font-mono font-bold text-ok">{formatHKD(complianceSaving)}</span>
          </div>
          <hr className="border-gray-200" />
          <div className="flex items-center justify-between p-3">
            <span className="text-sm font-bold text-gray-900">Total Conservative Annual Saving</span>
            <span className="text-2xl font-mono font-bold text-ok">{formatHKD(totalAnnualSaving)}</span>
          </div>
        </div>
      </div>

      {/* Cost comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Current state */}
        <div className="bg-gray-50 rounded-xl border border-gray-200 p-6">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Current Annual Cost</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-700">FM Headcount ({fmHeadcount} people)</span>
              <span className="text-lg font-mono font-bold text-gray-900">{formatHKD(currentFmCost * 12)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-700">Operon subscription</span>
              <span className="text-lg font-mono font-bold text-gray-400">—</span>
            </div>
            <hr className="border-gray-300" />
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-900">Total</span>
              <span className="text-2xl font-mono font-bold text-gray-900">{formatHKD(currentFmCost * 12)}</span>
            </div>
          </div>
        </div>

        {/* With Operon */}
        <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl border-2 border-blue-300 p-6">
          <h3 className="text-sm font-semibold text-blue-700 uppercase tracking-wider mb-4">With Operon</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-700">FM Headcount ({reducedHeadcount} people)</span>
              <span className="text-lg font-mono font-bold text-gray-900">{formatHKD(remainingFmCost * 12)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-700">Operon subscription ({buildings} bldg)</span>
              <span className="text-lg font-mono font-bold text-gray-900">
                {isCustomPricing ? 'Custom' : formatHKD(effectiveSubscription * 12)}
              </span>
            </div>
            <hr className="border-blue-200" />
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-900">Total</span>
              <span className="text-2xl font-mono font-bold text-blue-700">
                {isCustomPricing ? 'Custom' : formatHKD(totalAnnualCost + (remainingFmCost * 12))}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ROI Summary */}
      <div className={`rounded-xl border-2 p-6 mb-6 ${
        netBenefit >= 0
          ? 'bg-emerald-50 border-emerald-300'
          : 'bg-amber-50 border-amber-300'
      }`}>
        <div className="flex items-center gap-3 mb-4">
          {netBenefit >= 0 ? (
            <TrendingUp size={24} className="text-ok" />
          ) : (
            <TrendingDown size={24} className="text-amber-600" />
          )}
          <h3 className="text-lg font-bold text-gray-900">
            {netBenefit >= 0 ? 'Year 1 Return on Investment' : 'Investment Required'}
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div>
            <p className="text-xs text-gray-500 mb-1">Annual Saving</p>
            <p className="text-2xl font-mono font-bold text-ok">{formatHKD(totalAnnualSaving)}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Operon Cost</p>
            <p className="text-2xl font-mono font-bold text-gray-700">
              {isCustomPricing ? 'Custom' : formatHKD(totalAnnualCost)}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Net Benefit</p>
            <p className={`text-2xl font-mono font-bold ${netBenefit >= 0 ? 'text-ok' : 'text-amber-700'}`}>
              {isCustomPricing ? 'Custom' : formatHKD(netBenefit)}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Year 1 ROI</p>
            <p className={`text-2xl font-mono font-bold ${netBenefit >= 0 ? 'text-ok' : 'text-amber-700'}`}>
              {isCustomPricing ? 'Custom' : `${roi}%`}
            </p>
          </div>
        </div>
        {netBenefit >= 0 && !isCustomPricing && (
          <p className="text-sm text-ok font-medium mt-4">
            ✓ Positive cash flow from month 1 — Operon pays for itself immediately
          </p>
        )}
      </div>

      {/* Pricing tiers */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">Operon Pricing Tiers (Post-Pilot)</h3>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {[
            { range: '1–5', price: 38000, annual: 456000 },
            { range: '6–10', price: 62000, annual: 744000 },
            { range: '11–20', price: 110000, annual: 1320000 },
            { range: '21–50', price: 210000, annual: 2520000 },
            { range: '50+', price: null },
          ].map((tier) => (
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
              <p className="text-sm font-bold text-gray-900">{tier.price ? formatHKD(tier.price) : 'Custom'}</p>
              <p className="text-[10px] text-gray-400">per month</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-4">
          All tiers include: AI processing costs (fair-use), predictive maintenance, compliance reports, 24/7 support.
          No hidden API costs — DeepSeek V3 usage is included in subscription.
        </p>
      </div>
    </div>
  );
}
