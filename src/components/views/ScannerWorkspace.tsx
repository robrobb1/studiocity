import React, { useState } from 'react';
import { UploadCloud, FileText, CheckCircle2, Download, RefreshCw } from 'lucide-react';

export const ScannerWorkspace: React.FC = () => {
  const [files, setFiles] = useState<{ id: string; name: string; size: string; status: 'Ready' | 'Processing' | 'Complete' }[]>([
    { id: '1', name: 'Chase_Sept_ApexDynamics.pdf', size: '1.2 MB', status: 'Complete' },
    { id: '2', name: 'BOA_August_MeridianCapital.pdf', size: '840 KB', status: 'Complete' },
    { id: '3', name: 'WellsFargo_Sept_StellarOps.pdf', size: '1.8 MB', status: 'Complete' }
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [batchName, setBatchName] = useState('MCA_Batch_Oct2026');

  const handleStartScan = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      alert('OCR Extraction Complete: 3 statement ledgers reconciled.');
    }, 1500);
  };

  return (
    <div className="flex-1 min-w-0 min-h-0 flex flex-col bg-white overflow-auto p-4 space-y-4 select-none text-xs">
      {/* Top Banner & Dropzone */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Dropzone Card */}
        <div className="p-6 border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-xl bg-slate-50/50 flex flex-col items-center justify-center text-center cursor-pointer transition-colors">
          <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-2">
            <UploadCloud className="w-6 h-6" />
          </div>
          <div className="font-semibold text-slate-800 text-sm">
            Drop Bank Statements & Financials Here
          </div>
          <p className="text-slate-500 text-xs mt-1">
            Supports PDF, Excel (.xlsx), CSV, and ZIP files. Multi-page OCR enabled.
          </p>
        </div>

        {/* Processing Queue & Progress Card */}
        <div className="p-4 border border-slate-200 rounded-xl bg-white shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="font-bold text-slate-800 text-xs">Extraction Queue</span>
              <span className="text-slate-400 font-mono-tabular">{files.length} documents queued</span>
            </div>
            <div className="mt-2 space-y-1.5">
              {files.map((f) => (
                <div key={f.id} className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-2 truncate">
                    <FileText className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span className="font-medium text-slate-800 truncate">{f.name}</span>
                  </div>
                  <div className="flex items-center gap-2 font-mono-tabular text-[11px] text-slate-500 shrink-0">
                    <span>{f.size}</span>
                    <span className="text-emerald-600 flex items-center gap-0.5">
                      <CheckCircle2 className="w-3 h-3" /> {f.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <input
              type="text"
              value={batchName}
              onChange={(e) => setBatchName(e.target.value)}
              className="px-2 py-1 border border-slate-200 rounded text-xs text-slate-700 outline-none w-44"
              placeholder="Batch Name"
            />
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleStartScan}
                disabled={isProcessing}
                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold flex items-center gap-1.5 transition-colors"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isProcessing ? 'animate-spin' : ''}`} />
                <span>{isProcessing ? 'Extracting…' : 'Start OCR'}</span>
              </button>
              <button
                type="button"
                onClick={() => alert(`Exporting ${batchName}.xlsx to downloads`)}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium flex items-center gap-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download XLSX</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Extracted Ledger Preview Table */}
      <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-xs">
        <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <span className="font-bold text-slate-800 text-xs">Extracted Merchant Ledgers</span>
          <span className="text-slate-500 text-[11px]">Auto-reconciled deposits & ending cash positions</span>
        </div>
        <table className="w-full text-left text-xs divide-y divide-slate-100">
          <thead className="bg-slate-100/70 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            <tr>
              <th className="py-2.5 px-3">Merchant</th>
              <th className="py-2.5 px-3">Bank</th>
              <th className="py-2.5 px-3">Month</th>
              <th className="py-2.5 px-3">Total Deposits</th>
              <th className="py-2.5 px-3">Ending Balance</th>
              <th className="py-2.5 px-3">Avg Daily Balance</th>
              <th className="py-2.5 px-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-mono-tabular">
            <tr>
              <td className="py-2 px-3 font-sans font-semibold text-slate-900">Apex Dynamics</td>
              <td className="py-2 px-3 font-sans text-slate-600">JPMorgan Chase</td>
              <td className="py-2 px-3 text-slate-600">September 2026</td>
              <td className="py-2 px-3 font-medium text-emerald-700">$318,000</td>
              <td className="py-2 px-3 text-slate-800">$42,000</td>
              <td className="py-2 px-3 text-slate-600">$54,200</td>
              <td className="py-2 px-3 text-emerald-600 font-sans font-medium">Reconciled</td>
            </tr>
            <tr>
              <td className="py-2 px-3 font-sans font-semibold text-slate-900">Meridian Capital</td>
              <td className="py-2 px-3 font-sans text-slate-600">Bank of America</td>
              <td className="py-2 px-3 text-slate-600">August 2026</td>
              <td className="py-2 px-3 font-medium text-emerald-700">$231,000</td>
              <td className="py-2 px-3 text-slate-800">$22,400</td>
              <td className="py-2 px-3 text-slate-600">$31,800</td>
              <td className="py-2 px-3 text-emerald-600 font-sans font-medium">Reconciled</td>
            </tr>
            <tr>
              <td className="py-2 px-3 font-sans font-semibold text-slate-900">Stellar Ops</td>
              <td className="py-2 px-3 font-sans text-slate-600">Wells Fargo</td>
              <td className="py-2 px-3 text-slate-600">September 2026</td>
              <td className="py-2 px-3 font-medium text-emerald-700">$402,000</td>
              <td className="py-2 px-3 text-slate-800">$56,800</td>
              <td className="py-2 px-3 text-slate-600">$71,400</td>
              <td className="py-2 px-3 text-emerald-600 font-sans font-medium">Reconciled</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
