import React, { useState } from 'react';
import { Users, Tv, Wifi, ShieldCheck, Heart, Sparkles, ArrowRight, PhoneCall } from 'lucide-react';

interface FamilyBannerProps {
  onRegisterFamily: () => void;
  onOpenConsultation: () => void;
}

export const FamilyBanner: React.FC<FamilyBannerProps> = ({
  onRegisterFamily,
  onOpenConsultation
}) => {
  const [imageError, setImageError] = useState(false);

  // High quality family using technology photo
  const primaryImageUrl = "https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?auto=format&fit=crop&w=1200&q=80";
  const fallbackImageUrl = "https://images.unsplash.com/photo-1609220136736-443140cffec6?auto=format&fit=crop&w=1200&q=80";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0a1f3d] via-[#003873] to-[#0052a3] text-white shadow-2xl border border-[#00d2ff]/20">
        
        {/* Ambient Glows */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#00d2ff]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#ff6b00]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-8 lg:p-10">
          
          {/* Left Column: Family Photo Showcase */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20 group">
              <img
                src={imageError ? fallbackImageUrl : primaryImageUrl}
                alt="Gia đình hạnh phúc kết nối dịch vụ 5G VinaPhone"
                referrerPolicy="no-referrer"
                onError={() => setImageError(true)}
                className="w-full h-[260px] sm:h-[340px] md:h-[380px] object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
              />

              {/* Gradient Overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a192f]/90 via-[#0a192f]/20 to-transparent pointer-events-none" />

              {/* Top Pill Badge */}
              <div className="absolute top-4 left-4 inline-flex items-center gap-2 bg-[#0066cc]/85 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold text-white border border-[#00d2ff]/40 shadow-lg">
                <span className="w-2 h-2 rounded-full bg-[#00d2ff] animate-pulse"></span>
                <span>VinaPhone 5G Family</span>
                <span className="text-white/40">|</span>
                <span className="text-[#ffdbcc] flex items-center gap-1">
                  <Heart className="w-3 h-3 text-[#ff6b00] fill-current" /> Kết Nối Yêu Thương
                </span>
              </div>

              {/* Bottom Image Caption Badge */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/20 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[#ff6b00] flex items-center justify-center text-white font-bold">
                      <Wifi className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-heading font-bold text-white block">
                        Đa Thiết Bị • Mượt Mà Cho Cả Nhà
                      </span>
                      <span className="text-slate-300 text-[11px]">
                        Không nghẽn mạng kể cả giờ cao điểm
                      </span>
                    </div>
                  </div>
                  <span className="bg-[#10b981] text-white text-[10px] font-bold px-2 py-1 rounded-md">
                    1.5 Gbps
                  </span>
                </div>
              </div>
            </div>

            {/* Sub-note */}
            <p className="text-center text-[11px] text-slate-300 mt-2">
              Hình ảnh: Gia đình trải nghiệm dịch vụ viễn thông tốc độ cao VinaPhone
            </p>
          </div>

          {/* Right Column: Family Benefits Content */}
          <div className="lg:col-span-6 space-y-5">
            <div className="inline-flex items-center gap-2 bg-[#00d2ff]/15 border border-[#00d2ff]/30 px-3 py-1 rounded-full text-xs font-semibold text-[#00d2ff]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Giải Pháp Toàn Diện Cho Hộ Gia Đình</span>
            </div>

            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-snug text-white">
              VinaPhone 5G Đồng Hành <br />
              <span className="bg-gradient-to-r from-[#00d2ff] via-white to-[#ffb800] bg-clip-text text-transparent">
                Cùng Mọi Gia Đình Việt
              </span>
            </h2>

            <p className="text-slate-200 text-xs sm:text-sm md:text-base leading-relaxed">
              Một đường truyền 5G tốc độ đỉnh cao phục vụ trọn vẹn mọi nhu cầu: Bố mẹ làm việc từ xa, con trẻ học online mượt mà, ông bà xem truyền hình 4K MyTV sắc nét mà không lo giật lag.
            </p>

            {/* 4 Feature Items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="bg-white/10 backdrop-blur-xs rounded-xl p-3 border border-white/10 flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#00d2ff]/20 text-[#00d2ff] flex items-center justify-center shrink-0 mt-0.5">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-xs text-white">Chia Sẻ Data Khủng</h4>
                  <p className="text-[11px] text-slate-300">Lên đến 6GB - 7GB/ngày, phát Wi-Fi cho mọi người.</p>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-xs rounded-xl p-3 border border-white/10 flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#ffb800]/20 text-[#ffb800] flex items-center justify-center shrink-0 mt-0.5">
                  <Tv className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-xs text-white">Tặng Kèm MyTV 4K</h4>
                  <p className="text-[11px] text-slate-300">Gần 180 kênh truyền hình, phim bộ & thể thao đỉnh cao.</p>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-xs rounded-xl p-3 border border-white/10 flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#10b981]/20 text-[#10b981] flex items-center justify-center shrink-0 mt-0.5">
                  <Wifi className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-xs text-white">Kết Nối 10+ Thiết Bị</h4>
                  <p className="text-[11px] text-slate-300">Smart TV, máy tính bảng, điện thoại đều tốc độ cao.</p>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-xs rounded-xl p-3 border border-white/10 flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#ff6b00]/20 text-[#ff6b00] flex items-center justify-center shrink-0 mt-0.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-xs text-white">Hỗ Trợ Tận Nơi</h4>
                  <p className="text-[11px] text-slate-300">VNPT Bình Mỹ giao SIM & cài đặt tận nhà trong 30 phút.</p>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onRegisterFamily}
                className="bg-[#ff6b00] hover:bg-[#e05e00] text-white font-heading font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-lg shadow-[#ff6b00]/30 flex items-center gap-2 transition-all transform active:scale-95"
              >
                <span>Đăng Ký Gói Cước Cho Gia Đình</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenConsultation}
                className="bg-white/15 hover:bg-white/25 text-white border border-white/20 font-heading font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-xl transition-colors flex items-center gap-1.5"
              >
                <PhoneCall className="w-4 h-4 text-[#ffb800]" />
                <span>Gọi Tư Vấn: 02263.862.555</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
