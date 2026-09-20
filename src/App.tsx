/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  POPULAR_PLANS, 
  BTS_STATIONS_BINH_MY, 
  AVAILABLE_SIMS, 
  INITIAL_ORDERS 
} from './data/mockData';
import { PackagePlan, SimItem, OrderRecord } from './types';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { FamilyBanner } from './components/FamilyBanner';
import { PackageList } from './components/PackageList';
import { CoverageMap } from './components/CoverageMap';
import { SpeedTestWidget } from './components/SpeedTestWidget';
import { SubscriberLookup } from './components/SubscriberLookup';
import { SimStore } from './components/SimStore';
import { OrderRegistrationModal } from './components/OrderRegistrationModal';
import { SmsHelpModal } from './components/SmsHelpModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { ConsultationModal } from './components/ConsultationModal';
import { QuickMobileBar } from './components/QuickMobileBar';
import { Footer } from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('packages');
  const [plans] = useState<PackagePlan[]>(POPULAR_PLANS);
  const [stations] = useState(BTS_STATIONS_BINH_MY);
  const [sims] = useState<SimItem[]>(AVAILABLE_SIMS);
  
  // Orders persisted in localStorage
  const [orders, setOrders] = useState<OrderRecord[]>(() => {
    try {
      const saved = localStorage.getItem('vinaphone_binhmy_orders');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_ORDERS;
  });

  useEffect(() => {
    try {
      localStorage.setItem('vinaphone_binhmy_orders', JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  // Selected state
  const [selectedPlan, setSelectedPlan] = useState<PackagePlan>(POPULAR_PLANS[0]);
  const [selectedSim, setSelectedSim] = useState<SimItem | null>(null);

  // Modals state
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isSmsHelpOpen, setIsSmsHelpOpen] = useState(false);
  const [isTrackingModalOpen, setIsTrackingModalOpen] = useState(false);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  // Handlers
  const handleSelectPlan = (plan: PackagePlan) => {
    setSelectedPlan(plan);
    setIsOrderModalOpen(true);
  };

  const handleOpenSmsHelp = (plan: PackagePlan) => {
    setSelectedPlan(plan);
    setIsSmsHelpOpen(true);
  };

  const handleSelectSim = (sim: SimItem) => {
    setSelectedSim(sim);
    // Find matching committed plan if any
    if (sim.committedPlan) {
      const foundPlan = plans.find(p => p.name.includes(sim.committedPlan!));
      if (foundPlan) setSelectedPlan(foundPlan);
    }
    setIsOrderModalOpen(true);
  };

  const handleSelectPlanByName = (planName: string, phoneNumber?: string) => {
    const found = plans.find(p => planName.toLowerCase().includes(p.name.toLowerCase().split(' ')[0])) || plans[0];
    setSelectedPlan(found);
    setIsOrderModalOpen(true);
  };

  const handleOrderCreated = (newOrder: OrderRecord) => {
    setOrders(prev => [newOrder, ...prev]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f9f9ff] text-[#0d1c32]">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        orderCount={orders.length}
        onOpenOrders={() => setIsTrackingModalOpen(true)}
        onOpenDirectCall={() => setIsConsultationOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-grow">
        {/* Hero Section */}
        <HeroBanner
          onExplorePlans={() => {
            setActiveTab('packages');
            const el = document.getElementById('packages-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onCheckCoverage={() => setActiveTab('coverage')}
          onSpeedTest={() => setActiveTab('speedtest')}
        />

        {/* Dynamic Tab Views or Multi-screen Layout */}
        {activeTab === 'packages' && (
          <>
            {/* Eye-catching family representative banner */}
            <FamilyBanner
              onRegisterFamily={() => {
                const familyPlan = plans.find(p => p.id === 'yolo125v') || plans[0];
                setSelectedPlan(familyPlan);
                setIsOrderModalOpen(true);
              }}
              onOpenConsultation={() => setIsConsultationOpen(true)}
            />
            
            <PackageList
              plans={plans}
              onSelectPlan={handleSelectPlan}
              onOpenSmsHelp={handleOpenSmsHelp}
            />
            {/* Embedded Coverage Preview */}
            <div className="bg-[#0a192f] py-8 text-center text-white">
              <div className="max-w-4xl mx-auto px-4">
                <span className="text-[#00d2ff] text-xs font-bold uppercase tracking-wider block mb-1">
                  Hạ tầng 5G Bình Mỹ
                </span>
                <h3 className="font-heading font-bold text-xl sm:text-2xl">
                  Bạn muốn kiểm tra vị trí trạm phát 5G gần nhất tại khu vực của mình?
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm mt-1 mb-4">
                  VNPT đã phủ sóng toàn diện khu vực Bình Mỹ, Ninh Bình với hàng trăm trạm phát sóng băng tần n78.
                </p>
                <button
                  onClick={() => setActiveTab('coverage')}
                  className="bg-[#0066cc] hover:bg-[#0052a3] text-white px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-md"
                >
                  Xem Bản Đồ Trạm 5G Bình Mỹ
                </button>
              </div>
            </div>
          </>
        )}

        {activeTab === 'lookup' && (
          <SubscriberLookup
            onSelectPlanByName={handleSelectPlanByName}
          />
        )}

        {activeTab === 'coverage' && (
          <CoverageMap
            stations={stations}
            onSelectStationToRegister={() => {
              setSelectedPlan(plans[0]);
              setIsOrderModalOpen(true);
            }}
          />
        )}

        {activeTab === 'speedtest' && (
          <SpeedTestWidget
            onRegisterPlan={() => {
              setSelectedPlan(plans[0]);
              setIsOrderModalOpen(true);
            }}
          />
        )}

        {activeTab === 'sims' && (
          <SimStore
            sims={sims}
            onSelectSim={handleSelectSim}
          />
        )}
      </main>

      {/* Quick Checkout Sticky Bar on Mobile */}
      <QuickMobileBar
        currentPlan={selectedPlan}
        onRegister={() => setIsOrderModalOpen(true)}
      />

      {/* Footer */}
      <Footer onNavigateTab={(tab) => setActiveTab(tab)} />

      {/* Modals */}
      <OrderRegistrationModal
        isOpen={isOrderModalOpen}
        onClose={() => {
          setIsOrderModalOpen(false);
          setSelectedSim(null);
        }}
        selectedPlan={selectedPlan}
        selectedSim={selectedSim}
        onOrderCreated={handleOrderCreated}
      />

      <SmsHelpModal
        isOpen={isSmsHelpOpen}
        onClose={() => setIsSmsHelpOpen(false)}
        plan={selectedPlan}
      />

      <OrderTrackingModal
        isOpen={isTrackingModalOpen}
        onClose={() => setIsTrackingModalOpen(false)}
        orders={orders}
      />

      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
      />
    </div>
  );
}
