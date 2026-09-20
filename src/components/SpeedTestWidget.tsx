import React, { useState, useEffect, useRef } from 'react';
import { 
  Gauge, 
  Play, 
  RotateCcw, 
  ArrowDown, 
  ArrowUp, 
  Activity, 
  Zap, 
  Server, 
  Sparkles,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { SpeedMetric } from '../types';

interface SpeedTestWidgetProps {
  onRegisterPlan?: () => void;
}

export const SpeedTestWidget: React.FC<SpeedTestWidgetProps> = ({
  onRegisterPlan
}) => {
  const [testingPhase, setTestingPhase] = useState<'idle' | 'ping' | 'download' | 'upload' | 'finished'>('idle');
  const [currentSpeed, setCurrentSpeed] = useState<number>(0);
  const [metrics, setMetrics] = useState<SpeedMetric>({
    ping: 0,
    download: 0,
    upload: 0,
    jitter: 0,
    packetLoss: 0
  });
  const [selectedServer, setSelectedServer] = useState<string>('VNPT Data Center Ninh Bình (Node Bình Mỹ)');
  const animRef = useRef<number | null>(null);

  const runTest = () => {
    setTestingPhase('ping');
    setCurrentSpeed(0);
    setMetrics({
      ping: 0,
      download: 0,
      upload: 0,
      jitter: 0,
      packetLoss: 0
    });

    // Phase 1: Ping & Jitter
    setTimeout(() => {
      setMetrics((prev) => ({
        ...prev,
        ping: Math.floor(Math.random() * 2) + 3, // 3 - 4 ms
        jitter: +(Math.random() * 0.8 + 0.2).toFixed(1), // 0.2 - 1.0 ms
        packetLoss: 0
      }));
      setTestingPhase('download');
    }, 1200);
  };

  // Download simulation
  useEffect(() => {
    if (testingPhase === 'download') {
      let step = 0;
      const targetDownload = Math.floor(Math.random() * 200) + 1150; // 1150 - 1350 Mbps
      const interval = setInterval(() => {
        step++;
        const progress = Math.min(step / 35, 1);
        // Easing curve
        const noise = (Math.random() - 0.5) * 40;
        const simulated = Math.min(Math.round(targetDownload * Math.sin(progress * Math.PI / 2) + noise), targetDownload);
        setCurrentSpeed(simulated);

        if (progress >= 1) {
          clearInterval(interval);
          setMetrics((prev) => ({ ...prev, download: targetDownload }));
          setTestingPhase('upload');
        }
      }, 70);

      return () => clearInterval(interval);
    }
  }, [testingPhase]);

  // Upload simulation
  useEffect(() => {
    if (testingPhase === 'upload') {
      let step = 0;
      const targetUpload = Math.floor(Math.random() * 50) + 140; // 140 - 190 Mbps
      const interval = setInterval(() => {
        step++;
        const progress = Math.min(step / 25, 1);
        const noise = (Math.random() - 0.5) * 15;
        const simulated = Math.min(Math.round(targetUpload * Math.sin(progress * Math.PI / 2) + noise), targetUpload);
        setCurrentSpeed(simulated);

        if (progress >= 1) {
          clearInterval(interval);
          setMetrics((prev) => ({ ...prev, upload: targetUpload }));
          setTestingPhase('finished');
        }
      }, 70);

      return () => clearInterval(interval);
    }
  }, [testingPhase]);

  const servers = [
    'VNPT Data Center Ninh Bình (Node Bình Mỹ)',
    'VNPT IDC Nam Định (Node Phụ Cận)',
    'VNPT Internet Core Hà Nội'
  ];

  // Gauge angle calculation (0 to 1500 Mbps map to -120deg to 120deg)
  const maxSpeedScale = 1500;
  const clampedSpeed = Math.min(currentSpeed, maxSpeedScale);
  const needleDeg = -120 + (clampedSpeed / maxSpeedScale) * 240;

  return (
    <section id="speedtest-section" className="py-12 md:py-20 bg-gradient-to-b from-[#0a192f] to-[#071322] text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-[#00d2ff]/30 px-3 py-1 rounded-full mb-3">
            <Gauge className="w-4 h-4 text-[#00d2ff]" />
            <span className="text-xs font-bold text-[#00d2ff] uppercase tracking-wider">
              CÔNG CỤ ĐO TỐC ĐỘ 5G CHÍNH THỨC
            </span>
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Kiểm Tra Tốc Độ Mạng 5G VinaPhone
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-2">
            Đo kiểm băng thông thực tế kết nối trực tiếp đến máy chủ VNPT Internet Core.
          </p>
        </div>

        {/* Speedtest Card Container */}
        <div className="bg-[#0d2137]/80 backdrop-blur-xl border border-[#00d2ff]/30 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          
          {/* Server Selector Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-white/10 text-xs">
            <div className="flex items-center gap-2 text-slate-300">
              <Server className="w-4 h-4 text-[#00d2ff]" />
              <span className="font-semibold">Máy chủ thử nghiệm:</span>
              <select
                value={selectedServer}
                onChange={(e) => setSelectedServer(e.target.value)}
                disabled={testingPhase !== 'idle' && testingPhase !== 'finished'}
                className="bg-[#0a192f] border border-white/20 rounded-lg px-2.5 py-1 text-white text-xs focus:outline-none focus:border-[#00d2ff]"
              >
                {servers.map((s, idx) => (
                  <option key={idx} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-400">Trạng thái mạng:</span>
              <span className="text-[#10b981] font-bold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#10b981] animate-ping"></span>
                5G Đã Kết Nối (n78)
              </span>
            </div>
          </div>

          {/* Central Meter Gauge */}
          <div className="my-8 flex flex-col items-center justify-center relative">
            
            {/* SVG Speedometer Arc */}
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
                {/* Background Track */}
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="transparent"
                  stroke="#1c2d42"
                  strokeWidth="12"
                  strokeDasharray="377"
                  strokeDashoffset="75"
                  strokeLinecap="round"
                />
                {/* Active Cyan Speed Arc */}
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="transparent"
                  stroke="url(#speedGradient)"
                  strokeWidth="12"
                  strokeDasharray="377"
                  strokeDashoffset={377 - (clampedSpeed / maxSpeedScale) * 300}
                  strokeLinecap="round"
                  className="transition-all duration-100 ease-out"
                />
                <defs>
                  <linearGradient id="speedGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0066cc" />
                    <stop offset="60%" stopColor="#00d2ff" />
                    <stop offset="100%" stopColor="#ff6b00" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Central Speed Readout */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center select-none">
                <span className="text-xs uppercase font-extrabold tracking-wider text-slate-400">
                  {testingPhase === 'ping' && 'ĐANG ĐO PING...'}
                  {testingPhase === 'download' && 'TỐC ĐỘ TẢI XUỐNG (DOWNLOAD)'}
                  {testingPhase === 'upload' && 'TỐC ĐỘ TẢI LÊN (UPLOAD)'}
                  {testingPhase === 'finished' && 'KẾT QUẢ 5G VINAPHONE'}
                  {testingPhase === 'idle' && 'SẴN SÀNG KIỂM TRA'}
                </span>

                <div className="flex items-baseline justify-center gap-1 my-1">
                  <span className="font-heading font-extrabold text-5xl sm:text-6xl text-[#00d2ff] tracking-tight">
                    {currentSpeed}
                  </span>
                  <span className="text-sm font-bold text-slate-300">Mbps</span>
                </div>

                <span className="text-xs text-slate-400">
                  Băng tần 3.7GHz • Trạm Bình Mỹ
                </span>
              </div>
            </div>

            {/* Test Trigger Button */}
            <div className="mt-4">
              {testingPhase === 'idle' && (
                <button
                  id="btn-start-speedtest"
                  onClick={runTest}
                  className="bg-gradient-to-r from-[#0066cc] via-[#00d2ff] to-[#004e9f] hover:from-[#0052a3] hover:to-[#0066cc] text-white px-8 py-3.5 rounded-full font-heading font-extrabold text-base shadow-lg shadow-[#00d2ff]/30 transition-all transform hover:scale-105 flex items-center gap-2.5"
                >
                  <Play className="w-5 h-5 fill-current" />
                  <span>BẮT ĐẦU ĐO TỐC ĐỘ</span>
                </button>
              )}

              {(testingPhase === 'ping' || testingPhase === 'download' || testingPhase === 'upload') && (
                <div className="inline-flex items-center gap-2 bg-white/10 px-6 py-3 rounded-full text-sm font-bold text-[#00d2ff]">
                  <Activity className="w-4 h-4 animate-spin" />
                  <span>Đang phân tích gói tin...</span>
                </div>
              )}

              {testingPhase === 'finished' && (
                <button
                  id="btn-retest-speed"
                  onClick={runTest}
                  className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-3 rounded-full font-heading font-bold text-sm transition-all flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Đo Lại Lần Nữa</span>
                </button>
              )}
            </div>

          </div>

          {/* Metrics summary cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-white/10">
            
            <div className="bg-white/5 p-4 rounded-xl border border-white/5">
              <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                <Activity className="w-4 h-4 text-[#ffb800]" />
                <span>Độ trễ (Ping)</span>
              </div>
              <div className="font-heading font-extrabold text-2xl text-white">
                {metrics.ping > 0 ? `${metrics.ping} ms` : '--'}
              </div>
              <span className="text-[10px] text-[#10b981]">Cực kỳ mượt mà</span>
            </div>

            <div className="bg-white/5 p-4 rounded-xl border border-white/5">
              <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                <ArrowDown className="w-4 h-4 text-[#00d2ff]" />
                <span>Tải Xuống (Download)</span>
              </div>
              <div className="font-heading font-extrabold text-2xl text-[#00d2ff]">
                {metrics.download > 0 ? `${metrics.download} Mbps` : '--'}
              </div>
              <span className="text-[10px] text-slate-400">Xem video 4K/8K không chờ</span>
            </div>

            <div className="bg-white/5 p-4 rounded-xl border border-white/5">
              <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                <ArrowUp className="w-4 h-4 text-[#ff6b00]" />
                <span>Tải Lên (Upload)</span>
              </div>
              <div className="font-heading font-extrabold text-2xl text-[#ff6b00]">
                {metrics.upload > 0 ? `${metrics.upload} Mbps` : '--'}
              </div>
              <span className="text-[10px] text-slate-400">Livestream HD mượt</span>
            </div>

            <div className="bg-white/5 p-4 rounded-xl border border-white/5">
              <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                <Zap className="w-4 h-4 text-purple-400" />
                <span>Jitter & Mất Gói</span>
              </div>
              <div className="font-heading font-extrabold text-2xl text-white">
                {metrics.jitter > 0 ? `${metrics.jitter} ms` : '--'}
              </div>
              <span className="text-[10px] text-[#10b981]">0% Mất gói tin</span>
            </div>

          </div>

          {/* Comparison block: 4G vs 5G */}
          <div className="mt-8 bg-white/5 rounded-2xl p-5 border border-white/5">
            <h4 className="font-heading font-bold text-sm text-white mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#00d2ff]" />
              <span>So Sánh Tốc Độ: 4G Truyền Thống vs 5G VinaPhone Bình Mỹ</span>
            </h4>

            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Mạng 4G LTE Thông Thường</span>
                  <span className="font-bold">45 Mbps</span>
                </div>
                <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-slate-400 rounded-full w-[8%]"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[#00d2ff] mb-1">
                  <span className="font-bold flex items-center gap-1">
                    <span>Mạng 5G VinaPhone Bình Mỹ</span>
                    <span className="bg-[#ff6b00] text-white text-[9px] px-1 rounded">GẤP 25 LẦN</span>
                  </span>
                  <span className="font-extrabold text-base">~1.250 Mbps</span>
                </div>
                <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#0066cc] via-[#00d2ff] to-[#ff6b00] rounded-full w-[95%]"></div>
                </div>
              </div>
            </div>

            {/* Action CTA if finished */}
            {testingPhase === 'finished' && (
              <div className="mt-5 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
                <p className="text-xs text-slate-300">
                  Tốc độ tại khu vực Bình Mỹ hiện đạt chuẩn 5G đỉnh cao! Bạn đã sẵn sàng trải nghiệm?
                </p>
                <button
                  onClick={onRegisterPlan}
                  className="bg-[#ff6b00] hover:bg-[#e05e00] text-white px-5 py-2 rounded-xl text-xs font-bold transition-all shadow-md shrink-0"
                >
                  Đăng Ký Gói 5G Ngay
                </button>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
