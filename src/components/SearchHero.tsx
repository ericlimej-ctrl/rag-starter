import React, { useState } from 'react';

interface SearchHeroProps {
  selectedService: string;
  onSelectService: (svc: string) => void;
  onSwitchDirection: () => void;
  onOpenMap: () => void;
  currentStopName: string;
  currentStopCode: string;
}

export const SearchHero: React.FC<SearchHeroProps> = ({
  selectedService,
  onSelectService,
  onSwitchDirection,
  onOpenMap,
  currentStopName,
  currentStopCode
}) => {
  const [searchInput, setSearchInput] = useState(selectedService);
  const frequentServices = [
    { num: '65', label: '65' },
    { num: '81', label: '81' },
    { num: '23', label: '23' },
    { num: '147', label: '147' },
    { num: '518', label: '518', isExpress: true },
    { num: '87', label: '87' },
    { num: '190', label: '190' }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = searchInput.trim().toUpperCase();
    if (clean) {
      onSelectService(clean);
    }
  };

  const handleSelectFrequent = (num: string) => {
    setSearchInput(num);
    onSelectService(num);
  };

  return (
    <section className="bg-surface-container-lowest rounded-xl border border-on-background/10 p-5 md:p-6 shadow-sm">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left 8 cols: Bus Search & Trending Chips */}
        <div className="lg:col-span-8 space-y-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-primary-container"></span>
              <h1 className="text-[22px] font-bold text-primary tracking-tight">
                Live Arrival &amp; Route Inspector
              </h1>
            </div>
            <p className="text-on-surface-variant text-[14px]">
              Real-time SBS Transit arrival telemetry, passenger load capacity, and stop sequencing.
            </p>
          </div>

          {/* Main Input Field */}
          <form onSubmit={handleSearch} className="relative flex flex-col sm:flex-row items-stretch gap-2">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-outline">
                <span className="material-symbols-outlined">directions_bus</span>
              </div>
              <input
                className="w-full pl-11 pr-24 py-3.5 bg-canvas-light border border-outline-variant rounded-xl text-on-surface font-semibold text-[16px] placeholder:text-outline/70 focus:outline-none focus:ring-2 focus:ring-primary-container focus:border-transparent transition-all"
                placeholder="Enter Bus Service Number (e.g. 65, 81, 147, 23, 518)"
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <div className="absolute inset-y-0 right-2 flex items-center">
                <span className="text-[11px] font-bold bg-surface-variant text-primary px-2 py-1 rounded">
                  SVC NUM
                </span>
              </div>
            </div>
            <button
              type="submit"
              className="px-6 py-3.5 bg-primary-container hover:bg-primary text-on-primary rounded-xl font-bold text-[14px] shadow-sm active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">search</span>
              <span>Search Arrival</span>
            </button>
          </form>

          {/* Trending Service Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-[11px] font-bold text-outline uppercase tracking-wider mr-1">
              Frequent:
            </span>
            {frequentServices.map((svc) => {
              const isActive = selectedService === svc.num;
              return (
                <button
                  key={svc.num}
                  type="button"
                  onClick={() => handleSelectFrequent(svc.num)}
                  className={`px-3 py-1 rounded-lg text-[12px] font-semibold cursor-pointer transition-all flex items-center gap-1 active:scale-95 ${
                    isActive
                      ? 'bg-primary text-on-primary shadow-xs'
                      : 'bg-surface-subtle hover:bg-surface-variant text-on-surface border border-outline-variant/60'
                  }`}
                >
                  <span>{svc.label}</span>
                  {isActive && (
                    <span className="material-symbols-outlined text-[14px]">check</span>
                  )}
                  {svc.isExpress && !isActive && (
                    <span className="text-[11px] text-secondary font-bold">Express</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right 4 cols: Current Bus Stop Lock / Geolocation status */}
        <div className="lg:col-span-4 bg-canvas-light border border-outline-variant rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase text-primary font-bold tracking-wider flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-primary">near_me</span>
              Nearest Verified Stop
            </span>
            <span className="text-[11px] text-load-seats bg-load-seats/10 px-2 py-0.5 rounded-full font-bold">
              150m Range
            </span>
          </div>
          <div>
            <div className="text-[16px] font-bold text-on-surface">{currentStopName}</div>
            <div className="text-[12px] text-on-surface-variant flex items-center gap-2 mt-0.5 font-medium">
              <span>Bus Stop {currentStopCode}</span>
              <span>•</span>
              <span>120m away (~2 min walk)</span>
            </div>
          </div>
          <div className="pt-2 border-t border-outline-variant/60 flex items-center justify-between gap-2">
            <button
              onClick={onSwitchDirection}
              type="button"
              className="text-primary hover:text-primary-container text-[12px] font-semibold flex items-center gap-1 cursor-pointer transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">swap_horiz</span>
              Switch Direction
            </button>
            <button
              onClick={onOpenMap}
              type="button"
              className="px-2.5 py-1 bg-surface-container hover:bg-surface-container-high text-primary rounded-lg text-[11px] font-bold flex items-center gap-1 cursor-pointer transition-colors"
            >
              <span className="material-symbols-outlined text-[14px]">map</span>
              Map View
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
