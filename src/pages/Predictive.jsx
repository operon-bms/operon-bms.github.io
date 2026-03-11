import { useState } from 'react';
import { Activity, AlertTriangle, DollarSign, ChevronDown, ChevronUp, FileText, X, ShieldCheck } from 'lucide-react';
import VendorTable from '../components/VendorTable';
import { vendors } from '../data/vendors';
import Toast from '../components/Toast';
import QuoteValidator from '../components/QuoteValidator';

export default function Predictive() {
  const [showVendors, setShowVendors] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [showWorkOrder, setShowWorkOrder] = useState(false);
  const [toast, setToast] = useState(null);
  const [quoteValidated, setQuoteValidated] = useState(false);

  const vendor = vendors.find(v => v.id === selectedVendor);

  const handleSendWO = () => {
    setShowWorkOrder(false);
    setToast(`✓ Work order WO-2026-0847 sent to ${vendor?.name || 'vendor'}`);
  };

  const handleQuoteValidated = () => {
    setQuoteValidated(true);
    setToast('✓ Quote validated — HKD 73,000 overquote detected and challenged');
  };

  return (
    <div className="animate-fade-in">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Predictive Maintenance</h1>
      <p className="text-sm text-gray-500 mb-6">AI-powered failure prediction and preventive action</p>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-amber-200 p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center"><AlertTriangle size={18} className="text-warn" /></div>
          <div><p className="text-xs text-gray-500">Active Predictions</p><p className="text-lg font-bold text-gray-900">1</p></div>
        </div>
        <div className="bg-white rounded-xl border border-emerald-200 p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center"><DollarSign size={18} className="text-ok" /></div>
          <div><p className="text-xs text-gray-500">Potential Savings</p><p className="text-lg font-bold text-ok">HKD 32,500</p></div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center"><Activity size={18} className="text-accent" /></div>
          <div><p className="text-xs text-gray-500">Equipment Monitored</p><p className="text-lg font-bold text-gray-900">3</p></div>
        </div>
      </div>

      {/* Main prediction card */}
      <div className="bg-white rounded-xl border-l-4 border-l-warn border border-gray-200 p-6 mb-4">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle size={20} className="text-warn" />
          <h2 className="text-lg font-bold text-gray-900">Chiller-3 — Compressor Bearing Fault Predicted</h2>
        </div>
        <p className="text-xs text-gray-500 mb-4">Pacific Centre • Detected: 11 Mar 2026 13:22</p>

        {/* Anomaly details */}
        <div className="bg-gray-50 rounded-lg p-4 mb-4 space-y-2 text-sm">
          <p className="font-medium text-gray-900">Detected Anomaly</p>
          <p className="text-gray-600">Abnormal vibration signature in compressor bearing</p>
          <p className="text-gray-600">Pattern: <span className="font-mono font-medium text-accent">94% match</span> to pre-failure signature (from 847 historical records)</p>
          <p className="text-gray-600">Sensor trend: Vibration <span className="font-mono">0.42mm/s → 1.87mm/s</span> over 14 days <span className="text-crit font-medium">(↑ 345%)</span></p>
        </div>

        {/* Timeline */}
        <div className="mb-4">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Timeline Estimate</p>
          <div className="w-full bg-gray-100 rounded-full h-3 mb-1">
            <div className="bg-gradient-to-r from-warn to-crit h-3 rounded-full" style={{ width: '60%' }} />
          </div>
          <div className="flex justify-between text-[10px] text-gray-500">
            <span>60% failure progression</span>
            <span className="font-medium text-gray-900">Est. 8–14 days to failure</span>
          </div>
        </div>

        {/* Cost comparison */}
        <div className="mb-6">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Cost Analysis</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-center">
              <p className="text-[10px] text-emerald-600 font-medium mb-1">PLANNED REPAIR NOW</p>
              <p className="text-lg font-bold text-ok font-mono">HKD 9,500–12,000</p>
              <p className="text-[10px] text-emerald-600 mt-1">← Recommended</p>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-center">
              <p className="text-[10px] text-amber-600 font-medium mb-1">EMERGENCY REPAIR</p>
              <p className="text-lg font-bold text-warn font-mono">HKD 28,000–45,000</p>
              <p className="text-[10px] text-amber-600 mt-1">3–4× more expensive</p>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-center">
              <p className="text-[10px] text-red-600 font-medium mb-1">FULL REPLACEMENT</p>
              <p className="text-lg font-bold text-crit font-mono">HKD 320,000</p>
              <p className="text-[10px] text-red-600 mt-1">33× more expensive</p>
            </div>
          </div>
          <p className="text-xs font-medium text-ok mt-3 text-center">Potential savings: HKD 18,500–33,000</p>
        </div>

        {/* CTA Buttons */}
        <div className="flex gap-3">
          <button onClick={() => setShowVendors(!showVendors)} className="flex items-center gap-1.5 px-5 py-2.5 bg-accent text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
            {showVendors ? <ChevronUp size={16} /> : <ChevronDown size={16} />} View Matched Vendors
          </button>
          <button onClick={() => setShowWorkOrder(true)} disabled={!selectedVendor} className={`flex items-center gap-1.5 px-5 py-2.5 text-sm font-medium rounded-lg transition-colors ${selectedVendor ? 'bg-gray-900 text-white hover:bg-gray-800' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}>
            <FileText size={16} /> Auto-Draft Work Order
          </button>
        </div>
      </div>

      {/* Vendor table */}
      {showVendors && (
        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Matched Vendors — Chiller Bearing Repair</h3>
          <VendorTable vendors={vendors} selectedId={selectedVendor} onSelect={setSelectedVendor} />
          {!quoteValidated && selectedVendor && (
            <div className="mt-4">
              <QuoteValidator onValidated={handleQuoteValidated} />
            </div>
          )}
          {quoteValidated && (
            <div className="mt-4 bg-emerald-50 border border-emerald-200 rounded-lg p-3 flex items-center gap-3">
              <ShieldCheck size={18} className="text-ok" />
              <div>
                <p className="text-sm font-medium text-emerald-900">Quote Validated — Fair Price Confirmed</p>
                <p className="text-xs text-emerald-700">HKD 73,000 overquote prevented • Ready to proceed</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Work order slide-in */}
      {showWorkOrder && vendor && (
        <div className="fixed inset-0 z-50 flex justify-end" onClick={() => setShowWorkOrder(false)}>
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl animate-slide-in-right overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-900">Work Order Draft</h2>
                <button onClick={() => setShowWorkOrder(false)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
              </div>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between"><span className="text-gray-500">WO #</span><span className="font-mono font-medium">WO-2026-0847</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Building</span><span className="font-medium">Pacific Centre</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Equipment</span><span className="font-medium">Chiller-3</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Priority</span><span className="text-crit font-medium">HIGH</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Required by</span><span className="font-medium">Within 7 days (before 18 Mar)</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Assigned to</span><span className="font-medium text-accent">{vendor.name}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Contact</span><span className="font-mono">{vendor.phone}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Est. Cost</span><span className="font-mono font-medium">{vendor.estimatedCost}</span></div>
                <hr />
                <div>
                  <p className="text-gray-500 mb-2">Issue</p>
                  <p className="font-medium">Bearing inspection and replacement — predictive alert</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-2">Scope of Work</p>
                  <ul className="space-y-1.5">
                    {['Inspect compressor bearings', 'Replace worn bearings (Qty: 2)', 'Lubricate shaft seals', 'Post-repair vibration test', 'Update maintenance log'].map((s, i) => (
                      <li key={i} className="flex items-center gap-2 text-gray-700"><span className="text-ok">✓</span>{s}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="flex gap-3 mt-8">
                <button onClick={handleSendWO} className="flex-1 py-2.5 bg-ok text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors text-sm">Approve & Send</button>
                <button onClick={() => setShowWorkOrder(false)} className="px-4 py-2.5 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 text-sm">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
}
