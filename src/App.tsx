import { useState, useEffect } from 'react';
import { initialInvitationData, initialWishes } from './data/defaultInvitation';
import { InvitationData, WishMessage } from './types';
import { musicPlayer } from './utils/sound';
import { OpeningEnvelope, triggerWelcomeConfetti } from './components/OpeningEnvelope';
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
import { MediaSettingsModal } from './components/MediaSettingsModal';
import { BackToTop } from './components/BackToTop';
import { Share2, Image as ImageIcon } from 'lucide-react';

const CURRENT_DATA_VERSION = 'v6_2026_09_18_lock_zaki_portrait';

export default function App() {
  // Load data from localStorage or fallback with locked defaults
  const [data, setData] = useState<InvitationData>(() => {
    try {
      const saved = localStorage.getItem('khitan_invitation_data');
      if (saved) {
        const parsed = JSON.parse(saved);
        const isOldVersion = !parsed._version || parsed._version !== CURRENT_DATA_VERSION;
        const hasOldGeneratedImages =
          (typeof parsed.photoUrl === 'string' && (parsed.photoUrl.includes('regenerated_image') || parsed.photoUrl.includes('unsplash') || parsed.photoUrl.includes('DSC_'))) ||
          (typeof parsed.coverPhotoUrl === 'string' && parsed.coverPhotoUrl.includes('DSC_')) ||
          (typeof parsed.coverBackgroundUrl === 'string' && parsed.coverBackgroundUrl.includes('DSC_')) ||
          (Array.isArray(parsed.galleryImages) && parsed.galleryImages.some((img: string) => typeof img === 'string' && (img.includes('regenerated_image') || img.includes('unsplash'))));

        if (isOldVersion || hasOldGeneratedImages || !parsed.childFullName || parsed.childFullName.includes("Rayyan")) {
          const freshData: InvitationData = {
            ...initialInvitationData,
            ...parsed,
            _version: CURRENT_DATA_VERSION,
            photoUrl: initialInvitationData.photoUrl,
            coverPhotoUrl: initialInvitationData.coverPhotoUrl,
            coverBackgroundUrl: "",
            galleryImages: initialInvitationData.galleryImages,
            childFullName: "ZAKI ALVARO",
            childNickName: "ZAKI",
            childOrder: "Putra Pertama",
            fatherName: "SUBHAN HALABI",
            motherName: "NUNUNG NURAENI",
          };
          localStorage.setItem('khitan_invitation_data', JSON.stringify(freshData));
          return freshData;
        }

        return {
          ...initialInvitationData,
          ...parsed,
          // Guarantee locked portrait photo of Zaki as main cover & profile
          photoUrl: initialInvitationData.photoUrl,
          coverPhotoUrl: initialInvitationData.coverPhotoUrl,
          coverBackgroundUrl: parsed.coverBackgroundUrl && !parsed.coverBackgroundUrl.includes('DSC_') ? parsed.coverBackgroundUrl : "",
        };
      }
    } catch {
      // ignore
    }

    try {
      localStorage.setItem('khitan_invitation_data', JSON.stringify({
        ...initialInvitationData,
        _version: CURRENT_DATA_VERSION,
      }));
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
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
  const [guestName, setGuestName] = useState('Tamu Undangan');

  const handleUpdateMedia = (updatedFields: Partial<InvitationData>) => {
    setData((prev) => {
      const next: InvitationData = { ...prev, ...updatedFields, _version: CURRENT_DATA_VERSION };
      try {
        localStorage.setItem('khitan_invitation_data', JSON.stringify(next));
      } catch (err) {
        console.error('Failed to save to localStorage:', err);
      }
      return next;
    });
  };

  // Detect ?to= in URL query params
  useEffect(() => {
    try {
      const searchParams = new URLSearchParams(window.location.search);
      const toParam = searchParams.get('to');
      if (toParam && toParam.trim()) {
        setGuestName(toParam.trim());
      }
      if (searchParams.get('edit') === 'media') {
        setIsMediaModalOpen(true);
      }
    } catch {
      // fallback
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('khitan_wishes_data', JSON.stringify(wishes));
    } catch {
      // ignore
    }
  }, [wishes]);

  const handleOpenEnvelope = () => {
    setIsEnvelopeOpen(true);
    triggerWelcomeConfetti();
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

  return (
    <main className="min-h-screen bg-[#FAF7F8] text-[#332A2E] relative selection:bg-[#BA5D72]/20 selection:text-[#8B3A4C] pb-20 font-sans">
      {/* Interactive Opening Envelope Cover */}
      <OpeningEnvelope
        isOpen={isEnvelopeOpen}
        guestName={guestName}
        data={data}
        onOpen={handleOpenEnvelope}
      />

      {/* Top Banner with Quick Share Action */}
      <header className="sticky top-0 z-30 bg-[#FAF7F8]/90 backdrop-blur-md border-b border-[#EACFD5] px-4 py-3 shadow-xs">
        <div className="max-w-xl mx-auto flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 font-serif font-bold text-[#8B3A4C] text-sm tracking-wide">
            <span className="w-2 h-2 rounded-full bg-[#BA5D72] animate-pulse" />
            <span>Walimatul Khitan {data.childNickName}</span>
          </div>

          <div className="flex items-center gap-2 font-sans">
            <button
              id="btn-edit-media-top"
              type="button"
              onClick={() => setIsMediaModalOpen(true)}
              className="px-3 py-1.5 rounded-full bg-white hover:bg-rose-50 text-[#8B3A4C] border border-[#F0D5DA] font-medium text-xs tracking-wider flex items-center gap-1.5 shadow-xs transition cursor-pointer"
              title="Ganti / Sesuaikan Foto & QRIS"
            >
              <ImageIcon className="w-3.5 h-3.5 text-[#BA5D72]" />
              <span className="hidden sm:inline">Foto & Media</span>
            </button>

            <button
              id="btn-share-invitation-top"
              type="button"
              onClick={() => setIsShareModalOpen(true)}
              className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#8B3A4C] to-[#BA5D72] hover:opacity-90 text-white font-medium text-xs tracking-wider flex items-center gap-1.5 shadow-xs transition cursor-pointer"
              title="Bagikan Undangan Digital"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Bagikan Undangan</span>
            </button>
          </div>
        </div>
      </header>

      {/* Website Sections */}
      <div className="relative">
        <HeroSection />

        <ChildProfile data={data} />

        <EventScheduleSection data={data} />

        <GallerySection images={data.galleryImages || []} />

        <GuestbookRSVP
          wishes={wishes}
          onAddWish={handleAddWish}
          defaultName={guestName !== 'Tamu Undangan' ? guestName : ''}
          whatsappNumber={data.whatsappNumber}
          childName={data.childFullName}
          fatherName={data.fatherName}
          motherName={data.motherName}
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
      />

      {/* Floating Back to Top Button */}
      <BackToTop />

      {/* Mobile Floating Bottom Bar */}
      <BottomNavBar
        onOpenShare={() => setIsShareModalOpen(true)}
      />

      {/* Share & Guest Link Modal */}
      <ShareAndDomainModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        data={data}
      />

      {/* Media Settings Modal (Dapat dibuka via URL ?edit=media jika dibutuhkan) */}
      {isMediaModalOpen && (
        <MediaSettingsModal
          isOpen={isMediaModalOpen}
          onClose={() => setIsMediaModalOpen(false)}
          data={data}
          onSave={handleUpdateMedia}
        />
      )}
    </main>
  );
}

