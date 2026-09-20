import React from 'react';
import { Wifi, Zap, ShieldCheck, MapPin, Gauge, Clock, ChevronRight, Sparkles } from 'lucide-react';

interface HeroBannerProps {
  onExplorePlans: () => void;
  onCheckCoverage: () => void;
  onSpeedTest: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onExplorePlans,
  onCheckCoverage,
  onSpeedTest
}) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-[#0a192f] via-[#004e9f] to-[#0066cc] text-white py-10 md:py-16 px-4 sm:px-6 lg:px-8 shadow-xl">
      {/* Dynamic background light glows */}
      <div className="absolute top-0 right-0 -mt-16 -mr-16 w-96 h-96 rounded-full bg-[#00d2ff]/20 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 -mb-20 w-80 h-80 rounded-full bg-[#ff6b00]/15 blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Heading & Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* 5G Status Tag */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-[#00d2ff]/30 px-3.5 py-1.5 rounded-full">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00d2ff] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#10b981]"></span>
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-[#00d2ff]">
                5G VinaPhone Phủ Sóng 100% Bình Mỹ
              </span>
              <span className="text-white/40">|</span>
              <span className="text-xs text-white/90 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#ffb800]" /> 774 Trần Hưng Đạo, Bình Mỹ, Ninh Bình
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                Tốc Độ 5G Siêu Đỉnh <br className="hidden sm:block" />
                <span className="bg-gradient-to-r from-[#00d2ff] via-white to-[#ffdbcc] bg-clip-text text-transparent">
                  Bứt Phá Mọi Giới Hạn Kết Nối
                </span>
              </h1>
              <p className="text-slate-200 text-sm sm:text-base md:text-lg max-w-2xl font-normal leading-relaxed pt-1">
                Đăng ký gói cước 5G VinaPhone chính hãng tại <strong>VNPT Bình Mỹ</strong> (774 Trần Hưng Đạo). 
                Tốc độ tải lên đến <strong>1.5 Gbps</strong>, xem video 4K không độ trễ, data khủng 
                lên tới <strong>7GB/ngày</strong>. Giao SIM vật lý & kích hoạt eSIM tận nơi nhanh chóng!
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                id="btn-hero-plans"
                onClick={onExplorePlans}
                className="bg-[#ff6b00] hover:bg-[#e05e00] text-white px-6 py-3.5 rounded-xl font-heading font-bold text-sm sm:text-base shadow-lg shadow-[#ff6b00]/35 transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
              >
                <Zap className="w-5 h-5 fill-current" />
                <span>Xem Gói Cước 5G Bestseller</span>
              </button>

              <button
                id="btn-hero-coverage"
                onClick={onCheckCoverage}
                className="bg-white/10 hover:bg-white/20 text-white border border-[#00d2ff]/40 backdrop-blur-md px-5 py-3.5 rounded-xl font-heading font-semibold text-sm sm:text-base transition-all flex items-center gap-2"
              >
                <MapPin className="w-4 h-4 text-[#00d2ff]" />
                <span>Kiểm Tra Trạm 5G Gần Bạn</span>
              </button>

              <button
                id="btn-hero-speedtest"
                onClick={onSpeedTest}
                className="text-xs sm:text-sm text-[#00d2ff] hover:text-white underline underline-offset-4 flex items-center gap-1 font-medium px-2 py-1"
              >
                <Gauge className="w-4 h-4" />
                <span>Đo tốc độ 5G trực tiếp</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Local perk guarantee */}
            <div className="pt-2 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-300">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#10b981]" />
                <span>SIM chính chủ VNPT 100%</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#ffb800]" />
                <span>Giao hỏa tốc 30 phút tại 8 Ấp</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#00d2ff]" />
                <span>Miễn phí kích hoạt & hỗ trợ cài đặt</span>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive 5G Telemetry & Family Showcase Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-[#0a192f]/70 backdrop-blur-xl border border-[#00d2ff]/25 p-4 sm:p-5 shadow-2xl">
              
              {/* Eye-Catching Family Photo Banner */}
              <div className="relative rounded-xl overflow-hidden mb-4 border border-white/15 group shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?auto=format&fit=crop&w=800&q=80"
                  alt="Gia đình kết nối dịch vụ VinaPhone 5G"
                  referrerPolicy="no-referrer"
                  className="w-full h-44 sm:h-52 object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a192f]/90 via-[#0a192f]/20 to-transparent pointer-events-none" />
                
                {/* Floating Top Badge */}
                <div className="absolute top-2.5 left-2.5 inline-flex items-center gap-1.5 bg-[#0066cc]/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-bold text-white border border-[#00d2ff]/40 shadow">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse"></span>
                  <span>VinaPhone 5G Gia Đình</span>
                </div>

                {/* Floating Bottom Caption */}
                <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-xs">
                  <span className="text-white font-heading font-bold text-[12px] drop-shadow-sm">
                    Trọn vẹn niềm vui • Kết nối đa thiết bị
                  </span>
                  <span className="bg-[#ff6b00] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                    Tốc độ 1.5 Gbps
                  </span>
                </div>
              </div>

              {/* Card Header Info */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#0066cc]/40 border border-[#00d2ff]/40 flex items-center justify-center text-[#00d2ff]">
                    <Wifi className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-xs text-white">
                      Mạng 5G VinaPhone Bình Mỹ
                    </h3>
                    <p className="text-[10px] text-slate-400">774 Trần Hưng Đạo, Bình Mỹ, Ninh Bình</p>
                  </div>
                </div>

                <span className="bg-[#10b981]/20 text-[#10b981] border border-[#10b981]/40 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]"></span>
                  SẴN SÀNG
                </span>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 gap-2.5 my-3">
                <div className="bg-white/5 rounded-xl p-2.5 border border-white/5">
                  <span className="text-[10px] text-slate-400 font-medium">Tốc độ tối đa</span>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="font-heading font-extrabold text-xl text-[#00d2ff]">1.52</span>
                    <span className="text-[10px] text-slate-300 font-semibold">Gbps</span>
                  </div>
                  <span className="text-[9px] text-[#10b981] block">Nhanh gấp 15 lần 4G</span>
                </div>

                <div className="bg-white/5 rounded-xl p-2.5 border border-white/5">
                  <span className="text-[10px] text-slate-400 font-medium">Độ trễ Ping</span>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="font-heading font-extrabold text-xl text-[#ffb800]">3.2</span>
                    <span className="text-[10px] text-slate-300 font-semibold">ms</span>
                  </div>
                  <span className="text-[9px] text-slate-300 block">Chuẩn eMBB siêu nhạy</span>
                </div>
              </div>

              {/* Best-selling highlight teaser */}
              <div className="p-3 rounded-xl bg-gradient-to-r from-[#004e9f]/50 to-[#ff6b00]/20 border border-[#ff6b00]/30 flex items-center justify-between">
                <div>
                  <span className="text-[9px] uppercase font-bold text-[#ff8533] tracking-wide">
                    Gói cước gợi ý hôm nay
                  </span>
                  <h4 className="font-heading font-bold text-xs text-white flex items-center gap-1.5">
                    <span>VD120N 5G</span>
                    <span className="bg-[#ff6b00] text-white text-[8px] px-1.5 py-0.5 rounded font-bold">HOT</span>
                  </h4>
                  <p className="text-[10px] text-slate-300">6GB/ngày • Miễn phí gọi • 120.000đ/tháng</p>
                </div>

                <button
                  onClick={onExplorePlans}
                  className="bg-[#ff6b00] hover:bg-[#e05e00] text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors"
                >
                  Đăng Ký
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
