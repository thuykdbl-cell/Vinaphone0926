import React from 'react';
import { 
  Wifi, 
  PhoneCall, 
  MapPin, 
  Gauge, 
  Smartphone, 
  Search, 
  ShoppingBag, 
  Radio,
  Zap,
  Menu,
  X
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  orderCount: number;
  onOpenOrders: () => void;
  onOpenDirectCall: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  orderCount,
  onOpenOrders,
  onOpenDirectCall
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems = [
    { id: 'packages', label: 'Gói Cước 5G', icon: Zap },
    { id: 'lookup', label: 'Tra Cứu Gói SIM', icon: Search },
    { id: 'coverage', label: 'Trạm Sóng Bình Mỹ', icon: MapPin },
    { id: 'speedtest', label: 'Đo Tốc Độ 5G', icon: Gauge },
    { id: 'sims', label: 'Kho SIM Số Đẹp', icon: Smartphone },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#0066cc]/10 shadow-xs">
      {/* Top micro bar */}
      <div className="bg-[#0a192f] text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 bg-[#0066cc]/40 text-[#00d2ff] px-2 py-0.5 rounded-full font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse"></span>
              5G LIVE BÌNH MỸ
            </span>
            <span className="hidden sm:inline text-slate-300">
              VNPT Bình Mỹ • Địa chỉ: 774 Trần Hưng Đạo, Bình Mỹ, Ninh Bình
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-300">
            <span className="hidden md:inline">Email: vnptbinhmy@gmail.com • Mở cửa 07:30 - 20:00</span>
            <a 
              href="tel:02263862555" 
              className="flex items-center gap-1 text-[#ff6b00] font-semibold hover:underline"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>ĐT: 02263.862.555</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main navigation bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Brand Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setActiveTab('packages')}
          >
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-tr from-[#004e9f] via-[#0066cc] to-[#00d2ff] flex items-center justify-center text-white shadow-md shadow-[#0066cc]/25 transition-transform group-hover:scale-105">
              <Radio className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-heading font-extrabold text-xl md:text-2xl text-[#004e9f] tracking-tight">
                  vinaphone
                </span>
                <span className="bg-gradient-to-r from-[#00d2ff] to-[#0066cc] text-white text-[10px] font-extrabold px-1.5 py-0.5 rounded-md tracking-wider">
                  5G+
                </span>
              </div>
              <div className="text-[11px] font-medium text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <span>VNPT Bình Mỹ</span>
                <span className="w-1 h-1 rounded-full bg-slate-400"></span>
                <span className="text-[#0066cc] font-semibold">Ninh Bình</span>
              </div>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-${item.id}`}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
                    isActive 
                      ? 'bg-[#0066cc] text-white shadow-sm shadow-[#0066cc]/30' 
                      : 'text-slate-700 hover:text-[#0066cc] hover:bg-[#0066cc]/5'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              id="btn-nav-orders"
              onClick={onOpenOrders}
              className="relative p-2 sm:px-3 sm:py-2 rounded-lg border border-slate-200 hover:border-[#0066cc]/40 text-slate-700 hover:text-[#0066cc] hover:bg-slate-50 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              title="Đơn hàng của bạn"
            >
              <ShoppingBag className="w-4 h-4 text-[#0066cc]" />
              <span className="hidden sm:inline">Đơn hàng</span>
              {orderCount > 0 && (
                <span className="bg-[#ff6b00] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {orderCount}
                </span>
              )}
            </button>

            <button
              id="btn-nav-consult"
              onClick={onOpenDirectCall}
              className="bg-gradient-to-r from-[#ff6b00] to-[#ff8533] hover:from-[#e05e00] hover:to-[#ff6b00] text-white px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-bold shadow-md shadow-[#ff6b00]/25 transition-all transform hover:-translate-y-0.5 flex items-center gap-1.5"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Tư Vấn Miễn Phí</span>
            </button>

            {/* Mobile menu toggle */}
            <button
              id="btn-mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-3 shadow-lg space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`mobile-nav-${item.id}`}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive 
                    ? 'bg-[#0066cc] text-white' 
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#0066cc]'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
          <div className="pt-2 border-t border-slate-100 text-xs text-slate-500">
            <p className="flex items-center gap-1 text-[#0066cc] font-medium">
              <MapPin className="w-3.5 h-3.5" />
              VNPT Bình Mỹ: 774 Trần Hưng Đạo, Bình Mỹ, Ninh Bình
            </p>
          </div>
        </div>
      )}
    </header>
  );
};
