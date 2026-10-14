import React, { useState } from 'react';
import { useCRM } from '../../context/CRMContext';
import { Hash, User, Send, Paperclip, Smile, Pin, Search } from 'lucide-react';

export const TeamWorkspace: React.FC = () => {
  const { teamChannels, activeChannelId, setActiveChannelId, teamMessages, sendTeamMessage } = useCRM();
  const [inputText, setInputText] = useState('');

  const currentChannel = teamChannels.find((c) => c.id === activeChannelId) || teamChannels[0];

  const handleSend = () => {
    if (!inputText.trim()) return;
    sendTeamMessage(inputText, activeChannelId);
    setInputText('');
  };

  return (
    <div className="flex-1 min-w-0 min-h-0 flex bg-white overflow-hidden select-none text-xs">
      {/* Channels & DMs Rail */}
      <aside className="w-[210px] bg-slate-50 border-r border-slate-200 p-2 flex flex-col justify-between shrink-0">
        <div>
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 mb-1.5">
            Channels
          </div>
          <nav className="space-y-0.5">
            {teamChannels.filter((c) => c.type === 'channel').map((ch) => (
              <button
                key={ch.id}
                type="button"
                onClick={() => setActiveChannelId(ch.id)}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md font-medium transition-colors ${
                  activeChannelId === ch.id
                    ? 'bg-blue-100 text-blue-900 font-semibold'
                    : 'text-slate-600 hover:bg-slate-200/60'
                }`}
              >
                <div className="flex items-center gap-1.5 truncate">
                  <Hash className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{ch.name}</span>
                </div>
                {ch.unread > 0 && (
                  <span className="text-[10px] font-bold bg-blue-600 text-white px-1.5 py-0.2 rounded-full">
                    {ch.unread}
                  </span>
                )}
              </button>
            ))}
          </nav>

          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 mt-4 mb-1.5">
            Direct Messages
          </div>
          <nav className="space-y-0.5">
            {teamChannels.filter((c) => c.type === 'dm').map((ch) => (
              <button
                key={ch.id}
                type="button"
                onClick={() => setActiveChannelId(ch.id)}
                className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md font-medium transition-colors ${
                  activeChannelId === ch.id
                    ? 'bg-blue-100 text-blue-900 font-semibold'
                    : 'text-slate-600 hover:bg-slate-200/60'
                }`}
              >
                <div className="w-4 h-4 rounded-full bg-slate-300 text-slate-700 text-[10px] flex items-center justify-center font-bold">
                  {ch.name[0]}
                </div>
                <span className="truncate">{ch.name}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-2 border-t border-slate-200 text-slate-400 text-[11px]">
          NorthVector Sales Floor
        </div>
      </aside>

      {/* Main Channel Message Feed */}
      <div className="flex-1 min-w-0 flex flex-col bg-white overflow-hidden">
        {/* Channel Header */}
        <div className="h-11 px-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/50 shrink-0">
          <div className="flex items-center gap-2">
            <Hash className="w-4 h-4 text-slate-400" />
            <span className="font-bold text-slate-900 text-sm">{currentChannel.name}</span>
            <span className="text-slate-400 text-xs hidden sm:inline">
              · {currentChannel.description || 'Internal team chat'}
            </span>
          </div>
          <div className="text-slate-400 text-xs">
            {currentChannel.members.length} members online
          </div>
        </div>

        {/* Message Stream */}
        <div className="flex-1 overflow-auto p-4 space-y-3.5">
          {teamMessages.map((msg) => (
            <div key={msg.id} className="flex items-start gap-3 group">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-semibold flex items-center justify-center shrink-0 text-xs mt-0.5">
                {msg.authorName.split(' ').map((n) => n[0]).join('')}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900">{msg.authorName}</span>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">
                    {msg.authorRole}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono-tabular">
                    {new Date(msg.at).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                  </span>
                  {msg.pinned && (
                    <span className="flex items-center gap-0.5 text-amber-600 text-[10px] font-medium bg-amber-50 px-1 rounded">
                      <Pin className="w-2.5 h-2.5" /> Pinned
                    </span>
                  )}
                </div>

                <p className="text-slate-800 text-xs leading-relaxed mt-1">
                  {msg.text}
                </p>

                {msg.reactions && msg.reactions.length > 0 && (
                  <div className="flex items-center gap-1.5 mt-1.5">
                    {msg.reactions.map((r, i) => (
                      <span
                        key={i}
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium border ${
                          r.userReacted
                            ? 'bg-blue-50 border-blue-200 text-blue-700'
                            : 'bg-slate-50 border-slate-200 text-slate-600'
                        }`}
                      >
                        <span>{r.emoji}</span>
                        <span>{r.count}</span>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Composer */}
        <div className="p-3 border-t border-slate-200 bg-white">
          <div className="flex items-center gap-2 border border-slate-200 rounded-lg p-1.5 focus-within:border-blue-500 transition-colors">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSend();
              }}
              placeholder={`Message #${currentChannel.name}…`}
              className="flex-1 px-2 text-xs outline-none bg-transparent"
            />
            <div className="flex items-center gap-1 text-slate-400">
              <button
                type="button"
                onClick={() => setInputText((t) => t + ' 👍')}
                className="p-1 hover:text-slate-600 transition-colors"
                title="Add Reaction"
              >
                <Smile className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => alert('Attachments: PDF, XLSX, images')}
                className="p-1 hover:text-slate-600 transition-colors"
                title="Attach Document"
              >
                <Paperclip className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleSend}
                disabled={!inputText.trim()}
                className="p-1.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white rounded-md transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
