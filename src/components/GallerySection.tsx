import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

interface GallerySectionProps {
  images: string[];
}

export const GallerySection: React.FC<GallerySectionProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const safeImages = images && images.length > 0
    ? images.filter((img): img is string => typeof img === 'string' && img.trim() !== '')
    : [];
  const total = safeImages.length;

  useEffect(() => {
    if (currentIndex >= total && total > 0) {
      setCurrentIndex(total - 1);
    }
  }, [total, currentIndex]);

  const handleNext = useCallback(() => {
    if (total === 0) return;
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const handlePrev = useCallback(() => {
    if (total === 0) return;
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Auto-play carousel transition every 4.5 seconds
  useEffect(() => {
    if (!isAutoPlaying || total <= 1 || lightboxIndex !== null) return;
    const timer = setInterval(() => {
      handleNext();
    }, 4500);
    return () => clearInterval(timer);
  }, [isAutoPlaying, total, lightboxIndex, handleNext]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxIndex(null);
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev !== null ? (prev + 1) % total : null));
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev !== null ? (prev - 1 + total) % total : null));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, total]);

  if (total === 0) return null;

  return (
    <section id="galeri-section" className="py-16 px-4 bg-[#F8EFF1]/40 border-y border-[#EACFD5]/70">
      <div className="max-w-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <div className="inline-block px-3 py-1 rounded-full bg-[#FDF2F4] border border-[#F3CBD3] text-[10px] font-sans uppercase tracking-[0.25em] font-bold text-[#8B3A4C] mb-2.5">
            Momen Bahagia
          </div>
          <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#8B3A4C]">
            Galeri Kenangan
          </h3>
          <div className="w-12 h-0.5 bg-[#BA5D72]/40 mx-auto mt-3 rounded-full" />
        </motion.div>

        {/* Featured Carousel with subtle crossfade */}
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-3xl overflow-hidden shadow-lg shadow-rose-950/5 bg-white border border-[#EACFD5] transition-all group mb-4"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full overflow-hidden">
            <AnimatePresence mode="wait">
              {safeImages[currentIndex] ? (
                <motion.img
                  key={currentIndex}
                  src={safeImages[currentIndex]}
                  alt={`Kenangan Zaki Alvaro ${currentIndex + 1}`}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full h-full object-cover select-none"
                />
              ) : null}
            </AnimatePresence>

            {/* Subtle Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/15 pointer-events-none" />

            {/* Top Controls: Zoom */}
            <button
              type="button"
              onClick={() => setLightboxIndex(currentIndex)}
              className="absolute top-3.5 right-3.5 z-10 p-2 rounded-full bg-[#2B2327]/70 hover:bg-[#2B2327]/90 text-white/90 hover:text-white backdrop-blur-md border border-white/20 transition cursor-pointer shadow-sm"
              title="Perbesar Foto"
            >
              <Maximize2 className="w-4 h-4" />
            </button>

            {/* Bottom Caption Pill */}
            <div className="absolute bottom-3.5 left-4 z-10 flex items-center gap-2 text-white/90">
              <span className="px-2.5 py-1 rounded-full bg-[#2B2327]/75 backdrop-blur-md text-[11px] font-medium tracking-wide border border-white/15">
                Foto {currentIndex + 1} dari {total}
              </span>
            </div>

            {/* Prev / Next Buttons */}
            {total > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrev();
                  }}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-[#2B2327]/70 hover:bg-[#2B2327]/90 text-white/90 hover:text-white backdrop-blur-md border border-white/20 transition-all cursor-pointer opacity-90 sm:opacity-0 sm:group-hover:opacity-100 shadow-sm"
                  aria-label="Foto Sebelumnya"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-[#2B2327]/70 hover:bg-[#2B2327]/90 text-white/90 hover:text-white backdrop-blur-md border border-white/20 transition-all cursor-pointer opacity-90 sm:opacity-0 sm:group-hover:opacity-100 shadow-sm"
                  aria-label="Foto Selanjutnya"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </>
            )}

            {/* Indicators Bar */}
            {total > 1 && (
              <div className="absolute bottom-3.5 right-4 z-10 flex items-center gap-1.5 max-w-[45%] overflow-x-auto py-1">
                {safeImages.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer shrink-0 ${
                      currentIndex === idx
                        ? 'w-5 bg-white shadow-xs'
                        : 'w-1.5 bg-white/50 hover:bg-white/80'
                    }`}
                    aria-label={`Lihat foto ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </motion.div>

        {/* Thumbnail Selector Grid */}
        <div className="grid grid-cols-4 gap-2 sm:gap-2.5">
          {safeImages.map((img, idx) => (
            <motion.button
              key={idx}
              type="button"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: Math.min(idx * 0.05, 0.3) }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                setCurrentIndex(idx);
                setLightboxIndex(idx);
              }}
              className={`relative aspect-square rounded-2xl overflow-hidden cursor-pointer border transition-all duration-300 shadow-2xs block ${
                currentIndex === idx
                  ? 'border-[#BA5D72] ring-2 ring-[#BA5D72]/40 ring-offset-1'
                  : 'border-[#EACFD5] opacity-85 hover:opacity-100'
              }`}
            >
              {img ? (
                <img
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  loading="lazy"
                />
              ) : null}
              <div className="absolute inset-0 bg-[#8B3A4C]/20 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                <Camera className="w-4 h-4 text-white drop-shadow-sm" />
              </div>
            </motion.button>
          ))}
        </div>

        {/* Modal Lightbox with Smooth Carousel & Fade Animation */}
        <AnimatePresence>
          {lightboxIndex !== null && total > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setLightboxIndex(null)}
              className="fixed inset-0 z-50 flex items-center justify-center bg-[#141510]/92 p-4 backdrop-blur-md"
            >
              <div
                className="relative max-w-xl w-full max-h-[90vh] flex flex-col items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header Controls */}
                <div className="w-full flex items-center justify-between pb-3 px-1 text-[#E2E2D5]">
                  <span className="text-xs font-medium tracking-wider uppercase font-sans text-[#A6A692]">
                    Kenangan {lightboxIndex + 1} / {total}
                  </span>
                  <button
                    type="button"
                    onClick={() => setLightboxIndex(null)}
                    className="p-1.5 rounded-full hover:bg-white/10 text-[#E2E2D5] hover:text-white cursor-pointer transition"
                    title="Tutup (Esc)"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Main Lightbox Image Container */}
                <div className="relative w-full max-h-[75vh] flex items-center justify-center overflow-hidden rounded-2xl bg-black/40 border border-white/10 shadow-2xl">
                  <AnimatePresence mode="wait">
                    {safeImages[lightboxIndex] ? (
                      <motion.img
                        key={lightboxIndex}
                        src={safeImages[lightboxIndex]}
                        alt={`Foto besar ${lightboxIndex + 1}`}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className="max-h-[72vh] max-w-full w-auto object-contain rounded-xl select-none"
                      />
                    ) : null}
                  </AnimatePresence>

                  {/* Navigation Inside Lightbox */}
                  {total > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setLightboxIndex((prev) => (prev !== null ? (prev - 1 + total) % total : null));
                        }}
                        className="absolute left-2.5 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/50 hover:bg-black/75 text-white/90 hover:text-white backdrop-blur-sm border border-white/15 transition cursor-pointer"
                        title="Sebelumnya"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setLightboxIndex((prev) => (prev !== null ? (prev + 1) % total : null));
                        }}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/50 hover:bg-black/75 text-white/90 hover:text-white backdrop-blur-sm border border-white/15 transition cursor-pointer"
                        title="Selanjutnya"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </>
                  )}
                </div>

                {/* Lightbox Mini Thumbnails */}
                {total > 1 && (
                  <div className="mt-3 flex items-center gap-2 max-w-full overflow-x-auto py-1 px-2">
                    {safeImages.map((img, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setLightboxIndex(idx)}
                        className={`shrink-0 w-12 h-12 rounded-lg overflow-hidden border-2 transition cursor-pointer ${
                          lightboxIndex === idx ? 'border-[#E0A899] scale-105 shadow-md' : 'border-white/20 opacity-60 hover:opacity-100'
                        }`}
                      >
                        {img ? (
                          <img src={img} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover" />
                        ) : null}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};



