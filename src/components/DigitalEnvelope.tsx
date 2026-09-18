import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Gift, Copy, Check, CreditCard, Package, QrCode, Download, ShieldCheck } from 'lucide-react';
import QRCode from 'qrcode';
import confetti from 'canvas-confetti';
import { BankAccount } from '../types';

interface DigitalEnvelopeProps {
  bankAccounts: BankAccount[];
  giftAddress?: string;
  qrisImageUrl?: string;
}

export const DigitalEnvelope: React.FC<DigitalEnvelopeProps> = ({
  bankAccounts,
  giftAddress,
  qrisImageUrl,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [copiedNmid, setCopiedNmid] = useState(false);
  const [activeTab, setActiveTab] = useState<'qris' | 'bank' | 'gift'>('qris');
  const [generatedQr, setGeneratedQr] = useState<string | null>(null);
  const [hasAutoCelebrated, setHasAutoCelebrated] = useState(false);

  // Default QRIS details from user
  const qrisNmid = "ID1026577197746";
  const qrisMerchant = "SUBHAN HALABI, PULSA & INTERNET";

  const triggerEnvelopeWelcomeCelebration = () => {
    if (hasAutoCelebrated) return;
    setHasAutoCelebrated(true);
    confetti({
      particleCount: 32,
      spread: 55,
      origin: { y: 0.75 },
      colors: ['#BA5D72', '#E0A899', '#D4AF37', '#FAF7F8', '#8B3A4C'],
      zIndex: 9999,
      disableForReducedMotion: true,
    });
  };

  useEffect(() => {
    // Generate high resolution QR code for QRIS
    const payload = `00020101021126580014ID.LINKAJA.WWW01189360091400000000000213${qrisNmid}0303UMI51440014ID.CO.QRIS.WWW0215${qrisNmid}0303UMI5204481253033605802ID5929SUBHAN HALABI, PULSA & INTE6007SERANG 6105421936304C92E`;
    QRCode.toDataURL(payload, {
      width: 480,
      margin: 1,
      color: {
        dark: '#000000',
        light: '#ffffff'
      },
      errorCorrectionLevel: 'M'
    }).then((url) => {
      setGeneratedQr(url);
    }).catch(() => {
      // Fallback to simple QR string
      QRCode.toDataURL(qrisNmid, { width: 480 }).then(setGeneratedQr);
    });
  }, [qrisNmid]);

  const triggerSmallConfetti = () => {
    confetti({
      particleCount: 24,
      spread: 45,
      origin: { y: 0.8 },
      colors: ['#BA5D72', '#E0A899', '#D4AF37', '#FAF7F8'],
      zIndex: 9999,
      disableForReducedMotion: true,
    });
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    triggerSmallConfetti();
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleCopyAddress = () => {
    if (!giftAddress) return;
    navigator.clipboard.writeText(giftAddress);
    setCopiedAddress(true);
    triggerSmallConfetti();
    setTimeout(() => setCopiedAddress(false), 2500);
  };

  const handleCopyNmid = () => {
    navigator.clipboard.writeText(qrisNmid);
    setCopiedNmid(true);
    triggerSmallConfetti();
    setTimeout(() => setCopiedNmid(false), 2500);
  };

  return (
    <section id="amplop-section" className="py-16 px-4">
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          onViewportEnter={triggerEnvelopeWelcomeCelebration}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-8"
        >
          <div className="inline-block px-3 py-1 rounded-full bg-[#FDF2F4] border border-[#F3CBD3] text-[10px] font-sans uppercase tracking-[0.25em] font-bold text-[#8B3A4C] mb-2.5">
            Tanda Kasih
          </div>
          <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#8B3A4C]">
            Amplop Digital
          </h3>
          <p className="text-xs text-[#7D686E] mt-2 max-w-md mx-auto leading-relaxed">
            Doa restu Anda merupakan karunia yang sangat berharga bagi kami. Namun jika
            memberi adalah ungkapan tanda kasih, Anda dapat menyampaikannya secara cashless melalui:
          </p>
          <div className="w-12 h-0.5 bg-[#BA5D72]/40 mx-auto mt-3 rounded-full" />
        </motion.div>

        {/* Tab Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="flex rounded-full bg-[#F8EFF1] p-1.5 mb-6 max-w-md mx-auto border border-[#EACFD5] font-sans"
        >
          <button
            type="button"
            onClick={() => setActiveTab('qris')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-full text-xs font-bold uppercase tracking-wider transition cursor-pointer ${
              activeTab === 'qris'
                ? 'bg-[#8B3A4C] text-white shadow-xs'
                : 'text-[#7D686E] hover:text-[#8B3A4C]'
            }`}
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>QRIS</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('bank')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-full text-xs font-bold uppercase tracking-wider transition cursor-pointer ${
              activeTab === 'bank'
                ? 'bg-[#8B3A4C] text-white shadow-xs'
                : 'text-[#7D686E] hover:text-[#8B3A4C]'
            }`}
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>Transfer / E-Wallet</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('gift')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-full text-xs font-bold uppercase tracking-wider transition cursor-pointer ${
              activeTab === 'gift'
                ? 'bg-[#8B3A4C] text-white shadow-xs'
                : 'text-[#7D686E] hover:text-[#8B3A4C]'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>Kado</span>
          </button>
        </motion.div>

        {/* Tab 1: QRIS Card */}
        {activeTab === 'qris' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white border border-[#EACFD5] rounded-[32px] p-6 sm:p-7 shadow-lg shadow-rose-950/5 text-center overflow-hidden"
          >
            {/* Authentic QRIS Flyer or QR Code Banner */}
            {qrisImageUrl ? (
              <div className="mb-4">
                <div className="bg-[#FAF7F8] p-2 sm:p-3 rounded-2xl border border-[#F0D5DA] inline-block shadow-inner max-w-xs mx-auto overflow-hidden">
                  <img
                    src={qrisImageUrl}
                    alt="QRIS Standar Pembayaran Nasional Subhan Halabi"
                    className="w-full max-w-[280px] h-auto object-contain mx-auto rounded-xl shadow-xs"
                  />
                </div>
              </div>
            ) : (
              <>
                {/* Authentic QRIS Header Banner */}
                <div className="flex items-center justify-between border-b border-[#F0D5DA] pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="font-sans font-black text-xl tracking-tight text-red-600">
                      QRIS
                    </span>
                    <span className="text-[10px] text-gray-500 font-sans leading-none text-left hidden sm:inline-block">
                      QR Code Standar<br />Pembayaran Nasional
                    </span>
                  </div>
                  <div className="flex items-center gap-1 bg-red-50 text-red-700 px-2.5 py-1 rounded-full text-[11px] font-bold">
                    <ShieldCheck className="w-3.5 h-3.5 text-red-600" />
                    <span>GPN</span>
                  </div>
                </div>

                {/* Merchant Name & NMID */}
                <div className="mb-4">
                  <h4 className="font-sans font-extrabold text-[#332A2E] text-base sm:text-lg tracking-wide uppercase">
                    {qrisMerchant}
                  </h4>
                  <div className="flex items-center justify-center gap-2 mt-1">
                    <p className="text-xs text-gray-600 font-mono">
                      NMID: <span className="font-bold text-gray-800">{qrisNmid}</span>
                    </p>
                    <button
                      type="button"
                      onClick={handleCopyNmid}
                      title="Salin NMID"
                      className="text-gray-400 hover:text-gray-700 p-0.5 rounded cursor-pointer"
                    >
                      {copiedNmid ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  <span className="inline-block text-[10px] text-gray-400 font-mono mt-0.5">
                    A01 • SATU QRIS UNTUK SEMUA
                  </span>
                </div>

                {/* Center QR Code Image */}
                <div className="bg-[#FAF7F8] p-4 rounded-2xl border border-[#F0D5DA] inline-block mb-4 shadow-inner max-w-xs mx-auto min-h-[224px] flex items-center justify-center">
                  {generatedQr ? (
                    <img
                      src={generatedQr}
                      alt="QRIS Subhan Halabi"
                      className="w-56 h-56 sm:w-64 sm:h-64 object-contain mx-auto rounded-lg"
                    />
                  ) : (
                    <div className="w-56 h-56 sm:w-64 sm:h-64 flex items-center justify-center text-xs text-[#7D686E]">
                      Memuat QRIS...
                    </div>
                  )}
                </div>
              </>
            )}

            {/* Instruction & Supported Apps */}
            <p className="text-xs text-[#7D686E] mb-4 max-w-xs mx-auto leading-relaxed">
              Dapat discan menggunakan aplikasi Mobile Banking apa saja (BCA, Mandiri, BRI, BSI) maupun E-Wallet (DANA, GoPay, OVO, ShopeePay, LinkAja).
            </p>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={handleCopyNmid}
                className="py-3 px-4 rounded-full text-xs font-sans font-bold uppercase tracking-wider flex items-center justify-center gap-2 border border-[#EACFD5] text-[#8B3A4C] hover:bg-[#FDF2F4] transition cursor-pointer"
              >
                {copiedNmid ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>NMID Disalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Salin NMID</span>
                  </>
                )}
              </button>

              {(qrisImageUrl || generatedQr) && (
                <a
                  href={qrisImageUrl || generatedQr}
                  download="QRIS-Subhan-Halabi.png"
                  className="py-3 px-4 rounded-full text-xs font-sans font-bold uppercase tracking-wider flex items-center justify-center gap-2 bg-gradient-to-r from-[#8B3A4C] via-[#9E4559] to-[#8B3A4C] hover:opacity-95 text-white shadow-md shadow-rose-900/20 transition cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Unduh QR Code</span>
                </a>
              )}
            </div>
          </motion.div>
        )}

        {/* Tab 2: Bank Accounts & E-Wallet */}
        {activeTab === 'bank' && (
          <div className="space-y-4">
            {bankAccounts.map((account) => {
              const isCopied = copiedId === account.id;
              return (
                <motion.div
                  key={account.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white border border-[#EACFD5] rounded-[32px] p-6 sm:p-7 shadow-xs relative overflow-hidden"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-serif font-bold text-base sm:text-lg text-[#8B3A4C] tracking-wide">
                      {account.bankName}
                    </span>
                    <span className="text-[11px] px-3 py-1 rounded-full bg-[#FDF2F4] font-sans font-medium text-[#8B3A4C] border border-[#F3CBD3]">
                      Rekening / E-Wallet
                    </span>
                  </div>

                  <div className="bg-[#FDF7F8] border border-[#F0D5DA] rounded-2xl p-4 mb-4">
                    <p className="text-xs text-[#9E878E] font-sans uppercase tracking-wider mb-1">Nomor Rekening / Nomor Ponsel:</p>
                    <p className="font-mono text-xl sm:text-2xl font-bold text-[#332A2E] tracking-wider">
                      {account.accountNumber}
                    </p>
                    <p className="text-xs text-[#7D686E] mt-1.5">
                      Atas Nama: <span className="font-bold text-[#332A2E] uppercase">{account.accountHolder}</span>
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCopy(account.accountNumber, account.id)}
                    className={`w-full py-3 px-4 rounded-full text-xs font-sans font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition cursor-pointer ${
                      isCopied
                        ? 'bg-[#6D2838] text-white shadow-xs'
                        : 'bg-gradient-to-r from-[#8B3A4C] via-[#9E4559] to-[#8B3A4C] hover:opacity-95 text-white shadow-md shadow-rose-900/20'
                    }`}
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-4 h-4 text-white" />
                        <span>Nomor Berhasil Disalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Salin Nomor Rekening / E-Wallet</span>
                      </>
                    )}
                  </button>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Tab 3: Gift Address */}
        {activeTab === 'gift' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white border border-[#EACFD5] rounded-[32px] p-6 sm:p-7 shadow-xs"
          >
            <div className="flex items-center gap-2.5 mb-3">
              <Gift className="w-5 h-5 text-[#BA5D72]" />
              <h4 className="font-serif font-bold text-[#8B3A4C] text-base sm:text-lg">
                Alamat Kirim Kado Khitan
              </h4>
            </div>
            <p className="text-xs text-[#7D686E] mb-4 leading-relaxed">
              Bagi Anda yang ingin mengirimkan kado fisik untuk ananda Zaki Alvaro, dapat dikirimkan ke alamat berikut:
            </p>

            <div className="bg-[#FDF7F8] border border-[#F0D5DA] rounded-2xl p-4 text-xs sm:text-sm text-[#332A2E] mb-4 leading-relaxed font-medium">
              {giftAddress || "Ds. Pedaleman Kp. Pesisir RT 004 / RW 002, Pasar Lembentuk (Kediaman Bpk. Subhan Halabi & Ibu Nunung Nuraeni) - Telp: 0821-2488-5823"}
            </div>

            <button
              type="button"
              onClick={handleCopyAddress}
              className={`w-full py-3 px-4 rounded-full text-xs font-sans font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition cursor-pointer ${
                copiedAddress
                  ? 'bg-[#6D2838] text-white shadow-xs'
                  : 'bg-gradient-to-r from-[#8B3A4C] via-[#9E4559] to-[#8B3A4C] hover:opacity-95 text-white shadow-md shadow-rose-900/20'
              }`}
            >
              {copiedAddress ? (
                <>
                  <Check className="w-4 h-4 text-white" />
                  <span>Alamat Berhasil Disalin!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Salin Alamat Lengkap</span>
                </>
              )}
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};
