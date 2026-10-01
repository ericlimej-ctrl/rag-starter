import React, { useState, useEffect } from 'react';
import { BusService } from '../types/bus';

interface ArrivalForecastProps {
  service: BusService;
  directionKey: 'direction1' | 'direction2';
  isSaved: boolean;
  onToggleSave: () => void;
  onShare: () => void;
}

export const ArrivalForecast: React.FC<ArrivalForecastProps> = ({
  service,
  directionKey,
  isSaved,
  onToggleSave,
  onShare
}) => {
  const [countdown, setCountdown] = useState(18);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setIsRefreshing(true);
          setTimeout(() => setIsRefreshing(false), 600);
          return 20;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleManualRefresh = () => {
    setIsRefreshing(true);
    setCountdown(20);
    setTimeout(() => setIsRefreshing(false), 500);
  };

  const activeDirection = directionKey === 'direction2' && service.direction2
    ? service.direction2
    : service.direction1;

  const arrivals = service.arrivals;

  return (
    <section className="bg-surface-container-lowest rounded-xl border border-on-background/10 shadow-sm overflow-hidden">
      {/* Card Header: Service Identity & Direction Info */}
      <div className="p-5 md:p-6 bg-gradient-to-r from-surface-container-low to-surface-container-lowest border-b border-outline-variant flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-xl bg-on-background text-on-primary flex flex-col items-center justify-center shadow-md">
            <span className="text-[11px] text-outline-variant uppercase tracking-widest leading-none font-bold">
              Bus
            </span>
            <span className="text-[32px] font-extrabold text-on-primary leading-none mt-1">
              {service.serviceNo}
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] bg-primary-container text-on-primary font-bold">
                {service.operator} {service.category}
              </span>
              {service.isLoop && (
                <span className="text-[11px] text-outline font-semibold">Loop Route</span>
              )}
            </div>
            <h2 className="text-[22px] font-bold text-on-surface tracking-tight mt-0.5">
              {activeDirection.description}
            </h2>
            <p className="text-[12px] text-on-surface-variant flex items-center gap-1.5 mt-0.5 font-medium">
              <span>Origin: {activeDirection.origin}</span>
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              <span className="font-bold text-on-surface">
                At Stop {activeDirection.currentStopCode} ({activeDirection.currentStopName})
              </span>
            </p>
          </div>
        </div>

        {/* Right Quick Actions & Auto-refresh ticker */}
        <div className="flex flex-col sm:flex-row items-end sm:items-center gap-3">
          <div
            className={`flex items-center gap-2 bg-surface-subtle px-3 py-1.5 rounded-xl border border-outline-variant text-[11px] text-on-surface-variant transition-colors ${
              isRefreshing ? 'bg-primary-container/15' : ''
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-load-seats pulse-indicator"></span>
            <span>
              Auto-refreshes in{' '}
              <strong className="text-primary font-bold">{countdown}s</strong>
            </span>
            <button
              onClick={handleManualRefresh}
              className={`p-1 text-primary hover:bg-surface-variant rounded-md transition-transform duration-300 cursor-pointer ${
                isRefreshing ? 'rotate-180' : ''
              }`}
              title="Refresh Now"
              aria-label="Refresh Now"
            >
              <span className="material-symbols-outlined text-[16px]">refresh</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onToggleSave}
              className={`px-3.5 py-2 rounded-xl text-[12px] font-bold flex items-center gap-1.5 transition-colors cursor-pointer border ${
                isSaved
                  ? 'bg-primary text-white border-primary'
                  : 'bg-surface-subtle hover:bg-surface-variant text-primary border-outline-variant'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">
                {isSaved ? 'bookmark' : 'bookmark_border'}
              </span>
              <span>{isSaved ? 'Saved' : 'Save Service'}</span>
            </button>
            <button
              onClick={onShare}
              className="px-3.5 py-2 rounded-xl bg-surface-subtle hover:bg-surface-variant text-on-surface border border-outline-variant text-[12px] font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">share</span>
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>

      {/* THREE BUS ARRIVAL MATRICES (Next, 2nd, 3rd) */}
      <div className="p-5 md:p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-[18px] font-bold text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[22px]">schedule</span>
            Upcoming 3 Bus Forecast
          </h3>
          <span className="text-[11px] text-outline font-medium">
            Live GPS Telemetry feed via SBS Control Center
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {arrivals.map((arr, index) => {
            const isFirst = index === 0;
            return (
              <div
                key={index}
                className={`bg-surface-bright rounded-xl p-5 shadow-sm relative overflow-hidden flex flex-col justify-between space-y-4 transition-all ${
                  isFirst
                    ? 'border-2 border-load-seats/30 hover:border-load-seats'
                    : 'border border-outline-variant hover:border-primary'
                }`}
              >
                {isFirst ? (
                  <div className="absolute -top-1 -right-1">
                    <span className="bg-load-seats text-on-primary text-[11px] px-3 py-1 rounded-bl-xl font-bold uppercase tracking-wider flex items-center gap-1 shadow-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-white pulse-indicator"></span>
                      Next Bus
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-outline uppercase tracking-wider font-semibold">
                      {index === 1 ? '2nd Bus' : '3rd Bus'}
                    </span>
                    {arr.distanceKm && (
                      <span className="text-[11px] text-outline font-medium">
                        ~{arr.distanceKm} km away
                      </span>
                    )}
                  </div>
                )}

                <div>
                  <div className="text-[11px] text-outline uppercase tracking-wider font-semibold">
                    Arrival Estimation
                  </div>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span
                      className={`text-[36px] font-extrabold tracking-tight ${
                        isFirst ? 'text-load-seats' : 'text-on-surface'
                      }`}
                    >
                      {arr.arrivalText}
                    </span>
                    {isFirst ? (
                      <span className="text-[12px] text-on-surface-variant font-medium">
                        (Under 1 min)
                      </span>
                    ) : (
                      <span className="text-[18px] text-on-surface-variant font-bold">mins</span>
                    )}
                  </div>
                  <p className="text-[11px] text-on-surface-variant mt-1 font-medium">
                    {arr.approachingLandmark}
                  </p>
                </div>

                {/* Capacity & Specs Pills */}
                <div className="space-y-2 pt-3 border-t border-outline-variant/60">
                  {/* Load Pill */}
                  <div
                    className={`flex items-center justify-between px-3 py-1.5 rounded-lg border ${
                      arr.load === 'Seats Available'
                        ? 'bg-emerald-50 text-load-seats border-load-seats/20'
                        : arr.load === 'Standing Available'
                        ? 'bg-amber-50 text-load-standing border-load-standing/20'
                        : 'bg-red-50 text-load-limited border-load-limited/20'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 text-[12px] font-bold">
                      <span className="material-symbols-outlined text-[18px]">
                        {arr.load === 'Seats Available'
                          ? 'airline_seat_recline_normal'
                          : arr.load === 'Standing Available'
                          ? 'group'
                          : 'warning'}
                      </span>
                      <span>{arr.load}</span>
                    </div>
                    <span
                      className={`text-[11px] text-on-primary px-1.5 py-0.5 rounded font-bold ${
                        arr.loadColor === 'Green'
                          ? 'bg-load-seats'
                          : arr.loadColor === 'Amber'
                          ? 'bg-load-standing'
                          : 'bg-load-limited'
                      }`}
                    >
                      {arr.loadColor}
                    </span>
                  </div>

                  {/* Fleet Attributes */}
                  <div className="flex items-center gap-2 text-[11px] text-on-surface-variant font-bold">
                    <span className="px-2 py-1 bg-surface-subtle border border-outline-variant/70 rounded-md text-on-surface flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">
                        {arr.fleet.includes('Double') ? 'view_agenda' : 'directions_bus'}
                      </span>
                      {arr.fleet}
                    </span>
                    {arr.isWab && (
                      <span className="px-2 py-1 bg-surface-subtle border border-outline-variant/70 rounded-md text-primary flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">accessible</span>
                        WAB
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Legend for Crowding and Fleet Type */}
        <div className="bg-surface-subtle rounded-xl p-3 flex flex-wrap items-center justify-between gap-3 text-[11px] text-on-surface-variant border border-outline-variant/50">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="font-bold text-on-surface">Official LTA Load Guide:</span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-load-seats"></span> Seats Available
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-load-standing"></span> Standing Available
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-load-limited"></span> Limited Standing
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span>
              <strong>DD</strong> = Double Deck
            </span>
            <span>
              <strong>SD</strong> = Single Deck
            </span>
            <span>
              <strong>WAB</strong> = Wheelchair Accessible
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
