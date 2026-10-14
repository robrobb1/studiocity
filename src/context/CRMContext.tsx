import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import {
  Lead, ConnectedPhone, CallLog, MessageItem, EmailThread,
  TeamChannel, TeamMessage, ActivityEvent, DisplayPreferences,
  WorkspaceTab
} from '../types/crm';
import {
  INITIAL_LEADS, INITIAL_PHONES, INITIAL_CALLS, INITIAL_MESSAGES,
  INITIAL_EMAIL_THREADS, INITIAL_TEAM_CHANNELS, INITIAL_TEAM_MESSAGES,
  INITIAL_ACTIVITY_LOGS
} from '../data/initialData';
import { playDTMFTone, playCallChime } from '../sound/dtmf';

interface CRMContextType {
  // Navigation & Workspace
  activeWorkspace: WorkspaceTab;
  setActiveWorkspace: (tab: WorkspaceTab) => void;
  activityLogOpen: boolean;
  setActivityLogOpen: (open: boolean) => void;
  settingsOpen: boolean;
  setSettingsOpen: (open: boolean) => void;

  // Search
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Leads
  leads: Lead[];
  selectedLeadId: number | null;
  selectLead: (id: number | null) => void;
  updateLeadNotes: (id: number, notes: string) => void;
  sortField: 'original' | 'company' | 'revenue' | 'deposits' | 'ending';
  setSortField: (field: 'original' | 'company' | 'revenue' | 'deposits' | 'ending') => void;

  // Communications Slide-over Drawer
  commsOpen: boolean;
  setCommsOpen: (open: boolean) => void;
  toggleComms: () => void;
  commsTab: 'leads' | 'messages' | 'wa' | 'calls' | 'email';
  setCommsTab: (tab: 'leads' | 'messages' | 'wa' | 'calls' | 'email') => void;
  activeThreadNumber: string | null;
  setActiveThreadNumber: (num: string | null) => void;
  openMessageThread: (channel: 'text' | 'wa', number: string) => void;
  activeCallId: string | null;
  setActiveCallId: (id: string | null) => void;

  // Telephony & In-Line Dialer
  devices: ConnectedPhone[];
  activeDeviceIndex: number;
  setActiveDeviceIndex: (idx: number) => void;
  dialerNumber: string;
  setDialerNumber: (num: string) => void;
  keypadOpen: boolean;
  setKeypadOpen: (open: boolean) => void;
  callPhase: 'idle' | 'dialing' | 'active';
  callDuration: number;
  isMuted: boolean;
  setIsMuted: (muted: boolean | ((prev: boolean) => boolean)) => void;
  isHeld: boolean;
  setIsHeld: (held: boolean | ((prev: boolean) => boolean)) => void;
  startCall: (num?: string) => void;
  endCall: () => void;
  pressKey: (digit: string) => void;
  clearDialer: () => void;

  // Multichannel Data
  calls: CallLog[];
  messages: MessageItem[];
  sendMessage: (channel: 'text' | 'wa', number: string, text: string) => void;
  emailThreads: EmailThread[];
  activeEmailId: string | null;
  setActiveEmailId: (id: string | null) => void;
  sendEmailReply: (threadId: string, text: string) => void;
  teamChannels: TeamChannel[];
  activeChannelId: string;
  setActiveChannelId: (id: string) => void;
  teamMessages: TeamMessage[];
  sendTeamMessage: (text: string, channelId?: string, replyToId?: string) => void;
  activityLogs: ActivityEvent[];

  // Display Preferences
  preferences: DisplayPreferences;
  updatePreferences: (patch: Partial<DisplayPreferences>) => void;
}

const CRMContext = createContext<CRMContextType | null>(null);

export const CRMProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation
  const [activeWorkspace, setActiveWorkspace] = useState<WorkspaceTab>('leads');
  const [activityLogOpen, setActivityLogOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  // Search
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Leads
  const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS);
  const [selectedLeadId, setSelectedLeadId] = useState<number | null>(1);
  const [sortField, setSortField] = useState<'original' | 'company' | 'revenue' | 'deposits' | 'ending'>('original');

  // Communications Drawer
  const [commsOpen, setCommsOpen] = useState(false);
  const [commsTab, setCommsTab] = useState<'leads' | 'messages' | 'wa' | 'calls' | 'email'>('leads');
  const [activeThreadNumber, setActiveThreadNumber] = useState<string | null>(null);
  const [activeCallId, setActiveCallId] = useState<string | null>(null);

  // Telephony
  const [devices] = useState<ConnectedPhone[]>(INITIAL_PHONES);
  const [activeDeviceIndex, setActiveDeviceIndex] = useState(0);
  const [dialerNumber, setDialerNumber] = useState('');
  const [keypadOpen, setKeypadOpen] = useState(false);
  const [callPhase, setCallPhase] = useState<'idle' | 'dialing' | 'active'>('idle');
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isHeld, setIsHeld] = useState(false);
  const callTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Data Collections
  const [calls, setCalls] = useState<CallLog[]>(INITIAL_CALLS);
  const [messages, setMessages] = useState<MessageItem[]>(INITIAL_MESSAGES);
  const [emailThreads, setEmailThreads] = useState<EmailThread[]>(INITIAL_EMAIL_THREADS);
  const [activeEmailId, setActiveEmailId] = useState<string | null>(null);
  const [teamChannels] = useState<TeamChannel[]>(INITIAL_TEAM_CHANNELS);
  const [activeChannelId, setActiveChannelId] = useState<string>('sales-floor');
  const [teamMessages, setTeamMessages] = useState<TeamMessage[]>(INITIAL_TEAM_MESSAGES);
  const [activityLogs, setActivityLogs] = useState<ActivityEvent[]>(INITIAL_ACTIVITY_LOGS);

  // Display Preferences - Default single-line rows as requested!
  const [preferences, setPreferences] = useState<DisplayPreferences>(() => {
    try {
      const saved = localStorage.getItem('crm.display.prefs');
      if (saved) return JSON.parse(saved);
    } catch {}
    return {
      ultrawideMode: false,
      density: 'regular',
      layout: 'single', // Explicit requirement: Default rows are ONE line not 2 line
      soundEnabled: true,
      soundVolume: 0.5
    };
  });

  const updatePreferences = useCallback((patch: Partial<DisplayPreferences>) => {
    setPreferences((prev) => {
      const next = { ...prev, ...patch };
      try {
        localStorage.setItem('crm.display.prefs', JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);

  // Sync ultrawide CSS class to body
  useEffect(() => {
    if (preferences.ultrawideMode) {
      document.body.classList.add('crm-ultrawide');
    } else {
      document.body.classList.remove('crm-ultrawide');
    }
  }, [preferences.ultrawideMode]);

  // Lead selection & notes
  const selectLead = useCallback((id: number | null) => {
    setSelectedLeadId(id);
  }, []);

  const updateLeadNotes = useCallback((id: number, notes: string) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, notes } : l))
    );
  }, []);

  // Telephony handlers
  const pressKey = useCallback((digit: string) => {
    if (preferences.soundEnabled) {
      playDTMFTone(digit, preferences.soundVolume);
    }
    setDialerNumber((prev) => (prev.length < 18 ? prev + digit : prev));
  }, [preferences.soundEnabled, preferences.soundVolume]);

  const clearDialer = useCallback(() => {
    setDialerNumber('');
  }, []);

  const startCall = useCallback((targetNum?: string) => {
    const num = targetNum || dialerNumber;
    if (!num) return;
    if (preferences.soundEnabled) {
      playCallChime('call', preferences.soundVolume);
    }
    setDialerNumber(num);
    setCallPhase('dialing');
    setCallDuration(0);
    setIsMuted(false);
    setIsHeld(false);
    setKeypadOpen(false);

    // Auto-advance to active call
    setTimeout(() => {
      setCallPhase('active');
      callTimerRef.current = setInterval(() => {
        setCallDuration((d) => d + 1);
      }, 1000);
    }, 1200);

    // Log call event
    const newCall: CallLog = {
      id: `c-${Date.now()}`,
      number: num.replace(/\D/g, '').slice(-10),
      leadId: selectedLeadId,
      dir: 'out',
      at: Date.now(),
      seconds: 0,
      phone: devices[activeDeviceIndex]?.name || 'Phone 1',
      seen: true
    };
    setCalls((prev) => [newCall, ...prev]);

    // Add activity log
    const lead = leads.find((l) => l.id === selectedLeadId);
    const newAct: ActivityEvent = {
      id: `act-${Date.now()}`,
      at: Date.now(),
      rep: 'Marcus Webb',
      sender: devices[activeDeviceIndex]?.name || 'Phone 1',
      recipient: num,
      lead: lead?.name || 'Contact',
      company: lead?.company || 'Company',
      subject: `Outgoing Call · ${num}`,
      activity: 'Call placed',
      channel: 'call',
      status: 'Completed',
      source: 'VoIP'
    };
    setActivityLogs((prev) => [newAct, ...prev]);
  }, [dialerNumber, preferences.soundEnabled, preferences.soundVolume, selectedLeadId, devices, activeDeviceIndex, leads]);

  const endCall = useCallback(() => {
    if (callTimerRef.current) {
      clearInterval(callTimerRef.current);
      callTimerRef.current = null;
    }
    if (preferences.soundEnabled) {
      playCallChime('end', preferences.soundVolume);
    }
    setCallPhase('idle');
    setCallDuration(0);
  }, [preferences.soundEnabled, preferences.soundVolume]);

  const toggleComms = useCallback(() => {
    setCommsOpen((prev) => !prev);
  }, []);

  const openMessageThread = useCallback((channel: 'text' | 'wa', number: string) => {
    const cleanNum = number.replace(/\D/g, '').slice(-10);
    setActiveThreadNumber(cleanNum);
    setCommsTab(channel === 'wa' ? 'wa' : 'messages');
    setCommsOpen(true);
  }, []);

  const sendMessage = useCallback((channel: 'text' | 'wa', number: string, text: string) => {
    if (!text.trim()) return;
    const cleanNum = number.replace(/\D/g, '').slice(-10);
    const newMsg: MessageItem = {
      id: `m-${Date.now()}`,
      channel,
      number: cleanNum,
      leadId: selectedLeadId,
      dir: 'out',
      text: text.trim(),
      at: Date.now(),
      phone: devices[activeDeviceIndex]?.name || 'Phone 1',
      service: channel === 'wa' ? 'wa' : 'imessage',
      read: true,
      status: 'delivered'
    };
    setMessages((prev) => [...prev, newMsg]);

    if (preferences.soundEnabled) {
      playCallChime('message', preferences.soundVolume);
    }

    // Auto simulate reply after 3 seconds for lifelike testing
    setTimeout(() => {
      const replyMsg: MessageItem = {
        id: `m-reply-${Date.now()}`,
        channel,
        number: cleanNum,
        leadId: selectedLeadId,
        dir: 'in',
        text: 'Received, reviewing the figures and getting back to you.',
        at: Date.now(),
        phone: devices[activeDeviceIndex]?.name || 'Phone 1',
        service: channel === 'wa' ? 'wa' : 'imessage',
        read: false,
        status: ''
      };
      setMessages((prev) => [...prev, replyMsg]);
      if (preferences.soundEnabled) {
        playCallChime('message', preferences.soundVolume);
      }
    }, 3000);
  }, [selectedLeadId, devices, activeDeviceIndex, preferences.soundEnabled, preferences.soundVolume]);

  const sendEmailReply = useCallback((threadId: string, text: string) => {
    if (!text.trim()) return;
    setEmailThreads((prev) =>
      prev.map((thread) => {
        if (thread.id !== threadId) return thread;
        const newMsg = {
          id: `em-${Date.now()}`,
          from: { name: 'Marcus Webb', email: 'marcus.webb@crm.mail' },
          to: thread.msgs[0]?.to || ['merchant@company.com'],
          subject: thread.msgs[0]?.subject.startsWith('Re:') ? thread.msgs[0]?.subject : `Re: ${thread.msgs[0]?.subject}`,
          body: text,
          at: Date.now(),
          out: true,
          read: true,
          tracked: true,
          opens: []
        };
        return {
          ...thread,
          folder: 'sent' as const,
          msgs: [...thread.msgs, newMsg]
        };
      })
    );
  }, []);

  const sendTeamMessage = useCallback((text: string, channelId = 'sales-floor', replyToId?: string) => {
    if (!text.trim()) return;
    const newMsg: TeamMessage = {
      id: `tm-${Date.now()}`,
      authorId: 'mw',
      authorName: 'Marcus Webb',
      authorRole: 'Senior AE',
      at: Date.now(),
      text: text.trim(),
      replyToId,
      reactions: []
    };
    setTeamMessages((prev) => [...prev, newMsg]);
  }, []);

  return (
    <CRMContext.Provider
      value={{
        activeWorkspace,
        setActiveWorkspace,
        activityLogOpen,
        setActivityLogOpen,
        settingsOpen,
        setSettingsOpen,
        searchOpen,
        setSearchOpen,
        searchQuery,
        setSearchQuery,
        leads,
        selectedLeadId,
        selectLead,
        updateLeadNotes,
        sortField,
        setSortField,
        commsOpen,
        setCommsOpen,
        toggleComms,
        commsTab,
        setCommsTab,
        activeThreadNumber,
        setActiveThreadNumber,
        openMessageThread,
        activeCallId,
        setActiveCallId,
        devices,
        activeDeviceIndex,
        setActiveDeviceIndex,
        dialerNumber,
        setDialerNumber,
        keypadOpen,
        setKeypadOpen,
        callPhase,
        callDuration,
        isMuted,
        setIsMuted,
        isHeld,
        setIsHeld,
        startCall,
        endCall,
        pressKey,
        clearDialer,
        calls,
        messages,
        sendMessage,
        emailThreads,
        activeEmailId,
        setActiveEmailId,
        sendEmailReply,
        teamChannels,
        activeChannelId,
        setActiveChannelId,
        teamMessages,
        sendTeamMessage,
        activityLogs,
        preferences,
        updatePreferences
      }}
    >
      {children}
    </CRMContext.Provider>
  );
};

export const useCRM = () => {
  const context = useContext(CRMContext);
  if (!context) {
    throw new Error('useCRM must be used within a CRMProvider');
  }
  return context;
};
