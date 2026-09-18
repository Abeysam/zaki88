import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Star } from 'lucide-react';
import { InvitationData } from '../types';

interface ChildProfileProps {
  data: InvitationData;
}

export const ChildProfile: React.FC<ChildProfileProps> = ({ data }) => {
  return (
    <section id="profil-khitan" className="py-16 px-4 bg-[#F8EFF1]/60 backdrop-blur-xs border-y border-[#EACFD5]/70">
      <div className="max-w-xl mx-auto text-center">
        <div className="flex flex-col items-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/90 border border-[#F3CBD3] text-[#8B3A4C] text-[11px] font-sans font-bold uppercase tracking-[0.2em] mb-7 shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#BA5D72]" />
            <span>Ananda yang Dikhitan</span>
          </motion.div>

          {/* Kadio Signature Arched Photo with Arctic Rose double border */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative mb-7"
          >
            <div
              className="w-36 h-52 sm:w-44 sm:h-60 arch-frame p-2 bg-gradient-to-b from-[#F3CBD3] via-white to-[#EACFD5] shadow-xl shadow-rose-950/10 border border-[#E0A899]/40 relative"
            >
              <div className="w-full h-full arch-frame overflow-hidden bg-rose-50/50 relative">
                {(data.coverPhotoUrl || data.photoUrl) ? (
                  <img
                    src={data.coverPhotoUrl || data.photoUrl}
                    alt={data.childFullName}
                    className="w-full h-full object-cover object-[50%_15%] select-none"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[#BA5D72]">
                    <Sparkles className="w-8 h-8" />
                  </div>
                )}
              </div>
            </div>

            <div className="absolute top-1 right-0 bg-white p-2 rounded-full shadow-md text-[#BA5D72] border border-[#F3CBD3] pointer-events-none">
              <Star className="w-4 h-4 fill-current text-[#D4AF37]" />
            </div>
          </motion.div>

          {/* Names */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#8B3A4C] mb-1">
              {data.childFullName}
            </h3>
            <p className="text-[#BA5D72] font-serif italic text-xl sm:text-2xl mb-3">
              ( {data.childNickName} )
            </p>

            <p className="text-xs font-sans uppercase tracking-[0.2em] text-[#7D686E] mb-4">
              {data.childOrder} dari pasangan:
            </p>
          </motion.div>

          {/* Parents Name Box */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-sm bg-white border border-[#EACFD5] rounded-3xl p-6 shadow-xs"
          >
            <p className="font-serif font-bold text-[#332A2E] text-base sm:text-lg">
              {data.fatherName}
            </p>
            <p className="text-xs font-sans text-[#BA5D72] uppercase tracking-widest my-1.5">&</p>
            <p className="font-serif font-bold text-[#332A2E] text-base sm:text-lg">
              {data.motherName}
            </p>
          </motion.div>

          {/* Prayer for the child */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.36, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif italic text-[#7D686E] text-sm sm:text-base max-w-md mt-6 leading-relaxed"
          >
            &ldquo;Semoga ananda tumbuh menjadi putra yang sholeh, senantiasa taat beribadah, cerdas, berbakti kepada kedua orang tua, serta membawa keberkahan bagi umat, nusa, dan bangsa.&rdquo;
          </motion.p>
        </div>
      </div>
    </section>
  );
};
