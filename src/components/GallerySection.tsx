import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, X } from 'lucide-react';

interface GallerySectionProps {
  images: string[];
}

export const GallerySection: React.FC<GallerySectionProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section id="galeri-section" className="py-16 px-4 bg-[#E2E2D5]/25 border-y border-[#5A5A40]/15">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-[0.25em] font-sans font-bold text-[#5A5A40]/75 mb-1.5">
            Momen Bahagia
          </p>
          <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#343627]">
            Galeri Kenangan
          </h3>
          <div className="w-12 h-0.5 bg-[#5A5A40]/30 mx-auto mt-3 rounded-full" />
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {images.map((img, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative aspect-square rounded-3xl overflow-hidden shadow-xs cursor-pointer group bg-[#E2E2D5]/40 border border-[#5A5A40]/20"
              onClick={() => setSelectedImage(img)}
            >
              <img
                src={img}
                alt={`Momen ${idx + 1}`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-[#2C2E23]/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Camera className="w-6 h-6 text-white drop-shadow-md" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal Lightbox */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              className="fixed inset-0 z-50 flex items-center justify-center bg-[#1D1E18]/90 p-4 backdrop-blur-sm"
            >
              <div className="relative max-w-lg w-full max-h-[85vh] flex items-center justify-center">
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute -top-12 right-0 text-[#E2E2D5] hover:text-white p-2 cursor-pointer transition"
                >
                  <X className="w-6 h-6" />
                </button>
                <img
                  src={selectedImage}
                  alt="Enlarged preview"
                  className="max-h-[80vh] w-auto max-w-full rounded-3xl object-contain shadow-2xl border border-[#5A5A40]/40"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
