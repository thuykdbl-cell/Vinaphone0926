import React, { useState } from 'react';
import { SimItem } from '../types';
import { 
  Smartphone, 
  QrCode, 
  Search, 
  Sparkles, 
  Truck, 
  ShieldCheck, 
  Check, 
  Flame,
  ArrowRight
} from 'lucide-react';

interface SimStoreProps {
  sims: SimItem[];
  onSelectSim: (sim: SimItem) => void;
}

export const SimStore: React.FC<SimStoreProps> = ({
  sims,
  onSelectSim
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchSuffix, setSearchSuffix] = useState<string>('');
  const [simTypeFilter, setSimTypeFilter] = useState<'all' | 'physical' | 'esim'>('all');

  const categories = [
    { id: 'all', label: 'Tất Cả SIM' },
    { id: 'locphat', label: 'Lộc Phát (68, 86)' },
    { id: 'thantai', label: 'Thần Tài (39, 79)' },
    { id: 'tamhoa', label: 'Tam Hoa (333, 999)' },
    { id: 'de_nho', label: 'Số Tiến - Dễ Nhớ' },
    { id: 'dong_gia', label: 'SIM 5G Đồng Giá' },
  ];

  const filteredSims = sims.filter((s) => {
    const matchCat = activeCategory === 'all' || s.category === activeCategory;
    const matchSearch = s.cleanNumber.includes(searchSuffix.replace(/[^0-9]/g, ''));
    const matchType = 
      simTypeFilter === 'all' || 
      (simTypeFilter === 'physical' && s.type === 'Sim Vật Lý') ||
      (simTypeFilter === 'esim' && s.type === 'eSIM QR');
    return matchCat && matchSearch && matchType;
  });

  const formatPrice = (p: number) => new Intl.NumberFormat('vi-VN').format(p);

  return (
    <section id="sim-store-section" className="py-10 md:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 bg-[#0066cc]/10 text-[#0052a3] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-2.5">
          <Smartphone className="w-3.5 h-3.5 text-[#ff6b00]" />
          <span>KHO SIM SỐ ĐẸP 5G CHÍNH HÃNG VNPT</span>
        </div>
        <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0d1c32] tracking-tight">
          Chọn Số Đẹp & Kích Hoạt 5G Bình Mỹ
        </h2>
        <p className="text-slate-600 text-sm sm:text-base mt-2">
          Được đăng ký thông tin chính chủ theo quy định. Giao tận nơi miễn phí trong 30 phút tại Bình Mỹ, Ninh Bình hoặc nhận mã quét eSIM kích hoạt tức thì.
        </p>
      </div>

      {/* Filter and Search controls */}
      <div className="space-y-4 mb-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          
          {/* Search box */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="input-search-sim"
              type="text"
              placeholder="Tìm đuôi số (VD: 68, 79, 999)..."
              value={searchSuffix}
              onChange={(e) => setSearchSuffix(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#0066cc]"
            />
          </div>

          {/* SIM Type Filter switch */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl w-full sm:w-auto text-xs font-semibold">
            <button
              onClick={() => setSimTypeFilter('all')}
              className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-lg transition-all ${
                simTypeFilter === 'all' ? 'bg-white text-[#0066cc] shadow-xs' : 'text-slate-600'
              }`}
            >
              Tất cả định dạng
            </button>
            <button
              onClick={() => setSimTypeFilter('physical')}
              className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 ${
                simTypeFilter === 'physical' ? 'bg-white text-[#0066cc] shadow-xs' : 'text-slate-600'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>SIM Vật Lý</span>
            </button>
            <button
              onClick={() => setSimTypeFilter('esim')}
              className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 ${
                simTypeFilter === 'esim' ? 'bg-white text-[#0066cc] shadow-xs' : 'text-slate-600'
              }`}
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>eSIM QR</span>
            </button>
          </div>

        </div>

        {/* Category pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                activeCategory === cat.id
                  ? 'bg-[#0066cc] text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* SIM Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredSims.map((sim) => (
          <div
            key={sim.id}
            id={`sim-card-${sim.id}`}
            className="bg-white rounded-2xl border border-[#0066cc]/15 hover:border-[#0066cc]/40 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div>
              {/* Badges */}
              <div className="flex items-center justify-between gap-1 mb-2">
                <span className="text-[10px] font-extrabold uppercase bg-[#ff6b00]/10 text-[#ff6b00] px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Flame className="w-3 h-3 fill-[#ff6b00]" />
                  {sim.badge || 'SỐ ĐẸP 5G'}
                </span>

                <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md flex items-center gap-1">
                  {sim.type === 'eSIM QR' ? <QrCode className="w-3 h-3 text-[#0066cc]" /> : <Smartphone className="w-3 h-3 text-[#0066cc]" />}
                  {sim.type}
                </span>
              </div>

              {/* SIM Number */}
              <div className="my-3">
                <span className="text-xs text-slate-400 block font-medium">Số Thuê Bao:</span>
                <span className="font-heading font-extrabold text-xl text-[#004e9f] tracking-tight group-hover:text-[#0066cc] transition-colors">
                  {sim.formattedNumber}
                </span>
              </div>

              {/* Price & Commit */}
              <div className="flex items-baseline gap-2 mb-3">
                <span className="font-heading font-extrabold text-lg text-[#0d1c32]">
                  {formatPrice(sim.price)}đ
                </span>
                {sim.originalPrice && (
                  <span className="text-xs text-slate-400 line-through">
                    {formatPrice(sim.originalPrice)}đ
                  </span>
                )}
              </div>

              {/* Local Perks checklist */}
              <div className="space-y-1 text-xs text-slate-600 mb-4 bg-slate-50 p-2.5 rounded-xl">
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#10b981]" />
                  <span>Kèm gói cước: <strong className="text-slate-900">{sim.committedPlan || 'VD120N 5G'}</strong></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-[#0066cc]" />
                  <span>Giao miễn phí tại Xã Bình Mỹ</span>
                </div>
              </div>
            </div>

            {/* Action button */}
            <button
              id={`btn-select-sim-${sim.id}`}
              onClick={() => onSelectSim(sim)}
              className="w-full py-2.5 bg-[#0066cc] hover:bg-[#0052a3] text-white rounded-xl font-heading font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-1.5"
            >
              <span>Chọn Số Này & Đăng Ký</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      {/* Info note about registration policy */}
      <div className="mt-8 p-4 rounded-xl bg-slate-100 text-xs text-slate-600 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#10b981] shrink-0" />
          <span>
            Quy định: Thuê bao kích hoạt cần cung cấp CCCD gắn chip để đăng ký chính chủ theo Nghị định 49 của Bộ TT&TT.
          </span>
        </div>
        <span className="font-bold text-[#0066cc]">Điểm giao dịch Bình Mỹ hỗ trợ chụp ảnh & kích hoạt tận nhà</span>
      </div>

    </section>
  );
};
