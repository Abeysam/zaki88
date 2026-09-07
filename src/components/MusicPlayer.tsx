import React from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

interface MusicPlayerProps {
  isPlaying: boolean;
  onToggle: () => void;
  musicTitle?: string;
  onOpenSettings?: () => void;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({
  isPlaying,
  onToggle,
  musicTitle = "Instrumen Khitanan",
  onOpenSettings
}) => {
  return (
    <div className="fixed bottom-20 right-4 z-40 sm:bottom-6 sm:right-6 flex items-center gap-1.5">
      <button
        id="btn-toggle-music"
        type="button"
        onClick={onToggle}
        className="flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-[#25261F]/90 text-[#F5F5F0] hover:bg-[#34362B] shadow-lg border border-[#5A5A40]/40 backdrop-blur-md transition active:scale-95 cursor-pointer text-xs font-medium font-sans"
        title={isPlaying ? `Jeda Musik (${musicTitle})` : "Putar Musik"}
      >
        {isPlaying ? (
          <>
            <div className="flex items-end gap-0.5 h-3.5 w-3.5">
              <span className="w-1 bg-[#E2E2D5] animate-pulse rounded-xs h-full" />
              <span className="w-1 bg-[#E2E2D5] animate-pulse delay-75 rounded-xs h-2/3" />
              <span className="w-1 bg-[#E2E2D5] animate-pulse delay-150 rounded-xs h-4/5" />
            </div>
            <Volume2 className="w-3.5 h-3.5 text-[#E2E2D5]" />
            <span className="max-w-[110px] truncate text-[11px] text-[#E2E2D5] font-sans">
              {musicTitle}
            </span>
          </>
        ) : (
          <>
            <VolumeX className="w-3.5 h-3.5 text-[#A6A692]" />
            <span className="text-[11px] text-[#A6A692]">Musik Jeda</span>
          </>
        )}
      </button>

      {onOpenSettings && (
        <button
          type="button"
          onClick={onOpenSettings}
          className="p-2.5 rounded-full bg-[#25261F]/90 text-[#A6A692] hover:text-white hover:bg-[#34362B] shadow-lg border border-[#5A5A40]/40 backdrop-blur-md transition cursor-pointer text-xs"
          title="Ganti Musik Latar"
        >
          <Music className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};
