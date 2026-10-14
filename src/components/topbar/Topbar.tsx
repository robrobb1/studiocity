import React, { useState, useRef, useEffect } from 'react';
import { useCRM } from '../../context/CRMContext';
import {
  Search, Phone, PhoneOff, Mic, MicOff, Pause, Play,
  Smartphone, Bell, Sliders, ChevronDown
} from 'lucide-react';

export const Topbar: React.FC = () => {
  const {
    searchOpen, setSearchOpen, searchQuery, setSearchQuery,
    dialerNumber, setDialerNumber, clearDialer, pressKey,
    startCall, endCall, callPhase, callDuration,
    isMuted, setIsMuted, isHeld, setIsHeld,
    devices, activeDeviceIndex, setActiveDeviceIndex,
    toggleComms, commsOpen, messages,
    setSettingsOpen
  } = useCRM();

  const [deviceMenuOpen, setDeviceMenuOpen] = useState(false);
  const [keypadOpen, setKeypadOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const deviceMenuRef = useRef<HTMLDivElement>(null);
  const keypadRef = useRef<HTMLDivElement>(null);

  const activeDevice = devices[activeDeviceIndex] || devices[0];
  const unreadMsgCount = messages.filter((m) => !m.read && m.dir === 'in').length;

  // Auto-close dropdowns & search on outside click (No 'X' buttons needed)
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (searchContainerRef.current && !searchContainerRef.current.contains(target)) {
        if (!searchQuery) setSearchOpen(false);
      }
      if (deviceMenuRef.current && !deviceMenuRef.current.contains(target)) {
        setDeviceMenuOpen(false);
      }
      if (keypadRef.current && !keypadRef.current.contains(target)) {
        setKeypadOpen(false);
      }
    };
    document.addEventListener('pointerdown', handleClickOutside);
    return () => document.removeEventListener('pointerdown', handleClickOutside);
  }, [searchQuery, setSearchOpen]);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const keypadDigits = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['*', '0', '#']
  ];

  return (
    <header className="h-[54px] bg-[#1E2235] border-b border-[#2A3146] flex items-center justify-between px-4 select-none shrink-0 z-40 text-slate-200 shadow-sm">
      {/* Zone 1: Logo & Dynamic Expanding Search */}
      <div className="flex items-center gap-3">
        {/* Logo: Hexagonal wireframe icon + "CRM" */}
        <div className="flex items-center gap-2 mr-2">
          <svg className="w-5 h-5 text-blue-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
            <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5" />
            <line x1="12" y1="22" x2="12" y2="15.5" />
            <line x1="22" y1="8.5" x2="12" y2="15.5" />
            <line x1="2" y1="8.5" x2="12" y2="15.5" />
          </svg>
          <span className="font-bold text-[15px] tracking-tight text-white">CRM</span>
        </div>

        {/* Search Bar - Hidden behind Magnifying Glass Icon, expands smoothly */}
        <div ref={searchContainerRef} className="relative flex items-center">
          {searchOpen ? (
            <div className="flex items-center bg-[#283046] border border-[#3A4562] rounded-md px-2.5 py-1 text-xs w-64 transition-all duration-200">
              <Search className="w-3.5 h-3.5 text-slate-400 mr-2 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search leads, companies, contacts…"
                autoFocus
                className="bg-transparent border-none outline-none text-white text-xs w-full placeholder:text-slate-400"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="text-slate-400 hover:text-white text-xs ml-1"
                >
                  Clear
                </button>
              )}
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="p-1.5 rounded-md hover:bg-[#283046] text-slate-400 hover:text-slate-200 transition-colors flex items-center gap-1.5 text-xs"
              title="Search leads"
            >
              <Search className="w-4 h-4" />
              <span className="text-slate-400 text-xs hidden sm:inline">Search</span>
            </button>
          )}
        </div>
      </div>

      {/* Zone 2: Seamless In-Line Dialer (Flush directly in topbar, zero outer card box) */}
      <div className="flex items-center gap-2 relative">
        <div className="flex items-center bg-[#283046]/70 border border-[#3A4562] rounded-lg px-2 py-1 gap-2">
          {/* Dialer Number Input */}
          <input
            type="tel"
            value={dialerNumber}
            onChange={(e) => setDialerNumber(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') startCall();
            }}
            placeholder="Dial number…"
            className="w-32 bg-transparent text-white font-mono-tabular text-[13px] px-1 py-0.5 outline-none placeholder:text-slate-500"
          />

          {dialerNumber && callPhase === 'idle' && (
            <button
              type="button"
              onClick={clearDialer}
              className="text-slate-400 hover:text-slate-200 text-xs px-1"
            >
              ×
            </button>
          )}

          {/* Keypad dropdown button */}
          <div ref={keypadRef} className="relative">
            <button
              type="button"
              onClick={() => setKeypadOpen((prev) => !prev)}
              className={`p-1 rounded text-slate-300 hover:text-white hover:bg-[#323D59] transition-colors ${keypadOpen ? 'bg-[#323D59] text-white' : ''}`}
              title="Toggle numeric keypad"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="7" cy="5" r="1.5" />
                <circle cx="12" cy="5" r="1.5" />
                <circle cx="17" cy="5" r="1.5" />
                <circle cx="7" cy="10" r="1.5" />
                <circle cx="12" cy="10" r="1.5" />
                <circle cx="17" cy="10" r="1.5" />
                <circle cx="7" cy="15" r="1.5" />
                <circle cx="12" cy="15" r="1.5" />
                <circle cx="17" cy="15" r="1.5" />
                <circle cx="12" cy="20" r="1.5" />
              </svg>
            </button>

            {/* In-Line Keypad Popover (Auto-closes on outside click) */}
            {keypadOpen && (
              <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-[#1E2235] border border-[#3A4562] shadow-xl rounded-xl p-3 z-50 grid grid-cols-3 gap-2 w-48">
                {keypadDigits.map((row, rIdx) =>
                  row.map((digit) => (
                    <button
                      key={digit}
                      type="button"
                      onClick={() => pressKey(digit)}
                      className="h-10 bg-[#283046] hover:bg-[#34405E] active:bg-blue-600 active:text-white text-slate-200 font-mono-tabular font-medium text-base rounded-lg flex items-center justify-center transition-colors shadow-sm"
                    >
                      {digit}
                    </button>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Call / End Buttons (Authentic iOS style buttons) */}
          {callPhase === 'idle' ? (
            <button
              type="button"
              onClick={() => startCall()}
              disabled={!dialerNumber}
              className="w-7 h-7 bg-[#34C759] hover:bg-[#2EB34F] active:scale-95 disabled:opacity-40 disabled:pointer-events-none rounded-full flex items-center justify-center text-white shadow transition-all"
              title="Call"
            >
              <Phone className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={endCall}
              className="w-7 h-7 bg-[#FF3B30] hover:bg-[#E0342A] active:scale-95 rounded-full flex items-center justify-center text-white shadow transition-all animate-pulse"
              title="End call"
            >
              <PhoneOff className="w-3.5 h-3.5" />
            </button>
          )}

          {/* In-Call Active Controls */}
          {callPhase !== 'idle' && (
            <div className="flex items-center gap-1.5 pl-1 border-l border-[#3A4562]">
              <span className="font-mono-tabular text-emerald-400 text-xs px-1 font-medium">
                {formatTimer(callDuration)}
              </span>
              <button
                type="button"
                onClick={() => setIsMuted((m) => !m)}
                className={`p-1 rounded text-xs transition-colors ${isMuted ? 'bg-amber-500/20 text-amber-300' : 'text-slate-400 hover:text-white'}`}
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <MicOff className="w-3 h-3" /> : <Mic className="w-3 h-3" />}
              </button>
              <button
                type="button"
                onClick={() => setIsHeld((h) => !h)}
                className={`p-1 rounded text-xs transition-colors ${isHeld ? 'bg-amber-500/20 text-amber-300' : 'text-slate-400 hover:text-white'}`}
                title={isHeld ? 'Resume' : 'Hold'}
              >
                {isHeld ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Zone 3: Redesigned Phone Switcher, Clock & Drawer Trigger */}
      <div className="flex items-center gap-3">
        {/* Redesigned Phone Switcher (Dropdown auto-closes on outside click) */}
        <div ref={deviceMenuRef} className="relative">
          <button
            type="button"
            onClick={() => setDeviceMenuOpen((prev) => !prev)}
            className="flex items-center gap-1.5 bg-[#283046]/80 hover:bg-[#2F3954] border border-[#3A4562] px-2.5 py-1 rounded-md text-xs transition-colors"
          >
            <span
              className={`w-2 h-2 rounded-full shrink-0 ${activeDevice.connected ? 'bg-[#34C759]' : 'bg-[#FF3B30]'}`}
            />
            <Smartphone className="w-3 h-3 text-slate-400" />
            <span className="font-medium text-slate-200">
              {activeDevice.name}
            </span>
            <span className="text-slate-400 font-mono-tabular text-[11px]">
              ···{activeDevice.number.slice(-4)}
            </span>
            <ChevronDown className="w-3 h-3 text-slate-400 ml-0.5" />
          </button>

          {/* Device Selection Dropdown */}
          {deviceMenuOpen && (
            <div className="absolute right-0 top-8 bg-[#1E2235] border border-[#3A4562] shadow-xl rounded-lg py-1.5 w-44 z-50">
              <div className="px-3 py-1 text-[10px] uppercase font-semibold text-slate-400 tracking-wider">
                Active Line
              </div>
              {devices.map((device, idx) => (
                <button
                  key={device.id}
                  type="button"
                  onClick={() => {
                    setActiveDeviceIndex(idx);
                    setDeviceMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-[#283046] transition-colors ${idx === activeDeviceIndex ? 'bg-[#283046] text-white' : 'text-slate-300'}`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full ${device.connected ? 'bg-[#34C759]' : 'bg-[#FF3B30]'}`}
                    />
                    <span>{device.name}</span>
                  </div>
                  <span className="font-mono-tabular text-slate-400 text-[11px]">
                    ···{device.number.slice(-4)}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Eastern Time Digital Clock */}
        <div className="hidden lg:flex flex-col text-right leading-tight font-mono-tabular text-[11px] text-slate-300">
          <span>{new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', timeZone: 'America/New_York' })} ET</span>
          <span className="text-[9.5px] text-slate-400">{new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
        </div>

        {/* Settings button */}
        <button
          type="button"
          onClick={() => setSettingsOpen(true)}
          className="p-1.5 rounded-md hover:bg-[#283046] text-slate-400 hover:text-slate-200 transition-colors"
          title="Display and Layout Settings"
        >
          <Sliders className="w-4 h-4" />
        </button>

        {/* User profile */}
        <div className="flex items-center gap-2 pl-1 border-l border-[#2A3146]">
          <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-semibold text-xs flex items-center justify-center">
            MW
          </div>
          <span className="text-xs text-slate-300 font-medium hidden md:inline">
            Marcus
          </span>
        </div>

        {/* 1-Click Communications Drawer Toggle */}
        <button
          type="button"
          onClick={toggleComms}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-all ${commsOpen ? 'bg-blue-600 text-white' : 'bg-[#283046] text-slate-200 hover:bg-[#34405E]'}`}
          title="Toggle Communications Drawer"
        >
          <Bell className="w-3.5 h-3.5" />
          <span>Comms</span>
          {unreadMsgCount > 0 && (
            <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
              {unreadMsgCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};
