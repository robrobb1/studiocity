const DTMF_FREQS: Record<string, [number, number]> = {
  '1': [697, 1209], '2': [697, 1336], '3': [697, 1477],
  '4': [770, 1209], '5': [770, 1336], '6': [770, 1477],
  '7': [852, 1209], '8': [852, 1336], '9': [852, 1477],
  '*': [941, 1209], '0': [941, 1336], '#': [941, 1477]
};

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  if (!AudioCtxClass) return null;
  if (!audioCtx) audioCtx = new AudioCtxClass();
  if (audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

export function playDTMFTone(digit: string, volume = 0.5): void {
  const freqs = DTMF_FREQS[digit];
  if (!freqs) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const duration = 0.09;
  const gain = Math.max(0.001, Math.min(1, volume)) * 0.12;

  freqs.forEach((freq) => {
    const osc = ctx.createOscillator();
    const amp = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    amp.gain.setValueAtTime(0.0001, now);
    amp.gain.exponentialRampToValueAtTime(gain, now + 0.008);
    amp.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(amp);
    amp.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + duration + 0.01);
  });
}

export function playCallChime(type: 'call' | 'end' | 'tap' | 'message', volume = 0.5): void {
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;
  const gain = Math.max(0.001, Math.min(1, volume)) * 0.1;

  const osc = ctx.createOscillator();
  const amp = ctx.createGain();

  const freq = type === 'call' ? 760 : type === 'end' ? 380 : type === 'message' ? 880 : 540;
  const duration = type === 'call' ? 0.08 : type === 'end' ? 0.09 : 0.04;

  osc.type = 'sine';
  osc.frequency.setValueAtTime(freq, now);
  if (type === 'call') {
    osc.frequency.exponentialRampToValueAtTime(940, now + duration);
  }

  amp.gain.setValueAtTime(0.0001, now);
  amp.gain.exponentialRampToValueAtTime(gain, now + 0.006);
  amp.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  osc.connect(amp);
  amp.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + duration + 0.01);
}
