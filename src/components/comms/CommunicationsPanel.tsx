import React, { useState, useRef, useEffect } from 'react';
import { useCRM } from '../../context/CRMContext';
import {
  Phone, MessageSquare, Mail, Send, ArrowLeft,
  Check, CheckCheck, Clock, FileText, ChevronDown, Smartphone
} from 'lucide-react';

export const CommunicationsPanel: React.FC = () => {
  const {
    commsOpen, setCommsOpen, commsTab, setCommsTab,
    leads, selectedLeadId, selectLead, updateLeadNotes,
    messages, sendMessage, activeThreadNumber, setActiveThreadNumber,
    calls, startCall,
    devices, activeDeviceIndex, setActiveDeviceIndex
  } = useCRM();

  const [composerText, setComposerText] = useState('');
  const [deviceMenuOpen, setDeviceMenuOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const selectedLead = leads.find((l) => l.id === selectedLeadId) || leads[0];
  const activeDevice = devices[activeDeviceIndex] || devices[0];

  // Auto-close on click outside - NO 'X' button needed!
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (commsOpen && panelRef.current && !panelRef.current.contains(e.target as Node)) {
        // Check if the click was on the topbar toggle button itself
        const target = e.target as HTMLElement;
        if (!target.closest('[title="Toggle Communications Drawer"]')) {
          setCommsOpen(false);
        }
      }
    };
    document.addEventListener('pointerdown', handleOutsideClick);
    return () => document.removeEventListener('pointerdown', handleOutsideClick);
  }, [commsOpen, setCommsOpen]);

  // Scroll to bottom of chat when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, activeThreadNumber]);

  if (!commsOpen) return null;

  // Thread computation for SMS vs WhatsApp
  const currentChannel = commsTab === 'wa' ? 'wa' : 'text';
  const channelMessages = messages.filter((m) => m.channel === currentChannel);

  // Group threads by phone number
  const threadMap = new Map<string, { number: string; leadId: number | null; lastMsg: any; unread: number }>();
  channelMessages.forEach((m) => {
    const existing = threadMap.get(m.number);
    if (!existing || m.at > existing.lastMsg.at) {
      threadMap.set(m.number, {
        number: m.number,
        leadId: m.leadId,
        lastMsg: m,
        unread: (existing?.unread || 0) + (m.dir === 'in' && !m.read ? 1 : 0)
      });
    }
  });
  const threads = Array.from(threadMap.values()).sort((a, b) => b.lastMsg.at - a.lastMsg.at);

  // Active thread messages
  const activeThread = activeThreadNumber
    ? channelMessages.filter((m) => m.number === activeThreadNumber).sort((a, b) => a.at - b.at)
    : [];

  const handleSend = () => {
    if (!composerText.trim()) return;
    const targetNum = activeThreadNumber || selectedLead.phones[1] || selectedLead.phone;
    sendMessage(currentChannel, targetNum, composerText);
    setComposerText('');
  };

  return (
    <aside
      ref={panelRef}
      className="w-[400px] border-l border-slate-200 bg-white flex flex-col h-full shadow-2xl z-30 select-none animate-in slide-in-from-right duration-200"
    >
      {/* Drawer Header Tabs (Zero X button, clean navigation) */}
      <div className="h-[46px] border-b border-slate-200 flex items-center justify-between px-3 bg-slate-50 shrink-0">
        <div className="flex items-center gap-1 bg-slate-200/80 p-0.5 rounded-lg text-xs w-full">
          {(['leads', 'messages', 'wa', 'calls', 'email'] as const).map((tab) => {
            const label = tab === 'leads' ? 'Intel' : tab === 'messages' ? 'SMS' : tab === 'wa' ? 'WhatsApp' : tab === 'calls' ? 'Calls' : 'Email';
            const isActive = commsTab === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => {
                  setCommsTab(tab);
                  if (tab !== 'messages' && tab !== 'wa') setActiveThreadNumber(null);
                }}
                className={`flex-1 py-1 rounded-md text-center font-medium transition-all ${
                  isActive
                    ? 'bg-white text-slate-900 shadow-sm font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab 1: Lead Intel (Statements, Deal Financials, Notes) */}
      {commsTab === 'leads' && (
        <div className="flex-1 overflow-auto p-4 space-y-4 text-xs">
          {/* Header Card */}
          <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 font-semibold text-sm flex items-center justify-center">
              {selectedLead.initials}
            </div>
            <div>
              <div className="font-bold text-slate-900 text-sm">{selectedLead.name}</div>
              <div className="text-slate-500">{selectedLead.company} · {selectedLead.title}</div>
            </div>
          </div>

          {/* Quick Financial Snapshot */}
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              Deal Financials
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="p-2.5 bg-slate-50 border border-slate-200/80 rounded-lg">
                <div className="text-[10px] text-slate-500">Stated Revenue</div>
                <div className="font-mono-tabular font-bold text-slate-900 text-sm mt-0.5">
                  ${selectedLead.value.toLocaleString()}
                </div>
              </div>
              <div className="p-2.5 bg-slate-50 border border-slate-200/80 rounded-lg">
                <div className="text-[10px] text-slate-500">Max Approval</div>
                <div className="font-mono-tabular font-bold text-emerald-700 text-sm mt-0.5">
                  ${(selectedLead.value + 150000).toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          {/* Past Bank Statements */}
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
              Verified Bank Statements
            </div>
            <div className="border border-slate-200/80 rounded-lg divide-y divide-slate-100 overflow-hidden bg-white">
              {selectedLead.statements.map((st, i) => (
                <div key={i} className="px-3 py-2 flex items-center justify-between font-mono-tabular">
                  <span className="font-semibold text-slate-700">{st.month}</span>
                  <div className="text-right">
                    <span className="text-slate-900 font-medium">${st.deposits.toLocaleString()}</span>
                    <span className="text-slate-400 text-[11px] ml-2">bal: ${st.balance.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Direct Actions */}
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
              Contact Numbers & Channels
            </div>
            <div className="space-y-1.5">
              {selectedLead.phones.map((phone, i) => (
                <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200/60">
                  <span className="font-mono-tabular text-slate-800">{phone}</span>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => startCall(phone)}
                      className="px-2 py-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded text-[11px] font-medium transition-colors"
                    >
                      Call
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveThreadNumber(phone.replace(/\D/g, '').slice(-10));
                        setCommsTab('messages');
                      }}
                      className="px-2 py-1 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded text-[11px] font-medium transition-colors"
                    >
                      SMS
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Rep Editable Notes */}
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
              Lead Notes & Underwriting Feedback
            </div>
            <textarea
              value={selectedLead.notes || ''}
              onChange={(e) => updateLeadNotes(selectedLead.id, e.target.value)}
              placeholder="Add deal notes, call highlights, or next steps…"
              rows={4}
              className="w-full p-2.5 border border-slate-200 rounded-lg text-xs leading-relaxed outline-none focus:border-blue-500 transition-colors placeholder:text-slate-400"
            />
          </div>
        </div>
      )}

      {/* Tab 2 & 3: Messages & WhatsApp (REPAIRED THREAD OPENING & MESSAGING) */}
      {(commsTab === 'messages' || commsTab === 'wa') && (
        <div className="flex-1 flex flex-col min-h-0 bg-slate-50/40">
          {activeThreadNumber ? (
            /* Open Chat Thread View */
            <div className="flex-1 flex flex-col min-h-0 bg-white">
              {/* Thread Header with back button */}
              <div className="h-10 border-b border-slate-200 flex items-center justify-between px-3 bg-slate-50 shrink-0">
                <button
                  type="button"
                  onClick={() => setActiveThreadNumber(null)}
                  className="flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium text-xs transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to {commsTab === 'wa' ? 'WhatsApp' : 'Messages'}</span>
                </button>
                <div className="font-mono-tabular text-slate-700 text-xs font-semibold">
                  {activeThreadNumber}
                </div>
              </div>

              {/* Message Bubbles Stream */}
              <div className={`flex-1 overflow-auto p-3 space-y-2.5 text-xs ${commsTab === 'wa' ? 'bg-[#ECE5DD]/40' : 'bg-white'}`}>
                {activeThread.map((msg) => {
                  const isOut = msg.dir === 'out';
                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isOut ? 'items-end' : 'items-start'}`}
                    >
                      <div
                        className={`max-w-[78%] px-3 py-2 rounded-2xl shadow-sm text-xs leading-relaxed ${
                          isOut
                            ? commsTab === 'wa'
                              ? 'bg-[#D9FDD3] text-slate-900 rounded-tr-sm'
                              : 'bg-blue-600 text-white rounded-tr-sm'
                            : 'bg-slate-100 text-slate-900 rounded-tl-sm'
                        }`}
                      >
                        {msg.text}
                      </div>
                      <div className="flex items-center gap-1 mt-1 px-1 text-[10px] text-slate-400">
                        <span>
                          {new Date(msg.at).toLocaleTimeString('en-US', {
                            hour: 'numeric',
                            minute: '2-digit'
                          })}
                        </span>
                        {isOut && (
                          <span>
                            {msg.status === 'read' ? (
                              <CheckCheck className="w-3 h-3 text-blue-500 inline" />
                            ) : (
                              <Check className="w-3 h-3 text-slate-400 inline" />
                            )}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* In-Thread Composer */}
              <div className="p-2.5 border-t border-slate-200 bg-white">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={composerText}
                    onChange={(e) => setComposerText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSend();
                    }}
                    placeholder={commsTab === 'wa' ? 'WhatsApp message…' : 'iMessage / SMS…'}
                    className="flex-1 px-3 py-1.5 border border-slate-200 rounded-full text-xs outline-none focus:border-blue-500 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={handleSend}
                    disabled={!composerText.trim()}
                    className="w-7 h-7 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:pointer-events-none rounded-full flex items-center justify-center text-white transition-all shadow-sm shrink-0"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Threads List View */
            <div className="flex-1 overflow-auto divide-y divide-slate-100">
              {threads.length === 0 ? (
                <div className="p-8 text-center text-slate-400 text-xs">
                  No {commsTab === 'wa' ? 'WhatsApp' : 'SMS'} conversations yet.
                </div>
              ) : (
                threads.map((t) => {
                  const lead = leads.find((l) => l.id === t.leadId);
                  return (
                    <button
                      key={t.number}
                      type="button"
                      onClick={() => setActiveThreadNumber(t.number)}
                      className="w-full text-left p-3 hover:bg-slate-50 transition-colors flex items-start gap-3"
                    >
                      <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-700 font-semibold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {lead?.initials || 'C'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-slate-900 text-xs truncate">
                            {lead ? lead.name : t.number}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono-tabular">
                            {new Date(t.lastMsg.at).toLocaleTimeString('en-US', {
                              hour: 'numeric',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 truncate mt-0.5">
                          {t.lastMsg.text}
                        </p>
                      </div>
                      {t.unread > 0 && (
                        <span className="w-4 h-4 bg-blue-600 text-white rounded-full text-[10px] font-bold flex items-center justify-center shrink-0">
                          {t.unread}
                        </span>
                      )}
                    </button>
                  );
                })
              )}
            </div>
          )}
        </div>
      )}

      {/* Tab 4: Calls History */}
      {commsTab === 'calls' && (
        <div className="flex-1 overflow-auto divide-y divide-slate-100 text-xs">
          {calls.map((call) => {
            const lead = leads.find((l) => l.id === call.leadId);
            const isMissed = call.dir === 'missed';
            return (
              <div
                key={call.id}
                className="p-3 hover:bg-slate-50 transition-colors flex items-center justify-between"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                      isMissed ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'
                    }`}
                  >
                    <Phone className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <div className={`font-semibold truncate ${isMissed ? 'text-red-600' : 'text-slate-900'}`}>
                      {lead ? `${lead.company} · ${lead.name}` : call.number}
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono-tabular">
                      {new Date(call.at).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })} · {call.seconds ? `${Math.floor(call.seconds / 60)}m ${call.seconds % 60}s` : 'No answer'}
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => startCall(call.number)}
                  className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-xs font-medium transition-colors shrink-0"
                >
                  Dial
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Tab 5: Quick Email */}
      {commsTab === 'email' && (
        <div className="flex-1 overflow-auto p-4 space-y-3 text-xs">
          <div className="font-semibold text-slate-900 text-xs pb-2 border-b border-slate-100">
            Quick Email to {selectedLead.name}
          </div>
          <div>
            <label className="block text-[10px] text-slate-400 font-medium mb-1">To</label>
            <input
              type="email"
              value={selectedLead.email}
              readOnly
              className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded text-slate-700 outline-none"
            />
          </div>
          <div>
            <label className="block text-[10px] text-slate-400 font-medium mb-1">Subject</label>
            <input
              type="text"
              defaultValue={`Follow up · ${selectedLead.company} Working Capital`}
              className="w-full px-2.5 py-1.5 border border-slate-200 rounded text-slate-900 outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-[10px] text-slate-400 font-medium mb-1">Message</label>
            <textarea
              rows={6}
              defaultValue={`Hi ${selectedLead.name.split(' ')[0]},\n\nI was reviewing your recent statements and wanted to follow up on the proposal.`}
              className="w-full p-2.5 border border-slate-200 rounded-lg text-slate-900 outline-none focus:border-blue-500 leading-relaxed"
            />
          </div>
          <button
            type="button"
            onClick={() => {
              alert('Email dispatched via CRM relay');
            }}
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-xs transition-colors"
          >
            Send Email
          </button>
        </div>
      )}
    </aside>
  );
};
