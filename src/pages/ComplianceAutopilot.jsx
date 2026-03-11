import { useState } from 'react';
import { FileText, Download, CheckCircle, AlertTriangle, Clock, ExternalLink, Building } from 'lucide-react';

export default function ComplianceAutopilot() {
  const [generatingCert, setGeneratingCert] = useState(null);
  const [certificateGenerated, setCertificateGenerated] = useState(false);

  const buildings = [
    {
      id: 'one-taikoo-place',
      name: 'One Taikoo Place',
      status: 'compliant',
      lastTest: '8 Feb 2026',
      nextTest: '8 Apr 2026',
      daysUntil: 28,
      parameters: {
        co2: { value: 847, unit: 'ppm', limit: 1000, class: 'Class 1' },
        pm25: { value: 12, unit: 'µg/m³', limit: 75, class: 'Class 1' },
        tvoc: { value: 0.21, unit: 'ppm', limit: 1.0, class: 'Class 1' },
        temp: { value: 22.4, unit: '°C', limit: '20–26°C', class: 'Class 1' },
        humidity: { value: 58.3, unit: '%', limit: '40–70%', class: 'Class 1' },
      },
    },
    {
      id: 'pacific-centre',
      name: 'Pacific Centre',
      status: 'overdue',
      lastTest: '2 Dec 2025',
      nextTest: '2 Mar 2026',
      daysUntil: -9,
      parameters: {
        co2: { value: 987, unit: 'ppm', limit: 1000, class: 'Class 1' },
        pm25: { value: 18, unit: 'µg/m³', limit: 75, class: 'Class 1' },
        tvoc: { value: 0.34, unit: 'ppm', limit: 1.0, class: 'Class 1' },
        temp: { value: 23.1, unit: '°C', limit: '20–26°C', class: 'Class 1' },
        humidity: { value: 61.2, unit: '%', limit: '40–70%', class: 'Class 1' },
      },
    },
    {
      id: 'harbour-view',
      name: 'Harbour View Tower',
      status: 'compliant',
      lastTest: '15 Jan 2026',
      nextTest: '15 Apr 2026',
      daysUntil: 35,
      parameters: {
        co2: { value: 782, unit: 'ppm', limit: 1000, class: 'Class 1' },
        pm25: { value: 9, unit: 'µg/m³', limit: 75, class: 'Class 1' },
        tvoc: { value: 0.18, unit: 'ppm', limit: 1.0, class: 'Class 1' },
        temp: { value: 21.8, unit: '°C', limit: '20–26°C', class: 'Class 1' },
        humidity: { value: 55.7, unit: '%', limit: '40–70%', class: 'Class 1' },
      },
    },
    {
      id: 'central-plaza',
      name: 'Central Plaza',
      status: 'compliant',
      lastTest: '22 Feb 2026',
      nextTest: '22 May 2026',
      daysUntil: 72,
      parameters: {
        co2: { value: 645, unit: 'ppm', limit: 1000, class: 'Class 1' },
        pm25: { value: 7, unit: 'µg/m³', limit: 75, class: 'Class 1' },
        tvoc: { value: 0.15, unit: 'ppm', limit: 1.0, class: 'Class 1' },
        temp: { value: 22.1, unit: '°C', limit: '20–26°C', class: 'Class 1' },
        humidity: { value: 52.4, unit: '%', limit: '40–70%', class: 'Class 1' },
      },
    },
    {
      id: 'aberdeen-industrial',
      name: 'Aberdeen Industrial',
      status: 'urgent',
      lastTest: '15 Feb 2025',
      nextTest: '15 Mar 2026',
      daysUntil: 4,
      parameters: {
        co2: { value: 1147, unit: 'ppm', limit: 1000, class: 'Class 2' },
        pm25: { value: 34, unit: 'µg/m³', limit: 75, class: 'Class 1' },
        tvoc: { value: 0.52, unit: 'ppm', limit: 1.0, class: 'Class 1' },
        temp: { value: 24.8, unit: '°C', limit: '20–26°C', class: 'Class 1' },
        humidity: { value: 68.1, unit: '%', limit: '40–70%', class: 'Class 1' },
      },
    },
  ];

  const handleGenerateCertificate = (buildingId) => {
    setGeneratingCert(buildingId);
    setTimeout(() => {
      setGeneratingCert(null);
      setCertificateGenerated(true);
    }, 2000);
  };

  const getStatusColor = (status) => {
    if (status === 'overdue') return 'bg-red-100 text-red-700 border-red-200';
    if (status === 'urgent') return 'bg-amber-100 text-amber-700 border-amber-200';
    return 'bg-emerald-100 text-emerald-700 border-emerald-200';
  };

  const getStatusIcon = (status) => {
    if (status === 'overdue') return <AlertTriangle size={14} />;
    if (status === 'urgent') return <Clock size={14} />;
    return <CheckCircle size={14} />;
  };

  return (
    <div className="animate-fade-in max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">EPD Compliance Autopilot</h1>
        <p className="text-sm text-gray-500">Hong Kong Environmental Protection Department — Indoor Air Quality compliance</p>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-emerald-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle size={18} className="text-ok" />
            <span className="text-xs font-medium text-emerald-700">COMPLIANT</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">
            {buildings.filter(b => b.status === 'compliant').length}
          </p>
          <p className="text-xs text-gray-500 mt-1">buildings</p>
        </div>
        <div className="bg-white rounded-xl border border-amber-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock size={18} className="text-amber-600" />
            <span className="text-xs font-medium text-amber-700">DUE SOON</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">
            {buildings.filter(b => b.status === 'urgent').length}
          </p>
          <p className="text-xs text-gray-500 mt-1">within 7 days</p>
        </div>
        <div className="bg-white rounded-xl border border-red-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle size={18} className="text-crit" />
            <span className="text-xs font-medium text-red-700">OVERDUE</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">
            {buildings.filter(b => b.status === 'overdue').length}
          </p>
          <p className="text-xs text-gray-500 mt-1">requires action</p>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl border border-blue-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <FileText size={18} className="text-accent" />
            <span className="text-xs font-medium text-blue-700">CERTIFICATES</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">5/5</p>
          <p className="text-xs text-gray-500 mt-1">auto-generated</p>
        </div>
      </div>

      {/* Compliance calendar */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">WSD Annual Water Test Schedule</h2>
          <span className="text-xs text-gray-500">Auto-updated daily</span>
        </div>
        <div className="space-y-3">
          {buildings.map(building => (
            <div
              key={building.id}
              className={`border rounded-lg p-4 ${getStatusColor(building.status)}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <div className="mt-0.5">
                    {getStatusIcon(building.status)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm font-bold text-gray-900">{building.name}</h3>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${getStatusColor(building.status)}`}>
                        {building.status.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-xs mt-2">
                      <span>Last tested: <span className="font-medium">{building.lastTest}</span></span>
                      <span>Next due: <span className={`font-medium ${building.daysUntil < 0 ? 'text-red-700' : building.daysUntil <= 7 ? 'text-amber-700' : 'text-gray-700'}`}>
                        {building.nextTest} {building.daysUntil < 0 ? `(${Math.abs(building.daysUntil)} days overdue)` : `(${building.daysUntil} days)`}
                      </span></span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleGenerateCertificate(building.id)}
                  disabled={generatingCert === building.id}
                  className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 text-xs font-medium rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-1 shrink-0"
                >
                  {generatingCert === building.id ? (
                    <>
                      <Clock size={12} className="animate-spin" /> Generating...
                    </>
                  ) : (
                    <>
                      <FileText size={12} /> Generate Cert
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Certificate preview */}
      {certificateGenerated && (
        <div className="bg-white rounded-xl border-2 border-emerald-300 p-6 mb-6 animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <CheckCircle size={20} className="text-ok" />
              <h2 className="text-lg font-bold text-gray-900">Certificate Generated — One Taikoo Place</h2>
            </div>
            <div className="flex items-center gap-2">
              <button className="px-4 py-2 bg-accent text-white text-xs font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-1">
                <Download size={14} /> Download PDF
              </button>
              <button className="px-4 py-2 border border-gray-200 text-gray-700 text-xs font-medium rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-1">
                <ExternalLink size={14} /> Submit to EPD
              </button>
            </div>
          </div>

          {/* Certificate preview */}
          <div className="border border-gray-200 rounded-lg p-6 bg-gradient-to-br from-emerald-50/50 to-white">
            <div className="text-center mb-6">
              <h3 className="text-lg font-bold text-gray-900">EPD Indoor Air Quality Certificate</h3>
              <p className="text-sm text-gray-500">February 2026 Assessment</p>
            </div>

            <div className="grid grid-cols-5 gap-4 mb-6">
              {[
                { label: 'CO₂', value: 847, unit: 'ppm', limit: 1000, icon: '🌬️', cls: 'Class 1' },
                { label: 'PM2.5', value: 12, unit: 'µg/m³', limit: 75, icon: '🔬', cls: 'Class 1' },
                { label: 'TVOC', value: 0.21, unit: 'ppm', limit: 1.0, icon: '🧪', cls: 'Class 1' },
                { label: 'Temp', value: 22.4, unit: '°C', limit: '20–26', icon: '🌡️', cls: 'Class 1' },
                { label: 'Humidity', value: 58.3, unit: '%', limit: '40–70', icon: '💧', cls: 'Class 1' },
              ].map(param => (
                <div key={param.label} className="text-center p-3 bg-white rounded-lg border border-emerald-200">
                  <div className="text-xl mb-1">{param.icon}</div>
                  <p className="text-xs text-gray-500">{param.label}</p>
                  <p className="text-lg font-bold text-gray-900">{param.value} <span className="text-xs font-normal text-gray-500">{param.unit}</span></p>
                  <p className="text-[10px] text-emerald-700">Limit: {param.limit}</p>
                  <p className="text-[10px] text-emerald-700 font-medium mt-1">✓ {param.cls}</p>
                </div>
              ))}
            </div>

            <div className="bg-emerald-100 border border-emerald-300 rounded-lg p-4 text-center">
              <p className="text-sm font-bold text-emerald-900">OVERALL CLASSIFICATION: CLASS 1 (EXCELLENT)</p>
              <p className="text-xs text-emerald-700 mt-1">All parameters within EPD Class 1 limits</p>
            </div>

            <div className="mt-4 flex justify-between items-center text-xs text-gray-500">
              <span>Generated: 11 Mar 2026, 14:23</span>
              <span>Certificate ID: EPD-IAQ-2026-0247</span>
            </div>
          </div>

          <p className="text-xs text-gray-500 mt-4">
            Time to generate: 12 seconds • Previously: 4–6 hours of manual data compilation
          </p>
        </div>
      )}

      {/* Auto-reminders */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
        <div className="flex items-start gap-3">
          <Clock size={18} className="text-amber-600 mt-0.5 shrink-0" />
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-amber-900 mb-2">Auto-Reminder System Active</h3>
            <div className="space-y-2 text-xs text-amber-800">
              <p>• <strong>Pacific Centre:</strong> Escalation email sent to Portfolio Manager (overdue 9 days)</p>
              <p>• <strong>Aberdeen Industrial:</strong> Reminder sent to FM 3 days ago — follow-up scheduled for tomorrow</p>
            </div>
            <p className="text-xs text-amber-700 mt-3 font-medium">
              Compliance reminders are automatically escalated if no action is taken within 48 hours.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
