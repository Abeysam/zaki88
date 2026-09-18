import React from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles } from 'lucide-react';
import { InvitationData } from '../types';

interface FooterSectionProps {
  data: InvitationData;
  onReopenEnvelope: () => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({
  data,
  onReopenEnvelope,
}) => {
  return (
    <footer className="pt-14 pb-28 px-4 bg-[#3C1822] text-[#F3D5DC] text-center relative overflow-hidden">
      <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-96 h-64 bg-[#BA5D72]/20 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-xl mx-auto relative z-10"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#522430] border border-[#7D384A] text-[#F9DEE4] text-[11px] font-sans font-bold uppercase tracking-[0.2em] mb-6">
          <Sparkles className="w-3.5 h-3.5 text-[#E0A899]" />
          <span>Ucapan Terima Kasih</span>
        </div>

        <p className="text-xs sm:text-sm text-[#E5BFC8] leading-relaxed mb-6 max-w-md mx-auto">
          Merupakan suatu kehormatan dan kebahagiaan bagi kami sekeluarga apabila
          Bapak/Ibu/Saudara/i berkenan hadir serta memberikan doa restu kepada putra kami.
        </p>

        <p className="font-arabic text-2xl sm:text-3xl text-[#FFF2F5] mb-2 font-medium">
          جَزَاكُمُ اللهُ خَيْرًا كَثِيْرًا
        </p>
        <p className="text-xs text-[#D8A8B4] italic mb-6">
          (Jazakumullahu Khairan Katsiran)
        </p>

        <div className="border-t border-[#6E3040] pt-6 mt-6">
          <p className="text-xs font-sans text-[#CFA2AD] uppercase tracking-wider mb-1.5">Keluarga Besar yang berbahagia:</p>
          <p className="font-serif font-bold text-[#FFF2F5] text-lg sm:text-xl">
            {data.fatherName} & {data.motherName}
          </p>
          <p className="text-xs text-[#E5BFC8] mt-1 font-serif italic">
            Beserta Seluruh Keluarga Besar
          </p>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2">
          <button
            onClick={onReopenEnvelope}
            className="text-xs font-sans text-[#E5BFC8] hover:text-white underline underline-offset-4 transition cursor-pointer"
          >
            Lihat Kembali Sampul Depan Undangan
          </button>
        </div>

        <p className="text-[11px] text-[#A6717D] mt-6 flex items-center justify-center gap-1 font-sans">
          <span>Dibuat dengan</span>
          <Heart className="w-3 h-3 text-[#E07A92] fill-current" />
          <span>untuk Walimatul Khitan {data.childNickName}</span>
        </p>
      </motion.div>
    </footer>
  );
};
