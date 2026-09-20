import React, { useState } from 'react';
import { X, PhoneCall, MessageCircle, MapPin, Clock, CheckCircle2, ShieldCheck } from 'lucide-react';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose
}) => {
  const [phone, setPhone] = useState('');
  const [requested, setRequested] = useState(false);

  if (!isOpen) return null;

  const handleRequestCallback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return;
    setRequested(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0a192f]/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-[#0066cc]/20 relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-[#ff6b00]/15 text-[#ff6b00] flex items-center justify-center mx-auto mb-3">
            <PhoneCall className="w-6 h-6" />
          </div>
          <h3 className="font-heading font-extrabold text-xl text-[#0d1c32]">
            Tư Vấn 5G - VNPT Bình Mỹ
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Điểm giao dịch và chăm sóc khách hàng VNPT Bình Mỹ, Ninh Bình
          </p>
        </div>

        {/* Quick Contact Cards */}
        <div className="space-y-3 mb-6">
          <a
            href="tel:02263862555"
            className="flex items-center justify-between p-3.5 rounded-2xl bg-[#0066cc]/10 hover:bg-[#0066cc]/15 border border-[#0066cc]/20 transition-all text-xs group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#0066cc] text-white flex items-center justify-center shadow-xs">
                <PhoneCall className="w-4 h-4" />
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">Hotline / Điện Thoại</span>
                <span className="font-heading font-extrabold text-sm sm:text-base text-[#004e9f]">
                  02263.862.555
                </span>
              </div>
            </div>
            <span className="bg-[#0066cc] text-white text-[11px] font-bold px-2.5 py-1 rounded-lg">
              Gọi Ngay
            </span>
          </a>

          <a
            href="mailto:vnptbinhmy@gmail.com"
            className="flex items-center justify-between p-3.5 rounded-2xl bg-[#0088cc]/10 hover:bg-[#0088cc]/15 border border-[#0088cc]/20 transition-all text-xs group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#0088cc] text-white flex items-center justify-center shadow-xs">
                <MessageCircle className="w-4 h-4" />
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">Email Hỗ Trợ Khách Hàng</span>
                <span className="font-heading font-extrabold text-xs sm:text-sm text-[#0088cc]">
                  vnptbinhmy@gmail.com
                </span>
              </div>
            </div>
            <span className="bg-[#0088cc] text-white text-[11px] font-bold px-2.5 py-1 rounded-lg">
              Gửi Mail
            </span>
          </a>
        </div>

        {/* Location and Working hours */}
        <div className="bg-slate-50 rounded-2xl p-4 text-xs space-y-2.5 border border-slate-100 mb-6">
          <div className="flex items-start gap-2 text-slate-700">
            <MapPin className="w-4 h-4 text-[#0066cc] shrink-0 mt-0.5" />
            <span>
              <strong>Địa chỉ:</strong> 774 Trần Hưng Đạo, Bình Mỹ, Ninh Bình
            </span>
          </div>

          <div className="flex items-center gap-2 text-slate-700">
            <Clock className="w-4 h-4 text-[#ffb800] shrink-0" />
            <span>
              <strong>Giờ làm việc:</strong> 07:30 - 20:00 (Cả Thứ 7, Chủ Nhật & Ngày lễ)
            </span>
          </div>
        </div>

        {/* Request callback */}
        {requested ? (
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3.5 text-center text-xs text-emerald-800">
            <CheckCircle2 className="w-6 h-6 text-emerald-600 mx-auto mb-1.5" />
            <span className="font-bold block">Đã ghi nhận yêu cầu gọi lại!</span>
            <span>Chuyên viên VNPT Bình Mỹ sẽ gọi vào số <strong>{phone}</strong> trong 5 - 10 phút.</span>
          </div>
        ) : (
          <form onSubmit={handleRequestCallback} className="space-y-2 text-xs">
            <label className="font-semibold text-slate-700 block">
              Hoặc để lại số điện thoại để nhân viên gọi lại:
            </label>
            <div className="flex gap-2">
              <input
                type="tel"
                required
                placeholder="Nhập số điện thoại của bạn..."
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#0066cc]"
              />
              <button
                type="submit"
                className="bg-[#ff6b00] hover:bg-[#e05e00] text-white px-4 py-2 font-bold rounded-xl transition-colors whitespace-nowrap"
              >
                Gửi Yêu Cầu
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
