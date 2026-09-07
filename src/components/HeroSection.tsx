import React from 'react';
import { motion } from 'motion/react';

export const HeroSection: React.FC = () => {
  return (
    <section id="hero-section" className="relative pt-12 pb-16 px-4 text-center overflow-hidden">
      {/* Subtle natural glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-64 bg-[#5A5A40]/10 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-xl mx-auto"
      >
        {/* Arabic Calligraphy Basmalah */}
        <p className="font-arabic text-2xl sm:text-3xl text-[#5A5A40] mb-4 leading-loose tracking-wide font-medium">
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </p>

        <p className="text-xs font-sans uppercase tracking-[0.25em] font-bold text-[#5A5A40]/70 mb-2">
          Walimatul Khitan
        </p>

        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#343627] mb-3 leading-snug">
          Assalamu’alaikum Warahmatullahi Wabarakatuh
        </h2>

        <p className="text-[#5A5A40] text-sm sm:text-base leading-relaxed mb-6 font-normal">
          Dengan memohon rahmat dan ridho Allah Subhanahu Wa Ta&apos;ala, kami bermaksud
          menyelenggarakan syukuran Walimatul Khitan putra kami tercinta.
        </p>

        {/* Hadith / Meaning Box */}
        <div className="bg-[#E2E2D5]/60 border border-[#5A5A40]/20 rounded-3xl p-6 text-left text-xs sm:text-sm text-[#383A2A] leading-relaxed shadow-xs">
          <p className="font-arabic text-base sm:text-lg text-[#5A5A40] text-right mb-2 leading-relaxed font-semibold">
            «الْفِطْرَةُ خَمْسٌ: الْخِتَانُ، وَالاسْتِحْدَادُ، وَقَصُّ الشَّارِبِ، وَتَقْلِيمُ الأَظْفَارِ، وَنَتْفُ الآبَاطِ»
          </p>
          <p className="italic text-[#5A5A40]/90 text-[12px] sm:text-xs leading-relaxed">
            &ldquo;Fitrah itu ada lima: Khitan, mencukur bulu kemaluan, memotong kumis, memotong kuku, dan mencabut bulu ketiak.&rdquo;
          </p>
          <p className="text-[11px] font-sans font-bold uppercase tracking-wider text-[#5A5A40] mt-2">
            — H.R. Bukhari & Muslim
          </p>
        </div>
      </motion.div>
    </section>
  );
};
