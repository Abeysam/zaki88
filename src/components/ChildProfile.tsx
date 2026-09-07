import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Star } from 'lucide-react';
import { InvitationData } from '../types';

interface ChildProfileProps {
  data: InvitationData;
}

export const ChildProfile: React.FC<ChildProfileProps> = ({ data }) => {
  return (
    <section id="profil-khitan" className="py-14 px-4 bg-[#E2E2D5]/35 backdrop-blur-xs border-y border-[#5A5A40]/15">
      <div className="max-w-xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/70 border border-[#5A5A40]/20 text-[#5A5A40] text-[11px] font-sans font-bold uppercase tracking-[0.2em] mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[#5A5A40]" />
            <span>Ananda yang Dikhitan</span>
          </div>

          {/* Child Photo with natural tones ring */}
          <div className="relative mb-6">
            <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full p-1.5 bg-gradient-to-tr from-[#5A5A40] via-[#E2E2D5] to-[#8C8C70] shadow-xl shadow-black/10">
              <img
                src={data.photoUrl}
                alt={data.childFullName}
                className="w-full h-full object-cover rounded-full border-2 border-white"
              />
            </div>
            <div className="absolute top-0 right-0 bg-white p-2 rounded-full shadow-md text-[#5A5A40] border border-[#5A5A40]/20">
              <Star className="w-4 h-4 fill-current" />
            </div>
          </div>

          {/* Names */}
          <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#343627] mb-1">
            {data.childFullName}
          </h3>
          <p className="text-[#5A5A40] font-serif italic text-lg sm:text-xl mb-3">
            ( {data.childNickName} )
          </p>

          <p className="text-xs font-sans uppercase tracking-[0.2em] text-[#5A5A40]/75 mb-4">
            {data.childOrder} dari pasangan:
          </p>

          {/* Parents Name Box */}
          <div className="w-full max-w-sm bg-white/80 border border-[#5A5A40]/20 rounded-3xl p-5 shadow-xs">
            <p className="font-serif font-bold text-[#343627] text-base sm:text-lg">
              {data.fatherName}
            </p>
            <p className="text-xs font-sans text-[#5A5A40]/70 uppercase tracking-widest my-1.5">&</p>
            <p className="font-serif font-bold text-[#343627] text-base sm:text-lg">
              {data.motherName}
            </p>
          </div>

          {/* Prayer for the child */}
          <p className="font-serif italic text-[#5A5A40]/90 text-sm sm:text-base max-w-md mt-6 leading-relaxed">
            &ldquo;Semoga ananda tumbuh menjadi putra yang sholeh, senantiasa taat beribadah, cerdas, berbakti kepada kedua orang tua, serta membawa keberkahan bagi umat, nusa, dan bangsa.&rdquo;
          </p>
        </motion.div>
      </div>
    </section>
  );
};
