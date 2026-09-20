import { PackagePlan, BtsStation, SimItem, OrderRecord } from '../types';

export const POPULAR_PLANS: PackagePlan[] = [
  {
    id: 'vd120n',
    name: 'VD120N 5G',
    badge: 'BÌNH MỸ BEST SELLER',
    category: 'bestseller',
    price: 120000,
    period: 'tháng',
    dataPerDay: '6GB/ngày',
    totalData: '180GB/tháng',
    voiceOnNet: 'Miễn phí gọi nội mạng < 20 phút',
    voiceOffNet: '50 phút gọi ngoại mạng',
    perks: [
      '6GB Data 5G tốc độ cao mỗi ngày (180GB/tháng)',
      'Miễn phí toàn bộ cuộc gọi nội mạng VinaPhone dưới 20 phút',
      '50 phút gọi liên mạng trong nước',
      'Tặng gói xem TikTok, YouTube không giới hạn dung lượng',
      'Đặc quyền trạm 5G Bình Mỹ ưu tiên băng thông tối đa'
    ],
    smsSyntax: 'DATA VD120N gửi 888',
    isBestSeller: true,
    is5GExclusive: true,
    colorTheme: 'orange',
    description: 'Gói cước 5G quốc dân được cư dân Bình Mỹ đăng ký nhiều nhất. Tốc độ xem video 4K mượt mà, gọi điện thả ga.'
  },
  {
    id: 'yolo125v',
    name: 'YOLO125V 5G',
    badge: 'SIÊU DATA GIẢI TRÍ',
    category: 'gamer',
    price: 125000,
    period: 'tháng',
    dataPerDay: '7GB/ngày',
    totalData: '210GB/tháng',
    voiceOnNet: 'Cước thoại tiêu chuẩn rẻ nhất',
    voiceOffNet: 'Hỗ trợ tính năng VoLTE HD',
    perks: [
      '7GB Data 5G mỗi ngày (210GB/tháng tốc độ đỉnh)',
      'Free data không giới hạn: MyTV VIP hơn 180 kênh truyền hình',
      'Tối ưu hóa độ trễ < 4ms chơi game Liên Quân, Free Fire, PUBG',
      'Tặng tài khoản MyTV trên SmartTV và điện thoại'
    ],
    smsSyntax: 'DATA YOLO125V gửi 888',
    is5GExclusive: true,
    colorTheme: 'cyan',
    description: 'Dành riêng cho game thủ và tín đồ cày phim, livestream với 7GB mỗi ngày và miễn phí MyTV full HD.'
  },
  {
    id: 'd159v',
    name: 'D159V VIP',
    badge: 'COMBO DOANH NHÂN',
    category: 'combo',
    price: 159000,
    period: 'tháng',
    dataPerDay: '6GB/ngày',
    totalData: '180GB/tháng',
    voiceOnNet: '1.500 phút gọi nội mạng',
    voiceOffNet: '200 phút gọi ngoại mạng',
    perks: [
      '6GB Data 5G/ngày (180GB tốc độ cao)',
      '1.500 phút gọi nội mạng VinaPhone',
      '200 phút gọi ngoại mạng (Viettel, Mobi, Vietnamobile)',
      '200 SMS nội mạng miễn phí',
      'Ưu tiên kết nối mạng công tác & chuyển vùng dữ liệu'
    ],
    smsSyntax: 'DATA D159V gửi 888',
    is5GExclusive: true,
    colorTheme: 'blue',
    description: 'Giải pháp trọn gói cho công việc, liên lạc và kinh doanh buôn bán tại Bình Mỹ với lượng phút gọi cực lớn.'
  },
  {
    id: 'big50y',
    name: 'BIG50Y BÌNH MỸ',
    badge: 'ĐẶC QUYỀN GIÁ RẺ',
    category: 'month',
    price: 50000,
    period: 'tháng',
    dataPerDay: '5GB/ngày',
    totalData: '150GB/tháng',
    voiceOnNet: 'Theo cước hiện hành',
    voiceOffNet: 'Theo cước hiện hành',
    perks: [
      '5GB Data tốc độ 5G mỗi ngày (150GB/tháng)',
      'Free data xem TikTok, Zalo, YouTube cả tháng',
      'Gói cước trợ giá riêng cho thuê bao thuộc khu vực Bình Mỹ',
      'Tự động gia hạn khi đủ tài khoản'
    ],
    smsSyntax: 'DATA BIG50Y gửi 888',
    colorTheme: 'purple',
    description: 'Chỉ 50.000đ nhận ngay 150GB data 5G chất lượng cao. Giá sinh viên, trải nghiệm công nghệ số.'
  },
  {
    id: 'd5_day',
    name: 'D5 5G NGÀY',
    badge: 'TIỆN LỢI 24H',
    category: 'day',
    price: 5000,
    period: '24 giờ',
    dataPerDay: '1GB/ngày',
    totalData: '1GB / 24h',
    voiceOnNet: 'Không gồm thoại',
    voiceOffNet: 'Không gồm thoại',
    perks: [
      '1GB Data 5G tốc độ tối đa sử dụng trong 24h',
      'Đăng ký tức thì qua SMS hoặc Online',
      'Phù hợp khi ra ngoài, phát wifi đột xuất tại Bình Mỹ',
      'Hết dung lượng hạ băng thông không phát sinh cước'
    ],
    smsSyntax: 'DATA D5 gửi 888',
    colorTheme: 'blue',
    description: 'Gói cứu trợ data thần tốc chỉ 5.000đ dùng trong ngày khi cần kết nối gấp.'
  },
  {
    id: 'd15_day',
    name: 'D15 5G 3 NGÀY',
    badge: 'CUỐI TUẦN THẢ GA',
    category: 'day',
    price: 15000,
    period: '3 ngày',
    dataPerDay: '5GB/3 ngày',
    totalData: '5GB dung lượng',
    voiceOnNet: 'Không gồm thoại',
    voiceOffNet: 'Không gồm thoại',
    perks: [
      '5GB Data 5G sử dụng trong 3 ngày',
      'Lướt web, bản đồ, xem video tốc độ cao',
      'Thích hợp đi du lịch dã ngoại hoặc về quê Bình Mỹ cuối tuần',
      'Hủy tự động nếu không có nhu cầu gia hạn'
    ],
    smsSyntax: 'DATA D15 gửi 888',
    colorTheme: 'cyan',
    description: 'Dành cho khách hàng về nghỉ ngơi, câu cá giải trí tại các nhà vườn Bình Mỹ những ngày cuối tuần.'
  },
  {
    id: '6vd120n',
    name: '6VD120N (6T + 1T)',
    badge: 'TẶNG 1 THÁNG MIỄN PHÍ',
    category: 'longterm',
    price: 720000,
    period: '7 tháng',
    dataPerDay: '6GB/ngày',
    totalData: '180GB/tháng x 7',
    voiceOnNet: 'Miễn phí gọi nội mạng < 20 phút',
    voiceOffNet: '50 phút gọi ngoại mạng/tháng',
    perks: [
      'Đóng 6 tháng được dùng 7 tháng (Tiết kiệm 120.000đ)',
      '6GB data 5G mỗi ngày trong suốt 210 ngày',
      'Không lo bị gián đoạn hay quên nạp tiền hàng tháng',
      'Miễn phí giao SIM hoặc kích hoạt trực tiếp tại nhà'
    ],
    smsSyntax: 'DATA 6VD120N gửi 888',
    isBestSeller: true,
    colorTheme: 'orange',
    description: 'Gói dài hạn kinh tế nhất: mua 6 tháng tặng thêm 1 tháng trọn vẹn, không lo nạp tiền.'
  },
  {
    id: '12vd120n',
    name: '12VD120N (12T + 2T)',
    badge: 'TẶNG 2 THÁNG MIỄN PHÍ',
    category: 'longterm',
    price: 1440000,
    period: '14 tháng',
    dataPerDay: '6GB/ngày',
    totalData: '180GB/tháng x 14',
    voiceOnNet: 'Miễn phí gọi nội mạng < 20 phút',
    voiceOffNet: '50 phút ngoại mạng/tháng',
    perks: [
      'Đóng 12 tháng được sử dụng 14 tháng (Tiết kiệm 240.000đ)',
      'Tặng kèm 1 thẻ cào 50.000đ hoặc quà lưu niệm VNPT Bình Mỹ',
      'Bảo lưu gói cước trọn gói 420 ngày liên tục',
      'Hỗ trợ kỹ thuật ưu tiên 24/7 từ điểm giao dịch Bình Mỹ'
    ],
    smsSyntax: 'DATA 12VD120N gửi 888',
    colorTheme: 'blue',
    description: 'An tâm kết nối cả năm với 14 tháng sử dụng, nhận thêm ưu đãi độc quyền tại địa phương.'
  }
];

export const BTS_STATIONS_BINH_MY: BtsStation[] = [
  {
    id: 'bts-bm-01',
    name: 'Trạm 5G Trung Tâm VNPT Bình Mỹ (774 Trần Hưng Đạo)',
    ap: 'Khu Trung Tâm',
    address: '774 Trần Hưng Đạo, Bình Mỹ, Ninh Bình',
    band: 'n78 (3.7GHz) Massive MIMO',
    maxSpeed: '1.45 Gbps',
    latency: '3.4 ms',
    signalStrength: 98,
    status: 'active',
    coverageRadiusMeters: 1800,
    coordinates: { x: 48, y: 52 },
    connectedUsers: 842
  },
  {
    id: 'bts-bm-02',
    name: 'Trạm 5G Tuyến Trục Trần Hưng Đạo Bắc',
    ap: 'Khu Phố Bắc',
    address: 'Đường Trần Hưng Đạo kéo dài, Bình Mỹ',
    band: 'n78 (3.7GHz) 100MHz Carrier',
    maxSpeed: '1.38 Gbps',
    latency: '4.1 ms',
    signalStrength: 95,
    status: 'active',
    coverageRadiusMeters: 1600,
    coordinates: { x: 22, y: 80 },
    connectedUsers: 690
  },
  {
    id: 'bts-bm-03',
    name: 'Trạm 5G Chợ & Trung Tâm Hành Chính Bình Mỹ',
    ap: 'Khu Hành Chính',
    address: 'Khu vực Chợ trung tâm & UBND Bình Mỹ',
    band: 'n77/n78 (3.5 - 3.7GHz)',
    maxSpeed: '1.52 Gbps',
    latency: '3.2 ms',
    signalStrength: 99,
    status: 'active',
    coverageRadiusMeters: 1900,
    coordinates: { x: 62, y: 38 },
    connectedUsers: 1120
  },
  {
    id: 'bts-bm-04',
    name: 'Trạm 5G Cụm Dân Cư Phố Mới Bình Mỹ',
    ap: 'Khu Phố Mới',
    address: 'Tuyến đường đô thị mới, Bình Mỹ',
    band: 'n78 (3.7GHz)',
    maxSpeed: '1.25 Gbps',
    latency: '4.5 ms',
    signalStrength: 92,
    status: 'active',
    coverageRadiusMeters: 1750,
    coordinates: { x: 25, y: 30 },
    connectedUsers: 540
  },
  {
    id: 'bts-bm-05',
    name: 'Trạm 5G Tuyến Trục Kết Nối Ninh Bình',
    ap: 'Cửa Ngõ Phía Nam',
    address: 'Tuyến quốc lộ kết nối trung tâm Ninh Bình',
    band: 'n78 (3.7GHz) C-Band',
    maxSpeed: '1.48 Gbps',
    latency: '3.6 ms',
    signalStrength: 96,
    status: 'active',
    coverageRadiusMeters: 2100,
    coordinates: { x: 80, y: 22 },
    connectedUsers: 910
  },
  {
    id: 'bts-bm-06',
    name: 'Trạm 5G Cụm Công Nghiệp & Tiểu Thủ Công Nghiệp',
    ap: 'Khu Công Nghiệp',
    address: 'Khu vực cụm công nghiệp Bình Mỹ',
    band: 'n78 (3.7GHz)',
    maxSpeed: '1.30 Gbps',
    latency: '4.0 ms',
    signalStrength: 90,
    status: 'active',
    coverageRadiusMeters: 1650,
    coordinates: { x: 74, y: 68 },
    connectedUsers: 480
  },
  {
    id: 'bts-bm-07',
    name: 'Trạm 5G Tuyến Vành Đai Dân Cư Bình Mỹ',
    ap: 'Khu Vành Đai',
    address: 'Tuyến đường vành đai dân cư Bình Mỹ',
    band: 'n78 (3.7GHz)',
    maxSpeed: '1.28 Gbps',
    latency: '4.2 ms',
    signalStrength: 91,
    status: 'active',
    coverageRadiusMeters: 1500,
    coordinates: { x: 44, y: 25 },
    connectedUsers: 410
  }
];

export const AVAILABLE_SIMS: SimItem[] = [
  {
    id: 'sim-01',
    phoneNumber: '0918.68.79.68',
    cleanNumber: '0918687968',
    formattedNumber: '0918.68.79.68',
    price: 350000,
    originalPrice: 500000,
    badge: 'LỘC PHÁT - THẦN TÀI',
    type: 'Sim Vật Lý',
    category: 'locphat',
    committedPlan: 'VD120N',
    hasFreeDelivery: true
  },
  {
    id: 'sim-02',
    phoneNumber: '0919.79.39.79',
    cleanNumber: '0919793979',
    formattedNumber: '0919.79.39.79',
    price: 420000,
    originalPrice: 650000,
    badge: 'ĐẠI THẦN TÀI',
    type: 'eSIM QR',
    category: 'thantai',
    committedPlan: 'YOLO125V',
    hasFreeDelivery: true
  },
  {
    id: 'sim-03',
    phoneNumber: '0888.333.689',
    cleanNumber: '0888333689',
    formattedNumber: '0888.333.689',
    price: 490000,
    originalPrice: 700000,
    badge: 'TAM HOA ĐẠI PHÁT',
    type: 'Sim Vật Lý',
    category: 'tamhoa',
    committedPlan: 'D159V',
    hasFreeDelivery: true
  },
  {
    id: 'sim-04',
    phoneNumber: '0812.868.968',
    cleanNumber: '0812868968',
    formattedNumber: '0812.868.968',
    price: 280000,
    originalPrice: 380000,
    badge: 'LỘC PHÁT KÉP',
    type: 'eSIM QR',
    category: 'locphat',
    committedPlan: 'VD120N',
    hasFreeDelivery: true
  },
  {
    id: 'sim-05',
    phoneNumber: '0855.999.386',
    cleanNumber: '0855999386',
    formattedNumber: '0855.999.386',
    price: 320000,
    originalPrice: 450000,
    badge: 'TAM HOA 999',
    type: 'Sim Vật Lý',
    category: 'tamhoa',
    committedPlan: 'BIG50Y',
    hasFreeDelivery: true
  },
  {
    id: 'sim-06',
    phoneNumber: '0941.52.53.54',
    cleanNumber: '0941525354',
    formattedNumber: '0941.52.53.54',
    price: 190000,
    originalPrice: 250000,
    badge: 'TIẾN ĐỀU DỄ NHỚ',
    type: 'Sim Vật Lý',
    category: 'de_nho',
    committedPlan: 'VD120N',
    hasFreeDelivery: true
  },
  {
    id: 'sim-07',
    phoneNumber: '0912.789.678',
    cleanNumber: '0912789678',
    formattedNumber: '0912.789.678',
    price: 390000,
    originalPrice: 550000,
    badge: 'SẢNH TIẾN VIP',
    type: 'eSIM QR',
    category: 'de_nho',
    committedPlan: 'D159V',
    hasFreeDelivery: true
  },
  {
    id: 'sim-08',
    phoneNumber: '0834.000.5G9',
    cleanNumber: '0834000569',
    formattedNumber: '0834.000.569',
    price: 150000,
    originalPrice: 200000,
    badge: 'SIM 5G ĐỒNG GIÁ',
    type: 'Sim Vật Lý',
    category: 'dong_gia',
    committedPlan: 'BIG50Y',
    hasFreeDelivery: true
  }
];

export const INITIAL_ORDERS: OrderRecord[] = [
  {
    id: 'VNPT-BM-9821',
    customerName: 'Nguyễn Văn Hùng',
    customerPhone: '0918123456',
    selectedPlanId: 'vd120n',
    planName: 'VD120N 5G (6GB/ngày)',
    simNumber: '0918.68.79.68',
    deliveryType: 'at_home',
    address: '774 Trần Hưng Đạo, Bình Mỹ, Ninh Bình',
    ap: 'Khu Trung Tâm',
    totalAmount: 470000,
    paymentMethod: 'cod',
    status: 'shipping',
    createdAt: '2026-09-20 08:30'
  },
  {
    id: 'VNPT-BM-9819',
    customerName: 'Trần Thị Mai',
    customerPhone: '0949888999',
    selectedPlanId: 'yolo125v',
    planName: 'YOLO125V 5G (7GB/ngày)',
    simNumber: '0919.79.39.79',
    deliveryType: 'esim_email',
    address: 'Nhận mã kích hoạt qua Email & Zalo',
    ap: 'Khu Phố Mới',
    email: 'maitran.ninhbinh@gmail.com',
    totalAmount: 545000,
    paymentMethod: 'vietqr',
    status: 'completed',
    createdAt: '2026-09-19 19:15'
  }
];

export const SUBSCRIBER_DATABASE: Record<string, {
  owner: string;
  currentPlan: string;
  balance: string;
  expiryDate: string;
  specialOffers: string[];
}> = {
  '0918123456': {
    owner: 'Nguyễn V. H***',
    currentPlan: 'VD120N 5G',
    balance: '45.000đ',
    expiryDate: '15/10/2026',
    specialOffers: ['6VD120N (Tặng 1 tháng)', '12VD120N (Tặng 2 tháng)', 'YOLO125V']
  },
  '0949888999': {
    owner: 'Trần T. M***',
    currentPlan: 'BIG50Y',
    balance: '120.000đ',
    expiryDate: '28/09/2026',
    specialOffers: ['VD120N (Nâng cấp nhận thêm 1GB/ngày)', 'D159V VIP']
  },
  '0912345678': {
    owner: 'Lê H. P***',
    currentPlan: 'Chưa có gói 5G',
    balance: '150.000đ',
    expiryDate: 'Không thời hạn',
    specialOffers: ['BIG50Y (Đặc quyền Bình Mỹ 50k)', 'VD120N 5G', 'D5 Ngày']
  }
};
