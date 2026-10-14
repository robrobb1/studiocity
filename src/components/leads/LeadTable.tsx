import React from 'react';
import { useCRM } from '../../context/CRMContext';
import { Phone, MessageSquare, Mail } from 'lucide-react';
import { Lead } from '../../types/crm';

export const LeadTable: React.FC = () => {
  const {
    leads, selectedLeadId, selectLead,
    searchQuery, sortField, setSortField,
    startCall, openMessageThread, setCommsOpen,
    preferences
  } = useCRM();

  // Filter leads based on global search
  const filteredLeads = leads.filter((lead) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      lead.name.toLowerCase().includes(query) ||
      lead.company.toLowerCase().includes(query) ||
      lead.email.toLowerCase().includes(query) ||
      lead.phone.includes(query) ||
      lead.address.city.toLowerCase().includes(query)
    );
  });

  // Sort leads
  const sortedLeads = [...filteredLeads].sort((a, b) => {
    if (sortField === 'company') return a.company.localeCompare(b.company);
    if (sortField === 'revenue') return b.value - a.value;
    if (sortField === 'deposits') {
      const depA = a.statements[0]?.deposits || 0;
      const depB = b.statements[0]?.deposits || 0;
      return depB - depA;
    }
    if (sortField === 'ending') {
      const balA = a.statements[0]?.balance || 0;
      const balB = b.statements[0]?.balance || 0;
      return balB - balA;
    }
    return a.id - b.id;
  });

  const formatCurrency = (val: number) => {
    return `$${val.toLocaleString('en-US')}`;
  };

  const isStacked = preferences.layout === 'stacked';

  return (
    <div className="flex-1 min-w-0 min-h-0 flex flex-col bg-white overflow-hidden">
      {/* Table Toolbar / Breadcrumbs */}
      <div className="h-10 px-4 border-b border-slate-200 flex items-center justify-between text-xs text-slate-500 shrink-0 bg-slate-50/50">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-800 text-sm">Leads Pipeline</span>
          <span>·</span>
          <span>{sortedLeads.length} Total Merchant Leads</span>
          {searchQuery && (
            <span className="text-blue-600 font-medium">
              (Filtered by "{searchQuery}")
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-slate-400">Sort by:</span>
            <select
              value={sortField}
              onChange={(e) => setSortField(e.target.value as any)}
              className="bg-white border border-slate-200 rounded px-2 py-0.5 text-xs text-slate-700 outline-none cursor-pointer"
            >
              <option value="original">Original Order</option>
              <option value="company">Company Name</option>
              <option value="revenue">Revenue</option>
              <option value="deposits">Recent Deposits</option>
              <option value="ending">Ending Balance</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Full-Width Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full text-left border-collapse table-auto min-w-[980px]">
          <thead>
            <tr className="bg-slate-100/75 border-b border-slate-200 text-[11px] font-semibold text-slate-500 uppercase tracking-wider sticky top-0 z-10 backdrop-blur-sm">
              <th className="py-2.5 px-4">Company & Lead</th>
              <th className="py-2.5 px-3">Revenue / Approval</th>
              <th className="py-2.5 px-3">Phone</th>
              <th className="py-2.5 px-3">Email</th>
              <th className="py-2.5 px-3">Statements</th>
              <th className="py-2.5 px-3">Birth Date</th>
              <th className="py-2.5 px-3">Address</th>
              <th className="py-2.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {sortedLeads.map((lead) => {
              const isSelected = lead.id === selectedLeadId;
              const approvalAmount = lead.value + 150000;
              const st1 = lead.statements[0];
              const st2 = lead.statements[1];

              return (
                <tr
                  key={lead.id}
                  onClick={() => selectLead(lead.id)}
                  className={`group transition-colors cursor-pointer ${
                    isSelected ? 'bg-blue-50/70 hover:bg-blue-50' : 'hover:bg-slate-50/80'
                  }`}
                  style={{ height: 'var(--crm-row-height)' }}
                >
                  {/* Company & Lead Name (Default Single-Line) */}
                  <td className="py-2 px-4" style={{ paddingLeft: 'var(--crm-cell-pad-x)' }}>
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 font-medium text-[11px] flex items-center justify-center shrink-0">
                        {lead.initials}
                      </div>
                      {isStacked ? (
                        <div className="min-w-0">
                          <div className="font-semibold text-slate-900 truncate">{lead.company}</div>
                          <div className="text-[11px] text-slate-500 truncate">{lead.name}</div>
                        </div>
                      ) : (
                        <div className="truncate text-slate-900">
                          <span className="font-semibold text-slate-900">{lead.company}</span>
                          <span className="text-slate-400 mx-1.5">·</span>
                          <span className="text-slate-600 font-normal">{lead.name}</span>
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Revenue / Approval */}
                  <td className="py-2 px-3 font-mono-tabular">
                    {isStacked ? (
                      <div>
                        <span className="font-medium text-slate-900">{formatCurrency(lead.value)}</span>
                        <div className="text-[11px] text-slate-400">{formatCurrency(approvalAmount)}</div>
                      </div>
                    ) : (
                      <div className="truncate">
                        <span className="font-medium text-slate-900">{formatCurrency(lead.value)}</span>
                        <span className="text-slate-300 mx-1.5">/</span>
                        <span className="text-slate-500">{formatCurrency(approvalAmount)}</span>
                      </div>
                    )}
                  </td>

                  {/* Phone */}
                  <td className="py-2 px-3 font-mono-tabular">
                    {isStacked ? (
                      <div>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            startCall(lead.phone);
                          }}
                          className="text-slate-800 hover:text-blue-600 transition-colors"
                        >
                          {lead.phone}
                        </button>
                        {lead.phones[1] && (
                          <div className="text-[11px] text-slate-400">{lead.phones[1]}</div>
                        )}
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          startCall(lead.phone);
                        }}
                        className="text-slate-800 hover:text-blue-600 transition-colors"
                        title="Click to dial"
                      >
                        {lead.phone}
                      </button>
                    )}
                  </td>

                  {/* Email */}
                  <td className="py-2 px-3 text-slate-600 truncate max-w-[180px]">
                    {lead.email}
                  </td>

                  {/* Statements */}
                  <td className="py-2 px-3 font-mono-tabular text-[11.5px] text-slate-600">
                    {isStacked ? (
                      <div>
                        <div>{st1?.month}: {formatCurrency(st1?.deposits || 0)}</div>
                        <div className="text-slate-400">{st2?.month}: {formatCurrency(st2?.deposits || 0)}</div>
                      </div>
                    ) : (
                      <div className="truncate">
                        <span>{st1?.month}: {formatCurrency(st1?.deposits || 0)}</span>
                        {st2 && (
                          <>
                            <span className="text-slate-300 mx-1">·</span>
                            <span className="text-slate-400">{st2.month}: {formatCurrency(st2.deposits)}</span>
                          </>
                        )}
                      </div>
                    )}
                  </td>

                  {/* Birth Date */}
                  <td className="py-2 px-3 text-slate-500 font-mono-tabular">
                    {lead.birthDate}
                  </td>

                  {/* Address */}
                  <td className="py-2 px-3 text-slate-500 truncate max-w-[210px]">
                    {lead.address.street}, {lead.address.city} {lead.address.state}
                  </td>

                  {/* Quick Inline Actions */}
                  <td className="py-2 px-4 text-right" style={{ paddingRight: 'var(--crm-cell-pad-x)' }}>
                    <div className="flex items-center justify-end gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          startCall(lead.phone);
                        }}
                        className="p-1.5 rounded hover:bg-slate-200/70 text-slate-500 hover:text-emerald-600 transition-colors"
                        title="Direct Call"
                      >
                        <Phone className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          openMessageThread('text', lead.phones[1] || lead.phone);
                        }}
                        className="p-1.5 rounded hover:bg-slate-200/70 text-slate-500 hover:text-blue-600 transition-colors"
                        title="Send Message"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          selectLead(lead.id);
                          setCommsOpen(true);
                        }}
                        className="p-1.5 rounded hover:bg-slate-200/70 text-slate-500 hover:text-blue-600 transition-colors"
                        title="View Comms"
                      >
                        <Mail className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
