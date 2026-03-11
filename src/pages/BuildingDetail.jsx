import { useParams, useNavigate } from 'react-router-dom';
import { useLiveData } from '../hooks/useLiveData';
import SensorMetric from '../components/SensorMetric';
import RecommendationCard from '../components/RecommendationCard';
import { ChevronRight, Zap, Settings, LayoutGrid, ToggleLeft, ToggleRight, DollarSign, MessageSquare, ClipboardList } from 'lucide-react';
import { allRecommendations } from '../data/recommendations';
import { useState } from 'react';
import BillExplainer from '../components/BillExplainer';
import TenantComplaintIntelligence from '../components/TenantComplaintIntelligence';
import ShiftHandoverBrief from '../components/ShiftHandoverBrief';

export default function BuildingDetail() {
  const { buildingId } = useParams();
  const { getBuildingData } = useLiveData();
  const navigate = useNavigate();
  const [autoExec, setAutoExec] = useState(true);
  const [autoApprove, setAutoApprove] = useState(false);

  const building = getBuildingData(buildingId || '1u-mall');
  if (!building) return <div className="p-8 text-gray-500">Building not found</div>;

  const recs = allRecommendations[building.id] || [];
  const pending = recs.filter(r => r.status === 'pending').slice(0, 2);

  return (
    <div className="animate-fade-in">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-sm text-gray-500 mb-4">
        <button onClick={() => navigate('/portfolio')} className="hover:text-accent">Portfolio</button>
        <ChevronRight size={14} />
        <span className="text-gray-900 font-medium">{building.name}</span>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{building.name}</h1>
          <p className="text-sm text-gray-500">{building.type} • {building.floors} floors</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium px-3 py-1.5 rounded-full bg-accent/10 text-accent">{building.phase} — 14:23</span>
          <button onClick={() => navigate(`/building/${building.id}/recommendations`)} className="text-xs font-medium px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50">Recommendations</button>
          <button onClick={() => navigate(`/building/${building.id}/diagram`)} className="text-xs font-medium px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 flex items-center gap-1"><LayoutGrid size={12} /> Diagram</button>
        </div>
      </div>

      {/* Sensor Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
        {Object.entries(building.sensors).map(([key, sensor]) => (
          <SensorMetric key={key} {...sensor} />
        ))}
      </div>

      {/* Three columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Recommendations */}
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-900">Recommendations</h3>
            <button onClick={() => navigate(`/building/${building.id}/recommendations`)} className="text-xs text-accent hover:underline">View All →</button>
          </div>
          <div className="flex gap-2 mb-3">
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-50 text-accent font-medium">
              {recs.filter(r => r.status === 'pending').length} Pending
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-50 text-amber-600 font-medium">
              {recs.filter(r => r.status === 'monitoring').length} Monitoring
            </span>
          </div>
          <div className="space-y-3">
            {pending.map(rec => (
              <RecommendationCard key={rec.id} rec={rec} />
            ))}
            {pending.length === 0 && <p className="text-xs text-gray-400 py-4 text-center">No pending recommendations</p>}
          </div>
        </div>

        {/* Energy */}
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Energy Today</h3>
          <div className="space-y-4">
            <div>
              <p className="text-3xl font-mono font-bold text-ok sensor-value">{building.energySavedToday}</p>
              <p className="text-xs text-gray-500 mt-0.5">kWh saved today</p>
            </div>
            <div>
              <p className="text-2xl font-mono font-bold text-emerald-600 sensor-value">HKD {building.costSavedToday}</p>
              <p className="text-xs text-gray-500 mt-0.5">cost savings</p>
            </div>
            <div className="pt-3 border-t border-gray-100">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-500">Recommendations implemented</span>
                <span className="font-medium">{Math.max(0, recs.length - recs.filter(r => r.status === 'pending').length)}/{recs.length}</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-1.5">
                <div className="bg-ok h-1.5 rounded-full transition-all" style={{ width: `${Math.max(0, (recs.length - recs.filter(r => r.status === 'pending').length) / Math.max(1, recs.length)) * 100}%` }} />
              </div>
            </div>
            <button onClick={() => navigate(`/energy`)} className="text-xs text-accent hover:underline">Details →</button>
          </div>
        </div>

        {/* BAS */}
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">BAS Status</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Auto-Execute</p>
                <p className="text-[11px] text-gray-500">Automatically apply low-risk changes</p>
              </div>
              <button onClick={() => setAutoExec(!autoExec)} className={autoExec ? 'text-ok' : 'text-gray-400'}>
                {autoExec ? <ToggleRight size={28} /> : <ToggleLeft size={28} />}
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Auto-Approve</p>
                <p className="text-[11px] text-gray-500">Skip manual approval for high-confidence</p>
              </div>
              <button onClick={() => setAutoApprove(!autoApprove)} className={autoApprove ? 'text-ok' : 'text-gray-400'}>
                {autoApprove ? <ToggleRight size={28} /> : <ToggleLeft size={28} />}
              </button>
            </div>
            <div className="pt-3 border-t border-gray-100">
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${building.basEnabled ? 'bg-emerald-50 text-ok' : 'bg-gray-100 text-gray-500'}`}>
                BAS {building.basEnabled ? 'Connected' : 'Not Connected'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* New features row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
        {/* Bill Explainer */}
        <BillExplainer buildingId={building.id} />

        {/* Tenant Complaint Intelligence */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <MessageSquare size={20} className="text-blue-500" />
              <h3 className="text-sm font-bold text-gray-900">Tenant Complaints</h3>
            </div>
            <span className="text-xs text-gray-500">Last 24 hours</span>
          </div>
          <TenantComplaintIntelligence />
          <p className="text-xs text-gray-500 mt-3">
            AI cross-references complaints against sensor data and auto-resolves when possible
          </p>
        </div>

        {/* Shift Handover */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <ClipboardList size={20} className="text-purple-500" />
              <h3 className="text-sm font-bold text-gray-900">Shift Handover</h3>
            </div>
            <span className="text-xs text-gray-500">18:00 today</span>
          </div>
          <ShiftHandoverBrief />
          <p className="text-xs text-gray-500 mt-3">
            Auto-generated brief ensures zero information gap between shifts
          </p>
        </div>
      </div>
    </div>
  );
}
