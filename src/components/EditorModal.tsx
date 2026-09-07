import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Save, Edit3, Plus, Trash2, Music, Volume2, Upload, Disc } from 'lucide-react';
import { InvitationData, BankAccount } from '../types';

interface EditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: InvitationData;
  onSave: (newData: InvitationData) => void;
}

export const EditorModal: React.FC<EditorModalProps> = ({
  isOpen,
  onClose,
  data,
  onSave,
}) => {
  const [formData, setFormData] = useState<InvitationData>(data);

  if (!isOpen) return null;

  const handleChange = (field: keyof InvitationData, value: unknown) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleBankChange = (index: number, field: keyof BankAccount, val: string) => {
    const updated = [...formData.bankAccounts];
    updated[index] = { ...updated[index], [field]: val };
    setFormData((prev) => ({ ...prev, bankAccounts: updated }));
  };

  const handleAddBank = () => {
    const newBank: BankAccount = {
      id: Date.now().toString(),
      bankName: 'BCA',
      accountNumber: '',
      accountHolder: formData.fatherName || 'Nama Penerima',
    };
    setFormData((prev) => ({ ...prev, bankAccounts: [...prev.bankAccounts, newBank] }));
  };

  const handleRemoveBank = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      bankAccounts: prev.bankAccounts.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-lg bg-[#fcfcfb] rounded-[32px] p-6 sm:p-8 shadow-2xl border border-[#5A5A40]/25 my-8 max-h-[90vh] flex flex-col font-sans"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-[#5A5A40]/60 hover:text-[#343627] p-2 rounded-full hover:bg-[#E2E2D5]/50 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="mb-4">
            <h3 className="font-serif text-2xl font-bold text-[#343627] flex items-center gap-2.5">
              <Edit3 className="w-5 h-5 text-[#5A5A40]" />
              <span>Edit Data Undangan</span>
            </h3>
            <p className="text-xs text-[#5A5A40]/80 mt-1">
              Sesuaikan data anak, nama orang tua, jadwal acara, dan rekening tanda kasih.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="overflow-y-auto flex-1 pr-1 space-y-4 text-xs text-[#343627]">
            {/* Section: Anak */}
            <div className="p-4 bg-[#f5f5f0]/60 rounded-2xl border border-[#5A5A40]/20 space-y-3">
              <h5 className="font-sans font-bold text-[#5A5A40] text-xs uppercase tracking-wider">Data Anak</h5>
              <div>
                <label className="block font-semibold mb-1">Nama Lengkap Anak:</label>
                <input
                  type="text"
                  required
                  value={formData.childFullName}
                  onChange={(e) => handleChange('childFullName', e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#5A5A40]/25 bg-white text-xs focus:ring-1 focus:ring-[#5A5A40] outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold mb-1">Nama Panggilan:</label>
                  <input
                    type="text"
                    required
                    value={formData.childNickName}
                    onChange={(e) => handleChange('childNickName', e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#5A5A40]/25 bg-white text-xs focus:ring-1 focus:ring-[#5A5A40] outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Status / Urutan:</label>
                  <input
                    type="text"
                    placeholder="Contoh: Putra Pertama"
                    value={formData.childOrder}
                    onChange={(e) => handleChange('childOrder', e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#5A5A40]/25 bg-white text-xs focus:ring-1 focus:ring-[#5A5A40] outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block font-semibold mb-1">Foto Ananda:</label>
                <div className="flex items-center gap-3 mb-2">
                  <img
                    src={formData.photoUrl}
                    alt="Preview"
                    className="w-12 h-12 rounded-full object-cover border border-[#5A5A40]/30 shadow-xs"
                  />
                  <label className="cursor-pointer px-3 py-1.5 rounded-full bg-white border border-[#5A5A40]/30 hover:bg-[#f5f5f0] text-[#5A5A40] text-[11px] font-bold">
                    Pilih Foto dari HP / Laptop
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (uploadEvent) => {
                            if (uploadEvent.target?.result) {
                              handleChange('photoUrl', uploadEvent.target.result as string);
                            }
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </label>
                </div>
                <input
                  type="text"
                  placeholder="Atau masukkan tautan URL foto"
                  value={formData.photoUrl}
                  onChange={(e) => handleChange('photoUrl', e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#5A5A40]/25 bg-white text-xs font-mono focus:ring-1 focus:ring-[#5A5A40] outline-none"
                />
              </div>
            </div>

            {/* Section: Orang Tua */}
            <div className="p-4 bg-[#f5f5f0]/60 rounded-2xl border border-[#5A5A40]/20 space-y-3">
              <h5 className="font-sans font-bold text-[#5A5A40] text-xs uppercase tracking-wider">Orang Tua</h5>
              <div>
                <label className="block font-semibold mb-1">Nama Ayah:</label>
                <input
                  type="text"
                  value={formData.fatherName}
                  onChange={(e) => handleChange('fatherName', e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#5A5A40]/25 bg-white text-xs focus:ring-1 focus:ring-[#5A5A40] outline-none"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Nama Ibu:</label>
                <input
                  type="text"
                  value={formData.motherName}
                  onChange={(e) => handleChange('motherName', e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#5A5A40]/25 bg-white text-xs focus:ring-1 focus:ring-[#5A5A40] outline-none"
                />
              </div>
            </div>

            {/* Section: Waktu & Lokasi */}
            <div className="p-4 bg-[#f5f5f0]/60 rounded-2xl border border-[#5A5A40]/20 space-y-3">
              <h5 className="font-sans font-bold text-[#5A5A40] text-xs uppercase tracking-wider">Waktu & Tempat</h5>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold mb-1">Tanggal Acara (YYYY-MM-DD):</label>
                  <input
                    type="date"
                    required
                    value={formData.eventDate}
                    onChange={(e) => handleChange('eventDate', e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#5A5A40]/25 bg-white text-xs focus:ring-1 focus:ring-[#5A5A40] outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Waktu / Jam:</label>
                  <input
                    type="text"
                    value={formData.eventTime}
                    onChange={(e) => handleChange('eventTime', e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#5A5A40]/25 bg-white text-xs focus:ring-1 focus:ring-[#5A5A40] outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block font-semibold mb-1">Nama Tempat / Gedung:</label>
                <input
                  type="text"
                  value={formData.venueName}
                  onChange={(e) => handleChange('venueName', e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#5A5A40]/25 bg-white text-xs focus:ring-1 focus:ring-[#5A5A40] outline-none"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Alamat Lengkap:</label>
                <textarea
                  rows={2}
                  value={formData.venueAddress}
                  onChange={(e) => handleChange('venueAddress', e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#5A5A40]/25 bg-white text-xs focus:ring-1 focus:ring-[#5A5A40] outline-none"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Link Google Maps:</label>
                <input
                  type="text"
                  value={formData.googleMapsUrl}
                  onChange={(e) => handleChange('googleMapsUrl', e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#5A5A40]/25 bg-white text-xs font-mono focus:ring-1 focus:ring-[#5A5A40] outline-none"
                />
              </div>
            </div>

            {/* Section: Galeri Foto Kenangan */}
            <div className="p-4 bg-[#f5f5f0]/60 rounded-2xl border border-[#5A5A40]/20 space-y-3">
              <h5 className="font-sans font-bold text-[#5A5A40] text-xs uppercase tracking-wider">Galeri Foto Kenangan (4 Foto)</h5>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {(formData.galleryImages || []).map((imgUrl, gIdx) => (
                  <div key={gIdx} className="bg-white p-2 rounded-xl border border-[#5A5A40]/20 text-center space-y-1.5">
                    <img
                      src={imgUrl}
                      alt={`Foto ${gIdx + 1}`}
                      className="w-full aspect-square object-cover rounded-lg border border-black/5"
                    />
                    <label className="block cursor-pointer py-1 px-1.5 rounded bg-[#f5f5f0] hover:bg-[#e8e8e2] text-[#5A5A40] text-[10px] font-bold truncate">
                      Ganti Foto {gIdx + 1}
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = (uploadEvent) => {
                              if (uploadEvent.target?.result) {
                                const newGallery = [...(formData.galleryImages || [])];
                                newGallery[gIdx] = uploadEvent.target.result as string;
                                handleChange('galleryImages', newGallery);
                              }
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Section: Rekening Bank */}
            <div className="p-4 bg-[#f5f5f0]/60 rounded-2xl border border-[#5A5A40]/20 space-y-3">
              <div className="flex items-center justify-between">
                <h5 className="font-sans font-bold text-[#5A5A40] text-xs uppercase tracking-wider">Rekening Amplop</h5>
                <button
                  type="button"
                  onClick={handleAddBank}
                  className="text-[#5A5A40] hover:text-[#343627] text-[11px] font-bold uppercase tracking-wider flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> Tambah Bank
                </button>
              </div>

              {formData.bankAccounts.map((b, idx) => (
                <div key={b.id || idx} className="p-3 bg-white rounded-xl border border-[#5A5A40]/20 space-y-2 relative">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[11px] text-[#5A5A40]">Bank #{idx + 1}</span>
                    {formData.bankAccounts.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveBank(idx)}
                        className="text-red-500 hover:text-red-700 p-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Nama Bank (BCA, BSI)"
                      value={b.bankName}
                      onChange={(e) => handleBankChange(idx, 'bankName', e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg border border-[#5A5A40]/25 text-xs"
                    />
                    <input
                      type="text"
                      placeholder="No. Rekening"
                      value={b.accountNumber}
                      onChange={(e) => handleBankChange(idx, 'accountNumber', e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg border border-[#5A5A40]/25 text-xs font-mono"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Atas Nama (a.n.)"
                    value={b.accountHolder}
                    onChange={(e) => handleBankChange(idx, 'accountHolder', e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg border border-[#5A5A40]/25 text-xs"
                  />
                </div>
              ))}

              <div>
                <label className="block font-semibold mb-1">Upload / Gambar QRIS (Opsional):</label>
                <div className="flex items-center gap-3 mb-2">
                  <label className="cursor-pointer px-3 py-1.5 rounded-full bg-white border border-[#5A5A40]/30 hover:bg-[#f5f5f0] text-[#5A5A40] text-[11px] font-bold">
                    Pilih Gambar QRIS dari File
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (uploadEvent) => {
                            if (uploadEvent.target?.result) {
                              handleChange('qrisImageUrl', uploadEvent.target.result as string);
                            }
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </label>
                  {formData.qrisImageUrl && (
                    <button
                      type="button"
                      onClick={() => handleChange('qrisImageUrl', '')}
                      className="text-red-500 hover:text-red-700 text-[11px] font-medium"
                    >
                      Hapus Custom QRIS
                    </button>
                  )}
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Alamat Kirim Kado Fisik:</label>
                <textarea
                  rows={2}
                  value={formData.giftAddress || ''}
                  onChange={(e) => handleChange('giftAddress', e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#5A5A40]/25 bg-white text-xs focus:ring-1 focus:ring-[#5A5A40] outline-none"
                />
              </div>
            </div>

            {/* Section: Musik Latar (Backsound) */}
            <div className="p-4 bg-[#f5f5f0]/60 rounded-2xl border border-[#5A5A40]/20 space-y-3">
              <div className="flex items-center justify-between">
                <h5 className="font-sans font-bold text-[#5A5A40] text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <Music className="w-3.5 h-3.5" />
                  <span>Musik Latar Undangan (Backsound)</span>
                </h5>
              </div>

              <div>
                <label className="block font-semibold mb-1">Judul / Keterangan Musik:</label>
                <input
                  type="text"
                  placeholder="Contoh: Sholawat Badar, Instrumen Khitanan, dsb."
                  value={formData.musicTitle || ''}
                  onChange={(e) => handleChange('musicTitle', e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#5A5A40]/25 bg-white text-xs focus:ring-1 focus:ring-[#5A5A40] outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Ganti File Musik (MP3 / Audio):</label>
                <div className="space-y-2">
                  <label className="cursor-pointer inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white border border-[#5A5A40]/30 hover:bg-[#f5f5f0] text-[#5A5A40] text-xs font-bold transition shadow-2xs">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Pilih Lagu MP3 dari HP / Laptop</span>
                    <input
                      type="file"
                      accept="audio/*,.mp3,.m4a,.wav"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (uploadEvent) => {
                            if (uploadEvent.target?.result) {
                              handleChange('musicUrl', uploadEvent.target.result as string);
                              if (!formData.musicTitle || formData.musicTitle === "Instrumen Khitanan") {
                                const cleanName = file.name.replace(/\.[^/.]+$/, "");
                                handleChange('musicTitle', cleanName);
                              }
                            }
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </label>

                  {formData.musicUrl && formData.musicUrl.startsWith('data:') && (
                    <div className="flex items-center gap-2 text-[11px] text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
                      <Disc className="w-3.5 h-3.5 animate-spin" />
                      <span className="font-medium">File audio kustom aktif terpilih</span>
                      <button
                        type="button"
                        onClick={() => {
                          handleChange('musicUrl', '');
                          handleChange('musicTitle', 'Instrumen Syahdu Khitanan');
                        }}
                        className="ml-auto text-red-600 hover:underline font-bold cursor-pointer"
                      >
                        Reset Bawaan
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Atau Tautan URL Musik (Online .mp3):</label>
                <input
                  type="text"
                  placeholder="https://example.com/musik-islami.mp3 (opsional)"
                  value={formData.musicUrl && !formData.musicUrl.startsWith('data:') ? formData.musicUrl : ''}
                  onChange={(e) => handleChange('musicUrl', e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#5A5A40]/25 bg-white text-xs font-mono focus:ring-1 focus:ring-[#5A5A40] outline-none"
                />
                <p className="text-[10px] text-[#5A5A40]/70 mt-1">
                  Jika dikosongkan, website secara otomatis memutar melodi akustik syahdu & damai bawaan.
                </p>
              </div>
            </div>

            <div className="pt-2 sticky bottom-0 bg-[#fcfcfb] border-t border-[#5A5A40]/15">
              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-full bg-[#5A5A40] hover:bg-[#484833] text-white font-sans font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 shadow-sm transition active:scale-[0.99] cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Simpan Perubahan Undangan</span>
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
