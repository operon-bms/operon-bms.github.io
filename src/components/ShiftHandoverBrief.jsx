import { useState } from 'react';
import { createPortal } from 'react-dom';
import { ClipboardList, Clock, AlertTriangle, CheckCircle, Wrench, MessageSquare, X } from 'lucide-react';

export default function ShiftHandoverBrief() {
  const [showBrief, setShowBrief] = useState(false);
  const [briefViewed, setBriefViewed] = useState(false);

  const handover = {
    time: '18:00',
    date: '11 Mar 2026',
    outgoing: 'David Chan',
    incoming: 'Sarah Lam',
    openItems: [
      {
        id: 1,
        type: 'maintenance',
        title: 'Pacific Centre Chiller-3',
        description: 'Bearing alert active, CoolTech HK arriving tomorrow 9 AM (WO-2026-0847)',
        icon: Wrench,
        color: 'amber',
      },
      {
        id: 2,
        type: 'tenant',
        title: 'One Taikoo Place Unit 12F',
        description: 'Tenant comfort complaint logged 14:23, auto-resolved — monitor if they complain again',
        icon: MessageSquare,
        color: 'blue',
      },
      {
        id: 3,
        type: 'alert',
        title: 'Aberdeen Industrial',
        description: 'CO₂ normalised at 15:47 (was 1,340 ppm). Watch for evening spike if warehouse loading resumes',
        icon: AlertTriangle,
        color: 'emerald',
      },
    ],
    contractorSchedule: [
      { time: '09:00', contractor: 'CoolTech HK', location: 'Pacific Centre', wo: 'WO-2026-0847' },
      { time: '14:00', contractor: 'General inspection', location: 'Kowloon Bay Centre', wo: null },
    ],
    monitoringLoad: 'LOW',
  };

  return (
    <>
      {/* Trigger - could be in notifications or as a banner */}
      <button
        onClick={() => setShowBrief(true)}
        className={`w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors flex items-center justify-between ${
          briefViewed 
            ? 'bg-emerald-50 border border-emerald-200 text-emerald-700' 
            : 'bg-blue-50 border border-blue-200 text-blue-700'
        }`}
      >
        <div className="flex items-center gap-2">
          <ClipboardList size={16} />
          <span>{briefViewed ? 'Shift handover viewed' : 'Shift handover ready — 18:00'}</span>
        </div>
        {!briefViewed && (
          <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
        )}
      </button>

      {showBrief && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={() => setShowBrief(false)}>
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          <div
            className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-100 shrink-0">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Shift Handover Brief</h2>
                <p className="text-xs text-gray-500">{handover.date} • {handover.time}</p>
              </div>
              <button onClick={() => setShowBrief(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1">
              {/* Outgoing to incoming */}
              <div className="flex items-center gap-4 mb-6 pb-4 border-b border-gray-200">
                <div className="flex-1 text-center">
                  <p className="text-xs text-gray-500 mb-1">Outgoing FM</p>
                  <p className="text-sm font-bold text-gray-900">{handover.outgoing}</p>
                </div>
                <div className="text-gray-400">→</div>
                <div className="flex-1 text-center">
                  <p className="text-xs text-gray-500 mb-1">Incoming FM</p>
                  <p className="text-sm font-bold text-gray-900">{handover.incoming}</p>
                </div>
              </div>

              {/* Open items */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <AlertTriangle size={14} className="text-amber-600" />
                  Open Items to Watch
                </h3>
                <div className="space-y-3">
                  {handover.openItems.map(item => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={item.id}
                        className={`border rounded-lg p-3 ${
                          item.color === 'amber' ? 'border-amber-200 bg-amber-50/30' :
                          item.color === 'blue' ? 'border-blue-200 bg-blue-50/30' :
                          'border-emerald-200 bg-emerald-50/30'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                            item.color === 'amber' ? 'bg-amber-100 text-amber-700' :
                            item.color === 'blue' ? 'bg-blue-100 text-blue-700' :
                            'bg-emerald-100 text-emerald-700'
                          }`}>
                            <Icon size={14} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900">{item.title}</p>
                            <p className="text-xs text-gray-600 mt-1">{item.description}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Contractor schedule */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Clock size={14} className="text-blue-600" />
                  Contractor Schedule Tomorrow
                </h3>
                <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
                  {handover.contractorSchedule.map((appt, idx) => (
                    <div
                      key={idx}
                      className={`flex items-center gap-4 p-3 ${
                        idx < handover.contractorSchedule.length - 1 ? 'border-b border-gray-200' : ''
                      }`}
                    >
                      <div className="w-16 text-center">
                        <p className="text-sm font-mono font-bold text-gray-900">{appt.time}</p>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{appt.contractor}</p>
                        <p className="text-xs text-gray-500">{appt.location}</p>
                      </div>
                      {appt.wo && (
                        <span className="text-xs font-mono text-gray-500">{appt.wo}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Monitoring load */}
              <div className="bg-gradient-to-r from-emerald-50 to-white border border-emerald-200 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CheckCircle size={18} className="text-ok" />
                    <div>
                      <p className="text-sm font-semibold text-emerald-900">Nothing Requires Immediate Action</p>
                      <p className="text-xs text-emerald-700">All systems stable, contractors scheduled</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500 mb-1">Monitoring Load Tonight</p>
                    <p className="text-lg font-bold text-ok">{handover.monitoringLoad}</p>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => { setBriefViewed(true); setShowBrief(false); }}
                  className="flex-1 py-2.5 bg-accent text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shrink-0"
                >
                  Acknowledge & Close
                </button>
                <button className="px-4 py-2.5 border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-1 shrink-0">
                  <MessageSquare size={14} /> Add Note
                </button>
              </div>

              <p className="text-xs text-gray-500 mt-4 text-center">
                Shift handover brief auto-generated from building events, work orders, and sensor alerts.
                <br />
                Ensures zero information gap between shifts.
              </p>
            </div>
          </div>
        </div>
      , document.body)}
    </>
  );
}
