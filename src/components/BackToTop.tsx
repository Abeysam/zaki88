import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronUp } from 'lucide-react';

export const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling down 350px
      if (window.scrollY > 350) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          id="btn-back-to-top"
          type="button"
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.75, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.75, y: 16 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          className="fixed bottom-20 left-4 sm:bottom-6 sm:left-6 z-40 p-3 rounded-full bg-[#3C1822]/90 hover:bg-[#522430] text-[#FFF2F5] shadow-xl border border-[#7D384A]/60 backdrop-blur-md transition-colors cursor-pointer flex items-center justify-center group"
          aria-label="Kembali ke atas"
          title="Kembali ke atas"
        >
          <ChevronUp className="w-5 h-5 text-[#F3D5DC] group-hover:text-white transition-transform group-hover:-translate-y-0.5 duration-200" />
          <span className="sr-only">Kembali ke Atas</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
};
