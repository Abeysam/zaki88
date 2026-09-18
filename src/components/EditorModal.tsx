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
          className="relative w-full max-w-lg bg-[#FAF7F8] rounded-[32px] p-6 sm:p-8 shadow-2xl border border-[#EACFD5] my-8 max-h-[90vh] flex flex-col font-sans"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-[#8B3A4C]/60 hover:text-[#8B3A4C] p-2 rounded-full hover:bg-[#FDF2F4] transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="mb-4">
            <h3 className="font-serif text-2xl font-bold text-[#8B3A4C] flex items-center gap-2.5">
              <Edit3 className="w-5 h-5 text-[#BA5D72]" />
              <span>Edit Data Undangan</span>
            </h3>
            <p className="text-xs text-[#7D686E] mt-1 font-sans">
              Sesuaikan data anak, nama orang tua, jadwal acara, dan rekening tanda kasih.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="overflow-y-auto flex-1 pr-1 space-y-4 text-xs text-[#332A2E]">
            {/* Section: Anak */}
            <div className="p-4 bg-white/90 rounded-2xl border border-[#EACFD5] space-y-3 shadow-2xs">
              <h5 className="font-sans font-bold text-[#8B3A4C] text-xs uppercase tracking-wider">Data Anak</h5>
              <div>
                <label className="block font-semibold mb-1 text-[#332A2E]">Nama Lengkap Anak:</label>
                <input
                  type="text"
                  required
                  value={formData.childFullName}
                  onChange={(e) => handleChange('childFullName', e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#EACFD5] bg-[#FAF7F8] text-xs focus:ring-2 focus:ring-[#BA5D72]/30 outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold mb-1 text-[#332A2E]">Nama Panggilan:</label>
                  <input
                    type="text"
                    required
                    value={formData.childNickName}
                    onChange={(e) => handleChange('childNickName', e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#EACFD5] bg-[#FAF7F8] text-xs focus:ring-2 focus:ring-[#BA5D72]/30 outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-[#332A2E]">Status / Urutan:</label>
                  <input
                    type="text"
                    placeholder="Contoh: Putra Pertama"
                    value={formData.childOrder}
                    onChange={(e) => handleChange('childOrder', e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#EACFD5] bg-[#FAF7F8] text-xs focus:ring-2 focus:ring-[#BA5D72]/30 outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block font-semibold mb-1 text-[#332A2E]">Foto Ananda:</label>
                <div className="flex items-center gap-3 mb-2">
                  <img
                    src={formData.photoUrl}
                    alt="Preview"
                    className="w-12 h-12 rounded-full object-cover border border-[#EACFD5] shadow-xs"
                  />
                  <label className="cursor-pointer px-3 py-1.5 rounded-full bg-[#FDF2F4] border border-[#F3CBD3] hover:bg-[#FBE8EC] text-[#8B3A4C] text-[11px] font-bold">
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
                  className="w-full px-3.5 py-2 rounded-xl border border-[#EACFD5] bg-[#FAF7F8] text-xs font-mono focus:ring-2 focus:ring-[#BA5D72]/30 outline-none"
                />
              </div>
            </div>

            {/* Section: Orang Tua */}
            <div className="p-4 bg-white/90 rounded-2xl border border-[#EACFD5] space-y-3 shadow-2xs">
              <h5 className="font-sans font-bold text-[#8B3A4C] text-xs uppercase tracking-wider">Orang Tua</h5>
              <div>
                <label className="block font-semibold mb-1 text-[#332A2E]">Nama Ayah:</label>
                <input
                  type="text"
                  value={formData.fatherName}
                  onChange={(e) => handleChange('fatherName', e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#EACFD5] bg-[#FAF7F8] text-xs focus:ring-2 focus:ring-[#BA5D72]/30 outline-none"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1 text-[#332A2E]">Nama Ibu:</label>
                <input
                  type="text"
                  value={formData.motherName}
                  onChange={(e) => handleChange('motherName', e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#EACFD5] bg-[#FAF7F8] text-xs focus:ring-2 focus:ring-[#BA5D72]/30 outline-none"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1 text-[#332A2E]">Nomor WhatsApp Orang Tua (RSVP):</label>
                <input
                  type="text"
                  placeholder="Contoh: 082124885823"
                  value={formData.whatsappNumber || ''}
                  onChange={(e) => handleChange('whatsappNumber', e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#EACFD5] bg-[#FAF7F8] text-xs font-mono focus:ring-2 focus:ring-[#BA5D72]/30 outline-none"
                />
                <p className="text-[10px] text-[#7D686E] mt-1">
                  Nomor ini digunakan untuk menerima pesan konfirmasi kehadiran tamu via WhatsApp.
                </p>
              </div>
            </div>

            {/* Section: Waktu & Lokasi */}
            <div className="p-4 bg-white/90 rounded-2xl border border-[#EACFD5] space-y-3 shadow-2xs">
              <h5 className="font-sans font-bold text-[#8B3A4C] text-xs uppercase tracking-wider">Waktu & Tempat</h5>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold mb-1 text-[#332A2E]">Tanggal Acara (YYYY-MM-DD):</label>
                  <input
                    type="date"
                    required
                    value={formData.eventDate}
                    onChange={(e) => handleChange('eventDate', e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#EACFD5] bg-[#FAF7F8] text-xs focus:ring-2 focus:ring-[#BA5D72]/30 outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-[#332A2E]">Waktu / Jam:</label>
                  <input
                    type="text"
                    value={formData.eventTime}
                    onChange={(e) => handleChange('eventTime', e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#EACFD5] bg-[#FAF7F8] text-xs focus:ring-2 focus:ring-[#BA5D72]/30 outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block font-semibold mb-1 text-[#332A2E]">Nama Tempat / Gedung:</label>
                <input
                  type="text"
                  value={formData.venueName}
                  onChange={(e) => handleChange('venueName', e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#EACFD5] bg-[#FAF7F8] text-xs focus:ring-2 focus:ring-[#BA5D72]/30 outline-none"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1 text-[#332A2E]">Alamat Lengkap:</label>
                <textarea
                  rows={2}
                  value={formData.venueAddress}
                  onChange={(e) => handleChange('venueAddress', e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#EACFD5] bg-[#FAF7F8] text-xs focus:ring-2 focus:ring-[#BA5D72]/30 outline-none"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1 text-[#332A2E]">Link Google Maps:</label>
                <input
                  type="text"
                  value={formData.googleMapsUrl}
                  onChange={(e) => handleChange('googleMapsUrl', e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#EACFD5] bg-[#FAF7F8] text-xs font-mono focus:ring-2 focus:ring-[#BA5D72]/30 outline-none"
                />
              </div>
            </div>

            {/* Section: Galeri Foto Kenangan */}
            <div className="p-4 bg-white/90 rounded-2xl border border-[#EACFD5] space-y-3 shadow-2xs">
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="font-sans font-bold text-[#8B3A4C] text-xs uppercase tracking-wider">
                    Galeri Foto Kenangan ({(formData.galleryImages || []).length} Foto)
                  </h5>
                  <p className="text-[11px] text-[#7D686E] mt-0.5">
                    Anda dapat menambah, mengganti, atau menghapus foto galeri di sini.
                  </p>
                </div>
                <label className="cursor-pointer px-3 py-1.5 rounded-full bg-[#FDF2F4] hover:bg-[#FBE8EC] text-[#8B3A4C] border border-[#F3CBD3] text-[11px] font-bold flex items-center gap-1 transition shadow-xs">
                  <Plus className="w-3.5 h-3.5 text-[#BA5D72]" />
                  <span>Tambah Foto</span>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const files = e.target.files;
                      if (!files || files.length === 0) return;
                      const validFiles = Array.from(files).filter((f: File) => f.type.startsWith('image/'));
                      const newUrls: string[] = [];
                      let count = 0;
                      validFiles.forEach((file: File) => {
                        const reader = new FileReader();
                        reader.onload = (uploadEvent) => {
                          if (uploadEvent.target?.result) {
                            newUrls.push(uploadEvent.target.result as string);
                          }
                          count++;
                          if (count === validFiles.length) {
                            handleChange('galleryImages', [...(formData.galleryImages || []), ...newUrls]);
                          }
                        };
                        reader.readAsDataURL(file);
                      });
                      e.target.value = '';
                    }}
                  />
                </label>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {(formData.galleryImages || []).map((imgUrl, gIdx) => (
                  <div key={gIdx} className="bg-[#FAF7F8] p-2 rounded-xl border border-[#EACFD5] text-center space-y-1.5 relative group">
                    <img
                      src={imgUrl}
                      alt={`Foto ${gIdx + 1}`}
                      className="w-full aspect-square object-cover rounded-lg border border-black/5"
                    />
                    <div className="flex items-center gap-1">
                      <label className="flex-1 cursor-pointer py-1 px-1 rounded bg-white hover:bg-[#FDF2F4] text-[#8B3A4C] text-[10px] font-bold truncate border border-[#EACFD5]">
                        Ganti #{gIdx + 1}
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

                      {(formData.galleryImages || []).length > 1 && (
                        <button
                          type="button"
                          onClick={() => {
                            const newGallery = [...(formData.galleryImages || [])];
                            newGallery.splice(gIdx, 1);
                            handleChange('galleryImages', newGallery);
                          }}
                          className="p-1 rounded bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 cursor-pointer"
                          title="Hapus foto ini"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section: Rekening Bank */}
            <div className="p-4 bg-white/90 rounded-2xl border border-[#EACFD5] space-y-3 shadow-2xs">
              <div className="flex items-center justify-between">
                <h5 className="font-sans font-bold text-[#8B3A4C] text-xs uppercase tracking-wider">Rekening Amplop</h5>
                <button
                  type="button"
                  onClick={handleAddBank}
                  className="text-[#8B3A4C] hover:text-[#BA5D72] text-[11px] font-bold uppercase tracking-wider flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> Tambah Bank
                </button>
              </div>

              {formData.bankAccounts.map((b, idx) => (
                <div key={b.id || idx} className="p-3 bg-[#FAF7F8] rounded-xl border border-[#EACFD5] space-y-2 relative">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[11px] text-[#8B3A4C]">Bank #{idx + 1}</span>
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
                      className="w-full px-3 py-1.5 rounded-lg border border-[#EACFD5] bg-white text-xs"
                    />
                    <input
                      type="text"
                      placeholder="No. Rekening"
                      value={b.accountNumber}
                      onChange={(e) => handleBankChange(idx, 'accountNumber', e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg border border-[#EACFD5] bg-white text-xs font-mono"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Atas Nama (a.n.)"
                    value={b.accountHolder}
                    onChange={(e) => handleBankChange(idx, 'accountHolder', e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg border border-[#EACFD5] bg-white text-xs"
                  />
                </div>
              ))}

              <div>
                <label className="block font-semibold mb-1 text-[#332A2E]">Upload / Gambar QRIS (Opsional):</label>
                <div className="flex items-center gap-3 mb-2">
                  <label className="cursor-pointer px-3 py-1.5 rounded-full bg-white border border-[#EACFD5] hover:bg-[#FDF2F4] text-[#8B3A4C] text-[11px] font-bold">
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
                <label className="block font-semibold mb-1 text-[#332A2E]">Alamat Kirim Kado Fisik:</label>
                <textarea
                  rows={2}
                  value={formData.giftAddress || ''}
                  onChange={(e) => handleChange('giftAddress', e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#EACFD5] bg-[#FAF7F8] text-xs focus:ring-2 focus:ring-[#BA5D72]/30 outline-none"
                />
              </div>
            </div>

            {/* Section: Musik Latar (Backsound) */}
            <div className="p-4 bg-white/90 rounded-2xl border border-[#EACFD5] space-y-3 shadow-2xs">
              <div className="flex items-center justify-between">
                <h5 className="font-sans font-bold text-[#8B3A4C] text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <Music className="w-3.5 h-3.5 text-[#BA5D72]" />
                  <span>Musik Latar Undangan (Backsound)</span>
                </h5>
              </div>

              <div>
                <label className="block font-semibold mb-1 text-[#332A2E]">Judul / Keterangan Musik:</label>
                <input
                  type="text"
                  placeholder="Contoh: Sholawat Badar, Instrumen Khitanan, dsb."
                  value={formData.musicTitle || ''}
                  onChange={(e) => handleChange('musicTitle', e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#EACFD5] bg-[#FAF7F8] text-xs focus:ring-2 focus:ring-[#BA5D72]/30 outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1 text-[#332A2E]">Ganti File Musik (MP3 / Audio):</label>
                <div className="space-y-2">
                  <label className="cursor-pointer inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#FDF2F4] border border-[#F3CBD3] hover:bg-[#FBE8EC] text-[#8B3A4C] text-xs font-bold transition shadow-2xs">
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
                <label className="block font-semibold mb-1 text-[#332A2E]">Atau Tautan URL Musik (Online .mp3):</label>
                <input
                  type="text"
                  placeholder="https://example.com/musik-islami.mp3 (opsional)"
                  value={formData.musicUrl && !formData.musicUrl.startsWith('data:') ? formData.musicUrl : ''}
                  onChange={(e) => handleChange('musicUrl', e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#EACFD5] bg-[#FAF7F8] text-xs font-mono focus:ring-2 focus:ring-[#BA5D72]/30 outline-none"
                />
                <p className="text-[10px] text-[#7D686E] mt-1">
                  Jika dikosongkan, website secara otomatis memutar melodi akustik syahdu & damai bawaan.
                </p>
              </div>
            </div>

            <div className="pt-2 sticky bottom-0 bg-[#FAF7F8] border-t border-[#EACFD5]">
              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-full bg-gradient-to-r from-[#8B3A4C] via-[#9E4559] to-[#8B3A4C] hover:opacity-95 text-white font-sans font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 shadow-md shadow-rose-950/20 transition active:scale-[0.99] cursor-pointer"
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
