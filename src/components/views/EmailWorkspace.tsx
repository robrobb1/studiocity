import React, { useState } from 'react';
import { useCRM } from '../../context/CRMContext';
import {
  Inbox, Star, Send, FileEdit, CheckCheck, Archive, Trash2,
  Search, Reply, Forward, Paperclip
} from 'lucide-react';
import { EmailThread } from '../../types/crm';

export const EmailWorkspace: React.FC = () => {
  const { emailThreads, sendEmailReply } = useCRM();
  const [activeFolder, setActiveFolder] = useState<'inbox' | 'starred' | 'sent' | 'drafts' | 'tracked' | 'all'>('inbox');
  const [selectedThreadId, setSelectedThreadId] = useState<string>(emailThreads[0]?.id || '');
  const [replyText, setReplyText] = useState('');
  const [composeOpen, setComposeOpen] = useState(false);
  const [composeTo, setComposeTo] = useState('');
  const [composeSubject, setComposeSubject] = useState('');
  const [composeBody, setComposeBody] = useState('');

  const filteredThreads = emailThreads.filter((t) => {
    if (activeFolder === 'inbox') return t.folder === 'inbox';
    if (activeFolder === 'starred') return t.starred;
    if (activeFolder === 'sent') return t.folder === 'sent';
    if (activeFolder === 'drafts') return t.folder === 'drafts';
    if (activeFolder === 'tracked') return t.msgs.some((m) => m.tracked);
    return true;
  });

  const selectedThread = emailThreads.find((t) => t.id === selectedThreadId) || filteredThreads[0];

  const handleReply = () => {
    if (!replyText.trim() || !selectedThread) return;
    sendEmailReply(selectedThread.id, replyText);
    setReplyText('');
  };

  return (
    <div className="flex-1 min-w-0 min-h-0 flex bg-white overflow-hidden select-none">
      {/* Email Folder Sidebar */}
      <aside className="w-[180px] bg-slate-50 border-r border-slate-200 p-2 flex flex-col justify-between shrink-0 text-xs">
        <div>
          <button
            type="button"
            onClick={() => setComposeOpen(true)}
            className="w-full mb-3 py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold flex items-center justify-center gap-2 shadow-sm transition-colors"
          >
            <FileEdit className="w-3.5 h-3.5" />
            <span>Compose</span>
          </button>

          <nav className="space-y-0.5">
            {[
              { id: 'inbox', label: 'Inbox', icon: <Inbox className="w-4 h-4" />, count: 3 },
              { id: 'starred', label: 'Starred', icon: <Star className="w-4 h-4" /> },
              { id: 'sent', label: 'Sent', icon: <Send className="w-4 h-4" /> },
              { id: 'drafts', label: 'Drafts', icon: <FileEdit className="w-4 h-4" /> },
              { id: 'tracked', label: 'Tracked Opens', icon: <CheckCheck className="w-4 h-4" /> },
              { id: 'all', label: 'All Mail', icon: <Archive className="w-4 h-4" /> }
            ].map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setActiveFolder(f.id as any)}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md font-medium transition-colors ${
                  activeFolder === f.id
                    ? 'bg-blue-100/70 text-blue-900 font-semibold'
                    : 'text-slate-600 hover:bg-slate-200/60'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className={activeFolder === f.id ? 'text-blue-600' : 'text-slate-400'}>
                    {f.icon}
                  </span>
                  <span>{f.label}</span>
                </div>
                {f.count && (
                  <span className="text-[10px] font-bold text-slate-500 font-mono-tabular">
                    {f.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        <div className="text-[11px] text-slate-400 p-2 font-mono-tabular">
          marcus.webb@crm.mail
        </div>
      </aside>

      {/* Threads List Pane */}
      <div className="w-[320px] border-r border-slate-200 flex flex-col shrink-0 bg-white">
        <div className="h-10 px-3 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 text-xs font-semibold text-slate-700">
          <span className="capitalize">{activeFolder}</span>
          <span className="text-slate-400 font-normal">{filteredThreads.length} threads</span>
        </div>

        <div className="flex-1 overflow-auto divide-y divide-slate-100 text-xs">
          {filteredThreads.map((thread) => {
            const lastMsg = thread.msgs[thread.msgs.length - 1];
            const isSelected = thread.id === selectedThread?.id;
            return (
              <button
                key={thread.id}
                type="button"
                onClick={() => setSelectedThreadId(thread.id)}
                className={`w-full text-left p-3 transition-colors ${
                  isSelected ? 'bg-blue-50/80' : 'hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-slate-900 truncate">
                    {lastMsg?.from.name || 'Merchant'}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono-tabular">
                    {new Date(lastMsg?.at || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                </div>
                <div className="font-medium text-slate-800 text-[11.5px] truncate">
                  {lastMsg?.subject}
                </div>
                <p className="text-slate-500 text-[11px] truncate mt-0.5">
                  {lastMsg?.body}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Reading Pane */}
      <div className="flex-1 min-w-0 flex flex-col bg-white overflow-hidden">
        {selectedThread ? (
          <div className="flex-1 flex flex-col min-h-0">
            {/* Thread Header */}
            <div className="p-4 border-b border-slate-200 bg-slate-50/40">
              <h2 className="text-base font-bold text-slate-900 truncate">
                {selectedThread.msgs[0]?.subject}
              </h2>
              <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
                <span>{selectedThread.msgs.length} messages</span>
                <span>·</span>
                <span>{selectedThread.account}</span>
              </div>
            </div>

            {/* Messages Body Stream */}
            <div className="flex-1 overflow-auto p-4 space-y-4">
              {selectedThread.msgs.map((msg) => (
                <div key={msg.id} className="p-4 border border-slate-200/90 rounded-xl bg-white shadow-xs">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100 text-xs">
                    <div>
                      <span className="font-bold text-slate-900">{msg.from.name}</span>
                      <span className="text-slate-400 ml-2">&lt;{msg.from.email}&gt;</span>
                    </div>
                    <span className="text-slate-400 font-mono-tabular text-[11px]">
                      {new Date(msg.at).toLocaleString()}
                    </span>
                  </div>

                  {msg.tracked && msg.opens && msg.opens.length > 0 && (
                    <div className="mt-2 p-2 bg-emerald-50 text-emerald-800 rounded-lg text-xs flex items-center gap-2">
                      <CheckCheck className="w-4 h-4 text-emerald-600" />
                      <span>
                        Tracked email opened <strong>{msg.opens.length} times</strong>
                      </span>
                    </div>
                  )}

                  <div className="mt-3 text-xs leading-relaxed text-slate-800 whitespace-pre-wrap">
                    {msg.body}
                  </div>
                </div>
              ))}
            </div>

            {/* Inline Quick Reply */}
            <div className="p-3 border-t border-slate-200 bg-slate-50/70">
              <div className="flex items-center gap-2">
                <textarea
                  rows={2}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Type an email reply…"
                  className="flex-1 p-2 bg-white border border-slate-200 rounded-lg text-xs outline-none focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={handleReply}
                  disabled={!replyText.trim()}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors"
                >
                  Reply
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-slate-400 text-xs">
            Select an email thread to read.
          </div>
        )}
      </div>

      {/* Compose Modal (Auto-closes on click outside - NO X button) */}
      {composeOpen && (
        <div
          onClick={() => setComposeOpen(false)}
          className="fixed inset-0 bg-slate-900/30 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-150"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden text-xs p-5 space-y-3"
          >
            <div className="font-bold text-sm text-slate-900 pb-2 border-b border-slate-100">
              New Message
            </div>
            <div>
              <label className="block text-[10px] text-slate-400 font-semibold uppercase mb-1">To</label>
              <input
                type="email"
                value={composeTo}
                onChange={(e) => setComposeTo(e.target.value)}
                placeholder="merchant@example.com"
                className="w-full p-2 border border-slate-200 rounded-lg text-xs outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-[10px] text-slate-400 font-semibold uppercase mb-1">Subject</label>
              <input
                type="text"
                value={composeSubject}
                onChange={(e) => setComposeSubject(e.target.value)}
                placeholder="Subject line…"
                className="w-full p-2 border border-slate-200 rounded-lg text-xs outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-[10px] text-slate-400 font-semibold uppercase mb-1">Message</label>
              <textarea
                rows={6}
                value={composeBody}
                onChange={(e) => setComposeBody(e.target.value)}
                placeholder="Write your email…"
                className="w-full p-2.5 border border-slate-200 rounded-lg text-xs outline-none focus:border-blue-500 leading-relaxed"
              />
            </div>
            <div className="flex justify-between items-center pt-2">
              <span className="text-[10px] text-slate-400">Click anywhere outside to discard</span>
              <button
                type="button"
                onClick={() => {
                  alert('Email sent via CRM relay');
                  setComposeOpen(false);
                }}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow-sm transition-colors"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
