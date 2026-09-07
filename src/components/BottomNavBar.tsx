import React from 'react';
import { Calendar, User, MessageSquare, Gift, Share2, Edit3 } from 'lucide-react';

interface BottomNavBarProps {
  onOpenShare: () => void;
  onOpenEditor: () => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  onOpenShare,
  onOpenEditor,
}) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-md bg-[#25261F]/95 backdrop-blur-md border border-[#5A5A40]/40 rounded-full px-3.5 py-2 shadow-2xl flex items-center justify-around text-[#B5B5A0] font-sans">
      <button
        onClick={() => scrollTo('profil-khitan')}
        className="flex flex-col items-center gap-0.5 hover:text-[#F5F5F0] transition py-1 px-2 cursor-pointer"
      >
        <User className="w-4 h-4" />
        <span className="text-[10px] tracking-wider uppercase font-medium">Profil</span>
      </button>

      <button
        onClick={() => scrollTo('acara-section')}
        className="flex flex-col items-center gap-0.5 hover:text-[#F5F5F0] transition py-1 px-2 cursor-pointer"
      >
        <Calendar className="w-4 h-4" />
        <span className="text-[10px] tracking-wider uppercase font-medium">Acara</span>
      </button>

      <button
        onClick={() => scrollTo('ucapan-section')}
        className="flex flex-col items-center gap-0.5 hover:text-[#F5F5F0] transition py-1 px-2 cursor-pointer"
      >
        <MessageSquare className="w-4 h-4" />
        <span className="text-[10px] tracking-wider uppercase font-medium">Ucapan</span>
      </button>

      <button
        onClick={() => scrollTo('amplop-section')}
        className="flex flex-col items-center gap-0.5 hover:text-[#F5F5F0] transition py-1 px-2 cursor-pointer"
      >
        <Gift className="w-4 h-4" />
        <span className="text-[10px] tracking-wider uppercase font-medium">Amplop</span>
      </button>

      <div className="w-[1px] h-6 bg-[#5A5A40]/40 mx-0.5" />

      <button
        onClick={onOpenEditor}
        className="flex flex-col items-center gap-0.5 hover:text-[#E2E2D5] transition py-1 px-2 cursor-pointer text-[#8E8E7A]"
        title="Edit Data Undangan"
      >
        <Edit3 className="w-4 h-4" />
        <span className="text-[10px] tracking-wider uppercase font-medium">Edit</span>
      </button>

      <button
        onClick={onOpenShare}
        className="flex flex-col items-center gap-0.5 bg-[#5A5A40] text-white rounded-full p-2.5 hover:bg-[#484833] border border-[#E2E2D5]/20 shadow-md transition cursor-pointer"
        title="Bagikan / Info Domain"
      >
        <Share2 className="w-3.5 h-3.5" />
      </button>
    </nav>
  );
};
