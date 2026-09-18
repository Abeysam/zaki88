import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, MapPin, Navigation, CalendarPlus } from 'lucide-react';
import { InvitationData } from '../types';

interface EventScheduleSectionProps {
  data: InvitationData;
}

export const EventScheduleSection: React.FC<EventScheduleSectionProps> = ({ data }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date(`${data.eventDate}T09:00:00`).getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [data.eventDate]);

  // Format Indonesian date
  const formatIndonesianDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('id-ID', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  const createGoogleCalendarUrl = () => {
    const title = encodeURIComponent(`Walimatul Khitan ${data.childFullName}`);
    const details = encodeURIComponent(
      `Syukuran Walimatul Khitan putra kami tercinta, ${data.childFullName}. Bertempat di ${data.venueName}.`
    );
    const location = encodeURIComponent(`${data.venueName}, ${data.venueAddress}`);
    // Clean date string for gcal: YYYYMMDDTHHmmssZ
    const cleanDate = data.eventDate.replace(/-/g, '');
    const startTime = `${cleanDate}T020000Z`; // roughly 09:00 WIB (UTC+7)
    const endTime = `${cleanDate}T070000Z`; // roughly 14:00 WIB
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startTime}/${endTime}&details=${details}&location=${location}`;
  };

  return (
    <section id="acara-section" className="py-16 px-4">
      <div className="max-w-xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-10"
        >
          <div className="inline-block px-3 py-1 rounded-full bg-[#FDF2F4] border border-[#F3CBD3] text-[10px] font-sans uppercase tracking-[0.25em] font-bold text-[#8B3A4C] mb-2.5">
            Waktu & Tempat
          </div>
          <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#8B3A4C]">
            Rangkaian Acara
          </h3>
          <div className="w-12 h-0.5 bg-[#BA5D72]/40 mx-auto mt-3 rounded-full" />
        </motion.div>

        {/* Countdown Timer in Kadio Arctic Rose Style */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="bg-white text-[#332A2E] rounded-[32px] p-6 sm:p-8 mb-8 border border-[#EACFD5] shadow-lg shadow-rose-950/5 text-center relative overflow-hidden"
        >
          <div className="absolute -top-10 -right-10 w-36 h-36 bg-[#FDF2F4] rounded-full blur-2xl pointer-events-none" />
          <p className="text-xs font-sans font-bold text-[#BA5D72] uppercase tracking-[0.25em] mb-4">
            Hitung Mundur Acara
          </p>

          <div className="grid grid-cols-4 gap-2 sm:gap-4 mb-6">
            <div className="bg-[#FDF7F8] border border-[#F0D5DA] rounded-2xl p-3 sm:p-4 shadow-xs">
              <span className="block text-2xl sm:text-3xl font-serif font-bold text-[#8B3A4C]">
                {timeLeft.days}
              </span>
              <span className="text-[10px] sm:text-xs font-sans uppercase tracking-wider text-[#9E878E]">Hari</span>
            </div>
            <div className="bg-[#FDF7F8] border border-[#F0D5DA] rounded-2xl p-3 sm:p-4 shadow-xs">
              <span className="block text-2xl sm:text-3xl font-serif font-bold text-[#8B3A4C]">
                {timeLeft.hours}
              </span>
              <span className="text-[10px] sm:text-xs font-sans uppercase tracking-wider text-[#9E878E]">Jam</span>
            </div>
            <div className="bg-[#FDF7F8] border border-[#F0D5DA] rounded-2xl p-3 sm:p-4 shadow-xs">
              <span className="block text-2xl sm:text-3xl font-serif font-bold text-[#8B3A4C]">
                {timeLeft.minutes}
              </span>
              <span className="text-[10px] sm:text-xs font-sans uppercase tracking-wider text-[#9E878E]">Menit</span>
            </div>
            <div className="bg-[#FDF7F8] border border-[#F0D5DA] rounded-2xl p-3 sm:p-4 shadow-xs">
              <span className="block text-2xl sm:text-3xl font-serif font-bold text-[#8B3A4C]">
                {timeLeft.seconds}
              </span>
              <span className="text-[10px] sm:text-xs font-sans uppercase tracking-wider text-[#9E878E]">Detik</span>
            </div>
          </div>

          <a
            id="btn-add-calendar"
            href={createGoogleCalendarUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#FDF2F4] hover:bg-[#FBE4E8] border border-[#F3CBD3] text-[#8B3A4C] text-xs font-sans uppercase tracking-wider font-bold transition cursor-pointer shadow-xs"
          >
            <CalendarPlus className="w-4 h-4 text-[#BA5D72]" />
            <span>Simpan ke Google Calendar</span>
          </a>
        </motion.div>

        {/* Schedule Card */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="bg-white rounded-[32px] p-6 sm:p-8 border border-[#EACFD5] shadow-xs space-y-6"
        >
          {/* Card Header */}
          <div className="flex items-center gap-3.5 border-b border-[#F0D5DA] pb-4">
            <div className="w-12 h-12 rounded-2xl bg-[#FDF2F4] text-[#8B3A4C] border border-[#F3CBD3] flex items-center justify-center shadow-xs">
              <Calendar className="w-5 h-5 text-[#8B3A4C]" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-[#8B3A4C] text-xl">
                Syukuran Walimatul Khitan
              </h4>
              <p className="text-xs text-[#8C757B]">Resepsi & Ramah Tamah</p>
            </div>
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <Calendar className="w-4 h-4 text-[#BA5D72] mt-1 shrink-0" />
              <div>
                <p className="text-xs text-[#9E878E] font-medium font-sans">Hari & Tanggal</p>
                <p className="text-sm font-serif font-bold text-[#332A2E]">
                  {formatIndonesianDate(data.eventDate)}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-4 h-4 text-[#BA5D72] mt-1 shrink-0" />
              <div>
                <p className="text-xs text-[#9E878E] font-medium font-sans">Waktu Acara</p>
                <p className="text-sm font-serif font-bold text-[#332A2E]">
                  {data.eventTime}
                </p>
              </div>
            </div>
          </div>

          {/* Venue & Address */}
          <div className="flex items-start gap-3 pt-2 border-t border-[#F0D5DA]">
            <MapPin className="w-4 h-4 text-[#BA5D72] mt-1 shrink-0" />
            <div>
              <p className="text-xs text-[#9E878E] font-medium font-sans">Tempat / Lokasi</p>
              <p className="text-sm font-serif font-bold text-[#332A2E]">
                {data.venueName}
              </p>
              <p className="text-xs text-[#6C5E64] mt-1 leading-relaxed">
                {data.venueAddress}
              </p>
            </div>
          </div>

          {/* Map Preview & Button */}
          <div className="pt-2">
            <a
              id="btn-google-maps"
              href={data.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-5 rounded-full bg-gradient-to-r from-[#8B3A4C] via-[#9E4559] to-[#8B3A4C] hover:opacity-95 text-white font-sans font-bold text-xs uppercase tracking-wider shadow-md shadow-rose-900/20 transition active:scale-[0.99] cursor-pointer"
            >
              <Navigation className="w-4 h-4" />
              <span>Petunjuk Arah Google Maps</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
