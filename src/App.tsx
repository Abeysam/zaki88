import { useState, useEffect } from 'react';
import { initialInvitationData, initialWishes } from './data/defaultInvitation';
import { InvitationData, WishMessage } from './types';
import { musicPlayer } from './utils/sound';
import { OpeningEnvelope } from './components/OpeningEnvelope';
import { HeroSection } from './components/HeroSection';
import { ChildProfile } from './components/ChildProfile';
import { EventScheduleSection } from './components/EventScheduleSection';
import { GallerySection } from './components/GallerySection';
import { GuestbookRSVP } from './components/GuestbookRSVP';
import { DigitalEnvelope } from './components/DigitalEnvelope';
import { FooterSection } from './components/FooterSection';
import { MusicPlayer } from './components/MusicPlayer';
import { BottomNavBar } from './components/BottomNavBar';
import { ShareAndDomainModal } from './components/ShareAndDomainModal';
import { EditorModal } from './components/EditorModal';
import { Share2, Edit3, Globe } from 'lucide-react';

export default function App() {
  // Load data from localStorage or fallback
  const [data, setData] = useState<InvitationData>(() => {
    try {
      const saved = localStorage.getItem('khitan_invitation_data');
      if (saved) {
        const parsed = JSON.parse(saved);
        // If previous cache had the placeholder "Rayyan", upgrade to Zaki Alvaro
        if (parsed.childFullName && !parsed.childFullName.includes("Rayyan")) {
          const hasOldUnsplashGallery = !parsed.galleryImages || parsed.galleryImages.some((img: string) => typeof img === 'string' && img.includes('unsplash.com'));
          const hasOldUnsplashPhoto = !parsed.photoUrl || (typeof parsed.photoUrl === 'string' && parsed.photoUrl.includes('unsplash.com'));
          return {
            ...initialInvitationData,
            ...parsed,
            galleryImages: hasOldUnsplashGallery ? initialInvitationData.galleryImages : parsed.galleryImages,
            photoUrl: hasOldUnsplashPhoto ? initialInvitationData.photoUrl : parsed.photoUrl,
          };
        }
      }
    } catch {
      // ignore
    }
    return initialInvitationData;
  });

  const [wishes, setWishes] = useState<WishMessage[]>(() => {
    try {
      const saved = localStorage.getItem('khitan_wishes_data');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0 && !parsed[0].message?.includes("Rayyan")) {
          return parsed;
        }
      }
    } catch {
      // ignore
    }
    return initialWishes;
  });

  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isEditorModalOpen, setIsEditorModalOpen] = useState(false);
  const [guestName, setGuestName] = useState('Tamu Undangan');

  // Detect ?to= in URL query params
  useEffect(() => {
    try {
      const searchParams = new URLSearchParams(window.location.search);
      const toParam = searchParams.get('to');
      if (toParam && toParam.trim()) {
        setGuestName(toParam.trim());
      }
    } catch {
      // fallback
    }
  }, []);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('khitan_invitation_data', JSON.stringify(data));
    } catch {
      // ignore
    }
  }, [data]);

  useEffect(() => {
    try {
      localStorage.setItem('khitan_wishes_data', JSON.stringify(wishes));
    } catch {
      // ignore
    }
  }, [wishes]);

  const handleOpenEnvelope = () => {
    setIsEnvelopeOpen(true);
    musicPlayer.start(data.musicUrl);
    setIsPlayingMusic(true);
  };

  const handleToggleMusic = () => {
    if (isPlayingMusic) {
      musicPlayer.stop();
      setIsPlayingMusic(false);
    } else {
      musicPlayer.start(data.musicUrl);
      setIsPlayingMusic(true);
    }
  };

  const handleAddWish = (newWish: Omit<WishMessage, 'id' | 'createdAt'>) => {
    const wishItem: WishMessage = {
      ...newWish,
      id: `w-${Date.now()}`,
      createdAt: 'Baru saja',
    };
    setWishes((prev) => [wishItem, ...prev]);
  };

  const handleSaveData = (newData: InvitationData) => {
    setData(newData);
    if (newData.musicUrl !== data.musicUrl) {
      musicPlayer.setSource(newData.musicUrl || '');
      if (isPlayingMusic) {
        musicPlayer.start(newData.musicUrl);
      }
    }
  };

  return (
    <main className="min-h-screen bg-[#f5f5f0] text-[#5A5A40] relative selection:bg-[#5A5A40]/15 selection:text-[#5A5A40] pb-20 font-sans">
      {/* Interactive Opening Envelope Cover */}
      <OpeningEnvelope
        isOpen={isEnvelopeOpen}
        guestName={guestName}
        data={data}
        onOpen={handleOpenEnvelope}
      />

      {/* Top Banner with Quick Actions (Host Controls) */}
      <header className="sticky top-0 z-30 bg-[#f5f5f0]/90 backdrop-blur-md border-b border-[#5A5A40]/15 px-4 py-3 shadow-xs">
        <div className="max-w-xl mx-auto flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 font-serif font-bold text-[#5A5A40] text-sm tracking-wide">
            <span className="w-2 h-2 rounded-full bg-[#5A5A40] animate-pulse" />
            <span>Walimatul Khitan {data.childNickName}</span>
          </div>

          <div className="flex items-center gap-2 font-sans">
            <button
              onClick={() => setIsEditorModalOpen(true)}
              className="px-3 py-1.5 rounded-full bg-white/70 hover:bg-white text-[#5A5A40] border border-[#5A5A40]/20 font-medium text-xs tracking-wider flex items-center gap-1.5 transition cursor-pointer"
              title="Ubah Nama & Jadwal"
            >
              <Edit3 className="w-3.5 h-3.5 text-[#5A5A40]" />
              <span className="hidden sm:inline">Edit Data</span>
            </button>

            <button
              onClick={() => setIsShareModalOpen(true)}
              className="px-3 py-1.5 rounded-full bg-[#5A5A40] hover:bg-[#484833] text-white font-medium text-xs tracking-wider flex items-center gap-1.5 shadow-xs transition cursor-pointer"
              title="Bagikan & Info Domain"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Bagikan / Info Domain</span>
              <Globe className="w-3.5 h-3.5 sm:hidden" />
            </button>
          </div>
        </div>
      </header>

      {/* Website Sections */}
      <div className="relative">
        <HeroSection />

        <ChildProfile data={data} />

        <EventScheduleSection data={data} />

        <GallerySection images={data.galleryImages} />

        <GuestbookRSVP
          wishes={wishes}
          onAddWish={handleAddWish}
          defaultName={guestName !== 'Tamu Undangan' ? guestName : ''}
        />

        <DigitalEnvelope
          bankAccounts={data.bankAccounts}
          giftAddress={data.giftAddress}
          qrisImageUrl={data.qrisImageUrl}
        />

        <FooterSection
          data={data}
          onReopenEnvelope={() => setIsEnvelopeOpen(false)}
        />
      </div>

      {/* Floating Music Control */}
      <MusicPlayer
        isPlaying={isPlayingMusic}
        onToggle={handleToggleMusic}
        musicTitle={data.musicTitle}
        onOpenSettings={() => setIsEditorModalOpen(true)}
      />

      {/* Mobile Floating Bottom Bar */}
      <BottomNavBar
        onOpenShare={() => setIsShareModalOpen(true)}
        onOpenEditor={() => setIsEditorModalOpen(true)}
      />

      {/* Share & Domain Guide Modal */}
      <ShareAndDomainModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        data={data}
      />

      {/* Edit Data Modal */}
      <EditorModal
        isOpen={isEditorModalOpen}
        onClose={() => setIsEditorModalOpen(false)}
        data={data}
        onSave={handleSaveData}
      />
    </main>
  );
}

