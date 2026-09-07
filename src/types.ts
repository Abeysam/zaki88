export interface BankAccount {
  id: string;
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  logoColor?: string;
}

export interface WishMessage {
  id: string;
  name: string;
  relationship: string;
  attendance: 'hadir' | 'ragu' | 'tidak_hadir';
  message: string;
  createdAt: string;
}

export interface InvitationData {
  childFullName: string;
  childNickName: string;
  childOrder: string; // e.g. "Putra Pertama"
  fatherName: string;
  motherName: string;
  photoUrl: string;
  eventDate: string; // YYYY-MM-DD
  eventTime: string; // e.g. "09.00 WIB - Selesai"
  eventEndDate: string;
  venueName: string;
  venueAddress: string;
  googleMapsUrl: string;
  googleMapsEmbedUrl?: string;
  bankAccounts: BankAccount[];
  qrisImageUrl?: string;
  giftAddress?: string;
  galleryImages: string[];
  musicUrl?: string;
  musicTitle?: string;
  themeColor: 'emerald' | 'gold' | 'sapphire';
}
