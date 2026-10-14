import React, { useRef, useEffect } from 'react';
import { useCRM } from '../../context/CRMContext';
import { Monitor, Volume2, LayoutGrid, Check } from 'lucide-react';

export const SettingsModal: React.FC = () => {
  const { settingsOpen, setSettingsOpen, preferences, updatePreferences } = useCRM();
  const modalCardRef = useRef<HTMLDivElement>(null);

  // Auto-close on click outside or Escape - Zero 'X' buttons!
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (settingsOpen && modalCardRef.current && !modalCardRef.current.contains(e.target as Node)) {
        setSettingsOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSettingsOpen(false);
    };

    if (settingsOpen) {
      document.addEventListener('pointerdown', handleOutsideClick);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('pointerdown', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [settingsOpen, setSettingsOpen]);

  if (!settingsOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 select-none animate-in fade-in duration-150">
      <div
        ref={modalCardRef}
        className="w-full max-w-md bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden text-slate-800"
      >
        {/* Header - Strictly NO 'X' button */}
        <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div>
            <h2 className="font-bold text-sm text-slate-900">Display & Telephony Settings</h2>
            <p className="text-[11px] text-slate-500">Configure sizing for standard laptops or 32″ ultrawide monitors.</p>
          </div>
        </div>

        {/* Settings Body */}
        <div className="p-5 space-y-4 text-xs">
          {/* 32" Ultrawide Preset Toggle */}
          <div className="flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:border-blue-400 transition-colors bg-slate-50/50">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <Monitor className="w-4 h-4" />
              </div>
              <div>
                <div className="font-semibold text-slate-900">32″ Ultrawide Display Mode</div>
                <div className="text-[11px] text-slate-500">
                  Enlarges fonts, expands row heights, and sharpens hairline contrast.
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => updatePreferences({ ultrawideMode: !preferences.ultrawideMode })}
              className={`w-10 h-5 rounded-full p-0.5 transition-colors ${
                preferences.ultrawideMode ? 'bg-blue-600' : 'bg-slate-300'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white shadow-sm transform transition-transform ${
                  preferences.ultrawideMode ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Row Layout Option (Single line default vs Stacked) */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Lead Row Layout
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => updatePreferences({ layout: 'single' })}
                className={`p-2.5 rounded-lg border text-left transition-all ${
                  preferences.layout === 'single'
                    ? 'border-blue-500 bg-blue-50/50 font-semibold text-blue-900 ring-1 ring-blue-500'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>Single Line (Default)</span>
                  {preferences.layout === 'single' && <Check className="w-3.5 h-3.5 text-blue-600" />}
                </div>
                <div className="text-[10.5px] text-slate-500 font-normal mt-0.5">
                  Clean single line per merchant
                </div>
              </button>

              <button
                type="button"
                onClick={() => updatePreferences({ layout: 'stacked' })}
                className={`p-2.5 rounded-lg border text-left transition-all ${
                  preferences.layout === 'stacked'
                    ? 'border-blue-500 bg-blue-50/50 font-semibold text-blue-900 ring-1 ring-blue-500'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>Stacked Two-Line</span>
                  {preferences.layout === 'stacked' && <Check className="w-3.5 h-3.5 text-blue-600" />}
                </div>
                <div className="text-[10.5px] text-slate-500 font-normal mt-0.5">
                  Secondary line below primary
                </div>
              </button>
            </div>
          </div>

          {/* Table Density */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Grid Spacing & Density
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['compact', 'regular', 'comfortable'] as const).map((density) => (
                <button
                  key={density}
                  type="button"
                  onClick={() => updatePreferences({ density })}
                  className={`py-1.5 px-2 rounded-lg border text-center font-medium capitalize transition-all ${
                    preferences.density === density
                      ? 'border-blue-500 bg-blue-50 text-blue-900 font-semibold'
                      : 'border-slate-200 hover:border-slate-300 text-slate-600'
                  }`}
                >
                  {density}
                </button>
              ))}
            </div>
          </div>

          {/* Audio Volume & Sound Controls */}
          <div className="pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-slate-500" />
                <span className="font-semibold text-slate-800">Dialer & Keypad Sounds</span>
              </div>
              <button
                type="button"
                onClick={() => updatePreferences({ soundEnabled: !preferences.soundEnabled })}
                className={`w-9 h-4.5 rounded-full p-0.5 transition-colors ${
                  preferences.soundEnabled ? 'bg-emerald-500' : 'bg-slate-300'
                }`}
              >
                <div
                  className={`w-3.5 h-3.5 rounded-full bg-white shadow-sm transform transition-transform ${
                    preferences.soundEnabled ? 'translate-x-4.5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {preferences.soundEnabled && (
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={preferences.soundVolume}
                  onChange={(e) => updatePreferences({ soundVolume: parseFloat(e.target.value) })}
                  className="flex-1 accent-blue-600 cursor-pointer"
                />
                <span className="font-mono-tabular text-slate-500 text-xs w-8 text-right">
                  {Math.round(preferences.soundVolume * 100)}%
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Footer info note (Clicking outside auto-closes) */}
        <div className="px-5 py-2.5 bg-slate-50 border-t border-slate-100 text-[10.5px] text-slate-400 text-center">
          Preferences save automatically · Click anywhere outside to close
        </div>
      </div>
    </div>
  );
};
