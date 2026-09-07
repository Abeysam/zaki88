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

export const OpeningEnvelope: React.FC<OpeningEnvelopeProps> = ({
  isOpen,
  guestName,
  data,
  onOpen,
}) => {
  const handleOpenClick = () => {
    // Launch festive natural confetti
    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#5A5A40', '#8C8C70', '#E2E2D5', '#D4C5A9', '#707052']
    });
    onOpen();
  };

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          id="opening-envelope-overlay"
          initial={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: '-100%', transition: { duration: 0.7, ease: [0.32, 0.72, 0, 1] } }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#23241C]/90 backdrop-blur-md px-4 py-8 overflow-y-auto"
        >
          <div className="relative w-full max-w-md bg-[#2D2F24] border border-[#5A5A40]/40 rounded-[36px] p-8 sm:p-10 shadow-2xl text-center text-[#E2E2D5] overflow-hidden">
            {/* Natural organic glow */}
            <div className="absolute -top-24 -left-24 w-60 h-60 bg-[#5A5A40]/25 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-60 h-60 bg-[#E2E2D5]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center">
              {/* Header Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#393B2E] border border-[#5A5A40]/40 text-[#E2E2D5] text-[11px] font-sans font-bold tracking-[0.25em] uppercase mb-6">
                <Sparkles className="w-3.5 h-3.5 text-[#E2E2D5]" />
                <span>Walimatul Khitan</span>
                <Sparkles className="w-3.5 h-3.5 text-[#E2E2D5]" />
              </div>

              {/* Child Photo with natural tones ring */}
              <div className="relative mb-6">
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1 bg-gradient-to-tr from-[#5A5A40] via-[#E2E2D5] to-[#8C8C70] shadow-xl shadow-black/30">
                  <img
                    src={data.photoUrl}
                    alt={data.childFullName}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div className="absolute -bottom-2 -right-1 bg-[#5A5A40] text-white p-1.5 rounded-full shadow border border-[#E2E2D5]/30">
                  <Heart className="w-4 h-4 fill-current" />
                </div>
              </div>

              {/* Title & Child Name */}
              <p className="text-[#C4C4B2] text-xs font-sans uppercase tracking-[0.25em] mb-1">
                Tasyakuran & Syukuran
              </p>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#F5F5F0] mb-2 leading-tight">
                {data.childNickName}
              </h1>
              <p className="text-[#D0D0BE] text-sm font-light mb-6">
                {data.childFullName}
              </p>

              {/* Decorative divider */}
              <div className="flex items-center gap-3 w-44 mb-6 opacity-60">
                <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#E2E2D5]" />
                <div className="w-2 h-2 rotate-45 border border-[#E2E2D5]" />
                <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#E2E2D5]" />
              </div>

              {/* Guest Greeting Box */}
              <div className="w-full bg-[#383A2D]/80 border border-[#5A5A40]/30 rounded-2xl p-4 mb-8">
                <p className="text-xs text-[#B8B8A4] font-light mb-1">Kepada Yth. Bapak/Ibu/Saudara/i:</p>
                <p className="text-base sm:text-lg font-semibold text-[#F5F5F0] capitalize">
                  {guestName || "Tamu Undangan"}
                </p>
                <p className="text-[11px] text-[#A6A692] mt-1 italic">
                  *Mohon maaf bila ada kesalahan penulisan nama/gelar
                </p>
              </div>

              {/* Open Button */}
              <button
                id="btn-buka-undangan"
                onClick={handleOpenClick}
                className="group relative inline-flex items-center justify-center gap-3 w-full py-3.5 px-6 rounded-full bg-[#5A5A40] hover:bg-[#6A6A4E] text-[#F5F5F0] font-sans text-xs uppercase tracking-[0.2em] font-bold shadow-lg shadow-black/20 transform active:scale-[0.98] transition duration-200 cursor-pointer border border-[#E2E2D5]/20"
              >
                <MailOpen className="w-4 h-4 transition-transform group-hover:scale-110" />
                <span>Buka Undangan</span>
              </button>

              <p className="text-[11px] text-[#A6A692] mt-4">
                Sentuh tombol untuk membuka & memutar lantunan syahdu
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
