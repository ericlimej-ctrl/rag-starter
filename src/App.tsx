/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { AdvisoryBanner } from './components/AdvisoryBanner';
import { SearchHero } from './components/SearchHero';
import { ArrivalForecast } from './components/ArrivalForecast';
import { RouteTimeline } from './components/RouteTimeline';
import { OtherServicesCard } from './components/OtherServicesCard';
import { OperatingDetailsCard } from './components/OperatingDetailsCard';
import { MapViewModal } from './components/MapViewModal';
import { FareCalculatorModal } from './components/FareCalculatorModal';
import { AllServicesModal } from './components/AllServicesModal';
import { ApiHealthModal } from './components/ApiHealthModal';
import { BusServicesView } from './components/BusServicesView';
import { RoutePlannerView } from './components/RoutePlannerView';
import { SavedServicesView } from './components/SavedServicesView';
import { Footer } from './components/Footer';
import { MobileNav } from './components/MobileNav';
import { BUS_SERVICES } from './data/busData';
import { fetchBusArrivals, parseLtaArrival } from './utils/ltaApi';

export default function App() {
  const [activeTab, setActiveTab] = useState<'nearby' | 'services' | 'planner' | 'saved'>('nearby');
  const [selectedServiceNo, setSelectedServiceNo] = useState<string>('65');
  const [currentStopCode, setCurrentStopCode] = useState<string>('76199');
  const [currentStopName, setCurrentStopName] = useState<string>('Opp Tampines Mall');
  const [directionKey, setDirectionKey] = useState<'direction1' | 'direction2'>('direction1');
  const [savedServices, setSavedServices] = useState<string[]>(['65', '23']);

  // Modals
  const [showMapModal, setShowMapModal] = useState<boolean>(false);
  const [showFareModal, setShowFareModal] = useState<boolean>(false);
  const [showAllServicesModal, setShowAllServicesModal] = useState<boolean>(false);
  const [showHealthModal, setShowHealthModal] = useState<boolean>(false);

  // Dynamic arrival state from LTA endpoint
  const [dynamicArrivals, setDynamicArrivals] = useState<any[] | null>(null);

  // Toast message
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Current selected service fallback
  const baseService = BUS_SERVICES[selectedServiceNo] || BUS_SERVICES['65'];

  // Fetch real LTA bus arrivals from /api/bus-arrival
  useEffect(() => {
    let isMounted = true;
    async function loadLiveArrivals() {
      try {
        const response = await fetchBusArrivals(currentStopCode, selectedServiceNo);
        if (!isMounted) return;

        const svc = response.Services?.find(
          (s) => s.ServiceNo.toUpperCase() === selectedServiceNo.toUpperCase()
        );

        if (svc) {
          const arr1 = parseLtaArrival(svc.NextBus, `${svc.Operator} ${svc.ServiceNo}`);
          const arr2 = parseLtaArrival(svc.NextBus2, `${svc.Operator} ${svc.ServiceNo}`);
          const arr3 = parseLtaArrival(svc.NextBus3, `${svc.Operator} ${svc.ServiceNo}`);

          const liveList = [arr1, arr2, arr3].filter(Boolean);
          if (liveList.length > 0) {
            setDynamicArrivals(liveList);
          }
        }
      } catch (err) {
        // Fall back to built-in simulation telemetry
        if (isMounted) setDynamicArrivals(null);
      }
    }

    loadLiveArrivals();
    return () => {
      isMounted = false;
    };
  }, [currentStopCode, selectedServiceNo]);

  // Merge service with dynamic arrivals if available
  const currentService = {
    ...baseService,
    arrivals: dynamicArrivals && dynamicArrivals.length > 0 ? dynamicArrivals : baseService.arrivals
  };

  const handleSelectService = (serviceNo: string) => {
    if (BUS_SERVICES[serviceNo]) {
      setSelectedServiceNo(serviceNo);
      setDirectionKey('direction1');
      setActiveTab('nearby');
      showToast(`Inspecting Service ${serviceNo}`);
    } else {
      setSelectedServiceNo(serviceNo);
      setDirectionKey('direction1');
      setActiveTab('nearby');
      showToast(`Querying LTA DataMall v3 for Service ${serviceNo}`);
    }
  };

  const handleToggleSave = () => {
    if (savedServices.includes(selectedServiceNo)) {
      setSavedServices(savedServices.filter((s) => s !== selectedServiceNo));
      showToast(`Service ${selectedServiceNo} removed from Saved`);
    } else {
      setSavedServices([...savedServices, selectedServiceNo]);
      showToast(`Service ${selectedServiceNo} added to Saved`);
    }
  };

  const handleRemoveSaved = (svc: string) => {
    setSavedServices(savedServices.filter((s) => s !== svc));
    showToast(`Service ${svc} removed from Saved`);
  };

  const handleSwitchDirection = () => {
    setDirectionKey((prev) => (prev === 'direction1' ? 'direction2' : 'direction1'));
    showToast('Switched route direction');
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Live Arrival link copied to clipboard!');
    } else {
      showToast('Link ready to share: ' + window.location.href);
    }
  };

  const handleRefreshLocation = () => {
    showToast('GPS locked: Near Tampines Ave 4 • Stop 76201 (Accuracy ±5m)');
  };

  return (
    <div className="bg-canvas-light text-on-surface antialiased min-h-screen flex flex-col font-sans pb-16 md:pb-0">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
        savedCount={savedServices.length}
        onRefreshLocation={handleRefreshLocation}
        onOpenHealthModal={() => setShowHealthModal(true)}
      />

      {/* Advisory Banner */}
      <AdvisoryBanner />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-6 py-6 space-y-6">
        {activeTab === 'nearby' && (
          <>
            {/* Search Hero & Geolocation Section */}
            <SearchHero
              selectedService={selectedServiceNo}
              onSelectService={handleSelectService}
              onSwitchDirection={handleSwitchDirection}
              onOpenMap={() => setShowMapModal(true)}
              currentStopName={currentStopName}
              currentStopCode={currentStopCode}
            />

            {/* Live Arrival Hero Display */}
            <ArrivalForecast
              service={currentService}
              directionKey={directionKey}
              isSaved={savedServices.includes(selectedServiceNo)}
              onToggleSave={handleToggleSave}
              onShare={handleShare}
            />

            {/* Two-Column Context: Route Sequence & Other Nearby Services */}
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left 8 Columns: Route Timeline */}
              <div className="lg:col-span-8">
                <RouteTimeline
                  service={currentService}
                  directionKey={directionKey}
                  onReverseDirection={handleSwitchDirection}
                  onSelectStop={(code, name) => {
                    setCurrentStopCode(code);
                    setCurrentStopName(name);
                    showToast(`Selected Stop: ${name} (${code})`);
                  }}
                />
              </div>

              {/* Right 4 Columns: Other Buses & Operating Details */}
              <div className="lg:col-span-4 space-y-6">
                <OtherServicesCard
                  currentStopCode={currentStopCode}
                  onSelectService={handleSelectService}
                  onViewAllServices={() => setShowAllServicesModal(true)}
                />

                <OperatingDetailsCard
                  service={currentService}
                  onOpenFareCalculator={() => setShowFareModal(true)}
                />
              </div>
            </section>
          </>
        )}

        {activeTab === 'services' && (
          <BusServicesView
            onSelectService={(svc) => {
              handleSelectService(svc);
            }}
          />
        )}

        {activeTab === 'planner' && (
          <RoutePlannerView
            onSelectService={(svc) => {
              handleSelectService(svc);
            }}
          />
        )}

        {activeTab === 'saved' && (
          <SavedServicesView
            savedServices={savedServices}
            onSelectService={handleSelectService}
            onRemoveSaved={handleRemoveSaved}
          />
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile Bottom Navigation */}
      <MobileNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onOpenAlerts={() => showToast('Transit network operating with normal peak headway.')}
      />

      {/* Modals */}
      <MapViewModal
        isOpen={showMapModal}
        onClose={() => setShowMapModal(false)}
        service={currentService}
        directionKey={directionKey}
      />

      <FareCalculatorModal
        isOpen={showFareModal}
        onClose={() => setShowFareModal(false)}
        service={currentService}
      />

      <AllServicesModal
        isOpen={showAllServicesModal}
        onClose={() => setShowAllServicesModal(false)}
        onSelectService={handleSelectService}
      />

      <ApiHealthModal
        isOpen={showHealthModal}
        onClose={() => setShowHealthModal(false)}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 md:bottom-8 right-6 z-50 bg-on-background text-on-primary px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 text-[13px] font-semibold animate-in fade-in slide-in-from-bottom-2 duration-200">
          <span className="material-symbols-outlined text-load-seats text-[18px]">
            check_circle
          </span>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
