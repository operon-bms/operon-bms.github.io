import { useState } from 'react';
import { createPortal } from 'react-dom';
import { MessageSquare, CheckCircle, AlertTriangle, Thermometer, Clock, X } from 'lucide-react';

export default function TenantComplaintIntelligence() {
  const [showComplaint, setShowComplaint] = useState(false);
  const [complaintResolved, setComplaintResolved] = useState(false);

  const complaint = {
    id: 'CMP-2026-0347',
    unit: '12F',
    building: 'One Taikoo Place',
    tenant: 'TechStart Ltd',
    type: 'Too warm',
    submitted: '14:23',
    date: '11 Mar 2026',
    description: 'Office temperature is uncomfortably warm. Feels like 27°C or higher. Please adjust.',
  };

  const sensorCheck = {
    zone: 'Zone B (covers Unit 12F)',
    temperature: 25.8,
    threshold: 26,
    assessment: 'borderline',
    co2: 847,
    humidity: 58,
  };

  const autoAction = {
      action: 'CHW setpoint lowered 0.5°C for Zone B',
      expectedDrop: '1.2°C within 20 minutes',
      notificationSent: true,
  };

  return (
    <>
      {/* Trigger button - could be in a notifications list */}
      <button
        onClick={() => setShowComplaint(true)}
        className="w-full px-4 py-3 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-between"
      >
        <div className="flex items-center gap-2">
          <MessageSquare size={16} className="text-gray-400" />
          <span>New tenant complaint — Unit 12F</span>
        </div>
        <span className="text-xs text-gray-400">14:23</span>
      </button>

      {showComplaint && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={() => setShowComplaint(false)}>
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          <div
            className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-100 shrink-0">
              <h2 className="text-lg font-bold text-gray-900">Tenant Complaint Intelligence</h2>
              <button onClick={() => setShowComplaint(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1">
              {/* Complaint details */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-gray-900">Complaint Received</h3>
                  <span className="text-xs text-gray-500">{complaint.date} {complaint.submitted}</span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm mb-3">
                  <div>
                    <p className="text-gray-500">Unit</p>
                    <p className="font-medium text-gray-900">{complaint.unit}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Tenant</p>
                    <p className="font-medium text-gray-900">{complaint.tenant}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-gray-500">Issue</p>
                    <p className="font-medium text-gray-900">{complaint.type} — "{complaint.description}"</p>
                  </div>
                </div>
              </div>

              {/* Sensor cross-reference */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-2 mb-3">
                  <Thermometer size={16} className="text-blue-600" />
                  <h3 className="text-sm font-semibold text-blue-900">Sensor Cross-Reference</h3>
                </div>
                <div className="grid grid-cols-3 gap-3 mb-3">
                  <div className="bg-white/70 rounded-lg p-3 text-center">
                    <p className="text-xs text-gray-500 mb-1">Zone Temp</p>
                    <p className={`text-lg font-mono font-bold ${sensorCheck.temperature >= sensorCheck.threshold - 0.5 ? 'text-amber-700' : 'text-ok'}`}>
                      {sensorCheck.temperature}°C
                    </p>
                    <p className="text-[10px] text-gray-500">Threshold: {sensorCheck.threshold}°C</p>
                  </div>
                  <div className="bg-white/70 rounded-lg p-3 text-center">
                    <p className="text-xs text-gray-500 mb-1">CO₂</p>
                    <p className="text-lg font-mono font-bold text-ok">{sensorCheck.co2} ppm</p>
                    <p className="text-[10px] text-gray-500">Limit: 1,000 ppm</p>
                  </div>
                  <div className="bg-white/70 rounded-lg p-3 text-center">
                    <p className="text-xs text-gray-500 mb-1">Humidity</p>
                    <p className="text-lg font-mono font-bold text-ok">{sensorCheck.humidity}%</p>
                    <p className="text-[10px] text-gray-500">Range: 40–70%</p>
                  </div>
                </div>
                <div className={`rounded-lg p-3 text-center ${
                  sensorCheck.assessment === 'borderline' 
                    ? 'bg-amber-100 border border-amber-300' 
                    : sensorCheck.assessment === 'valid'
                    ? 'bg-red-100 border border-red-300'
                    : 'bg-emerald-100 border border-emerald-300'
                }`}>
                  <p className="text-xs font-semibold text-gray-700 mb-1">ASSESSMENT</p>
                  <p className={`text-sm font-bold ${
                    sensorCheck.assessment === 'borderline' ? 'text-amber-800' :
                    sensorCheck.assessment === 'valid' ? 'text-red-800' :
                    'text-emerald-800'
                  }`}>
                    {sensorCheck.assessment === 'borderline' && 'BORDERLINE VALID — within spec but approaching limit'}
                    {sensorCheck.assessment === 'valid' && 'VALID — sensors confirm discomfort'}
                    {sensorCheck.assessment === 'perception' && 'PERCEPTION — sensors show normal conditions'}
                  </p>
                </div>
              </div>

              {/* Auto-action taken */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
                <div className="flex items-start gap-3">
                  <CheckCircle size={18} className="text-ok mt-0.5 shrink-0" />
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-emerald-900 mb-2">Auto-Action Taken</h3>
                    <p className="text-sm text-emerald-800 mb-2">{autoAction.action}</p>
                    <p className="text-sm text-emerald-800 mb-3">
                      <span className="font-semibold">Expected result:</span> {autoAction.expectedDrop}
                    </p>
                    {autoAction.notificationSent && (
                      <div className="bg-white/70 rounded-lg p-3">
                        <p className="text-xs text-gray-500 mb-2">Tenant notification sent:</p>
                        <p className="text-xs text-gray-700 italic border-l-2 border-emerald-300 pl-3">
                          "We've received your comfort request and have already adjusted cooling for your zone. 
                          You should feel a difference within 20 minutes."
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Resolution summary */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-900 mb-1">Resolution Summary</p>
                    <div className="flex items-center gap-4 text-xs text-gray-600">
                      <span className="flex items-center gap-1">
                        <Clock size={12} /> Resolved in 47 seconds
                      </span>
                      <span className="flex items-center gap-1">
                        <CheckCircle size={12} className="text-ok" /> Auto-resolved
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageSquare size={12} className="text-gray-400" /> FM action: None
                      </span>
                    </div>
                  </div>
                  {!complaintResolved ? (
                    <button
                      onClick={() => { setComplaintResolved(true); setShowComplaint(false); }}
                      className="px-4 py-2 bg-ok text-white text-xs font-medium rounded-lg hover:bg-emerald-700 transition-colors shrink-0"
                    >
                      Mark Resolved
                    </button>
                  ) : (
                    <span className="text-sm font-medium text-ok shrink-0">✓ Resolved</span>
                  )}
                </div>
              </div>

              <p className="text-xs text-gray-500 text-center">
                Tenant complaint intelligence automatically cross-references complaints against sensor data,
                takes corrective action when valid, and provides FM with data-backed responses for perception issues.
                <br />
                <span className="font-medium text-ok">Average resolution time: 52 seconds</span> (vs 30–90 minutes manually)
              </p>
            </div>
          </div>
        </div>
      , document.body)}
    </>
  );
}
