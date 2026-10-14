import React from 'react';
import { CRMProvider, useCRM } from './context/CRMContext';
import { Topbar } from './components/topbar/Topbar';
import { Sidebar } from './components/sidebar/Sidebar';
import { LeadTable } from './components/leads/LeadTable';
import { CommunicationsPanel } from './components/comms/CommunicationsPanel';
import { EmailWorkspace } from './components/views/EmailWorkspace';
import { ScannerWorkspace } from './components/views/ScannerWorkspace';
import { CampaignWorkspace } from './components/views/CampaignWorkspace';
import { TeamWorkspace } from './components/views/TeamWorkspace';
import { ActivityLogWorkspace } from './components/views/ActivityLogWorkspace';
import { SettingsModal } from './components/modals/SettingsModal';

const AppLayout: React.FC = () => {
  const { activeWorkspace, activityLogOpen } = useCRM();

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-slate-50 text-slate-800">
      {/* Topbar: Logo "CRM" + Magnifying Search + Seamless In-Line Dialer + Redesigned Device Selector */}
      <Topbar />

      {/* Main Workspace Body Canvas */}
      <div className="flex flex-1 min-h-0 overflow-hidden relative">
        {/* Left Navigation Rail */}
        <Sidebar />

        {/* Central Workspace Canvas (Full Width 100%) */}
        <main className="flex-1 min-w-0 flex flex-col overflow-hidden relative bg-white">
          {activityLogOpen ? (
            <ActivityLogWorkspace />
          ) : (
            <>
              {activeWorkspace === 'leads' && <LeadTable />}
              {activeWorkspace === 'email' && <EmailWorkspace />}
              {activeWorkspace === 'scanner' && <ScannerWorkspace />}
              {activeWorkspace === 'campaign' && <CampaignWorkspace />}
              {activeWorkspace === 'team' && <TeamWorkspace />}
            </>
          )}
        </main>

        {/* 1-Click Communications Slide-Over Drawer (Right Edge, NO 'X' button, auto-closes on outside click) */}
        <CommunicationsPanel />
      </div>

      {/* Settings Modal (Sized for 32" Ultrawide, Single-Line Layout, Audio Volume, NO 'X' button) */}
      <SettingsModal />
    </div>
  );
};

export default function App() {
  return (
    <CRMProvider>
      <AppLayout />
    </CRMProvider>
  );
}
