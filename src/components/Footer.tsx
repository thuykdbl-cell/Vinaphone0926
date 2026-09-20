import React from 'react';
import { 
  Radio, 
  MapPin, 
  PhoneCall, 
  Mail, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  ExternalLink 
} from 'lucide-react';

interface FooterProps {
  onNavigateTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateTab }) => {
  return (
    <footer className="bg-[#071322] text-white pt-12 pb-24 lg:pb-12 border-t border-white/10 text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Col 1: Brand & Intro */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#004e9f] to-[#00d2ff] flex items-center justify-center text-white font-bold">
                <Radio className="w-5 h-5" />
              </div>
              <div>
                <span className="font-heading font-extrabold text-xl text-white">vinaphone</span>
                <span className="text-[11px] block text-[#00d2ff] font-semibold uppercase tracking-wider">
                  VNPT Bình Mỹ 5G
                </span>
              </div>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed">
              Cổng phân phối và kích hoạt dịch vụ viễn thông 5G VNPT VinaPhone chính thức - VNPT Bình Mỹ. Hỗ trợ đăng ký gói cước data tốc độ cao, cấp đổi SIM/eSIM 5G nhanh chóng.
            </p>

            <div className="pt-1 flex items-center gap-2 text-[#10b981] font-semibold text-xs">
              <ShieldCheck className="w-4 h-4" />
              <span>Điểm giao dịch chính thức VNPT Bình Mỹ</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider">
              Dịch Vụ 5G Nổi Bật
            </h4>
            <ul className="space-y-2 text-slate-400 text-xs">
              <li>
                <button onClick={() => onNavigateTab('packages')} className="hover:text-[#00d2ff] transition-colors">
                  • Gói cước 5G Best Seller (VD120N, YOLO125V)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('packages')} className="hover:text-[#00d2ff] transition-colors">
                  • Gói cước trợ giá Bình Mỹ (BIG50Y - 50k)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('sims')} className="hover:text-[#00d2ff] transition-colors">
                  • Kho SIM số đẹp Thần Tài, Lộc Phát Bình Mỹ
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('lookup')} className="hover:text-[#00d2ff] transition-colors">
                  • Tra cứu gói cước theo số điện thoại
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('speedtest')} className="hover:text-[#00d2ff] transition-colors">
                  • Đo tốc độ mạng 5G Speedtest trực tiếp
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: General VinaPhone Network & Infrastructure */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider">
              Hạ Tầng Mạng 5G VinaPhone
            </h4>
            <ul className="space-y-1.5 text-slate-400 text-xs">
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]"></span>
                <span>Phủ sóng 5G siêu tốc toàn quốc</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]"></span>
                <span>Băng tần chuẩn quốc tế C-Band n78</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]"></span>
                <span>Độ trễ siêu thấp, kết nối tức thì</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]"></span>
                <span>Mạng truyền dẫn cáp quang hiện đại</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]"></span>
                <span>Công nghệ 5G Massive MIMO tiên tiến</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Hours */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider">
              VNPT Bình Mỹ
            </h4>
            <div className="space-y-2 text-slate-300 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#ff6b00] shrink-0 mt-0.5" />
                <span>Địa chỉ: 774 Trần Hưng Đạo, Bình Mỹ, Ninh Bình</span>
              </div>
              <div className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-[#00d2ff] shrink-0" />
                <span>ĐT: <a href="tel:02263862555" className="text-white hover:underline">02263.862.555</a></span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#10b981] shrink-0" />
                <span>Email: <a href="mailto:vnptbinhmy@gmail.com" className="text-white hover:underline">vnptbinhmy@gmail.com</a></span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#ffb800] shrink-0" />
                <span>07:30 - 20:00 (Mở cửa tất cả các ngày)</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 VNPT Bình Mỹ 5G Direct. Tất cả các quyền được bảo lưu.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Giấy phép cung cấp dịch vụ viễn thông VNPT</span>
            <span>•</span>
            <span>Chính sách bảo mật</span>
            <span>•</span>
            <span>Điều khoản sử dụng</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
