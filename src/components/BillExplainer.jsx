import { useState } from 'react';
import { TrendingUp, TrendingDown, DollarSign, FileText, Download, ChevronRight } from 'lucide-react';

export default function BillExplainer({ buildingId = 'one-taikoo-place' }) {
  const [showReport, setShowReport] = useState(false);

  const billData = {
    building: 'One Taikoo Place',
    month: 'March 2026',
    total: 284000,
    previousMonth: 261000,
    variance: 23000,
    variancePercent: 8.8,
    breakdown: [
      {
        category: 'Weather Impact',
        amount: 8400,
        type: 'expected',
        description: 'March 3.2°C warmer than February',
        icon: '🌡️',
      },
      {
        category: 'Extended Operating Hours',
        amount: 6200,
        type: 'expected',
        description: 'CNY period — mall hours extended to 11 PM',
        icon: '🕐',
      },
      {
        category: 'Chiller-2 Efficiency Drop',
        amount: 7100,
        type: 'abnormal',
        description: '14–22 Mar: COP dropped from 5.2 to 4.1',
        action: 'Maintenance scheduled — should not recur',
        icon: '⚠️',
      },
      {
        category: 'Unexplained Variance',
        amount: 1300,
        type: 'noise',
        description: '0.5% — within normal measurement noise',
        icon: '📊',
      },
    ],
  };

  const expectedVariance = billData.breakdown
    .filter(b => b.type === 'expected' || b.type === 'abnormal')
    .reduce((sum, b) => sum + b.amount, 0);

  const explainedPercent = ((expectedVariance / billData.variance) * 100).toFixed(1);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <DollarSign size={20} className="text-blue-500" />
          <h3 className="text-sm font-bold text-gray-900">Monthly Bill Explainer</h3>
        </div>
        <span className="text-xs text-gray-500">{billData.month}</span>
      </div>

      {/* Bill summary */}
      <div className="mb-4">
        <div className="flex items-end justify-between mb-2">
          <div>
            <p className="text-3xl font-mono font-bold text-gray-900">HKD {billData.total.toLocaleString()}</p>
            <p className="text-xs text-gray-500">
              vs {billData.previousMonth.toLocaleString()} last month
              <span className={`ml-2 font-medium ${billData.variance > 0 ? 'text-red-600' : 'text-emerald-600'}`}>
                {billData.variance > 0 ? '↑' : '↓'} HKD {billData.variance.toLocaleString()} ({billData.variancePercent}%)
              </span>
            </p>
          </div>
          <button
            onClick={() => setShowReport(true)}
            className="px-3 py-1.5 bg-accent text-white text-xs font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-1"
          >
            <FileText size={14} /> Generate Report
          </button>
        </div>
      </div>

      {/* Variance breakdown */}
      <div className="space-y-2">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Variance Explained</p>
        {billData.breakdown.map((item, idx) => (
          <div
            key={item.category}
            className={`border rounded-lg p-3 ${
              item.type === 'abnormal' ? 'border-amber-200 bg-amber-50/50' :
              item.type === 'expected' ? 'border-emerald-200 bg-emerald-50/30' :
              'border-gray-200'
            }`}
          >
            <div className="flex items-start gap-3">
              <span className="text-lg">{item.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium text-gray-900">{item.category}</p>
                  <p className={`text-sm font-mono font-bold ${
                    item.type === 'abnormal' ? 'text-amber-700' :
                    item.type === 'expected' ? 'text-gray-700' :
                    'text-gray-500'
                  }`}>
                    +HKD {item.amount.toLocaleString()}
                  </p>
                </div>
                <p className="text-xs text-gray-600">{item.description}</p>
                {item.action && (
                  <p className="text-xs text-ok font-medium mt-1">{item.action}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-500">Total explained variance</p>
          <p className="text-sm font-bold text-ok">{explainedPercent}% accounted for</p>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Generate report for building owner meeting — includes full breakdown and action items
        </p>
      </div>

      {/* Report slide-in */}
      {showReport && (
        <div className="fixed inset-0 z-50 flex justify-end" onClick={() => setShowReport(false)}>
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
          <div
            className="relative w-full max-w-md bg-white h-full shadow-2xl animate-slide-in-right overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-900">Bill Analysis Report</h2>
                <button onClick={() => setShowReport(false)} className="text-gray-400 hover:text-gray-600">×</button>
              </div>

              {/* Report preview */}
              <div className="border border-gray-200 rounded-lg p-6 mb-6 bg-gray-50">
                <div className="text-center mb-6">
                  <h3 className="text-base font-bold text-gray-900">Electricity Bill Analysis</h3>
                  <p className="text-sm text-gray-500">{billData.building} — {billData.month}</p>
                </div>

                <div className="space-y-4 text-sm">
                  <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                    <span className="text-gray-500">Total Bill</span>
                    <span className="font-mono font-bold text-gray-900">HKD {billData.total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                    <span className="text-gray-500">vs Previous Month</span>
                    <span className="font-mono font-bold text-red-600">+HKD {billData.variance.toLocaleString()} (+{billData.variancePercent}%)</span>
                  </div>

                  <div className="pt-2">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Variance Breakdown</p>
                    <div className="space-y-2">
                      {billData.breakdown.map((item, idx) => (
                        <div key={item.category} className="flex justify-between items-start text-xs">
                          <span className="text-gray-700">{item.category}</span>
                          <span className="font-mono text-gray-900">+HKD {item.amount.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-gray-200">
                    <p className="text-xs text-gray-500">
                      <span className="font-medium text-ok">{explainedPercent}%</span> of variance explained.
                      Remaining {100 - parseFloat(explainedPercent)}% within normal measurement noise.
                    </p>
                  </div>
                </div>

                <div className="mt-6 text-center text-xs text-gray-400">
                  Generated by Operon • 11 Mar 2026, 14:23
                </div>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 py-2.5 bg-accent text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-1">
                  <Download size={16} /> Download PDF
                </button>
                <button className="flex-1 py-2.5 border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">
                  Email to Owner
                </button>
              </div>

              <p className="text-xs text-gray-500 mt-4 text-center">
                Previously: FM spends 2–3 hours compiling data for owner meetings
                <br />
                With Operon: 12 seconds
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
