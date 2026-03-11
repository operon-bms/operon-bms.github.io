import { BrowserRouter, Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import Portfolio from './pages/Portfolio';
import BuildingDetail from './pages/BuildingDetail';
import Recommendations from './pages/Recommendations';
import EnergyIntelligence from './pages/EnergyIntelligence';
import Predictive from './pages/Predictive';
import AIChat from './pages/AIChat';
import MorningBriefing from './pages/MorningBriefing';
import HvacDiagram from './pages/HvacDiagram';
import OvernightSummary from './pages/OvernightSummary';
import ROICalculator from './pages/ROICalculator';
import ComplianceAutopilot from './pages/ComplianceAutopilot';
import WaterTankGuardian from './pages/WaterTankGuardian';
import ComparisonPage from './pages/ComparisonPage';
import ShiftHandover from './pages/ShiftHandover';
import TenantComplaints from './pages/TenantComplaints';
import BillExplainerPage from './pages/BillExplainerPage';
import { useState, createContext, useContext } from 'react';
import { useLiveData } from './hooks/useLiveData';

function ProtectedRoute() {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/" replace />;
  return <AppLayout />;
}

function AppLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { isUpdating } = useLiveDataContext();

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      <main className={`transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-60'} p-6 pb-16`}>
        {/* Live indicator */}
        <div className="fixed top-4 right-4 z-30 flex items-center gap-2">
          {isUpdating && <span className="text-[10px] text-gray-400 font-medium">↻ Updating...</span>}
          <span className="flex items-center gap-1.5 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full px-3 py-1 text-xs font-medium text-ok shadow-sm">
            <span className="w-2 h-2 rounded-full bg-ok animate-pulse-dot" />
            LIVE
          </span>
        </div>
        <Outlet />
      </main>
      {/* Demo banner */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-900/90 backdrop-blur-sm text-center py-1.5 z-50">
        <p className="text-[11px] text-gray-400">🔴 DEMO MODE — All sensor data is simulated for demonstration purposes</p>
      </div>
    </div>
  );
}

const LiveDataContext = createContext({ isUpdating: false });
function useLiveDataContext() { return useContext(LiveDataContext); }

function LiveDataProvider({ children }) {
  const liveData = useLiveData();
  return <LiveDataContext.Provider value={liveData}>{children}</LiveDataContext.Provider>;
}

export default function App() {
  return (
    <BrowserRouter basename="/">
      <LiveDataProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/building/:buildingId" element={<BuildingDetail />} />
            <Route path="/building/:buildingId/recommendations" element={<Recommendations />} />
            <Route path="/building/:buildingId/diagram" element={<HvacDiagram />} />
            <Route path="/energy" element={<EnergyIntelligence />} />
            <Route path="/predictive" element={<Predictive />} />
            <Route path="/chat" element={<AIChat />} />
            <Route path="/briefing" element={<MorningBriefing />} />
            <Route path="/summary" element={<OvernightSummary />} />
            <Route path="/roi" element={<ROICalculator />} />
            <Route path="/compliance" element={<ComplianceAutopilot />} />
            <Route path="/water" element={<WaterTankGuardian />} />
            <Route path="/comparison" element={<ComparisonPage />} />
            <Route path="/shift-handover" element={<ShiftHandover />} />
            <Route path="/tenant-complaints" element={<TenantComplaints />} />
            <Route path="/bill-explainer" element={<BillExplainerPage />} />
            <Route path="*" element={<Navigate to="/summary" replace />} />
          </Route>
        </Routes>
      </LiveDataProvider>
    </BrowserRouter>
  );
}
