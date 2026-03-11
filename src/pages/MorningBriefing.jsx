import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, CheckCircle, ChevronRight, ExternalLink } from 'lucide-react';

export default function MorningBriefing() {
  const navigate = useNavigate();
  const [actionsDone, setActionsDone] = useState(new Set());

  const markDone = (id) => setActionsDone(prev => new Set(prev).add(id));

  const actions = [
    { id: 'wo', title: 'Approve Pacific Centre Work Order', desc: 'WO-2026-0847 — Chiller-3 bearing replacement', link: '/predictive', cta: 'View & Approve' },
    { id: 'recs', title: 'Review 1U Mall Recommendations', desc: '2 pending AI optimisations', link: '/building/1u-mall/recommendations', cta: 'Review Now' },
    { id: 'co2', title: 'Aberdeen Industrial CO₂ Alert', desc: 'Auto-correction applied, confirm normalisation', link: '/building/aberdeen-industrial', cta: 'Check Status', inlineResult: 'CO₂ normalising: 1,147 ppm — was 1,340 ppm ↓' },
  ];

  return (
    <div className="animate-fade-in max-w-3xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Morning Briefing</h1>
        <p className="text-sm text-gray-500">Auto-generated daily summary — 11 Mar 2026, 07:00</p>
      </div>

      {/* WhatsApp-style messages */}
      <div className="bg-[#e5ddd5] rounded-xl p-4 mb-6 space-y-3">
        {/* System message */}
        <div className="flex justify-center">
          <span className="bg-[#d9fdd3]/80 text-[11px] text-gray-600 px-3 py-1 rounded-lg">Today</span>
        </div>

        {/* User greeting */}
        <div className="flex justify-end">
          <div className="wa-bubble wa-bubble-right max-w-[85%]">
            <p className="text-sm">🏢 Good morning. Here is your daily facility briefing.</p>
            <p className="text-[10px] text-gray-500 text-right mt-1">07:00 ✓✓</p>
          </div>
        </div>

        {/* Main briefing */}
        <div className="flex justify-start">
          <div className="wa-bubble wa-bubble-left max-w-[92%]">
            <p className="text-[10px] font-semibold text-accent mb-2">Operon Agent</p>
            <div className="text-sm text-gray-800 space-y-3">
              <div>
                <p className="font-semibold text-gray-900 mb-2">PORTFOLIO STATUS — 11 Mar 2026</p>
                <p className="text-xs text-gray-600 mb-3">BUILDINGS: <span className="font-medium">5/6 normal</span> • 1 requires attention</p>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs">
                <p className="font-semibold text-amber-900">⚡ Pacific Centre — Chiller-3 bearing fault predicted</p>
                <p className="text-amber-800 mt-1">• Action taken: Work order drafted, CoolTech HK contacted</p>
                <p className="text-amber-800">• Estimated repair: HKD 9,800 | Saves: HKD 18,500–33,000</p>
              </div>

              <div className="text-xs space-y-1.5">
                <p>✅ <strong>1U Mall</strong> — All systems normal<br/><span className="text-gray-500 ml-5">TES charging: 8% below baseline • 2 AI recs pending</span></p>
                <p>✅ <strong>Harbour View Tower</strong> — All systems normal<br/><span className="text-gray-500 ml-5">Best performer today: 203 kWh saved</span></p>
                <p>✅ <strong>Central Plaza</strong> — Excellent (Score: 90)<br/><span className="text-gray-500 ml-5">318 kWh saved • 0 pending recommendations</span></p>
                <p>✅ <strong>Kowloon Bay Centre</strong> — Normal<br/><span className="text-gray-500 ml-5">BAS not enabled — manual monitoring only</span></p>
                <p>⚠️ <strong>Aberdeen Industrial</strong> — Underperforming (Score: 55)<br/><span className="text-gray-500 ml-5">CO₂: 1,340 ppm (above EPD) — auto-correction applied</span></p>
              </div>

              <hr className="border-gray-200" />

              <div>
                <p className="font-semibold text-gray-900 mb-2">TODAY'S 3 ACTIONS REQUIRED</p>
                <ol className="text-xs space-y-1 list-decimal list-inside text-gray-700">
                  <li>Approve Pacific Centre work order (WO-2026-0847)</li>
                  <li>Review 1U Mall recommendations (2 pending)</li>
                  <li>Confirm Aberdeen Industrial CO₂ normalisation by 10:00</li>
                </ol>
              </div>

              <hr className="border-gray-200" />

              <div className="flex items-center gap-4 text-xs">
                <div><span className="font-semibold text-ok">1,847 kWh</span> <span className="text-gray-500">saved</span></div>
                <div><span className="font-semibold text-ok">HKD 2,031</span> <span className="text-gray-500">cost saved</span></div>
                <div><span className="font-semibold text-accent">17</span> <span className="text-gray-500">automated</span></div>
                <div><span className="font-semibold text-warn">3</span> <span className="text-gray-500">awaiting</span></div>
              </div>
            </div>
            <p className="text-[10px] text-gray-400 mt-2">07:00</p>
          </div>
        </div>
      </div>

      {/* Action cards */}
      <div className="space-y-3 mb-6">
        {actions.map(a => (
          <div key={a.id} className={`bg-white rounded-xl border p-4 flex items-center gap-4 transition-all ${actionsDone.has(a.id) ? 'border-emerald-200 bg-emerald-50/50' : 'border-gray-200'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${actionsDone.has(a.id) ? 'bg-ok text-white' : 'bg-gray-100 text-gray-400'}`}>
              {actionsDone.has(a.id) ? <CheckCircle size={16} /> : <Clock size={16} />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">{a.title}</p>
              <p className="text-xs text-gray-500">{a.desc}</p>
              {actionsDone.has(a.id) && a.inlineResult && (
                <p className="text-xs text-ok mt-1 font-medium animate-fade-in">{a.inlineResult}</p>
              )}
            </div>
            {actionsDone.has(a.id) ? (
              <span className="text-xs text-ok font-medium">Done ✓</span>
            ) : (
              <button onClick={() => { markDone(a.id); if (!a.inlineResult) navigate(a.link); }} className="px-3 py-1.5 bg-accent text-white text-xs font-medium rounded-lg hover:bg-blue-700 transition-colors shrink-0 flex items-center gap-1">
                {a.cta} <ChevronRight size={12} />
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Footer stat */}
      <div className="bg-gradient-to-r from-gray-900 to-navy-900 rounded-xl p-4 text-white">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-xs text-gray-400">Without Operon</p>
            <p className="text-lg font-bold font-mono text-gray-300">~90 min</p>
            <p className="text-[10px] text-gray-500">morning rounds</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">With Operon</p>
            <p className="text-lg font-bold font-mono text-ok">3 min</p>
            <p className="text-[10px] text-gray-500">review + 3 taps</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Time Recovered</p>
            <p className="text-lg font-bold font-mono text-accent">87 min</p>
            <p className="text-[10px] text-gray-500">every morning</p>
          </div>
        </div>
      </div>
    </div>
  );
}
