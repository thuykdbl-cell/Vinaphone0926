export type PlanCategory = 'all' | 'bestseller' | 'month' | 'combo' | 'gamer' | 'day' | 'longterm';

export interface PackagePlan {
  id: string;
  name: string;
  badge?: string;
  category: PlanCategory;
  price: number;
  period: string; // e.g., 'tháng', 'ngày', '6 tháng', '12 tháng'
  dataPerDay: string; // e.g., '6GB/ngày' or '2GB/ngày'
  totalData: string; // e.g., '180GB/tháng'
  voiceOnNet: string; // e.g., 'Miễn phí < 20 phút'
  voiceOffNet: string; // e.g., '50 phút/tháng'
  perks: string[]; // e.g., ['Free TikTok & Youtube', '5G Tốc độ đỉnh 1.5Gbps', 'MyTV VIP 180 kênh']
  smsSyntax: string; // e.g., 'DATA VD120N gửi 888'
  isBestSeller?: boolean;
  is5GExclusive?: boolean;
  colorTheme?: 'blue' | 'cyan' | 'orange' | 'purple';
  description: string;
}

export interface BtsStation {
  id: string;
  name: string;
  ap: string; // e.g., 'Ấp 4A'
  address: string;
  band: string; // e.g., 'n78 (3.7GHz)'
  maxSpeed: string; // e.g., '1.4 Gbps'
  latency: string; // e.g., '3.8 ms'
  signalStrength: number; // percentage 0-100
  status: 'active' | 'maintenance';
  coverageRadiusMeters: number;
  coordinates: { x: number; y: number }; // percentage on map
  connectedUsers: number;
}

export interface SimItem {
  id: string;
  phoneNumber: string;
  cleanNumber: string;
  formattedNumber: string;
  price: number;
  originalPrice?: number;
  badge?: string;
  type: 'Sim Vật Lý' | 'eSIM QR';
  category: 'thantai' | 'locphat' | 'tamhoa' | 'de_nho' | 'dong_gia';
  committedPlan?: string;
  hasFreeDelivery: boolean;
}

export interface OrderRecord {
  id: string;
  customerName: string;
  customerPhone: string;
  selectedPlanId?: string;
  planName?: string;
  simNumber?: string;
  deliveryType: 'at_home' | 'esim_email' | 'pick_up_store';
  address: string;
  ap: string;
  email?: string;
  notes?: string;
  totalAmount: number;
  paymentMethod: 'cod' | 'vietqr' | 'vnpt_money';
  status: 'pending' | 'shipping' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface SpeedMetric {
  ping: number;
  download: number;
  upload: number;
  jitter: number;
  packetLoss: number;
}
