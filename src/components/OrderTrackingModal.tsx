import React, { useState } from 'react';
import { OrderRecord } from '../types';
import { 
  X, 
  ShoppingBag, 
  Search, 
  Clock, 
  Truck, 
  CheckCircle2, 
  Phone, 
  MapPin, 
  AlertCircle 
} from 'lucide-react';

interface OrderTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: OrderRecord[];
}

export const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({
  isOpen,
  onClose,
  orders
}) => {
  const [filterPhone, setFilterPhone] = useState('');

  if (!isOpen) return null;

  const filteredOrders = orders.filter((o) => {
    if (!filterPhone) return true;
    return o.customerPhone.includes(filterPhone) || o.id.toLowerCase().includes(filterPhone.toLowerCase());
  });

  const formatPrice = (p: number) => new Intl.NumberFormat('vi-VN').format(p);

  const getStatusBadge = (status: OrderRecord['status']) => {
    switch (status) {
      case 'shipping':
        return (
          <span className="bg-amber-100 text-amber-800 border border-amber-300 text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
            <Truck className="w-3.5 h-3.5 text-amber-600" />
            Đang Giao Trong 30 Phút
          </span>
        );
      case 'completed':
        return (
          <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Đã Kích Hoạt Thành Công
          </span>
        );
      case 'pending':
        return (
          <span className="bg-blue-100 text-blue-800 border border-blue-300 text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-blue-600" />
            Đang Chuẩn Bị SIM
          </span>
        );
      default:
        return (
          <span className="bg-slate-100 text-slate-700 text-xs font-bold px-2.5 py-0.5 rounded-full">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0a192f]/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-[#0066cc]/20 relative max-h-[85vh] flex flex-col">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-[#0066cc]/10 text-[#0066cc] flex items-center justify-center">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-heading font-extrabold text-xl text-[#0d1c32]">
              Tra Cứu Đơn Hàng 5G Bình Mỹ
            </h3>
            <p className="text-xs text-slate-500">
              Theo dõi tiến trình giao SIM và kích hoạt dịch vụ tại Bình Mỹ, Ninh Bình
            </p>
          </div>
        </div>

        {/* Search input */}
        <div className="relative mb-4">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Lọc theo số điện thoại hoặc mã đơn..."
            value={filterPhone}
            onChange={(e) => setFilterPhone(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#0066cc]"
          />
        </div>

        {/* Order List */}
        <div className="overflow-y-auto flex-1 space-y-3 pr-1">
          {filteredOrders.length === 0 ? (
            <div className="text-center py-10 text-slate-500 text-xs">
              <AlertCircle className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <p>Chưa có đơn hàng nào khớp với tìm kiếm.</p>
            </div>
          ) : (
            filteredOrders.map((order) => (
              <div
                key={order.id}
                className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-[#0066cc]/30 transition-all text-xs space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-heading font-extrabold text-sm text-[#0066cc]">
                    {order.id}
                  </span>
                  {getStatusBadge(order.status)}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 border-t border-slate-200/60">
                  <div>
                    <span className="text-slate-400 block">Khách hàng:</span>
                    <span className="font-bold text-slate-800">{order.customerName} ({order.customerPhone})</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Thời gian đặt:</span>
                    <span className="text-slate-600 font-medium">{order.createdAt}</span>
                  </div>
                </div>

                <div className="bg-white p-2.5 rounded-xl border border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-900 block">
                      {order.planName || 'Gói Cước 5G'}
                    </span>
                    {order.simNumber && (
                      <span className="text-slate-500">SIM: <strong>{order.simNumber}</strong></span>
                    )}
                  </div>
                  <div className="text-right font-heading font-extrabold text-sm text-[#ff6b00]">
                    {formatPrice(order.totalAmount)}đ
                  </div>
                </div>

                <div className="text-slate-500 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#0066cc] shrink-0" />
                  <span className="truncate">{order.address}</span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer info */}
        <div className="pt-4 mt-2 border-t border-slate-200 flex items-center justify-between text-xs">
          <span className="text-slate-500">Cần hỗ trợ gấp? Gọi: <strong>02263.862.555</strong></span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-colors"
          >
            Đóng
          </button>
        </div>

      </div>
    </div>
  );
};
