import React, { useState } from 'react';
import { useCRM } from '../../context/CRMContext';
import { Filter, Search, ArrowUpDown, Mail, Phone, Calendar } from 'lucide-react';
import { ActivityEvent } from '../../types/crm';

export const ActivityLogWorkspace: React.FC = () => {
  const { activityLogs, setActivityLogOpen } = useCRM();
  const [filterChannel, setFilterChannel] = useState<'all' | 'email' | 'call'>('all');
  const [filterQuery, setFilterQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredLogs = activityLogs.filter((act) => {
    if (filterChannel !== 'all' && act.channel !== filterChannel) return false;
    if (filterQuery.trim()) {
      const q = filterQuery.toLowerCase();
      return (
        act.activity.toLowerCase().includes(q) ||
        act.lead.toLowerCase().includes(q) ||
        act.company.toLowerCase().includes(q) ||
        act.subject.toLowerCase().includes(q) ||
        act.rep.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="flex-1 min-w-0 min-h-0 flex flex-col bg-white overflow-hidden select-none text-xs">
      {/* Toolbar */}
      <div className="h-11 px-4 border-b border-slate-200 flex items-center justify-between bg-slate-50 shrink-0">
        <div className="flex items-center gap-3">
          <span className="font-bold text-slate-900 text-sm">System Activity Logs</span>
          <span className="text-slate-400">·</span>
          <span className="text-slate-500 font-mono-tabular">{filteredLogs.length} Events</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Quick Filter */}
          <div className="flex items-center bg-white border border-slate-200 rounded px-2 py-1">
            <Search className="w-3.5 h-3.5 text-slate-400 mr-1.5" />
            <input
              type="text"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              placeholder="Search logs…"
              className="bg-transparent outline-none text-xs w-36"
            />
          </div>

          <select
            value={filterChannel}
            onChange={(e) => setFilterChannel(e.target.value as any)}
            className="bg-white border border-slate-200 rounded px-2 py-1 text-xs text-slate-700 outline-none"
          >
            <option value="all">All Channels</option>
            <option value="email">Email Only</option>
            <option value="call">Calls Only</option>
          </select>
        </div>
      </div>

      {/* Logs Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full text-left text-xs divide-y divide-slate-100">
          <thead className="bg-slate-100/70 text-[11px] font-semibold text-slate-500 uppercase tracking-wider sticky top-0 z-10 backdrop-blur-sm">
            <tr>
              <th className="py-2.5 px-4">Timestamp</th>
              <th className="py-2.5 px-3">Rep</th>
              <th className="py-2.5 px-3">Lead / Company</th>
              <th className="py-2.5 px-3">Activity & Details</th>
              <th className="py-2.5 px-3">Channel</th>
              <th className="py-2.5 px-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredLogs.map((log) => {
              const isExpanded = expandedId === log.id;
              return (
                <React.Fragment key={log.id}>
                  <tr
                    onClick={() => setExpandedId(isExpanded ? null : log.id)}
                    className="hover:bg-slate-50/80 cursor-pointer transition-colors"
                  >
                    <td className="py-2.5 px-4 font-mono-tabular text-slate-600">
                      {new Date(log.at).toLocaleString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: '2-digit'
                      })}
                    </td>
                    <td className="py-2.5 px-3 font-semibold text-slate-900">{log.rep}</td>
                    <td className="py-2.5 px-3">
                      <div className="font-semibold text-slate-800">{log.lead}</div>
                      <div className="text-[11px] text-slate-400">{log.company}</div>
                    </td>
                    <td className="py-2.5 px-3">
                      <div className="font-medium text-slate-800">{log.activity}</div>
                      <div className="text-[11px] text-slate-500 truncate max-w-sm">{log.subject}</div>
                    </td>
                    <td className="py-2.5 px-3">
                      <span className="capitalize text-slate-600 flex items-center gap-1.5">
                        {log.channel === 'email' ? <Mail className="w-3.5 h-3.5 text-blue-500" /> : <Phone className="w-3.5 h-3.5 text-emerald-500" />}
                        {log.channel}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 font-medium">
                      <span
                        className={
                          log.status === 'Opened'
                            ? 'text-emerald-600'
                            : log.status === 'Delivered'
                            ? 'text-blue-600'
                            : 'text-slate-600'
                        }
                      >
                        {log.status}
                      </span>
                    </td>
                  </tr>

                  {isExpanded && (
                    <tr className="bg-slate-50/80">
                      <td colSpan={6} className="p-3 text-[11px] space-y-1 text-slate-600">
                        <div>
                          <strong>Sender:</strong> {log.sender} &nbsp;|&nbsp; <strong>Recipient:</strong> {log.recipient}
                        </div>
                        <div>
                          <strong>Source:</strong> {log.source} &nbsp;|&nbsp; <strong>Trace ID:</strong> {log.id}
                        </div>
                        <div>
                          <strong>Full Subject:</strong> {log.subject}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
