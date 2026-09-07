import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, CheckCircle2, HelpCircle, XCircle, Users } from 'lucide-react';
import { WishMessage } from '../types';

interface GuestbookRSVPProps {
  wishes: WishMessage[];
  onAddWish: (wish: Omit<WishMessage, 'id' | 'createdAt'>) => void;
  defaultName?: string;
}

export const GuestbookRSVP: React.FC<GuestbookRSVPProps> = ({
  wishes,
  onAddWish,
  defaultName = '',
}) => {
  const [name, setName] = useState(defaultName);
  const [relationship, setRelationship] = useState('Kerabat / Teman');
  const [attendance, setAttendance] = useState<'hadir' | 'ragu' | 'tidak_hadir'>('hadir');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    onAddWish({
      name: name.trim(),
      relationship,
      attendance,
      message: message.trim(),
    });

    setMessage('');
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 4000);
  };

  // Stats
  const attendingCount = wishes.filter((w) => w.attendance === 'hadir').length;

  return (
    <section id="ucapan-section" className="py-16 px-4 bg-[#E2E2D5]/35 border-y border-[#5A5A40]/15">
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-[0.25em] font-sans font-bold text-[#5A5A40]/75 mb-1.5">
            Doa & Restu
          </p>
          <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#343627]">
            Buku Tamu & Ucapan
          </h3>
          <p className="text-xs text-[#5A5A40]/80 mt-1">
            Kirimkan ucapan selamat dan doa terbaik untuk ananda yang dikhitan
          </p>
          <div className="w-12 h-0.5 bg-[#5A5A40]/30 mx-auto mt-3 rounded-full" />
        </div>

        {/* Form RSVP & Ucapan */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/85 rounded-[32px] p-6 sm:p-8 border border-[#5A5A40]/20 shadow-xs mb-8"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="guest-input-name" className="block text-xs font-sans font-bold uppercase tracking-wider text-[#5A5A40]/85 mb-1.5">
                Nama Lengkap
              </label>
              <input
                id="guest-input-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Contoh: Budi Santoso & Keluarga"
                className="w-full px-4 py-2.5 rounded-2xl border border-[#5A5A40]/20 text-sm focus:outline-none focus:ring-2 focus:ring-[#5A5A40]/40 bg-[#f5f5f0]/60 text-[#343627]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="guest-input-rel" className="block text-xs font-sans font-bold uppercase tracking-wider text-[#5A5A40]/85 mb-1.5">
                  Hubungan / Kerabat
                </label>
                <select
                  id="guest-input-rel"
                  value={relationship}
                  onChange={(e) => setRelationship(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-2xl border border-[#5A5A40]/20 text-sm focus:outline-none focus:ring-2 focus:ring-[#5A5A40]/40 bg-white text-[#343627]"
                >
                  <option value="Keluarga Besar">Keluarga Besar</option>
                  <option value="Kerabat / Saudara">Kerabat / Saudara</option>
                  <option value="Teman / Sahabat">Teman / Sahabat</option>
                  <option value="Rekan Kerja Ayah/Ibu">Rekan Kerja</option>
                  <option value="Tetangga">Tetangga</option>
                  <option value="Tamu Undangan">Tamu Undangan</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-sans font-bold uppercase tracking-wider text-[#5A5A40]/85 mb-1.5">
                  Konfirmasi Kehadiran
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  <button
                    type="button"
                    onClick={() => setAttendance('hadir')}
                    className={`py-2.5 px-1 rounded-2xl text-xs font-medium border text-center transition cursor-pointer ${
                      attendance === 'hadir'
                        ? 'bg-[#5A5A40] text-white border-[#5A5A40] shadow-xs'
                        : 'bg-white/60 text-[#5A5A40] border-[#5A5A40]/20 hover:bg-[#E2E2D5]/40'
                    }`}
                  >
                    Hadir
                  </button>
                  <button
                    type="button"
                    onClick={() => setAttendance('ragu')}
                    className={`py-2.5 px-1 rounded-2xl text-xs font-medium border text-center transition cursor-pointer ${
                      attendance === 'ragu'
                        ? 'bg-[#8C8C70] text-white border-[#8C8C70] shadow-xs'
                        : 'bg-white/60 text-[#5A5A40] border-[#5A5A40]/20 hover:bg-[#E2E2D5]/40'
                    }`}
                  >
                    Ragu
                  </button>
                  <button
                    type="button"
                    onClick={() => setAttendance('tidak_hadir')}
                    className={`py-2.5 px-1 rounded-2xl text-xs font-medium border text-center transition cursor-pointer ${
                      attendance === 'tidak_hadir'
                        ? 'bg-[#A3A392] text-white border-[#A3A392] shadow-xs'
                        : 'bg-white/60 text-[#5A5A40] border-[#5A5A40]/20 hover:bg-[#E2E2D5]/40'
                    }`}
                  >
                    Maaf
                  </button>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="guest-input-msg" className="block text-xs font-sans font-bold uppercase tracking-wider text-[#5A5A40]/85 mb-1.5">
                Doa & Ucapan Selamat
              </label>
              <textarea
                id="guest-input-msg"
                required
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tuliskan doa restu untuk ananda (Contoh: Semoga menjadi anak yang sholeh, cerdas, dan berbakti...)"
                className="w-full px-4 py-2.5 rounded-2xl border border-[#5A5A40]/20 text-sm focus:outline-none focus:ring-2 focus:ring-[#5A5A40]/40 bg-[#f5f5f0]/60 text-[#343627]"
              />
            </div>

            {isSubmitted && (
              <div className="p-3.5 bg-[#E2E2D5] border border-[#5A5A40]/30 rounded-2xl text-[#343627] text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#5A5A40] shrink-0" />
                <span>Terima kasih banyak! Doa dan ucapan Anda telah tersampaikan.</span>
              </div>
            )}

            <button
              id="btn-kirim-ucapan"
              type="submit"
              className="w-full py-3.5 px-5 rounded-full bg-[#5A5A40] hover:bg-[#484833] text-white font-sans font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xs transition active:scale-[0.99] cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Kirim Ucapan & Konfirmasi Kehadiran</span>
            </button>
          </form>
        </motion.div>

        {/* Wishes List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-[#5A5A40] px-1 font-sans">
            <span className="font-semibold flex items-center gap-1.5">
              <Users className="w-4 h-4 text-[#5A5A40]" />
              {wishes.length} Doa & Ucapan Masuk
            </span>
            <span className="bg-[#E2E2D5] text-[#5A5A40] border border-[#5A5A40]/20 px-3 py-0.5 rounded-full font-medium">
              {attendingCount} Konfirmasi Hadir
            </span>
          </div>

          <div className="max-h-96 overflow-y-auto space-y-3 pr-1">
            {wishes.map((wish) => (
              <div
                key={wish.id}
                className="bg-white/85 p-5 rounded-3xl border border-[#5A5A40]/15 shadow-xs"
              >
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h5 className="font-serif font-bold text-[#343627] text-base inline-block mr-2">
                      {wish.name}
                    </h5>
                    <span className="text-[11px] font-sans text-[#7A7A62]">
                      • {wish.relationship}
                    </span>
                  </div>
                  {wish.attendance === 'hadir' && (
                    <span className="inline-flex items-center gap-1 text-[10px] px-2.5 py-0.5 rounded-full bg-[#E2E2D5] text-[#5A5A40] border border-[#5A5A40]/20 font-medium">
                      <CheckCircle2 className="w-3 h-3 text-[#5A5A40]" /> Hadir
                    </span>
                  )}
                  {wish.attendance === 'ragu' && (
                    <span className="inline-flex items-center gap-1 text-[10px] px-2.5 py-0.5 rounded-full bg-[#f5f5f0] text-[#7A7A62] border border-[#5A5A40]/20 font-medium">
                      <HelpCircle className="w-3 h-3 text-[#7A7A62]" /> Masih Ragu
                    </span>
                  )}
                  {wish.attendance === 'tidak_hadir' && (
                    <span className="inline-flex items-center gap-1 text-[10px] px-2.5 py-0.5 rounded-full bg-[#E2E2D5]/50 text-[#7A7A62] border border-[#5A5A40]/20 font-medium">
                      <XCircle className="w-3 h-3 text-[#7A7A62]" /> Berhalangan
                    </span>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-[#454737] leading-relaxed font-normal">
                  {wish.message}
                </p>
                <p className="text-[10px] text-[#8C8C74] mt-2.5">
                  {wish.createdAt}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
