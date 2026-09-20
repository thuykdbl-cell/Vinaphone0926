import React, { useState } from 'react';
import { PackagePlan } from '../types';
import { X, MessageSquare, Copy, CheckCircle2, Phone, Sparkles, ExternalLink } from 'lucide-react';

interface SmsHelpModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: PackagePlan | null;
}

export const SmsHelpModal: React.FC<SmsHelpModalProps> = ({
  isOpen,
  onClose,
  plan
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !plan) return null;

  const handleCopySyntax = () => {
    navigator.clipboard.writeText(plan.smsSyntax);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const cleanBody = encodeURIComponent(plan.smsSyntax.replace(' gửi 888', ''));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0a192f]/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#0066cc]/20 relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-[#0066cc]/10 text-[#0066cc] flex items-center justify-center">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-heading font-extrabold text-xl text-[#0d1c32]">
              Cú Pháp SMS Đăng Ký 5G
            </h3>
            <p className="text-xs text-slate-500">Gói cước: {plan.name} ({plan.dataPerDay})</p>
          </div>
        </div>

        {/* Big Code Box */}
        <div className="bg-[#0a192f] text-white p-5 rounded-2xl border border-[#00d2ff]/30 text-center space-y-3 my-4">
          <span className="text-xs text-slate-400 uppercase font-semibold">Soạn tin nhắn SMS theo cú pháp:</span>
          
          <div className="font-mono text-xl sm:text-2xl font-black text-[#00d2ff] tracking-wider py-2 bg-white/5 rounded-xl border border-white/10">
            {plan.smsSyntax}
          </div>

          <div className="flex items-center justify-center gap-3 pt-1">
            <button
              id="btn-copy-syntax-modal"
              onClick={handleCopySyntax}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5"
            >
              {copied ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-[#10b981]" />
                  <span className="text-[#10b981]">Đã sao chép cú pháp</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-[#00d2ff]" />
                  <span>Sao chép cú pháp</span>
                </>
              )}
            </button>

            <a
              href={`sms:888?body=${cleanBody}`}
              className="px-4 py-2 bg-[#ff6b00] hover:bg-[#e05e00] text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5"
            >
              <span>Mở ứng dụng SMS</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Helpful Tips */}
        <div className="space-y-2.5 text-xs text-slate-600 bg-slate-50 p-4 rounded-xl border border-slate-100">
          <div className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0066cc] mt-1.5"></span>
            <span><strong>Cước gửi tin nhắn tới đầu số 888:</strong> Hoàn toàn Miễn Phí (0đ).</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0066cc] mt-1.5"></span>
            <span><strong>Kiểm tra dung lượng còn lại:</strong> Soạn tin <code>DATA gửi 888</code></span>
          </div>
          <div className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0066cc] mt-1.5"></span>
            <span><strong>Hủy gói khi không có nhu cầu gia hạn:</strong> Soạn tin <code>HUY {plan.name.split(' ')[0]} gửi 888</code></span>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl text-xs font-bold transition-colors"
          >
            Đóng
          </button>
        </div>

      </div>
    </div>
  );
};
