import React from 'react';
import { motion } from 'motion/react';

export const HeroSection: React.FC = () => {
  return (
    <section id="hero-section" className="relative pt-12 pb-16 px-4 text-center overflow-hidden">
      {/* Subtle arctic rose ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-64 bg-[#F7D8DE]/30 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-xl mx-auto relative z-10"
      >
        {/* Arabic Calligraphy Basmalah */}
        <p className="font-arabic text-2xl sm:text-3xl text-[#8B3A4C] mb-4 leading-loose tracking-wide font-medium">
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </p>

        <div className="inline-block px-3 py-1 rounded-full bg-[#FDF2F4] border border-[#F3CBD3] text-[10px] font-sans uppercase tracking-[0.25em] font-bold text-[#8B3A4C] mb-3">
          Walimatul Khitan
        </div>

        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#332A2E] mb-3 leading-snug">
          Assalamu’alaikum Warahmatullahi Wabarakatuh
        </h2>

        <p className="text-[#6C5E64] text-sm sm:text-base leading-relaxed mb-6 font-normal">
          Dengan memohon rahmat dan ridho Allah Subhanahu Wa Ta&apos;ala, kami bermaksud
          menyelenggarakan syukuran Walimatul Khitan putra kami tercinta.
        </p>

        {/* Hadith / Quote Box in Kadio Arctic Rose Style */}
        <div className="bg-white border border-[#EACFD5] rounded-3xl p-6 text-left text-xs sm:text-sm text-[#4A3F44] leading-relaxed shadow-xs relative overflow-hidden">
          <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-gradient-to-b from-[#BA5D72] to-[#8B3A4C]" />
          <p className="font-arabic text-base sm:text-lg text-[#8B3A4C] text-right mb-2 leading-relaxed font-semibold">
            «الْفِطْرَةُ خَمْسٌ: الْخِتَانُ، وَالاسْتِحْدَادُ، وَقَصُّ الشَّارِبِ، وَتَقْلِيمُ الأَظْفَارِ، وَنَتْفُ الآبَاطِ»
          </p>
          <p className="italic text-[#6C5E64] text-[12px] sm:text-xs leading-relaxed">
            &ldquo;Fitrah itu ada lima: Khitan, mencukur bulu kemaluan, memotong kumis, memotong kuku, dan mencabut bulu ketiak.&rdquo;
          </p>
          <p className="text-[11px] font-sans font-bold uppercase tracking-wider text-[#8B3A4C] mt-2">
            — H.R. Bukhari & Muslim
          </p>
        </div>
      </motion.div>
    </section>
  );
};
