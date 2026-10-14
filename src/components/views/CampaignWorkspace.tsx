import React, { useState } from 'react';
import { Mail, MessageSquare, Play, Pause, Square, Sparkles, SlidersHorizontal } from 'lucide-react';

export const CampaignWorkspace: React.FC = () => {
  const [emailStatus, setEmailStatus] = useState<'idle' | 'running' | 'paused'>('idle');
  const [emailSent, setEmailSent] = useState(0);
  const [smsStatus, setSmsStatus] = useState<'idle' | 'running' | 'paused'>('idle');
  const [smsSent, setSmsSent] = useState(0);

  const [activeModal, setActiveModal] = useState<string | null>(null);

  return (
    <div className="flex-1 min-w-0 min-h-0 flex flex-col bg-white overflow-auto p-4 space-y-4 select-none text-xs">
      {/* 2-Column Campaign Setup Split */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Email Campaign Card */}
        <div className="p-4 border border-slate-200 rounded-xl bg-white shadow-xs flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <span className="font-bold text-slate-900 text-sm">Email Outbound Campaign</span>
              </div>
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Active Pipeline</span>
            </div>

            {/* Campaign Summary Selectors */}
            <div className="grid grid-cols-2 gap-2 mt-3">
              <div className="p-2 border border-slate-200 rounded-lg bg-slate-50">
                <span className="text-[10px] text-slate-400 block">Audience</span>
                <span className="font-semibold text-slate-800 text-[11.5px]">All 148 Merchant Leads</span>
              </div>
              <div className="p-2 border border-slate-200 rounded-lg bg-slate-50">
                <span className="text-[10px] text-slate-400 block">Sender Profile</span>
                <span className="font-semibold text-slate-800 text-[11.5px]">marcus.webb@crm.mail</span>
              </div>
            </div>

            {/* Progress Bar & Status */}
            <div className="mt-3 p-3 bg-slate-50 border border-slate-100 rounded-lg">
              <div className="flex items-center justify-between text-[11px] mb-1.5">
                <span className="font-medium text-slate-700">
                  {emailStatus === 'running' ? 'Broadcasting Batch…' : 'Draft · Ready'}
                </span>
                <span className="font-mono-tabular text-slate-500">{emailSent} / 148 Dispatched</span>
              </div>
              <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 transition-all duration-300"
                  style={{ width: `${(emailSent / 148) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Action Triggers */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => {
                  setEmailStatus('running');
                  setEmailSent(14);
                }}
                disabled={emailStatus === 'running'}
                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Play className="w-3 h-3 fill-current" />
                <span>Start</span>
              </button>
              <button
                type="button"
                onClick={() => setEmailStatus('paused')}
                disabled={emailStatus !== 'running'}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-700 rounded-lg font-medium flex items-center gap-1.5 transition-colors"
              >
                <Pause className="w-3 h-3" />
                <span>Pause</span>
              </button>
            </div>

            <button
              type="button"
              onClick={() => alert('Variables: {first_name}, {company}, {stated_revenue}, {max_approval}')}
              className="text-slate-500 hover:text-blue-600 text-[11px] font-medium"
            >
              Insert Variables
            </button>
          </div>
        </div>

        {/* SMS / WhatsApp Campaign Card */}
        <div className="p-4 border border-slate-200 rounded-xl bg-white shadow-xs flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <MessageSquare className="w-3.5 h-3.5" />
                </div>
                <span className="font-bold text-slate-900 text-sm">SMS / WhatsApp Broadcast</span>
              </div>
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Fast Response</span>
            </div>

            {/* Campaign Summary Selectors */}
            <div className="grid grid-cols-2 gap-2 mt-3">
              <div className="p-2 border border-slate-200 rounded-lg bg-slate-50">
                <span className="text-[10px] text-slate-400 block">Routing Strategy</span>
                <span className="font-semibold text-slate-800 text-[11.5px]">SMS when WhatsApp unavailable</span>
              </div>
              <div className="p-2 border border-slate-200 rounded-lg bg-slate-50">
                <span className="text-[10px] text-slate-400 block">Sending Line</span>
                <span className="font-semibold text-slate-800 text-[11.5px]">Phone 1 · (646) 555-0148</span>
              </div>
            </div>

            {/* Progress Bar & Status */}
            <div className="mt-3 p-3 bg-slate-50 border border-slate-100 rounded-lg">
              <div className="flex items-center justify-between text-[11px] mb-1.5">
                <span className="font-medium text-slate-700">
                  {smsStatus === 'running' ? 'Sending SMS Stream…' : 'Draft · Ready'}
                </span>
                <span className="font-mono-tabular text-slate-500">{smsSent} / 148 Dispatched</span>
              </div>
              <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-600 transition-all duration-300"
                  style={{ width: `${(smsSent / 148) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Action Triggers */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => {
                  setSmsStatus('running');
                  setSmsSent(28);
                }}
                disabled={smsStatus === 'running'}
                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-lg font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Play className="w-3 h-3 fill-current" />
                <span>Start</span>
              </button>
              <button
                type="button"
                onClick={() => setSmsStatus('paused')}
                disabled={smsStatus !== 'running'}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-700 rounded-lg font-medium flex items-center gap-1.5 transition-colors"
              >
                <Pause className="w-3 h-3" />
                <span>Pause</span>
              </button>
            </div>

            <button
              type="button"
              onClick={() => alert('Routing: iMessage preferred, SMS carrier fallback.')}
              className="text-slate-500 hover:text-emerald-600 text-[11px] font-medium"
            >
              Configure Routing
            </button>
          </div>
        </div>
      </div>

      {/* Campaign Live Activity Log */}
      <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-xs">
        <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <span className="font-bold text-slate-800 text-xs">Recent Broadcast Results</span>
          <span className="text-slate-500 text-[11px]">Live tracking delivery and open receipts</span>
        </div>
        <table className="w-full text-left text-xs divide-y divide-slate-100">
          <thead className="bg-slate-100/70 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            <tr>
              <th className="py-2 px-3">Recipient</th>
              <th className="py-2 px-3">Company</th>
              <th className="py-2 px-3">Channel</th>
              <th className="py-2 px-3">Status</th>
              <th className="py-2 px-3">Sent Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr>
              <td className="py-2 px-3 font-medium text-slate-900">Sandra Reeves</td>
              <td className="py-2 px-3 text-slate-600">Apex Dynamics</td>
              <td className="py-2 px-3 text-slate-600">Email</td>
              <td className="py-2 px-3 text-emerald-600 font-medium">Delivered · Opened 3x</td>
              <td className="py-2 px-3 text-slate-400 font-mono-tabular">Today · 10:14 AM</td>
            </tr>
            <tr>
              <td className="py-2 px-3 font-medium text-slate-900">James Liao</td>
              <td className="py-2 px-3 text-slate-600">Meridian Capital</td>
              <td className="py-2 px-3 text-slate-600">SMS</td>
              <td className="py-2 px-3 text-blue-600 font-medium">Delivered</td>
              <td className="py-2 px-3 text-slate-400 font-mono-tabular">Today · 10:15 AM</td>
            </tr>
            <tr>
              <td className="py-2 px-3 font-medium text-slate-900">Mei Chen</td>
              <td className="py-2 px-3 text-slate-600">Stellar Ops</td>
              <td className="py-2 px-3 text-slate-600">WhatsApp</td>
              <td className="py-2 px-3 text-emerald-600 font-medium">Read (00:09 AM)</td>
              <td className="py-2 px-3 text-slate-400 font-mono-tabular">Today · 10:15 AM</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
