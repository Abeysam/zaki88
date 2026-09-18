import React from 'react';
import { Calendar, User, MessageSquare, Gift, Share2, Image as ImageIcon } from 'lucide-react';

interface BottomNavBarProps {
  onOpenShare: () => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  onOpenShare,
}) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-md bg-[#3C1822]/95 backdrop-blur-md border border-[#7D384A]/60 rounded-full px-3 py-2 shadow-2xl flex items-center justify-around text-[#D8A8B4] font-sans">
      <button
        onClick={() => scrollTo('profil-khitan')}
        className="flex flex-col items-center gap-0.5 hover:text-[#FFF2F5] transition py-1 px-1.5 cursor-pointer"
      >
        <User className="w-4 h-4" />
        <span className="text-[10px] tracking-wider uppercase font-medium">Profil</span>
      </button>

      <button
        onClick={() => scrollTo('acara-section')}
        className="flex flex-col items-center gap-0.5 hover:text-[#FFF2F5] transition py-1 px-1.5 cursor-pointer"
      >
        <Calendar className="w-4 h-4" />
        <span className="text-[10px] tracking-wider uppercase font-medium">Acara</span>
      </button>

      <button
        onClick={() => scrollTo('galeri-section')}
        className="flex flex-col items-center gap-0.5 hover:text-[#FFF2F5] transition py-1 px-1.5 cursor-pointer"
      >
        <ImageIcon className="w-4 h-4" />
        <span className="text-[10px] tracking-wider uppercase font-medium">Galeri</span>
      </button>

      <button
        onClick={() => scrollTo('ucapan-section')}
        className="flex flex-col items-center gap-0.5 hover:text-[#FFF2F5] transition py-1 px-1.5 cursor-pointer"
      >
        <MessageSquare className="w-4 h-4" />
        <span className="text-[10px] tracking-wider uppercase font-medium">Ucapan</span>
      </button>

      <button
        onClick={() => scrollTo('amplop-section')}
        className="flex flex-col items-center gap-0.5 hover:text-[#FFF2F5] transition py-1 px-1.5 cursor-pointer"
      >
        <Gift className="w-4 h-4" />
        <span className="text-[10px] tracking-wider uppercase font-medium">Amplop</span>
      </button>

      <div className="w-[1px] h-6 bg-[#7D384A]/50 mx-0.5" />

      <button
        onClick={onOpenShare}
        className="flex flex-col items-center gap-0.5 bg-gradient-to-r from-[#8B3A4C] to-[#BA5D72] text-white rounded-full p-2.5 hover:opacity-90 border border-white/20 shadow-md shadow-rose-950/40 transition cursor-pointer"
        title="Bagikan Undangan"
      >
        <Share2 className="w-3.5 h-3.5" />
      </button>
    </nav>
  );
};
