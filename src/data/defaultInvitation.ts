import { InvitationData, WishMessage } from '../types';
import photoZakiPortrait from '../assets/images/PXL_20260207_072930985.jpg';
import photoZaki1 from '../assets/images/DSC_4966.JPG';
import photoZaki2 from '../assets/images/DSC_5003.JPG';
import photoZaki3 from '../assets/images/PXL_20250517_075620952.jpg';
import defaultBacksound from '../assets/audio/backsound.mp3';

export const initialInvitationData: InvitationData = {
  childFullName: "ZAKI ALVARO",
  childNickName: "ZAKI",
  childOrder: "Putra Pertama",
  fatherName: "SUBHAN HALABI",
  motherName: "NUNUNG NURAENI",
  photoUrl: photoZakiPortrait,
  coverPhotoUrl: photoZakiPortrait,
  coverBackgroundUrl: "",
  coverBackgroundOpacity: 0.15,
  qrisImageUrl: "",
  eventDate: "2026-09-27",
  eventTime: "09.00 WIB s/d Selesai",
  eventEndDate: "2026-09-27T17:00:00",
  venueName: "Kediaman Bpk. Subhan Halabi & Ibu Nunung Nuraeni",
  venueAddress: "Ds. Pedaleman Kp. Pesisir RT 004 / RW 002, Pasar Lembentuk",
  googleMapsUrl: "https://maps.app.goo.gl/N1VXTG2Cn3iXbxLEA",
  googleMapsEmbedUrl: "https://maps.google.com/maps?q=Ds.pedaleman+Kp.pesisir+004%2F002+pasar+lembentuk&t=&z=15&ie=UTF8&iwloc=&output=embed",
  bankAccounts: [
    {
      id: "1",
      bankName: "DANA / Dompet Digital",
      accountNumber: "082124885823",
      accountHolder: "SUBHAN HALABI",
      logoColor: "bg-blue-600",
    },
    {
      id: "2",
      bankName: "QRIS Nasional (NMID)",
      accountNumber: "ID1026577197746",
      accountHolder: "SUBHAN HALABI, PULSA & INTERNET",
      logoColor: "bg-rose-700",
    }
  ],
  giftAddress: "Ds. Pedaleman Kp. Pesisir RT 004 / RW 002, Pasar Lembentuk (Kediaman Bpk. Subhan Halabi & Ibu Nunung Nuraeni) - Telp: 0821-2488-5823",
  galleryImages: [
    photoZakiPortrait,
    photoZaki1,
    photoZaki2,
    photoZaki3
  ],
  musicTitle: "A Thousand Years (Piano Instrumental)",
  musicUrl: defaultBacksound,
  whatsappNumber: "082124885823",
  themeColor: "emerald"
};

export const initialWishes: WishMessage[] = [
  {
    id: "w-1",
    name: "Keluarga Besar Kp. Pesisir",
    relationship: "Keluarga",
    attendance: "hadir",
    message: "Barakallahu fiik untuk ananda Zaki Alvaro. Semoga lekas sehat, menjadi anak yang sholeh, berbakti kepada ayah Subhan dan ibu Nunung, serta berguna bagi nusa, bangsa, dan agama. Aamiin yaa Rabbal 'aalamiin.",
    createdAt: "Baru saja"
  },
  {
    id: "w-2",
    name: "Sahabat & Kerabat Pasar Lembentuk",
    relationship: "Kerabat / Tetangga",
    attendance: "hadir",
    message: "Selamat atas khitanan ananda Zaki! Semoga ananda lekas sembuh, tumbuh menjadi anak yang pintar, berakhlak mulia, dan senantiasa dalam lindungan Allah SWT. Insya Allah kami hadir.",
    createdAt: "1 jam yang lalu"
  },
  {
    id: "w-3",
    name: "H. Abdullah & Rekan",
    relationship: "Rekan Bpk. Subhan Halabi",
    attendance: "hadir",
    message: "Alhamdulillah ananda Zaki Alvaro sudah menunaikan syariat khitan. Selamat berbahagia untuk Pak Subhan Halabi dan Bu Nunung Nuraeni sekeluarga.",
    createdAt: "3 jam yang lalu"
  }
];
