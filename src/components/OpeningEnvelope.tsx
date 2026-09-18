import React from 'react';
import { MailOpen, Sparkles, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { InvitationData } from '../types';

interface OpeningEnvelopeProps {
  isOpen: boolean;
  guestName: string;
  data: InvitationData;
  onOpen: () => void;
}

export const triggerWelcomeConfetti = () => {
  if (typeof window === 'undefined') return;

  // Respect users with prefers-reduced-motion
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  // Kadio Arctic Rose celebration confetti palette
  const palette = ['#BA5D72', '#E0A899', '#D4AF37', '#FAF7F8', '#8B3A4C', '#F3CBD3'];

  // Initial center burst
  confetti({
    particleCount: 50,
    spread: 60,
    origin: { y: 0.62 },
    colors: palette,
    zIndex: 9999,
    disableForReducedMotion: true,
  });

  // Left side upward flare
  setTimeout(() => {
    confetti({
      particleCount: 35,
      angle: 60,
      spread: 55,
      origin: { x: 0.05, y: 0.7 },
      colors: palette,
      zIndex: 9999,
      disableForReducedMotion: true,
    });
  }, 220);

  // Right side upward flare
  setTimeout(() => {
    confetti({
      particleCount: 35,
      angle: 120,
      spread: 55,
      origin: { x: 0.95, y: 0.7 },
      colors: palette,
      zIndex: 9999,
      disableForReducedMotion: true,
    });
  }, 380);

  // Soft slow-falling golden stars & flakes
  setTimeout(() => {
    confetti({
      particleCount: 30,
      spread: 90,
      origin: { y: 0.25 },
      startVelocity: 15,
      gravity: 0.65,
      ticks: 200,
      colors: ['#BA5D72', '#D4AF37', '#E0A899', '#F8EFF1'],
      zIndex: 9999,
      disableForReducedMotion: true,
    });
  }, 650);
};

export const OpeningEnvelope: React.FC<OpeningEnvelopeProps> = ({
  isOpen,
  guestName,
  data,
  onOpen,
}) => {
  const handleOpenClick = () => {
    triggerWelcomeConfetti();
    onOpen();
  };

  const coverPhoto = data.coverPhotoUrl || data.photoUrl;
  const coverBg = data.coverBackgroundUrl;
  const coverBgOpacity = typeof data.coverBackgroundOpacity === 'number' ? data.coverBackgroundOpacity : 0.22;

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          id="cover"
          initial={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: '-100%', transition: { duration: 0.75, ease: [0.32, 0.72, 0, 1] } }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#FAF7F8]/95 backdrop-blur-md px-4 py-6 overflow-y-auto"
        >
          <div className="relative w-full max-w-md bg-white border border-[#EACFD5] rounded-[40px] p-7 sm:p-9 shadow-2xl shadow-rose-950/15 text-center text-[#332A2E] overflow-hidden">
            {/* Background Sampul Awal with customizable opacity */}
            {coverBg ? (
              <>
                <div
                  className="absolute inset-0 bg-cover bg-center pointer-events-none transition-opacity duration-300 z-0"
                  style={{
                    backgroundImage: `url(${coverBg})`,
                    opacity: coverBgOpacity,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/40 to-white/80 pointer-events-none z-0" />
              </>
            ) : null}

            {/* Arctic Rose subtle organic ambient glow */}
            <div className="absolute -top-20 -left-20 w-60 h-60 bg-[#F7D8DE]/45 rounded-full blur-3xl pointer-events-none z-0" />
            <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-[#F5ECEB]/80 rounded-full blur-3xl pointer-events-none z-0" />

            <div className="relative z-10 flex flex-col items-center">
              {/* Header Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FDF2F4] border border-[#F3CBD3] text-[#8B3A4C] text-[11px] font-sans font-bold tracking-[0.25em] uppercase mb-5 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#BA5D72]" />
                <span>Walimatul Khitan</span>
                <Sparkles className="w-3.5 h-3.5 text-[#BA5D72]" />
              </div>

              {/* Kadio Arched Photo Frame (Kubah Lengkung) */}
              <div className="relative mb-5">
                <div className="w-32 h-44 sm:w-36 sm:h-48 arch-frame p-1.5 bg-gradient-to-b from-[#F3CBD3] via-[#FAF7F8] to-[#EACFD5] shadow-xl shadow-rose-950/10 border border-[#E0A899]/50 relative">
                  <div className="w-full h-full arch-frame overflow-hidden bg-rose-50/50 relative">
                    {coverPhoto ? (
                      <img
                        src={coverPhoto}
                        alt={data.childFullName}
                        className="w-full h-full object-cover select-none"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[#BA5D72]">
                        <Sparkles className="w-8 h-8" />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Title & Child Name */}
              <p className="text-[#8C757B] text-xs font-sans uppercase tracking-[0.25em] mb-1">
                Tasyakuran & Syukuran
              </p>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#8B3A4C] mb-1 leading-tight tracking-tight">
                {data.childNickName}
              </h1>
              <p className="text-[#6C5E64] text-xs font-sans mb-5">
                {data.childFullName}
              </p>

              {/* Decorative divider with delicate rose diamond */}
              <div className="flex items-center gap-3 w-40 mb-5 opacity-75">
                <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#BA5D72]" />
                <div className="w-1.5 h-1.5 rotate-45 bg-[#8B3A4C]" />
                <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#BA5D72]" />
              </div>

              {/* Kadio Guest Greeting Box */}
              <div className="w-full bg-[#FDF7F8] border border-[#F0D5DA] rounded-3xl p-4 mb-6 shadow-xs">
                <p className="text-[11px] text-[#7D686E] font-medium mb-1">
                  Kepada Yth. Bapak/Ibu/Saudara/i:
                </p>
                <p className="text-base sm:text-lg font-serif font-bold text-[#8B3A4C] capitalize">
                  {guestName || "Tamu Undangan"}
                </p>
                <p className="text-[11px] text-[#9E878E] mt-0.5">
                  di Tempat
                </p>
                <p className="text-[10px] text-[#B59DA4] mt-1.5 italic font-sans">
                  *Mohon maaf bila ada kesalahan penulisan nama/gelar
                </p>
              </div>

              {/* Open Button with Kadio signature styling */}
              <button
                id="btn-buka-undangan"
                onClick={handleOpenClick}
                className="group relative inline-flex items-center justify-center gap-3 w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-[#8B3A4C] via-[#9E4559] to-[#8B3A4C] hover:opacity-95 text-white font-sans text-xs uppercase tracking-[0.2em] font-bold shadow-lg shadow-rose-900/25 transform active:scale-[0.98] transition duration-200 cursor-pointer border border-rose-300/30"
              >
                <MailOpen className="w-4 h-4 transition-transform group-hover:scale-110" />
                <span>Buka Undangan</span>
              </button>

              <p className="text-[11px] text-[#8C757B] mt-3.5 font-sans">
                Sentuh tombol untuk membuka & memutar lantunan musik
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
