import React, { useState } from 'react';
import { PackagePlan, PlanCategory } from '../types';
import { 
  Check, 
  Zap, 
  MessageSquare, 
  Search, 
  Flame, 
  Sparkles, 
  CheckCircle2, 
  Copy,
  Info,
  Gift,
  ArrowRight
} from 'lucide-react';

interface PackageListProps {
  plans: PackagePlan[];
  onSelectPlan: (plan: PackagePlan) => void;
  onOpenSmsHelp: (plan: PackagePlan) => void;
}

export const PackageList: React.FC<PackageListProps> = ({
  plans,
  onSelectPlan,
  onOpenSmsHelp
}) => {
  const [selectedCategory, setSelectedCategory] = useState<PlanCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedSmsId, setCopiedSmsId] = useState<string | null>(null);

  const categories: { id: PlanCategory | 'all'; label: string }[] = [
    { id: 'all', label: 'Tất Cả Gói Cước' },
    { id: 'bestseller', label: 'Bình Mỹ Bestseller' },
    { id: 'month', label: 'Gói Tháng 5G' },
    { id: 'combo', label: 'Combo Data + Thoại' },
    { id: 'gamer', label: 'Game & Giải Trí' },
    { id: 'day', label: 'Gói Ngày / Ngắn Hạn' },
    { id: 'longterm', label: 'Gói 6T / 12T (Tặng Tháng)' },
  ];

  const filteredPlans = plans.filter((plan) => {
    const matchesCategory = 
      selectedCategory === 'all' || 
      plan.category === selectedCategory ||
      (selectedCategory === 'bestseller' && plan.isBestSeller);

    const matchesSearch = 
      plan.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plan.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plan.dataPerDay.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const handleCopySms = (plan: PackagePlan, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(plan.smsSyntax);
    setCopiedSmsId(plan.id);
    setTimeout(() => {
      setCopiedSmsId(null);
    }, 2500);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price);
  };

  return (
    <section id="packages-section" className="py-10 md:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 bg-[#0066cc]/10 text-[#0052a3] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-2.5">
          <Sparkles className="w-3.5 h-3.5 text-[#ff6b00]" />
          <span>Bảng Giá Gói Cước 5G VNPT VinaPhone Bình Mỹ</span>
        </div>
        <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0d1c32] tracking-tight">
          Chọn Gói Cước 5G Phù Hợp Với Bạn
        </h2>
        <p className="text-slate-600 text-sm sm:text-base mt-2">
          Đăng ký trực tiếp tại điểm giao dịch Bình Mỹ hoặc gửi SMS theo cú pháp chính thức. 
          Không lo phí ẩn, data tốc độ cao ổn định 100%.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-4 mb-10">
        {/* Search Input */}
        <div className="max-w-md mx-auto relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            id="input-search-plan"
            type="text"
            placeholder="Tìm theo tên gói (VD: VD120N, YOLO125V, 6GB/ngày)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#0066cc] focus:ring-3 focus:ring-[#00d2ff]/20 shadow-xs transition-all"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
            >
              Xóa
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 no-scrollbar justify-start sm:justify-center">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                id={`filter-cat-${cat.id}`}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-lg text-xs md:text-sm font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[#0066cc] text-white shadow-md shadow-[#0066cc]/25'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat.id === 'bestseller' && <Flame className="w-3.5 h-3.5 text-[#ff6b00]" />}
                {cat.id === 'longterm' && <Gift className="w-3.5 h-3.5 text-[#00d2ff]" />}
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Package Cards Grid */}
      {filteredPlans.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-300 p-8">
          <Info className="w-10 h-10 text-slate-400 mx-auto mb-3" />
          <p className="text-slate-700 font-medium">Không tìm thấy gói cước phù hợp với từ khóa "{searchQuery}"</p>
          <button
            onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
            className="mt-3 text-sm text-[#0066cc] font-semibold hover:underline"
          >
            Hiển thị lại tất cả gói cước
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {filteredPlans.map((plan) => {
            const isBestSeller = plan.isBestSeller;

            return (
              <div
                key={plan.id}
                id={`card-plan-${plan.id}`}
                className={`relative flex flex-col justify-between rounded-2xl transition-all duration-300 bg-white ${
                  isBestSeller
                    ? 'p-[2px] bg-gradient-to-br from-[#00d2ff] via-[#0066cc] to-[#ff6b00] shadow-xl shadow-[#0066cc]/15 lg:-translate-y-2'
                    : 'border border-[#0066cc]/15 shadow-sm hover:shadow-md hover:border-[#0066cc]/30'
                }`}
              >
                {/* Inside card wrapper */}
                <div className="bg-white rounded-[14px] p-6 flex flex-col h-full justify-between">
                  
                  {/* Top Badge */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className={`text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full flex items-center gap-1 ${
                        isBestSeller
                          ? 'bg-[#ff6b00] text-white'
                          : 'bg-[#0066cc]/10 text-[#0052a3]'
                      }`}>
                        {isBestSeller && <Flame className="w-3 h-3 fill-white" />}
                        {plan.badge || 'GÓI CƯỚC 5G'}
                      </span>

                      {plan.is5GExclusive && (
                        <span className="text-[10px] font-bold text-[#0066cc] bg-[#00d2ff]/15 px-2 py-0.5 rounded-md flex items-center gap-1">
                          <Zap className="w-3 h-3 text-[#0066cc]" />
                          5G Ultra Speed
                        </span>
                      )}
                    </div>

                    {/* Plan Name & Data Highlight */}
                    <div className="mb-4">
                      <h3 className="font-heading font-extrabold text-xl text-[#0d1c32] tracking-tight">
                        {plan.name}
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-2 mt-1 min-h-[32px]">
                        {plan.description}
                      </p>
                    </div>

                    {/* Prominent Data Badge */}
                    <div className="bg-gradient-to-r from-[#e8eeff] to-[#f0f3ff] rounded-xl p-3 border border-[#0066cc]/15 flex items-center justify-between mb-4">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-[#0052a3]">Lưu lượng tốc độ cao</span>
                        <div className="font-heading font-extrabold text-xl text-[#004e9f]">
                          {plan.dataPerDay}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] font-medium text-slate-500">Tổng data</span>
                        <div className="text-xs font-bold text-slate-800">{plan.totalData}</div>
                      </div>
                    </div>

                    {/* Price Section */}
                    <div className="flex items-baseline gap-1 mb-6 pb-4 border-b border-slate-100">
                      <span className="font-heading font-extrabold text-3xl sm:text-4xl text-[#0d1c32] tracking-tight">
                        {formatPrice(plan.price)}
                      </span>
                      <span className="text-sm font-bold text-slate-500">đ</span>
                      <span className="text-xs text-slate-400 font-medium">/{plan.period}</span>
                    </div>

                    {/* Voice allowances micro-badges */}
                    {(plan.voiceOnNet !== 'Không gồm thoại' || plan.voiceOffNet !== 'Không gồm thoại') && (
                      <div className="mb-4 space-y-1.5 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-lg">
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#0066cc]"></span>
                          <span className="font-medium text-slate-600">Nội mạng:</span>
                          <span className="font-semibold text-slate-900">{plan.voiceOnNet}</span>
                        </div>
                        {plan.voiceOffNet && (
                          <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#ff6b00]"></span>
                            <span className="font-medium text-slate-600">Ngoại mạng:</span>
                            <span className="font-semibold text-slate-900">{plan.voiceOffNet}</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Feature Checklist */}
                    <div className="space-y-2.5 mb-6">
                      {plan.perks.map((perk, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                          <Check className="w-4 h-4 text-[#10b981] shrink-0 mt-0.5" />
                          <span className="leading-snug">{perk}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions Area */}
                  <div className="space-y-2.5 pt-2 border-t border-slate-100">
                    {/* Direct Register Button */}
                    <button
                      id={`btn-register-${plan.id}`}
                      onClick={() => onSelectPlan(plan)}
                      className={`w-full py-3 rounded-xl font-heading font-bold text-sm text-white flex items-center justify-center gap-2 transition-all shadow-md ${
                        isBestSeller
                          ? 'bg-[#ff6b00] hover:bg-[#e05e00] shadow-[#ff6b00]/30 transform hover:-translate-y-0.5'
                          : 'bg-[#0066cc] hover:bg-[#0052a3] shadow-[#0066cc]/25'
                      }`}
                    >
                      <span>Đăng Ký Trực Tuyến</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    {/* SMS syntax quick button */}
                    <div className="flex items-center gap-2">
                      <button
                        id={`btn-copy-sms-${plan.id}`}
                        onClick={(e) => handleCopySms(plan, e)}
                        className="flex-1 py-2 px-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-lg text-xs font-semibold border border-slate-200 transition-colors flex items-center justify-center gap-1.5"
                        title="Sao chép cú pháp SMS"
                      >
                        {copiedSmsId === plan.id ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#10b981]" />
                            <span className="text-[#10b981]">Đã sao chép cú pháp!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-slate-500" />
                            <span className="truncate">SMS: {plan.smsSyntax}</span>
                          </>
                        )}
                      </button>

                      <button
                        id={`btn-help-sms-${plan.id}`}
                        onClick={() => onOpenSmsHelp(plan)}
                        className="p-2 bg-slate-50 hover:bg-slate-100 text-[#0066cc] rounded-lg border border-slate-200 transition-colors"
                        title="Hướng dẫn cú pháp SMS chi tiết"
                      >
                        <MessageSquare className="w-4 h-4" />
                      </button>
                    </div>

                  </div>

                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Local Support Banner */}
      <div className="mt-12 bg-gradient-to-r from-[#e8eeff] via-white to-[#f0f3ff] rounded-2xl p-6 border border-[#0066cc]/20 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#0066cc] text-white flex items-center justify-center shrink-0 shadow-md shadow-[#0066cc]/20">
            <Gift className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-heading font-bold text-base text-[#004e9f]">
              Bạn cần tư vấn gói cước phù hợp cho hộ kinh doanh hoặc gia đình tại Bình Mỹ?
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              Đội ngũ nhân viên VNPT Bình Mỹ hỗ trợ tư vấn tận nơi miễn phí, kiểm tra gói cước theo số điện thoại chỉ trong 1 phút.
            </p>
          </div>
        </div>

        <a
          href="tel:0918001260"
          className="bg-[#004e9f] hover:bg-[#003875] text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-xl whitespace-nowrap transition-colors flex items-center gap-2 shadow-xs"
        >
          <span>Gọi Hotline: 0918.001.260</span>
        </a>
      </div>

    </section>
  );
};
