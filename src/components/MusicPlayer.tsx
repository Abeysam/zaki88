import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface MusicPlayerProps {
  isPlaying: boolean;
  onToggle: () => void;
  musicTitle?: string;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({
  isPlaying,
  onToggle,
  musicTitle = "Instrumen Khitanan",
}) => {
  return (
    <div className="fixed bottom-20 right-4 z-40 sm:bottom-6 sm:right-6 flex items-center gap-1.5">
      <button
        id="btn-toggle-music"
        type="button"
        onClick={onToggle}
        className="flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-[#3C1822]/90 text-[#FFF2F5] hover:bg-[#522430] shadow-lg border border-[#7D384A]/60 backdrop-blur-md transition active:scale-95 cursor-pointer text-xs font-medium font-sans"
        title={isPlaying ? `Jeda Musik (${musicTitle})` : "Putar Musik"}
      >
        {isPlaying ? (
          <>
            <div className="flex items-end gap-0.5 h-3.5 w-3.5">
              <span className="w-1 bg-[#E0A899] animate-pulse rounded-xs h-full" />
              <span className="w-1 bg-[#E0A899] animate-pulse delay-75 rounded-xs h-2/3" />
              <span className="w-1 bg-[#E0A899] animate-pulse delay-150 rounded-xs h-4/5" />
            </div>
            <Volume2 className="w-3.5 h-3.5 text-[#E0A899]" />
            <span className="max-w-[110px] truncate text-[11px] text-[#F3D5DC] font-sans">
              {musicTitle}
            </span>
          </>
        ) : (
          <>
            <VolumeX className="w-3.5 h-3.5 text-[#D8A8B4]" />
            <span className="text-[11px] text-[#D8A8B4]">Musik Jeda</span>
          </>
        )}
      </button>
    </div>
  );
};
