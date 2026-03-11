import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import {
  LayoutDashboard, Building2, Zap, Activity,
  MessageCircle, Sun, Settings, LogOut, ChevronDown, ChevronRight,
  Clock, Calculator, FileCheck, Droplets, BarChart3,
  ClipboardList, MessageSquare, DollarSign, Sparkles
} from 'lucide-react';
import { buildings } from '../data/buildings';
import { useState } from 'react';

const navSections = [
  {
    title: null,
    items: [
      { to: '/summary', icon: Clock, label: 'Overnight Summary' },
      { to: '/portfolio', icon: LayoutDashboard, label: 'Portfolio Overview' },
      { to: '/building', icon: Building2, label: 'Buildings', expandable: true },
    ],
  },
  {
    title: 'Intelligence',
    items: [
      { to: '/energy', icon: Zap, label: 'Energy Intelligence' },
      { to: '/compliance', icon: FileCheck, label: 'EPD Compliance' },
      { to: '/water', icon: Droplets, label: 'Water Tank Guardian' },
      { to: '/bill-explainer', icon: DollarSign, label: 'Bill Explainer' },
    ],
  },
  {
    title: 'Operations',
    items: [
      { to: '/predictive', icon: Activity, label: 'Predictive Maintenance', badge: 1, premium: true },
      { to: '/tenant-complaints', icon: MessageSquare, label: 'Tenant Complaints' },
      { to: '/shift-handover', icon: ClipboardList, label: 'Shift Handover' },
    ],
  },
  {
    title: 'Tools',
    items: [
      { to: '/chat', icon: MessageCircle, label: 'AI Assistant' },
      { to: '/briefing', icon: Sun, label: 'Morning Briefing' },
      { to: '/roi', icon: Calculator, label: 'ROI Calculator' },
      { to: '/comparison', icon: BarChart3, label: 'Operon vs Others' },
    ],
  },
];

export default function Sidebar({ collapsed, onToggle }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { buildingId } = useParams();
  const [buildingsExpanded, setBuildingsExpanded] = useState(true);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <aside className={`fixed top-0 left-0 h-screen bg-navy-900 text-white flex flex-col z-40 transition-all duration-300 ${collapsed ? 'w-16' : 'w-60'}`}>
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-4 h-16 border-b border-white/10 shrink-0">
        <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-sm font-bold shrink-0">
          ⚡
        </div>
        {!collapsed && <span className="text-lg font-bold tracking-tight">Operon</span>}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-2 overflow-y-auto">
        {navSections.map((section, sIdx) => (
          <div key={sIdx}>
            {/* Section title */}
            {section.title && !collapsed && (
              <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider px-4 pt-4 pb-1.5">
                {section.title}
              </p>
            )}
            {section.title && collapsed && <div className="border-t border-white/5 my-2 mx-3" />}

            {section.items.map(item => {
              if (item.expandable) {
                return (
                  <div key={item.to}>
                    <button
                      onClick={() => setBuildingsExpanded(!buildingsExpanded)}
                      className="nav-item w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                    >
                      <item.icon size={18} className="shrink-0" />
                      {!collapsed && (
                        <>
                          <span className="flex-1 text-left">{item.label}</span>
                          {buildingsExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                        </>
                      )}
                    </button>
                    {buildingsExpanded && !collapsed && (
                      <div className="ml-4 border-l border-white/10">
                        {buildings.map(b => (
                          <NavLink
                            key={b.id}
                            to={`/building/${b.id}`}
                            className={({ isActive }) =>
                              `nav-item flex items-center gap-2 px-4 py-1.5 text-xs transition-colors ${
                                isActive ? 'active text-white bg-white/10' : 'text-gray-400 hover:text-white hover:bg-white/5'
                              }`
                            }
                          >
                            <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                              b.energyScore >= 80 ? 'bg-ok' : b.energyScore >= 60 ? 'bg-warn' : 'bg-crit'
                            }`} />
                            <span className="truncate">{b.name}</span>
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `nav-item flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                      isActive ? 'active text-white bg-white/10' : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`
                  }
                >
                  <item.icon size={18} className="shrink-0" />
                  {!collapsed && (
                    <>
                      <span className="flex-1">{item.label}</span>
                      {item.badge && (
                        <span className="bg-crit text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                          {item.badge}
                        </span>
                      )}
                      {item.premium && !item.badge && (
                        <Sparkles size={12} className="text-amber-400" />
                      )}
                    </>
                  )}
                </NavLink>
              );
            })}
          </div>
        ))}
      </nav>

      {/* User */}
      {!collapsed && (
        <div className="border-t border-white/10 p-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-accent/30 flex items-center justify-center text-xs font-semibold">
              FM
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user?.name || 'FM'}</p>
              <p className="text-[11px] text-gray-400 truncate">{user?.email}</p>
            </div>
            <button onClick={handleLogout} className="text-gray-400 hover:text-white transition-colors" title="Logout">
              <LogOut size={16} />
            </button>
          </div>
        </div>
      )}
    </aside>
  );
}
