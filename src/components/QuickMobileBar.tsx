import React from 'react';
import { PackagePlan } from '../types';
import { Zap, ArrowRight } from 'lucide-react';

interface QuickMobileBarProps {
  currentPlan: PackagePlan;
  onRegister: () => void;
}

export const QuickMobileBar: React.FC<QuickMobileBarProps> = ({
  currentPlan,
  onRegister
}) => {
  const formatPrice = (p: number) => new Intl.NumberFormat('vi-VN').format(p);

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#0066cc]/15 p-3 px-4 shadow-[0_-8px_25px_rgba(0,0,0,0.08)]">
      <div className="max-w-md mx-auto flex items-center justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <span className="font-heading font-extrabold text-sm text-[#0d1c32] truncate">
              {currentPlan.name}
            </span>
            <span className="bg-[#ff6b00] text-white text-[9px] font-bold px-1.5 py-0.2 rounded">
              5G
            </span>
          </div>
          <div className="flex items-baseline gap-1 text-xs">
            <span className="font-heading font-extrabold text-[#004e9f]">
              {formatPrice(currentPlan.price)}đ
            </span>
            <span className="text-[10px] text-slate-500">/{currentPlan.period}</span>
            <span className="text-[10px] text-slate-400">• {currentPlan.dataPerDay}</span>
          </div>
        </div>

        <button
          id="btn-sticky-register"
          onClick={onRegister}
          className="bg-[#ff6b00] hover:bg-[#e05e00] text-white text-xs sm:text-sm font-heading font-bold px-5 py-2.5 rounded-xl shadow-md shadow-[#ff6b00]/30 flex items-center gap-1.5 shrink-0 transition-transform active:scale-95"
        >
          <Zap className="w-4 h-4 fill-current" />
          <span>Đăng Ký Ngay</span>
        </button>
      </div>
    </div>
  );
};
