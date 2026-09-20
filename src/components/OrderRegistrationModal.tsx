import React, { useState } from 'react';
import { PackagePlan, SimItem, OrderRecord } from '../types';
import { 
  X, 
  CheckCircle2, 
  MapPin, 
  Phone, 
  User, 
  Truck, 
  QrCode, 
  CreditCard, 
  ShieldCheck, 
  Zap, 
  Clock, 
  Copy
} from 'lucide-react';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan: PackagePlan | null;
  selectedSim: SimItem | null;
  onOrderCreated: (order: OrderRecord) => void;
}

export const OrderRegistrationModal: React.FC<OrderModalProps> = ({
  isOpen,
  onClose,
  selectedPlan,
  selectedSim,
  onOrderCreated
}) => {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [selectedAp, setSelectedAp] = useState('Khu Trung Tâm (774 Trần Hưng Đạo)');
  const [streetAddress, setStreetAddress] = useState('');
  const [deliveryType, setDeliveryType] = useState<'at_home' | 'esim_email' | 'pick_up_store'>('at_home');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'vietqr' | 'vnpt_money'>('cod');
  const [isSuccess, setIsSuccess] = useState(false);
  const [createdOrder, setCreatedOrder] = useState<OrderRecord | null>(null);

  if (!isOpen) return null;

  const apOptions = [
    'Khu Trung Tâm (774 Trần Hưng Đạo)',
    'Khu Phố Bắc (Trần Hưng Đạo kéo dài)',
    'Khu Hành Chính (Chợ & UBND Bình Mỹ)',
    'Khu Phố Mới (Tuyến đô thị mới)',
    'Cửa Ngõ Phía Nam (Tuyến kết nối Ninh Bình)',
    'Khu Công Nghiệp & Tiểu Thủ Công Nghiệp',
    'Khu Vành Đai Dân Cư Bình Mỹ'
  ];

  const totalAmount = (selectedPlan?.price || 0) + (selectedSim?.price || 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone) return;

    const newOrder: OrderRecord = {
      id: `VNPT-BM-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName,
      customerPhone,
      selectedPlanId: selectedPlan?.id,
      planName: selectedPlan?.name,
      simNumber: selectedSim?.formattedNumber,
      deliveryType,
      address: deliveryType === 'at_home' 
        ? `${streetAddress || 'Đường chính'}, ${selectedAp}, Bình Mỹ, Ninh Bình`
        : deliveryType === 'esim_email'
          ? `Gửi QR qua Email: ${email || customerPhone}`
          : 'Nhận tại VNPT Bình Mỹ (774 Trần Hưng Đạo, Bình Mỹ, Ninh Bình)',
      ap: selectedAp,
      email: email || undefined,
      notes: notes || undefined,
      totalAmount,
      paymentMethod,
      status: 'shipping',
      createdAt: new Date().toLocaleString('vi-VN')
    };

    onOrderCreated(newOrder);
    setCreatedOrder(newOrder);
    setIsSuccess(true);
  };

  const handleResetAndClose = () => {
    setIsSuccess(false);
    setCreatedOrder(null);
    onClose();
  };

  const formatPrice = (p: number) => new Intl.NumberFormat('vi-VN').format(p);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0a192f]/70 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-[#0066cc]/20 relative my-8">
        
        {/* Close Button */}
        <button
          onClick={handleResetAndClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess && createdOrder ? (
          /* Success Screen */
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 bg-[#10b981]/15 text-[#10b981] rounded-full flex items-center justify-center mx-auto ring-8 ring-[#10b981]/10">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <h3 className="font-heading font-extrabold text-2xl text-[#0d1c32]">
                Đăng Ký Thành Công!
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-md mx-auto">
                VNPT Bình Mỹ (774 Trần Hưng Đạo, Bình Mỹ, Ninh Bình) đã tiếp nhận thông tin của bạn. Nhân viên sẽ liên hệ xác nhận trong ít phút.
              </p>
            </div>

            {/* Order Slip */}
            <div className="bg-[#f0f3ff] rounded-2xl p-4 text-left text-xs space-y-2.5 border border-[#0066cc]/15">
              <div className="flex justify-between font-bold text-slate-800 pb-2 border-b border-slate-200">
                <span>Mã đơn hàng:</span>
                <span className="text-[#0066cc] font-heading">{createdOrder.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Khách hàng:</span>
                <span className="font-semibold text-slate-800">{createdOrder.customerName} - {createdOrder.customerPhone}</span>
              </div>
              {createdOrder.planName && (
                <div className="flex justify-between">
                  <span className="text-slate-500">Gói cước 5G:</span>
                  <span className="font-semibold text-[#ff6b00]">{createdOrder.planName}</span>
                </div>
              )}
              {createdOrder.simNumber && (
                <div className="flex justify-between">
                  <span className="text-slate-500">Số SIM chọn:</span>
                  <span className="font-semibold text-[#0066cc]">{createdOrder.simNumber}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-slate-500">Địa chỉ / Hình thức:</span>
                <span className="font-semibold text-slate-800 text-right max-w-[240px] truncate">{createdOrder.address}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-200 font-bold text-sm">
                <span>Tổng tiền thanh toán:</span>
                <span className="text-[#004e9f]">{formatPrice(createdOrder.totalAmount)}đ</span>
              </div>
            </div>

            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-800 flex items-center gap-2 text-left">
              <Clock className="w-4 h-4 text-amber-600 shrink-0" />
              <span>
                Thời gian giao SIM & kích hoạt tại Bình Mỹ: <strong>30 - 45 phút</strong> kể từ khi xác nhận.
              </span>
            </div>

            <button
              onClick={handleResetAndClose}
              className="w-full py-3 bg-[#0066cc] hover:bg-[#0052a3] text-white font-heading font-bold text-sm rounded-xl transition-all shadow-md shadow-[#0066cc]/25"
            >
              Hoàn Tất & Đóng
            </button>
          </div>
        ) : (
          /* Registration Form */
          <div>
            {/* Modal Title */}
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 bg-[#0066cc]/10 text-[#0052a3] text-xs font-bold px-2.5 py-0.5 rounded-full uppercase mb-2">
                <Zap className="w-3 h-3 text-[#ff6b00]" />
                <span>Đăng Ký Dịch Vụ 5G Bình Mỹ</span>
              </div>
              <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-[#0d1c32]">
                Thông Tin Đăng Ký & Nhận SIM
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Áp dụng ưu đãi kích hoạt trạm 5G tại VNPT Bình Mỹ, Ninh Bình
              </p>
            </div>

            {/* Chosen items summary banner */}
            <div className="bg-[#f0f3ff] rounded-2xl p-3.5 mb-5 border border-[#0066cc]/15 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400">Dịch vụ đã chọn:</span>
                <div className="font-heading font-bold text-sm text-[#004e9f] flex items-center gap-2">
                  {selectedPlan?.name || 'Gói Cước 5G VinaPhone'}
                  {selectedSim && (
                    <span className="text-xs text-slate-600 font-normal">
                      + SIM: <strong>{selectedSim.formattedNumber}</strong>
                    </span>
                  )}
                </div>
                {selectedPlan && (
                  <span className="text-xs text-slate-500">
                    {selectedPlan.dataPerDay} ({selectedPlan.totalData})
                  </span>
                )}
              </div>

              <div className="text-right">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Tạm tính</span>
                <div className="font-heading font-extrabold text-lg text-[#ff6b00]">
                  {formatPrice(totalAmount)}đ
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    Họ và Tên khách hàng *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="Nguyễn Văn A"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#0066cc]"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    Số điện thoại liên hệ *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      placeholder="0918xxxxxx"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#0066cc]"
                    />
                  </div>
                </div>
              </div>

              {/* Delivery method selector */}
              <div>
                <label className="font-semibold text-slate-700 block mb-1.5">
                  Phương thức nhận SIM / Kích hoạt:
                </label>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setDeliveryType('at_home')}
                    className={`p-2.5 rounded-xl border text-center font-medium transition-all ${
                      deliveryType === 'at_home'
                        ? 'border-[#0066cc] bg-[#0066cc]/10 text-[#004e9f] font-bold ring-1 ring-[#0066cc]'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Truck className="w-4 h-4 mx-auto mb-1 text-[#0066cc]" />
                    <span>Giao tận nơi 30p</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeliveryType('esim_email')}
                    className={`p-2.5 rounded-xl border text-center font-medium transition-all ${
                      deliveryType === 'esim_email'
                        ? 'border-[#0066cc] bg-[#0066cc]/10 text-[#004e9f] font-bold ring-1 ring-[#0066cc]'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <QrCode className="w-4 h-4 mx-auto mb-1 text-[#0066cc]" />
                    <span>Mã eSIM QR</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeliveryType('pick_up_store')}
                    className={`p-2.5 rounded-xl border text-center font-medium transition-all ${
                      deliveryType === 'pick_up_store'
                        ? 'border-[#0066cc] bg-[#0066cc]/10 text-[#004e9f] font-bold ring-1 ring-[#0066cc]'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <MapPin className="w-4 h-4 mx-auto mb-1 text-[#0066cc]" />
                    <span>Tại điểm GD</span>
                  </button>
                </div>
              </div>

              {/* Address details */}
              {deliveryType === 'at_home' && (
                <div className="space-y-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">
                      Khu vực / Tuyến đường tại Bình Mỹ:
                    </label>
                    <select
                      value={selectedAp}
                      onChange={(e) => setSelectedAp(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs sm:text-sm focus:outline-none focus:border-[#0066cc]"
                    >
                      {apOptions.map((ap, idx) => (
                        <option key={idx} value={ap}>{ap}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">
                      Địa chỉ cụ thể (Số nhà, tên đường, tổ dân phố) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="VD: Số 774 Trần Hưng Đạo, gần chợ Bình Mỹ"
                      value={streetAddress}
                      onChange={(e) => setStreetAddress(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs sm:text-sm focus:outline-none focus:border-[#0066cc]"
                    />
                  </div>
                </div>
              )}

              {deliveryType === 'esim_email' && (
                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                  <label className="font-semibold text-slate-700 block mb-1">
                    Email nhận mã QR kích hoạt eSIM
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs sm:text-sm focus:outline-none focus:border-[#0066cc]"
                  />
                </div>
              )}

              {/* Payment Method */}
              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Hình thức thanh toán:
                </label>
                <div className="flex gap-2">
                  <label className="flex-1 flex items-center gap-2 p-2.5 border rounded-xl cursor-pointer text-xs bg-slate-50 hover:bg-white border-slate-200">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="text-[#0066cc]"
                    />
                    <span>Tiền mặt khi nhận (COD)</span>
                  </label>
                  <label className="flex-1 flex items-center gap-2 p-2.5 border rounded-xl cursor-pointer text-xs bg-slate-50 hover:bg-white border-slate-200">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'vietqr'}
                      onChange={() => setPaymentMethod('vietqr')}
                      className="text-[#0066cc]"
                    />
                    <span>Chuyển khoản VietQR</span>
                  </label>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                id="btn-submit-order-form"
                type="submit"
                className="w-full py-3.5 bg-[#ff6b00] hover:bg-[#e05e00] text-white font-heading font-extrabold text-sm sm:text-base rounded-xl transition-all shadow-lg shadow-[#ff6b00]/30 transform hover:-translate-y-0.5 mt-2"
              >
                Xác Nhận Đăng Ký Ngay
              </button>

              <div className="text-[11px] text-slate-500 flex items-center gap-1.5 justify-center">
                <ShieldCheck className="w-3.5 h-3.5 text-[#10b981]" />
                <span>Bảo mật thông tin khách hàng tuyệt đối theo quy định VNPT</span>
              </div>

            </form>
          </div>
        )}

      </div>
    </div>
  );
};
