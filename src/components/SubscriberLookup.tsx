import React, { useState } from 'react';
import { Search, Phone, CheckCircle2, AlertCircle, Sparkles, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { SUBSCRIBER_DATABASE } from '../data/mockData';
import { PackagePlan } from '../types';

interface SubscriberLookupProps {
  onSelectPlanByName: (planName: string, phoneNumber?: string) => void;
}

export const SubscriberLookup: React.FC<SubscriberLookupProps> = ({
  onSelectPlanByName
}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [lookupResult, setLookupResult] = useState<{
    owner: string;
    currentPlan: string;
    balance: string;
    expiryDate: string;
    specialOffers: string[];
    isEligible5G: boolean;
  } | null>(null);

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = phoneNumber.replace(/[^0-9]/g, '');
    if (clean.length < 9) return;

    setHasSearched(true);
    if (SUBSCRIBER_DATABASE[clean]) {
      setLookupResult({
        ...SUBSCRIBER_DATABASE[clean],
        isEligible5G: true
      });
    } else {
      // Dynamic fallback for any VinaPhone number
      const isVina = clean.startsWith('091') || clean.startsWith('094') || clean.startsWith('088') || clean.startsWith('081') || clean.startsWith('082') || clean.startsWith('083') || clean.startsWith('084') || clean.startsWith('085');
      setLookupResult({
        owner: isVina ? 'Thuê bao VinaPhone' : 'Thuê bao Chuyển Mạng Giữ Số',
        currentPlan: 'Gói Cơ Bản (Chưa kích hoạt 5G)',
        balance: 'Đủ điều kiện',
        expiryDate: 'Đang hoạt động 2 chiều',
        specialOffers: [
          'VD120N 5G (Ưu tiên kích hoạt trạm Bình Mỹ 6GB/ngày)',
          'BIG50Y (Trợ giá khu vực Bình Mỹ 50.000đ/tháng)',
          'YOLO125V 5G (7GB/ngày + MyTV)'
        ],
        isEligible5G: true
      });
    }
  };

  const sampleNumbers = ['0918123456', '0949888999', '0912345678'];

  return (
    <section id="lookup-section" className="py-10 md:py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 bg-[#0066cc]/10 text-[#0052a3] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-2.5">
          <Sparkles className="w-3.5 h-3.5 text-[#ff6b00]" />
          <span>HỆ THỐNG TRA CỨU TỰ ĐỘNG VNPT</span>
        </div>
        <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#0d1c32] tracking-tight">
          Tra Cứu Gói Cước Theo Số Điện Thoại
        </h2>
        <p className="text-slate-600 text-sm sm:text-base mt-2">
          Nhập số điện thoại VinaPhone của bạn để kiểm tra các gói cước 5G ưu đãi riêng biệt được áp dụng cho thuê bao.
        </p>
      </div>

      {/* Lookup Card */}
      <div className="bg-white rounded-2xl border border-[#0066cc]/15 p-6 sm:p-8 shadow-lg shadow-[#0066cc]/5">
        <form onSubmit={handleLookup} className="max-w-xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Phone className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="input-subscriber-phone"
                type="tel"
                placeholder="Nhập số VinaPhone (VD: 0918xxx...)"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-base font-semibold focus:outline-none focus:bg-white focus:border-[#0066cc] focus:ring-3 focus:ring-[#00d2ff]/20 transition-all"
                required
              />
            </div>
            <button
              id="btn-submit-lookup"
              type="submit"
              className="bg-[#0066cc] hover:bg-[#0052a3] text-white px-6 py-3.5 rounded-xl font-heading font-bold text-sm shadow-md shadow-[#0066cc]/25 transition-all flex items-center justify-center gap-2 shrink-0"
            >
              <Search className="w-4 h-4" />
              <span>Kiểm Tra Ngay</span>
            </button>
          </div>

          {/* Sample quick numbers */}
          <div className="mt-3 flex items-center gap-2 text-xs text-slate-500 justify-center">
            <span>Số mẫu thử nghiệm:</span>
            {sampleNumbers.map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => {
                  setPhoneNumber(num);
                  setHasSearched(false);
                }}
                className="text-[#0066cc] hover:underline font-semibold bg-[#e8eeff] px-2 py-0.5 rounded"
              >
                {num}
              </button>
            ))}
          </div>
        </form>

        {/* Results Area */}
        {hasSearched && lookupResult && (
          <div className="mt-8 pt-6 border-t border-slate-100 max-w-2xl mx-auto space-y-5 animate-in fade-in duration-300">
            
            <div className="bg-gradient-to-r from-[#e8eeff] to-[#f0f3ff] rounded-2xl p-5 border border-[#0066cc]/20">
              <div className="flex items-center justify-between pb-3 border-b border-[#0066cc]/10">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#0066cc] text-white flex items-center justify-center font-bold text-xs">
                    VNPT
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-sm text-[#0d1c32]">
                      Thuê bao: <span className="text-[#0066cc]">{phoneNumber}</span>
                    </h4>
                    <span className="text-xs text-slate-500">{lookupResult.owner}</span>
                  </div>
                </div>

                <span className="bg-[#10b981]/15 text-[#10b981] border border-[#10b981]/30 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Đủ Điều Kiện 5G
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-4 text-xs">
                <div className="bg-white p-3 rounded-xl border border-slate-100">
                  <span className="text-slate-400 block">Gói cước đang dùng:</span>
                  <span className="font-heading font-bold text-sm text-slate-800">{lookupResult.currentPlan}</span>
                </div>
                <div className="bg-white p-3 rounded-xl border border-slate-100">
                  <span className="text-slate-400 block">Thời hạn / Trạng thái:</span>
                  <span className="font-heading font-bold text-sm text-slate-800">{lookupResult.expiryDate}</span>
                </div>
              </div>
            </div>

            {/* Personalized Recommended Offers */}
            <div>
              <h4 className="font-heading font-bold text-sm text-[#0d1c32] mb-3 flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#ff6b00]" />
                <span>Gói Cước 5G Ưu Đãi Riêng Cho Thuê Bao Này:</span>
              </h4>

              <div className="space-y-2.5">
                {lookupResult.specialOffers.map((offer, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-[#0066cc]/40 transition-colors flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-[#0066cc]/10 text-[#0066cc] flex items-center justify-center font-bold text-xs">
                        5G
                      </div>
                      <span className="text-xs sm:text-sm font-bold text-slate-800">
                        {offer}
                      </span>
                    </div>

                    <button
                      onClick={() => onSelectPlanByName(offer, phoneNumber)}
                      className="bg-[#ff6b00] hover:bg-[#e05e00] text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 shrink-0"
                    >
                      <span>Đăng Ký</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-xs text-slate-500 flex items-center gap-2 bg-slate-50 p-3 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-[#10b981] shrink-0" />
              <span>
                Tra cứu bảo mật trực tiếp qua cổng VNPT API. Quý khách có thể đổi SIM 4G sang 5G miễn phí tại VNPT Bình Mỹ (774 Trần Hưng Đạo).
              </span>
            </div>

          </div>
        )}
      </div>
    </section>
  );
};
