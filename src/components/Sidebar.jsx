import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import {
  LayoutDashboard, Building2, Zap, Activity,
  MessageCircle, Sun, Settings, LogOut, ChevronDown, ChevronRight
} from 'lucide-react';
import { buildings } from '../data/buildings';
import { useState } from 'react';

const navItems = [
  { to: '/portfolio', icon: LayoutDashboard, label: 'Portfolio Overview' },
  { to: '/building', icon: Building2, label: 'Buildings', expandable: true },
  { to: '/energy', icon: Zap, label: 'Energy Intelligence' },
  { to: '/predictive', icon: Activity, label: 'Predictive Maintenance', badge: 1 },
  { to: '/chat', icon: MessageCircle, label: 'AI Assistant' },
  { to: '/briefing', icon: Sun, label: 'Morning Briefing' },
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
        {!collapsed && <span className="text-lg font-bold tracking-tight">FacilityAI</span>}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 overflow-y-auto">
        {navItems.map(item => {
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
                </>
              )}
            </NavLink>
          );
        })}
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
