import React, { useState, useRef } from 'react';
import { Image, Sliders, QrCode, X, Check, Upload, Trash2, Sparkles, RefreshCw } from 'lucide-react';
import { InvitationData } from '../types';

interface MediaSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: InvitationData;
  onSave: (updatedData: Partial<InvitationData>) => void;
}

export const MediaSettingsModal: React.FC<MediaSettingsModalProps> = ({
  isOpen,
  onClose,
  data,
  onSave,
}) => {
  const [coverPhotoUrl, setCoverPhotoUrl] = useState<string>(data.coverPhotoUrl || data.photoUrl || '');
  const [coverBackgroundUrl, setCoverBackgroundUrl] = useState<string>(data.coverBackgroundUrl || '');
  const [coverBackgroundOpacity, setCoverBackgroundOpacity] = useState<number>(
    typeof data.coverBackgroundOpacity === 'number' ? data.coverBackgroundOpacity : 0.22
  );
  const [qrisImageUrl, setQrisImageUrl] = useState<string>(data.qrisImageUrl || '');

  const fileInputCoverPhotoRef = useRef<HTMLInputElement>(null);
  const fileInputCoverBgRef = useRef<HTMLInputElement>(null);
  const fileInputQrisRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (val: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        if (uploadEvent.target?.result) {
          setter(uploadEvent.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleApply = () => {
    onSave({
      coverPhotoUrl,
      coverBackgroundUrl,
      coverBackgroundOpacity,
      qrisImageUrl,
    });
    onClose();
  };

  const handleResetToDefault = () => {
    setCoverPhotoUrl(data.photoUrl || '');
    setCoverBackgroundUrl('');
    setCoverBackgroundOpacity(0.22);
    setQrisImageUrl('');
    onSave({
      coverPhotoUrl: data.photoUrl || '',
      coverBackgroundUrl: '',
      coverBackgroundOpacity: 0.22,
      qrisImageUrl: '',
    });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-[#EACFD5] text-[#332A2E] my-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#F0D5DA] mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#FDF2F4] text-[#8B3A4C] flex items-center justify-center border border-[#F3CBD3]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-[#8B3A4C]">
                Pengaturan Foto & QR Code
              </h3>
              <p className="text-xs text-[#7D686E]">
                Sesuaikan Image 1 (Sampul), Image 2 (Background), & Image 3 (QRIS)
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-5 max-h-[65vh] overflow-y-auto pr-1">
          {/* IMAGE 1: Foto Sampul Depan */}
          <div className="p-4 rounded-2xl bg-[#FAF7F8] border border-[#F0D5DA]">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-[#8B3A4C] uppercase tracking-wider flex items-center gap-1.5">
                <Image className="w-4 h-4 text-[#BA5D72]" />
                <span>Image 1: Foto Sampul Depan</span>
              </label>
              {coverPhotoUrl && (
                <button
                  type="button"
                  onClick={() => setCoverPhotoUrl('')}
                  className="text-[11px] text-rose-600 hover:text-rose-800 flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 className="w-3 h-3" /> Hapus
                </button>
              )}
            </div>
            <p className="text-[11px] text-[#7D686E] mb-3">
              Foto portrait ananda yang tampil di dalam bingkai kubah lengkung sampul depan.
            </p>

            <div className="flex items-center gap-4">
              <div className="w-16 h-20 rounded-xl overflow-hidden border border-[#EACFD5] bg-white flex items-center justify-center shrink-0 shadow-xs">
                {coverPhotoUrl ? (
                  <img
                    src={coverPhotoUrl}
                    alt="Preview Sampul Depan"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-[10px] text-gray-400 text-center px-1">Kosong</span>
                )}
              </div>
              <div className="flex-1">
                <input
                  type="file"
                  ref={fileInputCoverPhotoRef}
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, setCoverPhotoUrl)}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputCoverPhotoRef.current?.click()}
                  className="w-full py-2.5 px-3 rounded-xl border border-[#BA5D72] bg-white hover:bg-[#FDF2F4] text-[#8B3A4C] text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer shadow-xs"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Pilih File Foto Sampul (Image 1)</span>
                </button>
              </div>
            </div>
          </div>

          {/* IMAGE 2: Background Sampul Awal & Opacity */}
          <div className="p-4 rounded-2xl bg-[#FAF7F8] border border-[#F0D5DA]">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-[#8B3A4C] uppercase tracking-wider flex items-center gap-1.5">
                <Sliders className="w-4 h-4 text-[#BA5D72]" />
                <span>Image 2: Background Sampul Awal</span>
              </label>
              {coverBackgroundUrl && (
                <button
                  type="button"
                  onClick={() => setCoverBackgroundUrl('')}
                  className="text-[11px] text-rose-600 hover:text-rose-800 flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 className="w-3 h-3" /> Hapus
                </button>
              )}
            </div>
            <p className="text-[11px] text-[#7D686E] mb-3">
              Foto dekorasi / standing ananda sebagai background sampul dengan transparansi (opacity) yang dapat disesuaikan.
            </p>

            <div className="flex items-center gap-4 mb-3">
              <div className="w-16 h-20 rounded-xl overflow-hidden border border-[#EACFD5] bg-white flex items-center justify-center shrink-0 shadow-xs relative">
                {coverBackgroundUrl ? (
                  <img
                    src={coverBackgroundUrl}
                    alt="Preview Background Sampul"
                    className="w-full h-full object-cover"
                    style={{ opacity: coverBackgroundOpacity }}
                  />
                ) : (
                  <span className="text-[10px] text-gray-400 text-center px-1">Kosong</span>
                )}
              </div>
              <div className="flex-1">
                <input
                  type="file"
                  ref={fileInputCoverBgRef}
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, setCoverBackgroundUrl)}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputCoverBgRef.current?.click()}
                  className="w-full py-2.5 px-3 rounded-xl border border-[#BA5D72] bg-white hover:bg-[#FDF2F4] text-[#8B3A4C] text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer shadow-xs"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Pilih File Background (Image 2)</span>
                </button>
              </div>
            </div>

            {/* Opacity Slider */}
            <div className="pt-2 border-t border-[#F0D5DA]/70">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-[#6C5E64] font-medium">Tingkat Transparansi (Opacity):</span>
                <span className="font-mono font-bold text-[#8B3A4C]">
                  {Math.round(coverBackgroundOpacity * 100)}%
                </span>
              </div>
              <input
                type="range"
                min="0.05"
                max="0.80"
                step="0.01"
                value={coverBackgroundOpacity}
                onChange={(e) => setCoverBackgroundOpacity(parseFloat(e.target.value))}
                className="w-full accent-[#8B3A4C] cursor-pointer"
              />
              <div className="flex justify-between items-center mt-2">
                <span className="text-[10px] text-gray-400">Halus (10%)</span>
                <div className="flex gap-1.5">
                  {[0.15, 0.22, 0.35, 0.50].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setCoverBackgroundOpacity(preset)}
                      className={`text-[10px] px-2 py-0.5 rounded-md border transition cursor-pointer ${
                        Math.round(coverBackgroundOpacity * 100) === Math.round(preset * 100)
                          ? 'bg-[#8B3A4C] text-white border-[#8B3A4C]'
                          : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      {Math.round(preset * 100)}%
                    </button>
                  ))}
                </div>
                <span className="text-[10px] text-gray-400">Jelas (80%)</span>
              </div>
            </div>
          </div>

          {/* IMAGE 3: QR Code E-Wallet yang Sebenarnya */}
          <div className="p-4 rounded-2xl bg-[#FAF7F8] border border-[#F0D5DA]">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-[#8B3A4C] uppercase tracking-wider flex items-center gap-1.5">
                <QrCode className="w-4 h-4 text-[#BA5D72]" />
                <span>Image 3: QR Code E-Wallet yang Sebenarnya</span>
              </label>
              {qrisImageUrl && (
                <button
                  type="button"
                  onClick={() => setQrisImageUrl('')}
                  className="text-[11px] text-rose-600 hover:text-rose-800 flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 className="w-3 h-3" /> Pakai QR Digital
                </button>
              )}
            </div>
            <p className="text-[11px] text-[#7D686E] mb-3">
              Foto lembar resmi flyer QRIS (Subhan Halabi, Pulsa & Internet) lengkap dengan logo QRIS dan GPN.
            </p>

            <div className="flex items-center gap-4">
              <div className="w-16 h-20 rounded-xl overflow-hidden border border-[#EACFD5] bg-white flex items-center justify-center shrink-0 shadow-xs">
                {qrisImageUrl ? (
                  <img
                    src={qrisImageUrl}
                    alt="Preview QRIS Asli"
                    className="w-full h-full object-contain p-0.5"
                  />
                ) : (
                  <span className="text-[10px] text-gray-400 text-center px-1">QR Standar</span>
                )}
              </div>
              <div className="flex-1">
                <input
                  type="file"
                  ref={fileInputQrisRef}
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, setQrisImageUrl)}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputQrisRef.current?.click()}
                  className="w-full py-2.5 px-3 rounded-xl border border-[#BA5D72] bg-white hover:bg-[#FDF2F4] text-[#8B3A4C] text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer shadow-xs"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Pilih File QRIS Asli (Image 3)</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-[#F0D5DA] mt-5 flex flex-col sm:flex-row gap-2.5 items-center justify-between">
          <button
            type="button"
            onClick={handleResetToDefault}
            className="w-full sm:w-auto py-2.5 px-4 rounded-full text-xs font-bold text-gray-500 hover:text-gray-800 hover:bg-gray-100 flex items-center justify-center gap-1.5 transition cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Awal</span>
          </button>
          <div className="w-full sm:w-auto flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 sm:flex-none py-2.5 px-5 rounded-full text-xs font-bold border border-gray-300 text-gray-700 hover:bg-gray-50 transition cursor-pointer"
            >
              Batal
            </button>
            <button
              type="button"
              onClick={handleApply}
              className="flex-1 sm:flex-none py-2.5 px-6 rounded-full text-xs font-bold bg-[#8B3A4C] text-white hover:bg-[#722A3B] shadow-md shadow-rose-900/20 flex items-center justify-center gap-1.5 transition cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>Terapkan Perubahan</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
