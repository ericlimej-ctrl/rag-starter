import React, { useState } from 'react';

interface HeaderProps {
  activeTab: 'nearby' | 'services' | 'planner' | 'saved';
  onTabChange: (tab: 'nearby' | 'services' | 'planner' | 'saved') => void;
  savedCount: number;
  onRefreshLocation?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onTabChange,
  savedCount,
  onRefreshLocation
}) => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);

  const handleSyncLocation = () => {
    setIsSyncing(true);
    if (onRefreshLocation) onRefreshLocation();
    setTimeout(() => {
      setIsSyncing(false);
    }, 800);
  };

  return (
    <header className="bg-surface-container-lowest border-b border-outline-variant shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto w-full h-16 px-4 md:px-6 flex items-center justify-between">
        {/* Brand & Status Pill */}
        <div className="flex items-center gap-5">
          <button
            onClick={() => onTabChange('nearby')}
            className="flex items-center gap-2.5 group text-left cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-primary-container flex items-center justify-center text-on-primary shadow-sm group-hover:scale-105 transition-transform duration-150">
              <span className="material-symbols-outlined text-[26px]">directions_bus</span>
            </div>
            <div>
              <div className="text-[18px] font-extrabold text-primary tracking-tight flex items-center gap-1.5 leading-tight">
                SBS Transit Live
                <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[11px] font-bold bg-secondary-container text-on-secondary-container tracking-wider">
                  SG LIVE
                </span>
              </div>
              <div className="text-[11px] font-semibold text-outline hidden sm:block">
                Real-Time Transit ETA &amp; Load Telemetry
              </div>
            </div>
          </button>

          {/* Desktop GPS Context Pill */}
          <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-subtle border border-outline-variant text-[12px] shadow-xs">
            <span className="material-symbols-outlined text-primary text-[18px]">my_location</span>
            <span className="text-on-surface font-semibold">Near Tampines Ave 4</span>
            <span className="text-outline">• Stop 76201</span>
            <button
              onClick={handleSyncLocation}
              className={`p-0.5 rounded-full hover:bg-surface-variant transition-colors text-primary flex items-center cursor-pointer ${
                isSyncing ? 'animate-spin' : ''
              }`}
              title="Refresh Geolocation"
              aria-label="Refresh Geolocation"
            >
              <span className="material-symbols-outlined text-[16px]">sync</span>
            </button>
          </div>
        </div>

        {/* Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-6">
          <button
            onClick={() => onTabChange('nearby')}
            className={`pb-1 font-bold text-[14px] cursor-pointer transition-colors ${
              activeTab === 'nearby'
                ? 'text-primary border-b-2 border-primary'
                : 'text-on-surface-variant hover:text-primary'
            }`}
          >
            Nearby Stops
          </button>
          <button
            onClick={() => onTabChange('services')}
            className={`pb-1 font-semibold text-[14px] cursor-pointer transition-colors ${
              activeTab === 'services'
                ? 'text-primary border-b-2 border-primary'
                : 'text-on-surface-variant hover:text-primary'
            }`}
          >
            Bus Services
          </button>
          <button
            onClick={() => onTabChange('planner')}
            className={`pb-1 font-semibold text-[14px] cursor-pointer transition-colors ${
              activeTab === 'planner'
                ? 'text-primary border-b-2 border-primary'
                : 'text-on-surface-variant hover:text-primary'
            }`}
          >
            Route Planner
          </button>
          <button
            onClick={() => onTabChange('saved')}
            className={`pb-1 font-semibold text-[14px] cursor-pointer transition-colors flex items-center gap-1.5 ${
              activeTab === 'saved'
                ? 'text-primary border-b-2 border-primary'
                : 'text-on-surface-variant hover:text-primary'
            }`}
          >
            <span>Saved</span>
            {savedCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-primary text-white font-bold">
                {savedCount}
              </span>
            )}
          </button>
        </nav>

        {/* Trailing Action Cluster */}
        <div className="flex items-center gap-2 relative">
          <div className="hidden lg:flex items-center text-[11px] bg-surface-container text-primary font-bold px-3 py-1.5 rounded-full border border-primary/20">
            <span className="w-2 h-2 rounded-full bg-load-seats mr-2 pulse-indicator"></span>
            LTA DataStream Connected
          </div>

          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setHasUnread(false);
            }}
            aria-label="Notifications"
            className="p-2 rounded-xl text-on-surface-variant hover:text-primary hover:bg-surface-container-low transition-colors active:scale-95 duration-150 relative cursor-pointer"
          >
            <span className="material-symbols-outlined">notifications</span>
            {hasUnread && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-secondary rounded-full"></span>
            )}
          </button>

          <button
            onClick={handleSyncLocation}
            aria-label="My Location"
            className="p-2 rounded-xl text-primary hover:bg-surface-container-low transition-colors active:scale-95 duration-150 cursor-pointer"
            title="Locate me"
          >
            <span className="material-symbols-outlined">my_location</span>
          </button>

          {/* Notifications dropdown */}
          {showNotifications && (
            <div className="absolute right-0 top-12 w-80 sm:w-96 bg-surface-container-lowest border border-outline-variant shadow-xl rounded-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="flex items-center justify-between pb-3 border-b border-outline-variant">
                <span className="font-bold text-on-surface text-[14px] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-primary text-[18px]">campaign</span>
                  Live Transit Advisories
                </span>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="text-outline hover:text-on-surface text-[12px] cursor-pointer"
                >
                  Close
                </button>
              </div>
              <div className="space-y-3 py-3 text-[12px]">
                <div className="p-2.5 rounded-xl bg-surface-subtle border border-outline-variant/60">
                  <div className="flex items-center gap-1.5 font-bold text-load-seats">
                    <span className="w-2 h-2 rounded-full bg-load-seats"></span>
                    Normal System Operations
                  </div>
                  <p className="text-on-surface-variant mt-1">
                    All Tampines corridors & Expressway routes (65, 81, 23, 518) operating on regular timetables.
                  </p>
                </div>
                <div className="p-2.5 rounded-xl bg-surface-subtle border border-outline-variant/60">
                  <div className="flex items-center gap-1.5 font-bold text-primary">
                    <span className="material-symbols-outlined text-[14px]">info</span>
                    Contactless / SimplyGo
                  </div>
                  <p className="text-on-surface-variant mt-1">
                    Distance fare capping is active for peak window 07:30 - 09:30. Ensure card tap-in and tap-out at rear doors.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
