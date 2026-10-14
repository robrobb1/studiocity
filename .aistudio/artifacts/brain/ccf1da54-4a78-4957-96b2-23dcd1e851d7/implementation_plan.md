# NorthVector CRM — Executive Visual Redesign & Phase Plan

## User Directives & Refined Specifications
1. **Topbar Tone**: Refined **deep charcoal** (`#1E2235` / `#161926`), avoiding pitch-black. Softer elevation, crisp hairline border (`#2A3044`), luxurious matte finish.
2. **Simultaneous Search & Dialer**: Both the Global Search box and the in-line Dialer remain active and open simultaneously in the topbar.
3. **Byte-for-Byte iOS Style Visuals**: Authentic iOS telephony button styling—clean round dial digits, authentic iOS call green (`#34C759`) and decline red (`#FF3B30`), authentic iMessage blue/green bubbles, WhatsApp read receipts, and clean call cards.
4. **Default Rows = Single Line**: The Leads table defaults to clean single-line rows (`Apex Dynamics · Sandra Reeves`, `(415) 882-4401`, `$240,000`, `Sep: $318K · Aug: $287K`) with zero vertical cramming.
5. **Auto-Close Without 'X' Buttons**: Remove redundant 'X' / close buttons from Settings modal, dropdowns, and the Communications panel. Clicking outside (backdrop or outer workspace) automatically dismisses them cleanly.
6. **Repair All Broken Features & Threads**: Fix message thread navigation, call detail inspection, WhatsApp switching, and composer handlers.
7. **Harmonious Typographic Scale**: Unified font scale across all 7 workspaces, with 32″ Ultrawide support in Settings.

---

## Architecture & Phased Rollout

### Phase 1: Foundation, Types & State Management
* Establish types in `src/types/crm.ts` for Leads, Telephony, Messages, Email, Scanner, Campaign, Team Chat, and Activity Logs.
* Create Web Audio DTMF synthesizer in `src/sound/dtmf.ts`.
* Provide centralized CRM context in `src/context/CRMContext.tsx` with outside-click handling.

### Phase 2: Topbar & In-Line Dialer
* Deep charcoal topbar (`#1E2235`) with:
  * Brand wordmark.
  * Active Global Search input.
  * Byte-for-byte in-line iOS phone widget (number input, Call, End, dropdown keypad trigger).
  * Device selector (`Phone 1 · 0148`), digital clock, user badge (`MW`), and 1-click Comms drawer toggle.

### Phase 3: Full-Width Pipeline Grid (Single-Line Default)
* High-density full-width table with single-line rows by default.
* Monospace tabular figures for currency and phone numbers.
* Column resizing and sorting.

### Phase 4: Repaired Slide-Over Communications Drawer
* Smooth slide-in drawer without close 'X' buttons (auto-closes on outside click or Esc).
* Lead Intel (statements, financials, notes).
* Repaired message threads (iMessage/SMS) and WhatsApp views.
* Call logs (All/Missed) with instant dial.
* Compact quick email.

### Phase 5: Full Workspaces (Email, Scanner, Campaign, Team, Activity, Settings)
* Fullscreen Gmail-grade email client.
* Document Scanner with batch ingestion.
* Campaign Manager with templates and tokens.
* Team Chat (#sales-floor, deal-desk, wins, DMs, GIFs, files).
* Activity Log with filters and column resizing.
* Settings modal without 'X' button (32″ Ultrawide scale, density, sound).

### Phase 6: Verification
* Run `compile_applet` and test all views, event handlers, and responsive scaling.
