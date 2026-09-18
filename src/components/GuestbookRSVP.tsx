import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, CheckCircle2, HelpCircle, XCircle, Users, MessageCircle } from 'lucide-react';
import { WishMessage } from '../types';

interface GuestbookRSVPProps {
  wishes: WishMessage[];
  onAddWish: (wish: Omit<WishMessage, 'id' | 'createdAt'>) => void;
  defaultName?: string;
  whatsappNumber?: string;
  childName?: string;
  fatherName?: string;
  motherName?: string;
}

export const GuestbookRSVP: React.FC<GuestbookRSVPProps> = ({
  wishes,
  onAddWish,
  defaultName = '',
  whatsappNumber = '082124885823',
  childName = 'Zaki Alvaro',
  fatherName = 'Subhan Halabi',
  motherName = 'Nunung Nuraeni',
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

  const handleWhatsAppRSVP = () => {
    const rawNumber = whatsappNumber || '082124885823';
    let cleanNumber = rawNumber.replace(/[^0-9]/g, '');
    if (cleanNumber.startsWith('0')) {
      cleanNumber = '62' + cleanNumber.slice(1);
    } else if (!cleanNumber.startsWith('62')) {
      cleanNumber = '62' + cleanNumber;
    }

    const guest = name.trim() || 'Tamu Undangan';
    const child = childName || 'Zaki Alvaro';
    const parents =
      fatherName && motherName
        ? `Bpk. ${fatherName} & Ibu ${motherName}`
        : 'Bpk. Subhan Halabi & Ibu Nunung Nuraeni';

    const attendanceLabel =
      attendance === 'hadir'
        ? '✅ Insya Allah Hadir'
        : attendance === 'ragu'
        ? '⏳ Masih Ragu-ragu / Diusahakan'
        : '❌ Mohon Maaf Belum Dapat Hadir';

    let text = `*KONFIRMASI KEHADIRAN (RSVP)*\n`;
    text += `Walimatul Khitan ananda *${child}*\n\n`;
    text += `Assalamu'alaikum Wr. Wb. Yth. ${parents},\n\n`;
    text += `Saya ingin mengonfirmasi kehadiran untuk acara Walimatul Khitan ananda ${child}:\n\n`;
    text += `• *Nama*: ${guest}\n`;
    text += `• *Hubungan*: ${relationship}\n`;
    text += `• *Status Kehadiran*: ${attendanceLabel}\n`;
    if (message.trim()) {
      text += `• *Doa & Ucapan*: "${message.trim()}"\n`;
    }
    text += `\nTerima kasih. Semoga acara walimatul khitan ananda ${child} senantiasa dilimpahi keberkahan dan kelancaran oleh Allah SWT. Aamiin.\n\n`;
    text += `_Wassalamu'alaikum Wr. Wb._`;

    // Also record on website wishbook if both name and message are typed
    if (name.trim() && message.trim()) {
      onAddWish({
        name: name.trim(),
        relationship,
        attendance,
        message: message.trim(),
      });
      setMessage('');
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 4000);
    }

    const waUrl = `https://api.whatsapp.com/send?phone=${cleanNumber}&text=${encodeURIComponent(text)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  // Stats
  const attendingCount = wishes.filter((w) => w.attendance === 'hadir').length;

  return (
    <section id="ucapan-section" className="py-16 px-4 bg-[#F8EFF1]/50 border-y border-[#EACFD5]/70">
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-10"
        >
          <div className="inline-block px-3 py-1 rounded-full bg-[#FDF2F4] border border-[#F3CBD3] text-[10px] font-sans uppercase tracking-[0.25em] font-bold text-[#8B3A4C] mb-2.5">
            Doa & Restu
          </div>
          <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#8B3A4C]">
            Buku Tamu & Ucapan
          </h3>
          <p className="text-xs text-[#7D686E] mt-1">
            Kirimkan ucapan selamat dan doa terbaik untuk ananda yang dikhitan
          </p>
          <div className="w-12 h-0.5 bg-[#BA5D72]/40 mx-auto mt-3 rounded-full" />
        </motion.div>

        {/* Form RSVP & Ucapan */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="bg-white rounded-[32px] p-6 sm:p-8 border border-[#EACFD5] shadow-xs mb-8"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="guest-input-name" className="block text-xs font-sans font-bold uppercase tracking-wider text-[#7D686E] mb-1.5">
                Nama Lengkap
              </label>
              <input
                id="guest-input-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Contoh: Budi Santoso & Keluarga"
                className="w-full px-4 py-2.5 rounded-2xl border border-[#EACFD5] text-sm focus:outline-none focus:ring-2 focus:ring-[#BA5D72]/30 bg-[#FDF7F8]/80 text-[#332A2E]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="guest-input-rel" className="block text-xs font-sans font-bold uppercase tracking-wider text-[#7D686E] mb-1.5">
                  Hubungan / Kerabat
                </label>
                <select
                  id="guest-input-rel"
                  value={relationship}
                  onChange={(e) => setRelationship(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-2xl border border-[#EACFD5] text-sm focus:outline-none focus:ring-2 focus:ring-[#BA5D72]/30 bg-white text-[#332A2E]"
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
                <label className="block text-xs font-sans font-bold uppercase tracking-wider text-[#7D686E] mb-1.5">
                  Konfirmasi Kehadiran
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  <button
                    type="button"
                    onClick={() => setAttendance('hadir')}
                    className={`py-2.5 px-1 rounded-2xl text-xs font-medium border text-center transition cursor-pointer ${
                      attendance === 'hadir'
                        ? 'bg-[#8B3A4C] text-white border-[#8B3A4C] shadow-xs'
                        : 'bg-[#FDF7F8] text-[#7D686E] border-[#EACFD5] hover:bg-[#FDF2F4]'
                    }`}
                  >
                    Hadir
                  </button>
                  <button
                    type="button"
                    onClick={() => setAttendance('ragu')}
                    className={`py-2.5 px-1 rounded-2xl text-xs font-medium border text-center transition cursor-pointer ${
                      attendance === 'ragu'
                        ? 'bg-[#BA5D72] text-white border-[#BA5D72] shadow-xs'
                        : 'bg-[#FDF7F8] text-[#7D686E] border-[#EACFD5] hover:bg-[#FDF2F4]'
                    }`}
                  >
                    Ragu
                  </button>
                  <button
                    type="button"
                    onClick={() => setAttendance('tidak_hadir')}
                    className={`py-2.5 px-1 rounded-2xl text-xs font-medium border text-center transition cursor-pointer ${
                      attendance === 'tidak_hadir'
                        ? 'bg-[#C48995] text-white border-[#C48995] shadow-xs'
                        : 'bg-[#FDF7F8] text-[#7D686E] border-[#EACFD5] hover:bg-[#FDF2F4]'
                    }`}
                  >
                    Maaf
                  </button>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="guest-input-msg" className="block text-xs font-sans font-bold uppercase tracking-wider text-[#7D686E] mb-1.5">
                Doa & Ucapan Selamat
              </label>
              <textarea
                id="guest-input-msg"
                required
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tuliskan doa restu untuk ananda (Contoh: Semoga menjadi anak yang sholeh, cerdas, dan berbakti...)"
                className="w-full px-4 py-2.5 rounded-2xl border border-[#EACFD5] text-sm focus:outline-none focus:ring-2 focus:ring-[#BA5D72]/30 bg-[#FDF7F8]/80 text-[#332A2E]"
              />
            </div>

            {isSubmitted && (
              <div className="p-3.5 bg-[#FDF2F4] border border-[#F3CBD3] rounded-2xl text-[#8B3A4C] text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#BA5D72] shrink-0" />
                <span>Terima kasih banyak! Doa dan ucapan Anda telah tersampaikan.</span>
              </div>
            )}

            <div className="space-y-3 pt-1">
              <button
                id="btn-kirim-ucapan"
                type="submit"
                className="w-full py-3.5 px-5 rounded-full bg-gradient-to-r from-[#8B3A4C] via-[#9E4559] to-[#8B3A4C] hover:opacity-95 text-white font-sans font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md shadow-rose-900/20 transition active:scale-[0.99] cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Kirim Ucapan di Website</span>
              </button>

              <div className="relative flex py-1 items-center">
                <div className="flex-grow border-t border-[#F0D5DA]" />
                <span className="flex-shrink mx-3 text-[10px] font-semibold text-[#9E878E] uppercase tracking-widest">
                  Atau Konfirmasi Cepat
                </span>
                <div className="flex-grow border-t border-[#F0D5DA]" />
              </div>

              <button
                id="btn-rsvp-whatsapp"
                type="button"
                onClick={handleWhatsAppRSVP}
                className="w-full py-3.5 px-5 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-sans font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-sm shadow-[#25D366]/25 transition active:scale-[0.99] cursor-pointer"
                title="Kirim konfirmasi pesan otomatis langsung ke WhatsApp orang tua"
              >
                <MessageCircle className="w-4 h-4 text-white shrink-0" />
                <span>RSVP via WhatsApp Orang Tua</span>
              </button>

              <p className="text-[11px] text-center text-[#9E878E] font-sans">
                Pesan WhatsApp otomatis terformat rapi sesuai status kehadiran & nama Anda ({fatherName ? `Bpk. ${fatherName}` : 'Orang Tua'}).
              </p>
            </div>
          </form>
        </motion.div>

        {/* Wishes List */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between text-xs text-[#7D686E] px-1 font-sans">
            <span className="font-semibold flex items-center gap-1.5">
              <Users className="w-4 h-4 text-[#BA5D72]" />
              {wishes.length} Doa & Ucapan Masuk
            </span>
            <span className="bg-[#FDF2F4] text-[#8B3A4C] border border-[#F3CBD3] px-3 py-0.5 rounded-full font-medium">
              {attendingCount} Konfirmasi Hadir
            </span>
          </div>

          <div className="max-h-96 overflow-y-auto space-y-3 pr-1">
            {wishes.map((wish) => (
              <div
                key={wish.id}
                className="bg-white p-5 rounded-3xl border border-[#EACFD5] shadow-xs"
              >
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h5 className="font-serif font-bold text-[#8B3A4C] text-base inline-block mr-2">
                      {wish.name}
                    </h5>
                    <span className="text-[11px] font-sans text-[#9E878E]">
                      • {wish.relationship}
                    </span>
                  </div>
                  {wish.attendance === 'hadir' && (
                    <span className="inline-flex items-center gap-1 text-[10px] px-2.5 py-0.5 rounded-full bg-[#FDF2F4] text-[#8B3A4C] border border-[#F3CBD3] font-medium">
                      <CheckCircle2 className="w-3 h-3 text-[#BA5D72]" /> Hadir
                    </span>
                  )}
                  {wish.attendance === 'ragu' && (
                    <span className="inline-flex items-center gap-1 text-[10px] px-2.5 py-0.5 rounded-full bg-[#FAF7F8] text-[#9E878E] border border-[#EACFD5] font-medium">
                      <HelpCircle className="w-3 h-3 text-[#9E878E]" /> Masih Ragu
                    </span>
                  )}
                  {wish.attendance === 'tidak_hadir' && (
                    <span className="inline-flex items-center gap-1 text-[10px] px-2.5 py-0.5 rounded-full bg-[#FDF2F4]/70 text-[#9E878E] border border-[#EACFD5] font-medium">
                      <XCircle className="w-3 h-3 text-[#9E878E]" /> Berhalangan
                    </span>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-[#4A3F44] leading-relaxed font-normal">
                  {wish.message}
                </p>
                <p className="text-[10px] text-[#B59DA4] mt-2.5">
                  {wish.createdAt}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
