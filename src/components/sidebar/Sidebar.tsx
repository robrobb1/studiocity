import React from 'react';
import { useCRM } from '../../context/CRMContext';
import { WorkspaceTab } from '../../types/crm';
import {
  Users, Mail, ScanLine, Megaphone, MessageSquare,
  Clock, Sliders
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const {
    activeWorkspace, setActiveWorkspace,
    activityLogOpen, setActivityLogOpen,
    setSettingsOpen,
    teamMessages, messages
  } = useCRM();

  const unreadMessages = messages.filter((m) => !m.read && m.dir === 'in').length;
  const unreadTeam = teamMessages.length > 0 ? 3 : 0;

  const navItems: { id: WorkspaceTab; label: string; icon: React.ReactNode; badge?: number | string }[] = [
    { id: 'leads', label: 'Leads', icon: <Users className="w-4 h-4" />, badge: 148 },
    { id: 'email', label: 'Email', icon: <Mail className="w-4 h-4" /> },
    { id: 'scanner', label: 'Scanner', icon: <ScanLine className="w-4 h-4" />, badge: 23 },
    { id: 'campaign', label: 'Campaign', icon: <Megaphone className="w-4 h-4" />, badge: 7 },
    { id: 'team', label: 'Team', icon: <MessageSquare className="w-4 h-4" />, badge: unreadTeam > 0 ? unreadTeam : undefined }
  ];

  return (
    <aside className="w-[200px] bg-[#161B28] border-r border-[#262D3E] flex flex-col justify-between select-none shrink-0 text-slate-300">
      {/* Workspace Navigation */}
      <div className="py-3">
        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-4 mb-2">
          Workspace
        </div>
        <nav className="space-y-0.5">
          {navItems.map((item) => {
            const isActive = !activityLogOpen && activeWorkspace === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setActivityLogOpen(false);
                  setActiveWorkspace(item.id);
                }}
                className={`w-full flex items-center justify-between px-4 py-2 text-xs font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-600/15 text-white border-l-2 border-blue-500 font-semibold'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-[#202738] border-l-2 border-transparent'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className={isActive ? 'text-blue-400' : 'text-slate-400'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span
                    className={`text-[10px] font-mono-tabular px-1.5 py-0.5 rounded font-semibold ${
                      isActive ? 'bg-blue-600 text-white' : 'bg-[#2A344C] text-slate-300'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Administration Section */}
        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-4 mt-6 mb-2">
          Admin
        </div>
        <nav className="space-y-0.5">
          <button
            type="button"
            onClick={() => setActivityLogOpen(true)}
            className={`w-full flex items-center gap-2.5 px-4 py-2 text-xs font-medium transition-colors ${
              activityLogOpen
                ? 'bg-blue-600/15 text-white border-l-2 border-blue-500 font-semibold'
                : 'text-slate-400 hover:text-slate-100 hover:bg-[#202738] border-l-2 border-transparent'
            }`}
          >
            <Clock className={`w-4 h-4 ${activityLogOpen ? 'text-blue-400' : 'text-slate-400'}`} />
            <span>Activity Logs</span>
          </button>
          <button
            type="button"
            onClick={() => setSettingsOpen(true)}
            className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-400 hover:text-slate-100 hover:bg-[#202738] border-l-2 border-transparent transition-colors"
          >
            <Sliders className="w-4 h-4 text-slate-400" />
            <span>Settings</span>
          </button>
        </nav>
      </div>

      {/* User Footer Profile */}
      <div className="p-3 border-t border-[#262D3E] flex items-center gap-2.5 bg-[#121622]">
        <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-semibold text-xs flex items-center justify-center shrink-0">
          MW
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-xs font-semibold text-white truncate">Marcus Webb</div>
          <div className="text-[10px] text-slate-400 truncate">Senior AE · Sales</div>
        </div>
        <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" title="Online" />
      </div>
    </aside>
  );
};
