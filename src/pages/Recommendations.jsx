import { useParams, useNavigate } from 'react-router-dom';
import { ChevronRight, CheckCircle } from 'lucide-react';
import { allRecommendations } from '../data/recommendations';
import RecommendationCard from '../components/RecommendationCard';
import { useState } from 'react';
import Toast from '../components/Toast';

export default function Recommendations() {
  const { buildingId } = useParams();
  const navigate = useNavigate();
  const id = buildingId || 'one-taikoo-place';
  const recs = allRecommendations[id] || [];
  const [tab, setTab] = useState('pending');
  const [approved, setApproved] = useState(new Set());
  const [rejected, setRejected] = useState(new Set());
  const [toast, setToast] = useState(null);

  const buildingName = {
    'one-taikoo-place': 'One Taikoo Place', 'pacific-centre': 'Pacific Centre', 'harbour-view': 'Harbour View Tower',
    'central-plaza': 'Central Plaza', 'kowloon-bay': 'Kowloon Bay Centre', 'aberdeen-industrial': 'Aberdeen Industrial'
  }[id] || id;

  const handleApprove = (recId) => { setApproved(p => new Set(p).add(recId)); setToast('Recommendation approved — monitoring impact.'); };
  const handleReject = (recId) => { setRejected(p => new Set(p).add(recId)); };

  const handleBulkApprove = () => {
    const pending = recs.filter(r => r.status === 'pending' && !approved.has(r.id) && !rejected.has(r.id));
    const ids = new Set(approved);
    pending.forEach(r => ids.add(r.id));
    setApproved(ids);
    setToast(`${pending.length} recommendations bulk-approved.`);
  };

  const filtered = recs.filter(r => {
    if (tab === 'pending') return r.status === 'pending' && !approved.has(r.id) && !rejected.has(r.id);
    if (tab === 'monitoring') return r.status === 'monitoring' || approved.has(r.id);
    return false;
  });

  const totalSaved = recs.filter(r => approved.has(r.id) || r.status === 'monitoring').reduce((s, r) => s + Math.max(0, r.energyImpact), 0);

  return (
    <div className="animate-fade-in">
      <div className="flex items-center gap-1.5 text-sm text-gray-500 mb-4">
        <button onClick={() => navigate('/portfolio')} className="hover:text-accent">Portfolio</button>
        <ChevronRight size={14} />
        <button onClick={() => navigate(`/building/${id}`)} className="hover:text-accent">{buildingName}</button>
        <ChevronRight size={14} />
        <span className="text-gray-900 font-medium">Recommendations</span>
      </div>

      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h1 className="text-2xl font-bold text-gray-900">Optimization Recommendations</h1>
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium px-3 py-1.5 rounded-full bg-emerald-50 text-ok">+{totalSaved.toFixed(1)} kWh saved</span>
          <button onClick={handleBulkApprove} className="text-xs font-medium px-3 py-1.5 rounded-lg bg-accent text-white hover:bg-blue-700 flex items-center gap-1">
            <CheckCircle size={12} /> Bulk Approve All
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-gray-100 p-1 rounded-lg w-fit">
        {[
          { key: 'pending', label: 'Pending', count: recs.filter(r => r.status === 'pending' && !approved.has(r.id) && !rejected.has(r.id)).length },
          { key: 'monitoring', label: 'Monitoring', count: recs.filter(r => r.status === 'monitoring' || approved.has(r.id)).length },
        ].map(t => (
          <button key={t.key} onClick={() => setTab(t.key)} className={`text-xs font-medium px-4 py-1.5 rounded-md transition-colors ${tab === t.key ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
            {t.label} ({t.count})
          </button>
        ))}
      </div>

      <div className="space-y-3 max-w-3xl">
        {filtered.map(rec => <RecommendationCard key={rec.id} rec={{...rec, status: approved.has(rec.id) ? 'monitoring' : rec.status}} onApprove={handleApprove} onReject={handleReject} />)}
        {filtered.length === 0 && <p className="text-sm text-gray-400 py-8 text-center">No recommendations in this category</p>}
      </div>

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
}
