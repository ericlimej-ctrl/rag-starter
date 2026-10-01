import React, { useState } from 'react';

interface RoutePlannerViewProps {
  onSelectService: (svc: string) => void;
}

export const RoutePlannerView: React.FC<RoutePlannerViewProps> = ({ onSelectService }) => {
  const [origin, setOrigin] = useState('Opp Tampines Mall (76199)');
  const [destination, setDestination] = useState('HarbourFront / VivoCity (14009)');
  const [hasSearched, setHasSearched] = useState(true);

  const swapOriginDest = () => {
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
  };

  return (
    <div className="space-y-6">
      <div className="bg-surface-container-lowest rounded-xl border border-on-background/10 p-5 md:p-6 shadow-sm">
        <div className="space-y-2">
          <h2 className="text-[20px] font-bold text-primary flex items-center gap-2">
            <span className="material-symbols-outlined text-[24px]">alt_route</span>
            Singapore Transit Route Planner
          </h2>
          <p className="text-[14px] text-on-surface-variant font-medium">
            Find the quickest bus and MRT itineraries across Singapore with real-time crowding insights.
          </p>
        </div>

        <div className="mt-5 grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          <div className="md:col-span-5 relative">
            <label className="block text-[11px] font-bold text-outline uppercase mb-1">
              From (Origin Stop)
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-3 text-load-seats text-[18px]">
                trip_origin
              </span>
              <input
                type="text"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-canvas-light border border-outline-variant rounded-xl text-[13px] font-semibold text-on-surface"
              />
            </div>
          </div>

          <div className="md:col-span-1 flex justify-center pt-5">
            <button
              onClick={swapOriginDest}
              className="p-2 rounded-full hover:bg-surface-variant text-primary border border-outline-variant transition-colors cursor-pointer"
              title="Swap"
            >
              <span className="material-symbols-outlined text-[18px]">swap_horiz</span>
            </button>
          </div>

          <div className="md:col-span-4 relative">
            <label className="block text-[11px] font-bold text-outline uppercase mb-1">
              To (Destination)
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-3 text-secondary text-[18px]">
                location_on
              </span>
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-canvas-light border border-outline-variant rounded-xl text-[13px] font-semibold text-on-surface"
              />
            </div>
          </div>

          <div className="md:col-span-2 pt-5">
            <button
              onClick={() => setHasSearched(true)}
              className="w-full py-2.5 bg-primary hover:bg-primary-container text-white font-bold rounded-xl text-[13px] shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">directions</span>
              <span>Find Routes</span>
            </button>
          </div>
        </div>
      </div>

      {hasSearched && (
        <div className="space-y-4">
          <div className="text-[14px] font-bold text-on-surface flex items-center justify-between">
            <span>Recommended Itineraries ({origin.split(' ')[0]} → {destination.split(' ')[0]})</span>
            <span className="text-[12px] text-outline font-medium">Sorted by fastest transit</span>
          </div>

          {/* Option 1: Direct Service 65 */}
          <div className="bg-surface-container-lowest rounded-xl border-2 border-primary/30 p-5 shadow-sm space-y-4 hover:border-primary transition-colors">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-outline-variant/60 pb-3">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-load-seats text-white">
                  Fastest Direct Bus
                </span>
                <span className="text-[16px] font-bold text-on-surface">Direct Trunk Route</span>
              </div>
              <div className="flex items-center gap-3 text-[13px]">
                <span className="font-extrabold text-primary text-[18px]">~48 mins</span>
                <span className="text-outline font-medium">Fare: $1.95 (Card)</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div
                onClick={() => onSelectService('65')}
                className="flex items-center gap-2 bg-surface-subtle hover:bg-surface-variant p-2 rounded-xl border border-outline-variant/80 cursor-pointer group"
              >
                <span className="w-8 h-8 rounded-lg bg-on-background text-white font-bold text-[14px] flex items-center justify-center group-hover:bg-primary">
                  65
                </span>
                <div>
                  <div className="text-[12px] font-bold text-on-surface">SBS Transit 65</div>
                  <div className="text-[10px] text-load-seats font-bold">Next bus: Arr (Seats Avail)</div>
                </div>
              </div>

              <span className="material-symbols-outlined text-outline text-[16px]">arrow_forward</span>

              <div className="text-[12px] text-on-surface-variant font-medium">
                44 stops without transfer • Departs Opp Tampines Mall (76199)
              </div>
            </div>

            <div className="flex items-center justify-end pt-1">
              <button
                onClick={() => onSelectService('65')}
                className="text-[12px] font-bold text-primary hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Inspect Live Service 65 Telemetry</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Option 2: Express 518 + MRT Transfer */}
          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-5 shadow-sm space-y-4 hover:border-primary/40 transition-colors">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-outline-variant/60 pb-3">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-surface-container text-primary">
                  Express Route + Transfer
                </span>
                <span className="text-[16px] font-bold text-on-surface">Expressway Connection</span>
              </div>
              <div className="flex items-center gap-3 text-[13px]">
                <span className="font-extrabold text-on-surface text-[18px]">~42 mins</span>
                <span className="text-outline font-medium">Fare: $2.45 (Card)</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div
                onClick={() => onSelectService('518')}
                className="flex items-center gap-2 bg-surface-subtle hover:bg-surface-variant p-2 rounded-xl border border-outline-variant/80 cursor-pointer group"
              >
                <span className="w-8 h-8 rounded-lg bg-secondary text-white font-bold text-[14px] flex items-center justify-center">
                  518
                </span>
                <div>
                  <div className="text-[12px] font-bold text-on-surface">Express 518</div>
                  <div className="text-[10px] text-load-seats font-bold">14 mins (Seats Avail)</div>
                </div>
              </div>

              <span className="material-symbols-outlined text-outline text-[16px]">arrow_forward</span>

              <div className="flex items-center gap-1.5 bg-yellow-50 text-yellow-800 px-2.5 py-1.5 rounded-xl border border-yellow-200 text-[12px] font-bold">
                <span className="material-symbols-outlined text-[16px]">train</span>
                <span>Circle Line (Bayfront → HarbourFront)</span>
              </div>
            </div>

            <div className="flex items-center justify-end pt-1">
              <button
                onClick={() => onSelectService('518')}
                className="text-[12px] font-bold text-primary hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Inspect Express 518</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
