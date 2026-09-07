// Hybrid music player supporting MP3 audio URLs, data URLs, and Web Audio API synthesizer
class AmbientMusicPlayer {
  private audioElement: HTMLAudioElement | null = null;
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private timer: number | null = null;
  private currentUrl: string = '';

  private notes = [
    261.63, // C4
    293.66, // D4
    329.63, // E4
    392.00, // G4
    440.00, // A4
    523.25, // C5
    587.33, // D5
    659.25  // E5
  ];

  public setSource(url: string) {
    this.currentUrl = url;
    if (this.audioElement) {
      const wasPlaying = this.isPlaying;
      this.audioElement.pause();
      this.audioElement.src = url;
      this.audioElement.load();
      if (wasPlaying && url) {
        this.audioElement.play().catch(() => {});
      }
    }
  }

  public start(url?: string) {
    if (url !== undefined) {
      this.currentUrl = url;
    }

    if (this.currentUrl && this.currentUrl.trim() !== '') {
      try {
        if (!this.audioElement) {
          this.audioElement = new Audio(this.currentUrl);
          this.audioElement.loop = true;
          this.audioElement.volume = 0.5;
        } else if (this.audioElement.src !== this.currentUrl) {
          this.audioElement.src = this.currentUrl;
          this.audioElement.load();
        }
        
        const playPromise = this.audioElement.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              this.isPlaying = true;
            })
            .catch(() => {
              // If blocked or invalid URL, fallback to synthesized note melody
              this.startSynthesizer();
            });
        }
        return;
      } catch {
        this.startSynthesizer();
        return;
      }
    }

    this.startSynthesizer();
  }

  private startSynthesizer() {
    if (this.isPlaying && this.timer) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!this.ctx) {
        this.ctx = new AudioCtx();
      } else if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      this.isPlaying = true;
      this.scheduleNextNote();
    } catch {
      console.warn("Web Audio API not supported or autoplay blocked");
    }
  }

  private playTone(freq: number, duration: number = 2.5) {
    if (!this.ctx || this.ctx.state === 'suspended') {
      this.ctx?.resume();
    }
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    // Warm, soft acoustic sound (combination of sine & triangle)
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

    gain.gain.setValueAtTime(0, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.08, this.ctx.currentTime + 0.3);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + duration);
  }

  private scheduleNextNote = () => {
    if (!this.isPlaying) return;
    const note = this.notes[Math.floor(Math.random() * this.notes.length)];
    this.playTone(note, 2.8);

    // Organic peaceful cadence
    const nextInterval = 1200 + Math.random() * 1200;
    this.timer = window.setTimeout(this.scheduleNextNote, nextInterval);
  };

  public stop() {
    this.isPlaying = false;
    if (this.audioElement) {
      this.audioElement.pause();
    }
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    if (this.ctx && this.ctx.state !== 'closed') {
      this.ctx.suspend?.();
    }
  }

  public toggle(url?: string): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start(url);
      return true;
    }
  }

  public getStatus() {
    return this.isPlaying;
  }
}

export const musicPlayer = new AmbientMusicPlayer();
