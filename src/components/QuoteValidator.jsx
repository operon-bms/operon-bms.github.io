import { useState } from 'react';
import { AlertTriangle, CheckCircle, DollarSign, TrendingDown, FileText, X } from 'lucide-react';

export default function QuoteValidator({ onValidated }) {
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);

  const quote = {
    vendor: 'CoolTech HK',
    woNumber: 'WO-2026-0847',
    equipment: 'Chiller-3 Compressor',
    quotedScope: 'Full compressor overhaul',
    quotedPrice: 85000,
    date: '11 Mar 2026',
  };

  const analysis = {
    sensorData: {
      vibration: '1.87 mm/s (elevated but within operating range)',
      temperature: '67.3°C (normal for this load)',
      powerDraw: '42.1 kW (consistent with bearing friction only)',
    },
    diagnosis: 'Bearing wear only — compressor internals normal',
    recommendedScope: 'Bearing replacement only (not full overhaul)',
    fairMarketPrice: { low: 9500, high: 12000 },
    overquote: { amount: 73000, percent: 86 },
    recommendation: 'Request itemised quote, challenge compressor overhaul line',
  };

  const handleAnalyse = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setAnalysisComplete(true);
    }, 2000);
  };

  const handleSendCounter = () => {
    setShowAnalysis(false);
    if (onValidated) onValidated();
  };

  return (
    <>
      <button
        onClick={() => setShowAnalysis(true)}
        className="w-full px-4 py-3 bg-amber-50 border border-amber-200 text-amber-800 text-sm font-medium rounded-lg hover:bg-amber-100 transition-colors flex items-center justify-center gap-2"
      >
        <AlertTriangle size={16} /> Validate Vendor Quote (AI)
      </button>

      {showAnalysis && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setShowAnalysis(false)}>
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          <div
            className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-900">Repair Quote Validator</h2>
                <button onClick={() => setShowAnalysis(false)} className="text-gray-400 hover:text-gray-600">
                  <X size={20} />
                </button>
              </div>

              {/* Quote summary */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-gray-900">Vendor Quote Received</h3>
                  <span className="text-xs text-gray-500">{quote.date}</span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Vendor</p>
                    <p className="font-medium text-gray-900">{quote.vendor}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Work Order</p>
                    <p className="font-mono text-gray-900">{quote.woNumber}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-gray-500">Quoted Scope</p>
                    <p className="font-medium text-gray-900">{quote.quotedScope}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-gray-500">Quoted Price</p>
                    <p className="text-xl font-mono font-bold text-gray-900">HKD {quote.quotedPrice.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              {!analysisComplete ? (
                <div className="text-center py-8">
                  {analyzing ? (
                    <>
                      <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4" />
                      <p className="text-sm font-medium text-gray-900 mb-2">Analysing quote against sensor data...</p>
                      <p className="text-xs text-gray-500">Cross-referencing 847 historical repair records</p>
                    </>
                  ) : (
                    <>
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FileText size={24} className="text-blue-600" />
                      </div>
                      <p className="text-sm font-medium text-gray-900 mb-4">Ready to analyse vendor quote</p>
                      <button
                        onClick={handleAnalyse}
                        className="px-6 py-2.5 bg-accent text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Run AI Analysis
                      </button>
                    </>
                  )}
                </div>
              ) : (
                <div className="animate-fade-in">
                  {/* Analysis result */}
                  <div className="bg-red-50 border-2 border-red-300 rounded-lg p-5 mb-4">
                    <div className="flex items-start gap-3 mb-4">
                      <AlertTriangle size={20} className="text-red-600 mt-0.5 shrink-0" />
                      <div>
                        <h3 className="text-sm font-bold text-red-900 mb-1">OVERQUOTE DETECTED</h3>
                        <p className="text-sm text-red-800">{analysis.recommendation}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="bg-white/70 rounded-lg p-3">
                        <p className="text-xs text-gray-500 mb-1">Quoted Price</p>
                        <p className="text-lg font-mono font-bold text-gray-900">HKD {quote.quotedPrice.toLocaleString()}</p>
                      </div>
                      <div className="bg-white/70 rounded-lg p-3">
                        <p className="text-xs text-gray-500 mb-1">Fair Market Price</p>
                        <p className="text-lg font-mono font-bold text-ok">
                          HKD {analysis.fairMarketPrice.low.toLocaleString()}–{analysis.fairMarketPrice.high.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div className="bg-red-100 border border-red-300 rounded-lg p-3 text-center">
                      <p className="text-xs text-red-700 mb-1">OVERQUOTE AMOUNT</p>
                      <p className="text-2xl font-mono font-bold text-red-700">HKD {analysis.overquote.amount.toLocaleString()}</p>
                      <p className="text-xs text-red-600 font-medium">{analysis.overquote.percent}% above justified scope</p>
                    </div>
                  </div>

                  {/* Sensor data analysis */}
                  <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Sensor Data Analysis</h4>
                    <div className="space-y-2 text-xs">
                      <div className="flex items-start gap-2">
                        <CheckCircle size={14} className="text-ok mt-0.5 shrink-0" />
                        <div>
                          <p className="text-gray-500">Vibration signature</p>
                          <p className="text-gray-900 font-medium">{analysis.sensorData.vibration}</p>
                          <p className="text-gray-500 mt-0.5">Pattern matches bearing wear only — no compressor damage detected</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle size={14} className="text-ok mt-0.5 shrink-0" />
                        <div>
                          <p className="text-gray-500">Operating temperature</p>
                          <p className="text-gray-900 font-medium">{analysis.sensorData.temperature}</p>
                          <p className="text-gray-500 mt-0.5">No abnormal heat signature from compressor internals</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle size={14} className="text-ok mt-0.5 shrink-0" />
                        <div>
                          <p className="text-gray-500">Power consumption</p>
                          <p className="text-gray-900 font-medium">{analysis.sensorData.powerDraw}</p>
                          <p className="text-gray-500 mt-0.5">Consistent with bearing friction increase only</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Diagnosis */}
                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle size={18} className="text-ok mt-0.5 shrink-0" />
                      <div>
                        <h4 className="text-sm font-semibold text-emerald-900 mb-2">AI Diagnosis</h4>
                        <p className="text-sm text-emerald-800 mb-2">{analysis.diagnosis}</p>
                        <p className="text-sm text-emerald-800">
                          <span className="font-semibold">Recommended scope:</span> {analysis.recommendedScope}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex gap-3">
                    <button
                      onClick={handleSendCounter}
                      className="flex-1 py-2.5 bg-accent text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-1"
                    >
                      <FileText size={16} /> Send Counter-Proposal Template
                    </button>
                    <button
                      onClick={() => setShowAnalysis(false)}
                      className="px-4 py-2.5 border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Dismiss
                    </button>
                  </div>

                  <p className="text-xs text-gray-500 mt-4 text-center">
                    This analysis is based on real-time sensor data and 847 historical repair records.
                    <br />
                    Average savings per validated quote: <span className="font-medium text-ok">HKD 23,000</span>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
