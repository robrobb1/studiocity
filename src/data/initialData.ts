import { Lead, ConnectedPhone, CallLog, MessageItem, EmailThread, TeamChannel, TeamMessage, ActivityEvent } from '../types/crm';

export const INITIAL_LEADS: Lead[] = [
  {
    id: 1,
    initials: 'SR',
    name: 'Sandra Reeves',
    company: 'Apex Dynamics',
    title: 'VP Engineering',
    stage: 'negotiation',
    value: 240000,
    score: 88,
    priority: 'high',
    owner: 'MW',
    action: 'Send contract',
    date: 'Sep 30',
    phone: '+1 (415) 882-4401',
    email: 's.reeves@apexdyn.com',
    phones: ['+1 (415) 882-4401', '+1 (415) 309-7723', '+1 (628) 555-0186'],
    emails: ['s.reeves@apexdyn.com', 'sandra.reeves@apexdyn.com'],
    birthDate: '10/23/1976',
    statements: [
      { month: 'Sep', deposits: 318000, balance: 42000 },
      { month: 'Aug', deposits: 287000, balance: 36100 }
    ],
    address: { street: '425 Market St, Suite 1800', city: 'San Francisco', state: 'CA', zip: '94105' },
    notes: 'Interested in enterprise tier. Mentioned rollout timeline pressure — wants contract signed before Q4 budget freeze. Follow up on security questionnaire.'
  },
  {
    id: 2,
    initials: 'JL',
    name: 'James Liao',
    company: 'Meridian Capital',
    title: 'CFO',
    stage: 'proposal',
    value: 185000,
    score: 74,
    priority: 'high',
    owner: 'TK',
    action: 'Follow-up call',
    date: 'Oct 15',
    phone: '+1 (212) 554-8820',
    email: 'j.liao@meridian.com',
    phones: ['+1 (212) 554-8820', '+1 (917) 555-2614'],
    emails: ['j.liao@meridian.com', 'james.liao@meridian.com', 'finance@meridian.com'],
    birthDate: '04/18/1981',
    statements: [
      { month: 'Sep', deposits: 246000, balance: 28700 },
      { month: 'Aug', deposits: 231000, balance: 22400 }
    ],
    address: { street: '1271 Avenue of the Americas', city: 'New York', state: 'NY', zip: '10020' },
    notes: 'Board meeting on Thursday. Reviewed option B payment terms.'
  },
  {
    id: 3,
    initials: 'PT',
    name: 'Priya Tandon',
    company: 'Nova Logistics',
    title: 'CTO',
    stage: 'qualified',
    value: 120000,
    score: 69,
    priority: 'medium',
    owner: 'MW',
    action: 'Product demo',
    date: 'Oct 22',
    phone: '+1 (312) 779-2241',
    email: 'p.tandon@novalog.io',
    phones: ['+1 (312) 779-2241', '+1 (773) 555-9042'],
    emails: ['p.tandon@novalog.io', 'priya@novalog.io'],
    birthDate: '07/09/1984',
    statements: [
      { month: 'Sep', deposits: 198000, balance: 19400 },
      { month: 'Aug', deposits: 176000, balance: 15800 }
    ],
    address: { street: '233 S Wacker Dr, Suite 4100', city: 'Chicago', state: 'IL', zip: '60606' },
    notes: 'Confirmed demo for Wednesday at 11 AM with two senior engineers.'
  },
  {
    id: 4,
    initials: 'BK',
    name: 'Ben Kowalski',
    company: 'Evergreen Tech',
    title: 'Dir. Procurement',
    stage: 'discovery',
    value: 95000,
    score: 55,
    priority: 'medium',
    owner: 'AR',
    action: 'Discovery call',
    date: 'Nov 5',
    phone: '+1 (503) 661-4490',
    email: 'b.kowalski@evg.tech',
    phones: ['+1 (503) 661-4490', '+1 (971) 555-1188'],
    emails: ['b.kowalski@evg.tech', 'ben@evg.tech'],
    birthDate: '02/14/1979',
    statements: [
      { month: 'Sep', deposits: 154000, balance: 12600 },
      { month: 'Aug', deposits: 149000, balance: 10900 }
    ],
    address: { street: '111 SW 5th Ave, Suite 2400', city: 'Portland', state: 'OR', zip: '97204' }
  },
  {
    id: 5,
    initials: 'MC',
    name: 'Mei Chen',
    company: 'Stellar Ops',
    title: 'Head of IT',
    stage: 'negotiation',
    value: 310000,
    score: 91,
    priority: 'high',
    owner: 'MW',
    action: 'Pricing review',
    date: 'Sep 25',
    phone: '+1 (408) 229-8832',
    email: 'm.chen@stellarops.com',
    phones: ['+1 (408) 229-8832', '+1 (669) 555-3471', '+1 (650) 555-6120'],
    emails: ['m.chen@stellarops.com', 'mei.chen@stellarops.com'],
    birthDate: '11/30/1982',
    statements: [
      { month: 'Sep', deposits: 402000, balance: 56800 },
      { month: 'Aug', deposits: 376000, balance: 49700 }
    ],
    address: { street: '225 W Santa Clara St', city: 'San Jose', state: 'CA', zip: '95113' },
    notes: 'Legal approved 3-year term. Needs volume discount schedule confirmation.'
  },
  {
    id: 6,
    initials: 'DR',
    name: 'David Ruiz',
    company: 'QuantumBridge',
    title: 'CEO',
    stage: 'prospecting',
    value: 450000,
    score: 62,
    priority: 'medium',
    owner: 'TK',
    action: 'Initial outreach',
    date: 'Nov 30',
    phone: '+1 (646) 337-1122',
    email: 'd.ruiz@qbridge.ai',
    phones: ['+1 (646) 337-1122', '+1 (332) 555-7304'],
    emails: ['d.ruiz@qbridge.ai', 'david@qbridge.ai'],
    birthDate: '06/05/1974',
    statements: [
      { month: 'Sep', deposits: 532000, balance: 81400 },
      { month: 'Aug', deposits: 498000, balance: 73900 }
    ],
    address: { street: '55 Hudson Yards, Floor 21', city: 'New York', state: 'NY', zip: '10001' }
  },
  {
    id: 7,
    initials: 'AH',
    name: 'Alicia Hayes',
    company: 'Pinnacle Health',
    title: 'VP Operations',
    stage: 'closed-won',
    value: 175000,
    score: 98,
    priority: 'low',
    owner: 'MW',
    action: 'Onboarding setup',
    date: 'Aug 15',
    phone: '+1 (617) 492-0033',
    email: 'a.hayes@pinnaclehlth.com',
    phones: ['+1 (617) 492-0033', '+1 (857) 555-4409'],
    emails: ['a.hayes@pinnaclehlth.com', 'alicia.hayes@pinnaclehlth.com'],
    birthDate: '09/12/1980',
    statements: [
      { month: 'Sep', deposits: 264000, balance: 33400 },
      { month: 'Aug', deposits: 251000, balance: 29800 }
    ],
    address: { street: '200 Clarendon St, Suite 3200', city: 'Boston', state: 'MA', zip: '02116' }
  },
  {
    id: 8,
    initials: 'TP',
    name: 'Thomas Patel',
    company: 'SyncWave',
    title: 'COO',
    stage: 'proposal',
    value: 205000,
    score: 77,
    priority: 'high',
    owner: 'AR',
    action: 'Proposal review',
    date: 'Oct 10',
    phone: '+1 (214) 883-5560',
    email: 't.patel@syncwave.io',
    phones: ['+1 (214) 883-5560', '+1 (469) 555-2086'],
    emails: ['t.patel@syncwave.io', 'thomas@syncwave.io'],
    birthDate: '01/27/1978',
    statements: [
      { month: 'Sep', deposits: 289000, balance: 38700 },
      { month: 'Aug', deposits: 272000, balance: 35200 }
    ],
    address: { street: '2100 Ross Ave, Suite 1700', city: 'Dallas', state: 'TX', zip: '75201' }
  },
  {
    id: 9,
    initials: 'LF',
    name: 'Laura Fischer',
    company: 'Orbis Analytics',
    title: 'Dir. Data Science',
    stage: 'discovery',
    value: 88000,
    score: 48,
    priority: 'low',
    owner: 'TK',
    action: 'Needs assessment',
    date: 'Nov 18',
    phone: '+1 (720) 441-9987',
    email: 'l.fischer@orbis.co',
    phones: ['+1 (720) 441-9987', '+1 (303) 555-6412'],
    emails: ['l.fischer@orbis.co', 'laura@orbis.co'],
    birthDate: '03/21/1986',
    statements: [
      { month: 'Sep', deposits: 133000, balance: 9800 },
      { month: 'Aug', deposits: 127000, balance: 8500 }
    ],
    address: { street: '1700 Lincoln St, Suite 2200', city: 'Denver', state: 'CO', zip: '80203' }
  },
  {
    id: 10,
    initials: 'NK',
    name: 'Nathan Kim',
    company: 'Vertex Systems',
    title: 'IT Director',
    stage: 'qualified',
    value: 142000,
    score: 72,
    priority: 'medium',
    owner: 'MW',
    action: 'Technical review',
    date: 'Oct 28',
    phone: '+1 (415) 667-3345',
    email: 'n.kim@vertexsys.com',
    phones: ['+1 (415) 667-3345', '+1 (628) 555-3097'],
    emails: ['n.kim@vertexsys.com', 'nathan.kim@vertexsys.com'],
    birthDate: '12/08/1983',
    statements: [
      { month: 'Sep', deposits: 221000, balance: 26100 },
      { month: 'Aug', deposits: 208000, balance: 24300 }
    ],
    address: { street: '101 California St, Suite 3100', city: 'San Francisco', state: 'CA', zip: '94111' }
  },
  {
    id: 11,
    initials: 'OB',
    name: 'Olivia Brooks',
    company: 'ClearPath Fin.',
    title: 'VP Finance',
    stage: 'closed-lost',
    value: 98000,
    score: 22,
    priority: 'low',
    owner: 'AR',
    action: 'Re-engage Q1',
    date: '—',
    phone: '+1 (312) 558-7712',
    email: 'o.brooks@clearpath.com',
    phones: ['+1 (312) 558-7712', '+1 (872) 555-7740'],
    emails: ['o.brooks@clearpath.com', 'olivia.brooks@clearpath.com'],
    birthDate: '08/16/1977',
    statements: [
      { month: 'Sep', deposits: 162000, balance: 14700 },
      { month: 'Aug', deposits: 158000, balance: 13100 }
    ],
    address: { street: '1 N Dearborn St, Suite 1500', city: 'Chicago', state: 'IL', zip: '60602' }
  },
  {
    id: 12,
    initials: 'RG',
    name: 'Rafael Gomez',
    company: 'Horizon Cloud',
    title: 'CISO',
    stage: 'negotiation',
    value: 330000,
    score: 85,
    priority: 'high',
    owner: 'TK',
    action: 'Security review',
    date: 'Sep 28',
    phone: '+1 (512) 882-4100',
    email: 'r.gomez@horizoncloud.io',
    phones: ['+1 (512) 882-4100', '+1 (737) 555-9055'],
    emails: ['r.gomez@horizoncloud.io', 'rafael@horizoncloud.io'],
    birthDate: '05/02/1975',
    statements: [
      { month: 'Sep', deposits: 421000, balance: 62400 },
      { month: 'Aug', deposits: 397000, balance: 58100 }
    ],
    address: { street: '600 Congress Ave, Suite 1900', city: 'Austin', state: 'TX', zip: '78701' },
    notes: 'SOC2 Type II received. Reviewing pen test report with infosec team.'
  }
];

export const INITIAL_PHONES: ConnectedPhone[] = [
  { id: 'phone-1', name: 'Phone 1', number: '6465550148', connected: true, platform: 'ios' },
  { id: 'phone-2', name: 'Phone 2', number: '2125550186', connected: true, platform: 'android' },
  { id: 'phone-3', name: 'Phone 3', number: '9175550124', connected: false, platform: 'ios' }
];

export const INITIAL_CALLS: CallLog[] = [
  { id: 'c1', number: '6695553471', leadId: 5, dir: 'missed', at: Date.now() - 8 * 60000, seconds: 0, phone: 'Phone 1', seen: false },
  { id: 'c2', number: '7865550142', leadId: null, dir: 'missed', at: Date.now() - 120 * 60000, seconds: 0, phone: 'Phone 1', seen: false },
  { id: 'c3', number: '2125548820', leadId: 2, dir: 'out', at: Date.now() - 180 * 60000, seconds: 1320, phone: 'Phone 1', seen: true },
  { id: 'c4', number: '7735559042', leadId: 3, dir: 'out', at: Date.now() - 210 * 60000, seconds: 0, phone: 'Phone 2', seen: true },
  { id: 'c5', number: '5128824100', leadId: 12, dir: 'out', at: Date.now() - 240 * 60000, seconds: 2100, phone: 'Phone 1', seen: true },
  { id: 'c6', number: '4156673345', leadId: 10, dir: 'in', at: Date.now() - 300 * 60000, seconds: 1620, phone: 'Phone 2', seen: true },
  { id: 'c7', number: '4153097723', leadId: 1, dir: 'in', at: Date.now() - 86400000, seconds: 402, phone: 'Phone 1', seen: true }
];

export const INITIAL_MESSAGES: MessageItem[] = [
  { id: 'm1', channel: 'text', number: '4153097723', leadId: 1, dir: 'out', text: 'Hi Sandra, sending the Zoom link for today’s demo.', at: Date.now() - 310 * 60000, phone: 'Phone 1', service: 'imessage', read: true, status: 'delivered' },
  { id: 'm2', channel: 'text', number: '4153097723', leadId: 1, dir: 'in', text: 'Perfect, thanks! Can we cover SSO too?', at: Date.now() - 296 * 60000, phone: 'Phone 1', service: 'imessage', read: true, status: '' },
  { id: 'm3', channel: 'text', number: '4153097723', leadId: 1, dir: 'out', text: 'Absolutely — I’ll add it to the agenda.', at: Date.now() - 290 * 60000, phone: 'Phone 1', service: 'imessage', read: true, status: 'read', readAt: Date.now() - 288 * 60000 },
  { id: 'm4', channel: 'text', number: '9175552614', leadId: 2, dir: 'out', text: 'Hi James, the proposal with both payment options is in your inbox.', at: Date.now() - 3000 * 60000, phone: 'Phone 1', service: 'imessage', read: true, status: 'delivered' },
  { id: 'm5', channel: 'text', number: '9175552614', leadId: 2, dir: 'in', text: 'Got it. Reviewing it with the board this week.', at: Date.now() - 2950 * 60000, phone: 'Phone 1', service: 'imessage', read: true, status: '' },
  { id: 'm6', channel: 'text', number: '9175552614', leadId: 2, dir: 'in', text: 'Can we move our call to 3:00 PM on Monday?', at: Date.now() - 22 * 60000, phone: 'Phone 1', service: 'imessage', read: false, status: '' },
  { id: 'm7', channel: 'text', number: '6695553471', leadId: 5, dir: 'in', text: 'Legal is fine with the 3-year term.', at: Date.now() - 1400 * 60000, phone: 'Phone 2', service: 'sms', read: true, status: '' },
  { id: 'm8', channel: 'text', number: '6695553471', leadId: 5, dir: 'out', text: 'Great news! I’ll send the final paperwork today.', at: Date.now() - 1380 * 60000, phone: 'Phone 2', service: 'sms', read: true, status: 'delivered' },
  { id: 'm9', channel: 'wa', number: '6695553471', leadId: 5, dir: 'in', text: 'Can you send the volume pricing table here?', at: Date.now() - 200 * 60000, phone: 'Phone 2', service: 'wa', read: true, status: '' },
  { id: 'm10', channel: 'wa', number: '6695553471', leadId: 5, dir: 'out', text: 'Sure — sending it over in a few minutes.', at: Date.now() - 190 * 60000, phone: 'Phone 2', service: 'wa', read: true, status: 'read', readAt: Date.now() - 186 * 60000 },
  { id: 'm11', channel: 'wa', number: '7375559055', leadId: 12, dir: 'out', text: 'Hi Rafael, do you have a contact for the pen test?', at: Date.now() - 300 * 60000, phone: 'Phone 1', service: 'wa', read: true, status: 'delivered' },
  { id: 'm12', channel: 'wa', number: '7375559055', leadId: 12, dir: 'in', text: 'Sent the pen test request to our team. We should have it by Friday.', at: Date.now() - 41 * 60000, phone: 'Phone 1', service: 'wa', read: false, status: '' },
  { id: 'm13', channel: 'text', number: '6285553097', leadId: 10, dir: 'in', text: 'Integration test passed on our side.', at: Date.now() - 330 * 60000, phone: 'Phone 1', service: 'imessage', read: false, status: '' }
];

export const INITIAL_EMAIL_THREADS: EmailThread[] = [
  {
    id: 't-mei-quote',
    account: 'marcus.webb@crm.mail',
    folder: 'inbox',
    starred: true,
    important: true,
    msgs: [
      {
        id: 'em-1',
        from: { name: 'Marcus Webb', email: 'marcus.webb@crm.mail' },
        to: ['m.chen@stellarops.com'],
        subject: 'Revised quote — 3-year option',
        body: 'Attached is the revised quote with the 3-year option we discussed.',
        at: Date.now() - 2200 * 60000,
        out: true,
        read: true,
        tracked: true,
        opens: [Date.now() - 9 * 60000, Date.now() - 35 * 60000, Date.now() - 400 * 60000]
      },
      {
        id: 'em-2',
        from: { name: 'Mei Chen', email: 'm.chen@stellarops.com' },
        to: ['marcus.webb@crm.mail'],
        subject: 'Re: Revised quote — 3-year option',
        body: 'Hi Marcus,\n\nLegal signed off on the 3-year term. Can you confirm the volume discount is included?\n\nMei',
        at: Date.now() - 70 * 60000,
        out: false,
        read: false
      }
    ]
  },
  {
    id: 't-priya-demo',
    account: 'marcus.webb@crm.mail',
    folder: 'inbox',
    starred: false,
    important: false,
    msgs: [
      {
        id: 'em-3',
        from: { name: 'Marcus Webb', email: 'marcus.webb@crm.mail' },
        to: ['p.tandon@novalog.io'],
        subject: 'Product demo',
        body: 'Would Wednesday at 11 AM work for the product demo with your engineering team?',
        at: Date.now() - 400 * 60000,
        out: true,
        read: true,
        tracked: true,
        opens: [Date.now() - 300 * 60000]
      },
      {
        id: 'em-4',
        from: { name: 'Priya Tandon', email: 'p.tandon@novalog.io' },
        to: ['marcus.webb@crm.mail'],
        subject: 'Re: Product demo',
        body: 'Hi Marcus,\n\nWednesday at 11 works. I will bring two engineers.\n\nThanks,\nPriya',
        at: Date.now() - 95 * 60000,
        out: false,
        read: false
      }
    ]
  },
  {
    id: 't-thomas-timeline',
    account: 'marcus.webb@crm.mail',
    folder: 'inbox',
    starred: false,
    important: false,
    msgs: [
      {
        id: 'em-5',
        from: { name: 'Thomas Patel', email: 't.patel@syncwave.io' },
        to: ['marcus.webb@crm.mail'],
        subject: 'Implementation timeline',
        body: 'Could you share a rough implementation timeline for 200 seats?\n\nThomas',
        at: Date.now() - 130 * 60000,
        out: false,
        read: true
      }
    ]
  },
  {
    id: 't-james-payment',
    account: 'marcus.webb@crm.mail',
    folder: 'inbox',
    starred: false,
    important: false,
    msgs: [
      {
        id: 'em-6',
        from: { name: 'James Liao', email: 'j.liao@meridian.com' },
        to: ['marcus.webb@crm.mail'],
        subject: 'Payment options',
        body: 'Marcus,\n\nOne question on option B — is the first payment due at signing?\n\nJames',
        at: Date.now() - 1500 * 60000,
        out: false,
        read: true
      }
    ]
  },
  {
    id: 't-sandra-demo',
    account: 'marcus.webb@crm.mail',
    folder: 'sent',
    starred: false,
    important: false,
    msgs: [
      {
        id: 'em-7',
        from: { name: 'Marcus Webb', email: 'marcus.webb@crm.mail' },
        to: ['s.reeves@apexdyn.com'],
        subject: 'Demo invite — enterprise tier',
        body: 'Here is the Zoom link for today’s enterprise tier demo at 4:00 PM.',
        at: Date.now() - 300 * 60000,
        out: true,
        read: true,
        tracked: true,
        opens: [Date.now() - 20 * 60000, Date.now() - 140 * 60000, Date.now() - 290 * 60000]
      }
    ]
  }
];

export const INITIAL_TEAM_CHANNELS: TeamChannel[] = [
  { id: 'sales-floor', name: 'sales-floor', type: 'channel', description: 'Real-time deal momentum and pipeline updates', unread: 2, members: ['mw', 'sl', 'mo', 'sk'] },
  { id: 'deal-desk', name: 'deal-desk', type: 'channel', description: 'Underwriting approvals and pricing reviews', unread: 0, members: ['mw', 'sl', 'mo'] },
  { id: 'wins', name: 'wins', type: 'channel', description: 'Closed deals and milestones', unread: 1, members: ['mw', 'sl', 'mo', 'sk', 'ar'] },
  { id: 'sarah-lane', name: 'Sarah Lane', type: 'dm', unread: 0, members: ['mw', 'sl'] },
  { id: 'mike-ortiz', name: 'Mike Ortiz', type: 'dm', unread: 0, members: ['mw', 'mo'] }
];

export const INITIAL_TEAM_MESSAGES: TeamMessage[] = [
  { id: 'tm-1', authorId: 'sl', authorName: 'Sarah Lane', authorRole: 'AE', at: Date.now() - 58 * 60000, text: 'Northstar moved to verbal approval. Added statement audit notes to the deal.', reactions: [{ emoji: '🔥', count: 3, userReacted: true }], pinned: true },
  { id: 'tm-2', authorId: 'mo', authorName: 'Mike Ortiz', authorRole: 'AE', at: Date.now() - 41 * 60000, text: 'Nice! I can cover the 2 PM Zoom follow-up if anyone needs a handoff.', reactions: [{ emoji: '👍', count: 2, userReacted: false }] },
  { id: 'tm-3', authorId: 'mw', authorName: 'Marcus Webb', authorRole: 'Senior AE', at: Date.now() - 14 * 60000, text: 'Solid work team. Keep hot Q4 renewals in this channel today.', replyToId: 'tm-1' }
];

export const INITIAL_ACTIVITY_LOGS: ActivityEvent[] = [
  { id: 'act-1', at: Date.now() - 9 * 60000, rep: 'Marcus Webb', sender: 'Marcus Webb', recipient: 'm.chen@stellarops.com', lead: 'Mei Chen', company: 'Stellar Ops', subject: 'Revised quote — 3-year option', activity: 'Email opened', channel: 'email', status: 'Opened', source: 'Tracking' },
  { id: 'act-2', at: Date.now() - 20 * 60000, rep: 'Marcus Webb', sender: 'Marcus Webb', recipient: 's.reeves@apexdyn.com', lead: 'Sandra Reeves', company: 'Apex Dynamics', subject: 'Demo invite — enterprise tier', activity: 'Email opened', channel: 'email', status: 'Opened', source: 'Tracking' },
  { id: 'act-3', at: Date.now() - 70 * 60000, rep: 'Marcus Webb', sender: 'm.chen@stellarops.com', recipient: 'marcus.webb@crm.mail', lead: 'Mei Chen', company: 'Stellar Ops', subject: 'Re: Revised quote — 3-year option', activity: 'Email received', channel: 'email', status: 'Delivered', source: 'Email' },
  { id: 'act-4', at: Date.now() - 95 * 60000, rep: 'Marcus Webb', sender: 'p.tandon@novalog.io', recipient: 'marcus.webb@crm.mail', lead: 'Priya Tandon', company: 'Nova Logistics', subject: 'Re: Product demo', activity: 'Email received', channel: 'email', status: 'Delivered', source: 'Email' },
  { id: 'act-5', at: Date.now() - 180 * 60000, rep: 'Marcus Webb', sender: 'Phone 1', recipient: '+1 (212) 554-8820', lead: 'James Liao', company: 'Meridian Capital', subject: 'Outgoing VoIP call · 22:00', activity: 'Call connected', channel: 'call', status: 'Completed', source: 'VoIP' },
  { id: 'act-6', at: Date.now() - 300 * 60000, rep: 'Marcus Webb', sender: 'Marcus Webb', recipient: 's.reeves@apexdyn.com', lead: 'Sandra Reeves', company: 'Apex Dynamics', subject: 'Demo invite — enterprise tier', activity: 'Email sent', channel: 'email', status: 'Sent', source: 'Email' }
];
