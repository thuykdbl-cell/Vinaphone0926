import React, { useState } from 'react';
import { BtsStation } from '../types';
import { 
  Radio, 
  MapPin, 
  Wifi, 
  Activity, 
  CheckCircle2, 
  Layers, 
  Navigation,
  Sparkles,
  ArrowUpRight,
  ShieldAlert
} from 'lucide-react';

interface CoverageMapProps {
  stations: BtsStation[];
  onSelectStationToRegister?: () => void;
}

export const CoverageMap: React.FC<CoverageMapProps> = ({
  stations,
  onSelectStationToRegister
}) => {
  const [selectedStation, setSelectedStation] = useState<BtsStation>(stations[0]);
  const [userAp, setUserAp] = useState<string>('Khu Trung Tâm');
  const [checkResult, setCheckResult] = useState<{
    quality: string;
    speed: string;
    latency: string;
    distance: string;
    recommendation: string;
  } | null>({
    quality: 'Cực Mạnh (5/5 Vạch)',
    speed: '1.45 Gbps',
    latency: '3.4 ms',
    distance: 'Khoảng 120m từ trạm BTS 774 Trần Hưng Đạo',
    recommendation: 'Khu vực sóng 5G phủ trọn vẹn. Khuyên dùng gói VD120N hoặc YOLO125V để tối ưu tốc độ.'
  });

  const apList = [
    { name: 'Khu Trung Tâm (774 Trần Hưng Đạo)', stationId: 'bts-bm-01' },
    { name: 'Khu Phố Bắc (Trần Hưng Đạo kéo dài)', stationId: 'bts-bm-02' },
    { name: 'Khu Hành Chính (Chợ & UBND Bình Mỹ)', stationId: 'bts-bm-03' },
    { name: 'Khu Phố Mới (Tuyến đô thị mới)', stationId: 'bts-bm-04' },
    { name: 'Cửa Ngõ Phía Nam (Tuyến kết nối Ninh Bình)', stationId: 'bts-bm-05' },
    { name: 'Khu Công Nghiệp & Tiểu Thủ Công Nghiệp', stationId: 'bts-bm-06' },
    { name: 'Khu Vành Đai Dân Cư Bình Mỹ', stationId: 'bts-bm-07' }
  ];

  const handleCheckAddress = (apName: string) => {
    setUserAp(apName);
    const item = apList.find((x) => x.name.includes(apName) || apName.includes(x.name));
    if (item) {
      const st = stations.find((s) => s.id === item.stationId) || stations[0];
      setSelectedStation(st);
      setCheckResult({
        quality: 'Sóng 5G Cực Mạnh (100%)',
        speed: st.maxSpeed,
        latency: st.latency,
        distance: `Khoảng 150m - 350m từ ${st.name}`,
        recommendation: `Đã phủ sóng trạm 5G băng tần ${st.band}. Thoải mái đăng ký SIM 5G trải nghiệm ngay.`
      });
    }
  };

  return (
    <section id="coverage-section" className="py-12 md:py-20 bg-[#0a192f] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/10 border border-[#00d2ff]/30 px-3 py-1 rounded-full mb-3">
              <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse"></span>
              <span className="text-xs font-bold text-[#00d2ff] uppercase tracking-wider">
                BẢN ĐỒ VÙNG PHỦ SÓNG 5G BÌNH MỸ
              </span>
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Mạng Lưới Trạm BTS 5G VNPT Tại Bình Mỹ
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mt-2 max-w-2xl">
              Hạ tầng viễn thông 5G băng tần n78 (3.7GHz) hiện đại bậc nhất, phủ sóng toàn diện khu vực Bình Mỹ, Ninh Bình.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-300 bg-white/5 border border-white/10 p-3 rounded-xl">
            <Radio className="w-5 h-5 text-[#00d2ff] shrink-0" />
            <div>
              <span className="font-bold text-white block">Hệ thống trạm đang hoạt động 100%</span>
              <span className="text-[11px] text-[#10b981]">Giám sát thời gian thực (NOC VNPT)</span>
            </div>
          </div>
        </div>

        {/* Two-column layout: Map simulator and station inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Map Canvas Representation */}
          <div className="lg:col-span-7 bg-[#0d2137] rounded-2xl p-4 sm:p-6 border border-[#00d2ff]/20 shadow-2xl relative overflow-hidden">
            
            {/* Map Canvas Background with River and Landmarks */}
            <div className="relative w-full h-[400px] sm:h-[460px] bg-[#071322] rounded-xl border border-white/10 overflow-hidden select-none">
              
              {/* Sông visual curve */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40" xmlns="http://www.w3.org/2000/svg">
                <path 
                  d="M 280 0 Q 320 180, 260 280 T 360 460" 
                  fill="none" 
                  stroke="#00d2ff" 
                  strokeWidth="28" 
                  strokeLinecap="round"
                  className="opacity-25"
                />
                <path 
                  d="M 280 0 Q 320 180, 260 280 T 360 460" 
                  fill="none" 
                  stroke="#0066cc" 
                  strokeWidth="12" 
                  strokeLinecap="round"
                />
                {/* Main Arterial Road (Tran Hung Dao) */}
                <line x1="20" y1="230" x2="380" y2="230" stroke="#f59e0b" strokeWidth="4" strokeDasharray="6 4" opacity="0.6" />
                {/* Secondary Arterial Road */}
                <line x1="30" y1="80" x2="220" y2="80" stroke="#e2e8f0" strokeWidth="3" opacity="0.4" />
              </svg>

              {/* Map Labels / Landmarks */}
              <div className="absolute top-3 left-4 text-[10px] uppercase font-bold text-slate-400 bg-[#0a192f]/80 px-2 py-1 rounded border border-white/10">
                Khu vực Bình Mỹ, Ninh Bình
              </div>

              <div className="absolute top-4 right-4 text-[11px] font-semibold text-[#00d2ff] flex items-center gap-1 bg-[#0a192f]/90 px-2.5 py-1 rounded-full border border-[#00d2ff]/30">
                <Navigation className="w-3.5 h-3.5" />
                <span>Hướng Trung Tâm Ninh Bình</span>
              </div>

              <div className="absolute bottom-4 left-4 text-[11px] font-semibold text-slate-300 flex items-center gap-1 bg-[#0a192f]/90 px-2.5 py-1 rounded-full border border-white/10">
                <Navigation className="w-3.5 h-3.5 rotate-180" />
                <span>Cửa Ngõ Phía Nam</span>
              </div>

              <div className="absolute top-1/2 left-4 -translate-y-1/2 text-[10px] text-amber-300 bg-amber-950/70 px-2 py-0.5 rounded border border-amber-500/30">
                Đường Trần Hưng Đạo
              </div>

              {/* Interactive Station Nodes on Map */}
              {stations.map((st) => {
                const isSelected = selectedStation.id === st.id;
                return (
                  <div
                    key={st.id}
                    id={`map-node-${st.id}`}
                    onClick={() => setSelectedStation(st)}
                    style={{ left: `${st.coordinates.x}%`, top: `${st.coordinates.y}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20"
                  >
                    {/* Pulsing signal radius ring when selected */}
                    {isSelected && (
                      <>
                        <span className="absolute -inset-6 rounded-full bg-[#00d2ff]/20 animate-ping pointer-events-none"></span>
                        <span className="absolute -inset-10 rounded-full border border-[#00d2ff]/40 pointer-events-none"></span>
                      </>
                    )}

                    {/* Antenna Pin Icon */}
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                      isSelected 
                        ? 'bg-[#ff6b00] text-white ring-4 ring-[#00d2ff]/40 scale-110 shadow-lg shadow-[#ff6b00]/50' 
                        : 'bg-[#004e9f] hover:bg-[#0066cc] text-white border border-[#00d2ff]/60'
                    }`}>
                      <Radio className="w-4 h-4" />
                    </div>

                    {/* Node Tag Floating label */}
                    <div className={`absolute top-full mt-1.5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-bold px-2 py-0.5 rounded shadow-md pointer-events-none transition-all ${
                      isSelected 
                        ? 'bg-[#ff6b00] text-white ring-1 ring-white/50' 
                        : 'bg-[#0a192f]/90 text-slate-200 border border-white/20 group-hover:bg-[#0066cc]'
                    }`}>
                      {st.ap}
                    </div>
                  </div>
                );
              })}

              {/* Map Legend */}
              <div className="absolute bottom-3 right-3 bg-[#0a192f]/90 backdrop-blur-md p-2.5 rounded-lg border border-white/10 text-[10px] space-y-1">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ff6b00]"></span>
                  <span className="text-slate-200">Trạm 5G đang xem</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#004e9f]"></span>
                  <span className="text-slate-200">Trạm 5G phủ sóng</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-1 bg-[#00d2ff]"></span>
                  <span className="text-slate-300">Sông Sài Gòn</span>
                </div>
              </div>

            </div>

            {/* Quick Station list under map */}
            <div className="mt-4 flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
              {stations.map((st) => (
                <button
                  key={st.id}
                  onClick={() => setSelectedStation(st)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                    selectedStation.id === st.id
                      ? 'bg-[#0066cc] text-white border border-[#00d2ff]'
                      : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
                  }`}
                >
                  <MapPin className="w-3 h-3 text-[#ff6b00]" />
                  <span>{st.ap}</span>
                </button>
              ))}
            </div>

          </div>

          {/* Right Column: Station Details & Address Coverage Checker */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Selected Station Telemetry Card */}
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-5 sm:p-6 border border-[#00d2ff]/25 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Radio className="w-5 h-5 text-[#00d2ff]" />
                  <h3 className="font-heading font-bold text-base text-white">
                    Chi Tiết Trạm Phát 5G
                  </h3>
                </div>
                <span className="bg-[#10b981]/20 text-[#10b981] text-[11px] font-bold px-2 py-0.5 rounded-full">
                  Hoạt Động 100%
                </span>
              </div>

              <div className="mt-4 space-y-3 text-sm">
                <div>
                  <span className="text-xs text-slate-400">Tên trạm phát:</span>
                  <h4 className="font-heading font-bold text-white text-base">
                    {selectedStation.name}
                  </h4>
                  <p className="text-xs text-slate-300 mt-0.5 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#ff6b00]" />
                    {selectedStation.address}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                    <span className="text-[11px] text-slate-400">Tốc độ tối đa</span>
                    <div className="font-heading font-extrabold text-lg text-[#00d2ff]">
                      {selectedStation.maxSpeed}
                    </div>
                  </div>

                  <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                    <span className="text-[11px] text-slate-400">Độ trễ Ping</span>
                    <div className="font-heading font-extrabold text-lg text-[#ffb800]">
                      {selectedStation.latency}
                    </div>
                  </div>

                  <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                    <span className="text-[11px] text-slate-400">Băng tần</span>
                    <div className="font-heading font-bold text-sm text-white mt-0.5">
                      {selectedStation.band}
                    </div>
                  </div>

                  <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                    <span className="text-[11px] text-slate-400">Bán kính phủ sóng</span>
                    <div className="font-heading font-bold text-sm text-white mt-0.5">
                      {selectedStation.coverageRadiusMeters} mét
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Check coverage at user's local address in Bình Mỹ */}
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-5 sm:p-6 border border-white/10 shadow-xl">
              <div className="flex items-center gap-2 mb-3">
                <Navigation className="w-5 h-5 text-[#ff6b00]" />
                <h3 className="font-heading font-bold text-base text-white">
                  Kiểm Tra Sóng 5G Tại Nhà Bạn
                </h3>
              </div>
              <p className="text-xs text-slate-300 mb-4">
                Chọn khu vực bạn đang sinh sống hoặc làm việc tại Bình Mỹ để kiểm tra:
              </p>

              <div className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                    Chọn khu vực / Địa bàn tại Bình Mỹ:
                  </label>
                  <select
                    id="select-user-ap"
                    value={userAp}
                    onChange={(e) => handleCheckAddress(e.target.value)}
                    className="w-full bg-[#0a192f] border border-white/20 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#00d2ff]"
                  >
                    {apList.map((item, idx) => (
                      <option key={idx} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>

                {checkResult && (
                  <div className="p-4 rounded-xl bg-[#004e9f]/30 border border-[#00d2ff]/30 text-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300">Cường độ sóng ước tính:</span>
                      <span className="font-bold text-[#10b981] flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {checkResult.quality}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300">Tốc độ dự kiến:</span>
                      <span className="font-bold text-[#00d2ff]">{checkResult.speed}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300">Khoảng cách tới trạm:</span>
                      <span className="font-medium text-slate-200">{checkResult.distance}</span>
                    </div>
                    <p className="text-[11px] text-slate-300 pt-1 border-t border-white/10 italic">
                      {checkResult.recommendation}
                    </p>
                  </div>
                )}

                <button
                  id="btn-register-from-coverage"
                  onClick={onSelectStationToRegister}
                  className="w-full py-3 bg-[#ff6b00] hover:bg-[#e05e00] text-white font-heading font-bold text-sm rounded-xl transition-all shadow-md shadow-[#ff6b00]/30 flex items-center justify-center gap-2"
                >
                  <span>Đăng Ký Lắp SIM 5G Tại Khu Vực Này</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
