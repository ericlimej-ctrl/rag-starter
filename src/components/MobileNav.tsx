import React from 'react';

interface MobileNavProps {
  activeTab: 'nearby' | 'services' | 'planner' | 'saved';
  onTabChange: (tab: 'nearby' | 'services' | 'planner' | 'saved') => void;
  onOpenAlerts?: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  activeTab,
  onTabChange,
  onOpenAlerts
}) => {
  return (
    <div className="fixed bottom-0 left-0 w-full z-50 md:hidden flex justify-around items-center px-2 py-1.5 bg-surface-container-lowest border-t border-outline-variant shadow-lg">
      {/* Active: Nearby Stops */}
      <button
        onClick={() => onTabChange('nearby')}
        className={`flex flex-col items-center justify-center rounded-xl px-3 py-1 cursor-pointer transition-all ${
          activeTab === 'nearby'
            ? 'bg-primary-container text-on-primary-container font-bold'
            : 'text-on-surface-variant hover:bg-surface-container'
        }`}
      >
        <span className="material-symbols-outlined text-[20px]">near_me</span>
        <span className="text-[11px]">Nearby</span>
      </button>

      {/* Services */}
      <button
        onClick={() => onTabChange('services')}
        className={`flex flex-col items-center justify-center rounded-xl px-3 py-1 cursor-pointer transition-all ${
          activeTab === 'services'
            ? 'bg-primary-container text-on-primary-container font-bold'
            : 'text-on-surface-variant hover:bg-surface-container'
        }`}
      >
        <span className="material-symbols-outlined text-[20px]">directions_bus</span>
        <span className="text-[11px]">Services</span>
      </button>

      {/* Route Planner */}
      <button
        onClick={() => onTabChange('planner')}
        className={`flex flex-col items-center justify-center rounded-xl px-3 py-1 cursor-pointer transition-all ${
          activeTab === 'planner'
            ? 'bg-primary-container text-on-primary-container font-bold'
            : 'text-on-surface-variant hover:bg-surface-container'
        }`}
      >
        <span className="material-symbols-outlined text-[20px]">alt_route</span>
        <span className="text-[11px]">Planner</span>
      </button>

      {/* Favorites */}
      <button
        onClick={() => onTabChange('saved')}
        className={`flex flex-col items-center justify-center rounded-xl px-3 py-1 cursor-pointer transition-all ${
          activeTab === 'saved'
            ? 'bg-primary-container text-on-primary-container font-bold'
            : 'text-on-surface-variant hover:bg-surface-container'
        }`}
      >
        <span className="material-symbols-outlined text-[20px]">bookmark</span>
        <span className="text-[11px]">Favorites</span>
      </button>
    </div>
  );
};
