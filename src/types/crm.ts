export type WorkspaceTab = 'leads' | 'email' | 'scanner' | 'campaign' | 'team';
export type AdminTab = 'activity' | 'settings';

export interface BankStatement {
  month: string;
  deposits: number;
  balance: number;
}

export interface LeadAddress {
  street: string;
  city: string;
  state: string;
  zip: string;
}

export interface ActivityHistoryItem {
  type: string;
  subject: string;
  preview: string;
  date: string;
}

export interface UpcomingActivityItem {
  text: string;
  time: string;
}

export interface Lead {
  id: number;
  initials: string;
  name: string;
  company: string;
  title: string;
  stage: 'negotiation' | 'proposal' | 'qualified' | 'discovery' | 'prospecting' | 'closed-won' | 'closed-lost';
  value: number;
  score: number;
  priority: 'high' | 'medium' | 'low';
  owner: string;
  action: string;
  date: string;
  phone: string;
  email: string;
  phones: string[];
  emails: string[];
  birthDate: string;
  statements: BankStatement[];
  address: LeadAddress;
  notes?: string;
  assignedRep?: string;
}

export interface ConnectedPhone {
  id: string;
  name: string;
  number: string;
  connected: boolean;
  platform: 'ios' | 'android';
}

export interface CallLog {
  id: string;
  number: string;
  leadId: number | null;
  dir: 'missed' | 'in' | 'out';
  at: number;
  seconds: number;
  phone: string;
  seen: boolean;
}

export interface MessageItem {
  id: string;
  channel: 'text' | 'wa';
  number: string;
  leadId: number | null;
  dir: 'in' | 'out';
  text: string;
  at: number;
  phone: string;
  service: 'imessage' | 'sms' | 'wa';
  read: boolean;
  status: string;
  readAt?: number;
}

export interface EmailMessage {
  id: string;
  from: { name: string; email: string };
  to: string[];
  cc?: string[];
  bcc?: string[];
  subject: string;
  body: string;
  at: number;
  out: boolean;
  read: boolean;
  draft?: boolean;
  tracked?: boolean;
  opens?: number[];
  scheduledAt?: number;
}

export interface EmailThread {
  id: string;
  account: string;
  folder: 'inbox' | 'starred' | 'sent' | 'drafts' | 'tracked' | 'archive' | 'trash';
  starred: boolean;
  important: boolean;
  msgs: EmailMessage[];
}

export interface TeamMessage {
  id: string;
  authorId: string;
  authorName: string;
  authorRole: string;
  at: number;
  text: string;
  reactions?: { emoji: string; count: number; userReacted?: boolean }[];
  pinned?: boolean;
  replyToId?: string;
  attachments?: { name: string; size: number; type: string; url?: string }[];
}

export interface TeamChannel {
  id: string;
  name: string;
  type: 'channel' | 'dm';
  description?: string;
  unread: number;
  members: string[];
}

export interface ActivityEvent {
  id: string;
  at: number;
  rep: string;
  sender: string;
  recipient: string;
  lead: string;
  company: string;
  subject: string;
  activity: string;
  channel: 'email' | 'call' | 'sms' | 'scanner';
  status: 'Sent' | 'Opened' | 'Delivered' | 'Completed';
  source: string;
}

export interface DisplayPreferences {
  ultrawideMode: boolean;
  density: 'compact' | 'regular' | 'comfortable';
  layout: 'single' | 'stacked';
  soundEnabled: boolean;
  soundVolume: number;
}
