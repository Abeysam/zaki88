import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Share2, Globe, Copy, Check, MessageSquare, ExternalLink, HelpCircle } from 'lucide-react';
import { InvitationData } from '../types';

interface ShareAndDomainModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: InvitationData;
}

export const ShareAndDomainModal: React.FC<ShareAndDomainModalProps> = ({
  isOpen,
  onClose,
  data,
}) => {
  const [activeTab, setActiveTab] = useState<'share' | 'domain'>('share');
  const [guestNameInput, setGuestNameInput] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedText, setCopiedText] = useState(false);

  // Get current base URL
  const baseUrl = typeof window !== 'undefined' ? window.location.origin + window.location.pathname : 'https://undangan-khitan.app';

  // Generated personalized link
  const targetGuest = guestNameInput.trim() || 'Tamu Undangan';
  const personalizedUrl = `${baseUrl}?to=${encodeURIComponent(targetGuest)}`;

  // WhatsApp invite message template
  const waMessage = `Assalamu'alaikum Warahmatullahi Wabarakatuh

Yth. *${targetGuest}*,

Tanpa mengurangi rasa hormat, perkenankan kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri syukuran *Walimatul Khitan* putra kami:

*${data.childFullName} (${data.childNickName})*

📅 Tanggal: ${data.eventDate}
⏰ Waktu: ${data.eventTime}
📍 Tempat: ${data.venueName}

Detail informasi acara, lokasi, dan konfirmasi kehadiran dapat dilihat melalui tautan undangan digital berikut:
👉 ${personalizedUrl}

Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu kepada putra kami.

Wassalamu'alaikum Warahmatullahi Wabarakatuh
Kami yang berbahagia,
*${data.fatherName} & ${data.motherName}*`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(personalizedUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(waMessage);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  const handleOpenWhatsApp = () => {
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(waMessage)}`;
    window.open(waUrl, '_blank');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-lg bg-[#fcfcfb] rounded-[32px] p-6 sm:p-8 shadow-2xl border border-[#5A5A40]/25 my-8"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-[#5A5A40]/60 hover:text-[#343627] p-2 rounded-full hover:bg-[#E2E2D5]/50 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="mb-6">
            <h3 className="font-serif text-2xl font-bold text-[#343627] flex items-center gap-2.5">
              <Share2 className="w-5 h-5 text-[#5A5A40]" />
              <span>Bagikan & Info Website/Domain</span>
            </h3>
            <p className="text-xs text-[#5A5A40]/80 mt-1 font-sans">
              Sebarkan undangan ke WhatsApp atau pasang domain kustom Anda.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex rounded-full bg-[#E2E2D5]/50 p-1 mb-6 border border-[#5A5A40]/20 font-sans">
            <button
              onClick={() => setActiveTab('share')}
              className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-full transition cursor-pointer flex items-center justify-center gap-1.5 ${
                activeTab === 'share'
                  ? 'bg-white text-[#5A5A40] shadow-xs'
                  : 'text-[#5A5A40]/70 hover:text-[#5A5A40]'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Kirim Link Tamu (WA)</span>
            </button>
            <button
              onClick={() => setActiveTab('domain')}
              className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-full transition cursor-pointer flex items-center justify-center gap-1.5 ${
                activeTab === 'domain'
                  ? 'bg-white text-[#5A5A40] shadow-xs'
                  : 'text-[#5A5A40]/70 hover:text-[#5A5A40]'
              }`}
            >
              <Globe className="w-4 h-4" />
              <span>Website & Domain</span>
            </button>
          </div>

          {/* Tab 1: Share Link Tamu */}
          {activeTab === 'share' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-sans font-bold uppercase tracking-wider text-[#5A5A40] mb-1.5">
                  Nama Tamu yang Diundang:
                </label>
                <input
                  type="text"
                  value={guestNameInput}
                  onChange={(e) => setGuestNameInput(e.target.value)}
                  placeholder="Contoh: Bpk. H. Bambang & Keluarga"
                  className="w-full px-4 py-2.5 rounded-2xl border border-[#5A5A40]/25 text-sm focus:outline-none focus:ring-2 focus:ring-[#5A5A40] bg-[#f5f5f0]/60 text-[#343627]"
                />
                <p className="text-[11px] text-[#5A5A40]/75 mt-1 font-sans">
                  *Nama tamu otomatis tercantum di sampul depan undangan saat dibuka!
                </p>
              </div>

              {/* URL Preview */}
              <div className="p-3.5 bg-[#f5f5f0]/80 border border-[#5A5A40]/20 rounded-2xl">
                <p className="text-[11px] font-sans text-[#5A5A40]/80 mb-1">Link Undangan Khusus:</p>
                <p className="font-mono text-xs text-[#343627] break-all select-all font-medium">
                  {personalizedUrl}
                </p>
              </div>

              {/* Action buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="py-2.5 px-3 rounded-full border border-[#5A5A40]/25 hover:bg-[#E2E2D5]/40 text-[#5A5A40] text-xs font-sans font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition cursor-pointer"
                >
                  {copiedLink ? (
                    <>
                      <Check className="w-4 h-4 text-[#5A5A40]" />
                      <span>Link Tersalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Salin Link Saja</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleCopyText}
                  className="py-2.5 px-3 rounded-full border border-[#5A5A40]/25 hover:bg-[#E2E2D5]/40 text-[#5A5A40] text-xs font-sans font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition cursor-pointer"
                >
                  {copiedText ? (
                    <>
                      <Check className="w-4 h-4 text-[#5A5A40]" />
                      <span>Teks WA Tersalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Salin Teks Lengkap</span>
                    </>
                  )}
                </button>
              </div>

              <button
                type="button"
                onClick={handleOpenWhatsApp}
                className="w-full py-3.5 px-4 rounded-full bg-[#5A5A40] hover:bg-[#484833] text-white font-sans font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 shadow-sm transition active:scale-[0.99] cursor-pointer"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Buka & Bagikan Langsung ke WhatsApp</span>
              </button>
            </div>
          )}

          {/* Tab 2: Info Website & Domain */}
          {activeTab === 'domain' && (
            <div className="space-y-4 text-xs text-[#343627] leading-relaxed">
              <div className="p-4 bg-[#E2E2D5]/40 border border-[#5A5A40]/25 rounded-2xl">
                <div className="flex items-start gap-2.5">
                  <Globe className="w-5 h-5 text-[#5A5A40] shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-serif font-bold text-[#343627] text-base mb-1">
                      Website Anda Sudah Langsung Aktif!
                    </h5>
                    <p className="text-[#5A5A40]/90 text-xs">
                      Aplikasi undangan digital ini sudah ter-hosting dan berjalan online di Google Cloud Run. Siapapun yang menerima link web ini bisa langsung membukanya di HP mereka tanpa perlu instal aplikasi apapun.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border border-[#5A5A40]/20 rounded-2xl p-4 space-y-3 bg-white/70">
                <h5 className="font-serif font-bold text-[#343627] text-sm flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4 text-[#5A5A40]" />
                  <span>Apakah Bisa Pakai Domain Sendiri (.com / .my.id)?</span>
                </h5>
                <p className="text-[#5A5A40]/90">
                  <strong>Bisa sekali!</strong> Jika Anda ingin alamat website yang lebih cantik seperti <code className="bg-[#E2E2D5]/60 px-1 py-0.5 rounded text-[#343627]">khitan-rayyan.my.id</code> atau <code className="bg-[#E2E2D5]/60 px-1 py-0.5 rounded text-[#343627]">rayyankhitan.com</code>:
                </p>

                <ol className="list-decimal list-inside space-y-2 text-[#5A5A40]/90 pl-1">
                  <li>
                    <strong>Miliki Domain:</strong> Beli nama domain pilihan Anda di penyedia domain (seperti Niagahoster, Domainesia, RumahWeb, atau Cloudflare). Domain <code className="text-[#343627] font-semibold">.my.id</code> biasanya hanya sekitar Rp 12.000 / tahun.
                  </li>
                  <li>
                    <strong>Export Kode:</strong> Klik menu titik tiga / Settings di AI Studio, pilih <em>&ldquo;Export to GitHub&rdquo;</em> atau <em>&ldquo;Download ZIP&rdquo;</em>.
                  </li>
                  <li>
                    <strong>Hubungkan Gratis:</strong> Sambungkan ke platform gratis seperti <strong>Vercel</strong> atau <strong>Cloudflare Pages</strong>, lalu masukkan domain Anda. Website undangan langsung tayang di domain kustom Anda selamanya!
                  </li>
                  <li>
                    <strong>Opsi Cepat (Tanpa Biaya):</strong> Anda juga bisa langsung memakai link Cloud Run yang sudah aktif ini atau perpendek dengan <code className="text-[#343627] font-semibold">s.id</code> atau <code className="text-[#343627] font-semibold">bit.ly/KhitanRayyan</code> secara gratis!
                  </li>
                </ol>
              </div>

              <div className="p-3 bg-[#E2E2D5]/40 rounded-xl text-[#5A5A40]/80 text-[11px] font-sans">
                💡 Tip: Bagikan link dengan format <code className="text-[#343627] font-semibold">?to=NamaTamu</code> agar setiap tamu merasa istimewa saat membuka undangan.
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
