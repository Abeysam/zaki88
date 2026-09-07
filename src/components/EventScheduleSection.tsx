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
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-[0.25em] font-sans font-bold text-[#5A5A40]/75 mb-1.5">
            Waktu & Tempat
          </p>
          <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#343627]">
            Rangkaian Acara
          </h3>
          <div className="w-12 h-0.5 bg-[#5A5A40]/30 mx-auto mt-3 rounded-full" />
        </div>

        {/* Countdown Timer */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#2D2F24] text-[#E2E2D5] rounded-[32px] p-6 sm:p-8 mb-8 border border-[#5A5A40]/30 shadow-xl text-center relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#5A5A40]/20 rounded-full blur-2xl pointer-events-none" />
          <p className="text-xs font-sans font-bold text-[#B8B8A4] uppercase tracking-[0.25em] mb-4">
            Hitung Mundur Acara
          </p>

          <div className="grid grid-cols-4 gap-2 sm:gap-4 mb-6">
            <div className="bg-[#383A2E]/90 border border-[#5A5A40]/30 rounded-2xl p-3">
              <span className="block text-2xl sm:text-3xl font-serif font-bold text-[#F5F5F0]">
                {timeLeft.days}
              </span>
              <span className="text-[10px] sm:text-xs font-sans uppercase tracking-wider text-[#A6A692]">Hari</span>
            </div>
            <div className="bg-[#383A2E]/90 border border-[#5A5A40]/30 rounded-2xl p-3">
              <span className="block text-2xl sm:text-3xl font-serif font-bold text-[#F5F5F0]">
                {timeLeft.hours}
              </span>
              <span className="text-[10px] sm:text-xs font-sans uppercase tracking-wider text-[#A6A692]">Jam</span>
            </div>
            <div className="bg-[#383A2E]/90 border border-[#5A5A40]/30 rounded-2xl p-3">
              <span className="block text-2xl sm:text-3xl font-serif font-bold text-[#F5F5F0]">
                {timeLeft.minutes}
              </span>
              <span className="text-[10px] sm:text-xs font-sans uppercase tracking-wider text-[#A6A692]">Menit</span>
            </div>
            <div className="bg-[#383A2E]/90 border border-[#5A5A40]/30 rounded-2xl p-3">
              <span className="block text-2xl sm:text-3xl font-serif font-bold text-[#F5F5F0]">
                {timeLeft.seconds}
              </span>
              <span className="text-[10px] sm:text-xs font-sans uppercase tracking-wider text-[#A6A692]">Detik</span>
            </div>
          </div>

          <a
            id="btn-add-calendar"
            href={createGoogleCalendarUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#5A5A40] hover:bg-[#4A4A33] border border-[#E2E2D5]/20 text-[#F5F5F0] text-xs font-sans uppercase tracking-wider font-bold transition cursor-pointer"
          >
            <CalendarPlus className="w-4 h-4 text-[#E2E2D5]" />
            <span>Simpan ke Google Calendar</span>
          </a>
        </motion.div>

        {/* Schedule Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/80 backdrop-blur-xs rounded-[32px] p-6 sm:p-8 border border-[#5A5A40]/20 shadow-xs space-y-6"
        >
          {/* Card Header */}
          <div className="flex items-center gap-3.5 border-b border-[#5A5A40]/15 pb-4">
            <div className="w-11 h-11 rounded-2xl bg-[#E2E2D5] text-[#5A5A40] flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-[#343627] text-lg">
                Syukuran Walimatul Khitan
              </h4>
              <p className="text-xs text-[#5A5A40]/80">Resepsi & Ramah Tamah</p>
            </div>
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <Calendar className="w-4 h-4 text-[#5A5A40] mt-1 shrink-0" />
              <div>
                <p className="text-xs text-[#5A5A40]/70 font-medium font-sans">Hari & Tanggal</p>
                <p className="text-sm font-serif font-bold text-[#343627]">
                  {formatIndonesianDate(data.eventDate)}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-4 h-4 text-[#5A5A40] mt-1 shrink-0" />
              <div>
                <p className="text-xs text-[#5A5A40]/70 font-medium font-sans">Waktu Acara</p>
                <p className="text-sm font-serif font-bold text-[#343627]">
                  {data.eventTime}
                </p>
              </div>
            </div>
          </div>

          {/* Venue & Address */}
          <div className="flex items-start gap-3 pt-2 border-t border-[#5A5A40]/15">
            <MapPin className="w-4 h-4 text-[#5A5A40] mt-1 shrink-0" />
            <div>
              <p className="text-xs text-[#5A5A40]/70 font-medium font-sans">Tempat / Lokasi</p>
              <p className="text-sm font-serif font-bold text-[#343627]">
                {data.venueName}
              </p>
              <p className="text-xs text-[#5A5A40]/90 mt-1 leading-relaxed">
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
              className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-5 rounded-full bg-[#5A5A40] hover:bg-[#484833] text-white font-sans font-bold text-xs uppercase tracking-wider shadow-xs transition active:scale-[0.99] cursor-pointer"
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
