import React, { useState } from 'react';
import { BusService } from '../types/bus';
import { DETAILED_INTERMEDIATE_STOPS_65 } from '../data/busData';

interface RouteTimelineProps {
  service: BusService;
  directionKey: 'direction1' | 'direction2';
  onReverseDirection: () => void;
  onSelectStop?: (stopCode: string, stopName: string) => void;
}

export const RouteTimeline: React.FC<RouteTimelineProps> = ({
  service,
  directionKey,
  onReverseDirection,
  onSelectStop
}) => {
  const [expandedIntermediate, setExpandedIntermediate] = useState(false);

  const activeDirection = directionKey === 'direction2' && service.direction2
    ? service.direction2
    : service.direction1;

  const isService65 = service.serviceNo === '65';

  return (
    <div className="bg-surface-container-lowest rounded-xl border border-on-background/10 p-5 md:p-6 shadow-sm space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-outline-variant pb-4">
        <div>
          <h3 className="text-[18px] font-bold text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[24px]">linear_scale</span>
            Route Timeline &amp; Progression (Service {service.serviceNo})
          </h3>
          <p className="text-[12px] text-on-surface-variant font-medium">
            Live sequence showing bus positioning relative to current stop
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onReverseDirection}
            className="px-3 py-1.5 rounded-lg bg-surface-subtle hover:bg-surface-variant text-[12px] font-bold text-primary border border-outline-variant flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">swap_vertical_circle</span>
            Reverse Direction
          </button>
        </div>
      </div>

      {/* Vertical Route Line */}
      <div className="relative pl-6 space-y-6 before:absolute before:left-3 before:top-3 before:bottom-3 before:w-0.5 before:bg-outline-variant">
        {activeDirection.stops.map((stop, idx) => {
          const isTerminus = stop.status === 'Final Terminus';
          const isCurrent = stop.status === 'YOU ARE HERE' || stop.isCurrent;
          const isPassed = stop.status === 'Passed';
          const isNext = stop.status === 'Next Stop';

          return (
            <React.Fragment key={stop.id || idx}>
              {/* Insert expandable intermediate stops before destination if this is service 65 */}
              {isService65 && isTerminus && (
                <div className="relative flex items-start gap-4">
                  <div className="absolute -left-6 top-1 w-6 h-6 rounded-full bg-surface-container-lowest border-2 border-outline flex items-center justify-center">
                    <span className="material-symbols-outlined text-[14px] text-outline">
                      {expandedIntermediate ? 'expand_less' : 'more_vert'}
                    </span>
                  </div>
                  <div
                    onClick={() => setExpandedIntermediate(!expandedIntermediate)}
                    className="flex-1 bg-surface-subtle hover:bg-surface-variant/80 p-3 rounded-lg border border-outline-variant/60 cursor-pointer transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-[14px] text-on-surface font-bold">
                        14 Intermediate Stops along MacPherson &amp; Serangoon Rd
                      </div>
                      <span className="text-[11px] font-bold text-primary">
                        {expandedIntermediate ? 'Hide Stops' : 'Tap to Expand (14)'}
                      </span>
                    </div>
                    <div className="text-[11px] text-outline mt-0.5 font-medium">
                      Connecting MacPherson MRT • Potong Pasir MRT • Boon Keng MRT
                    </div>

                    {expandedIntermediate && (
                      <div className="mt-3 pt-3 border-t border-outline-variant/60 space-y-2 max-h-60 overflow-y-auto pr-2">
                        {DETAILED_INTERMEDIATE_STOPS_65.slice(5, 19).map((intStop) => (
                          <div
                            key={intStop.code}
                            onClick={(e) => {
                              e.stopPropagation();
                              if (onSelectStop) onSelectStop(intStop.code, intStop.name);
                            }}
                            className="flex items-center justify-between text-[12px] p-1.5 hover:bg-surface-container-low rounded-md"
                          >
                            <span className="font-semibold text-on-surface">
                              {intStop.name} ({intStop.code})
                            </span>
                            <span className="text-outline text-[11px]">{intStop.road}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="relative flex items-start gap-4">
                {/* Node marker */}
                <div
                  className={`absolute -left-6 top-1 w-6 h-6 rounded-full flex items-center justify-center ${
                    isCurrent
                      ? 'bg-primary-container border-2 border-white shadow-md pulse-indicator'
                      : isTerminus
                      ? 'bg-secondary-container border-2 border-secondary'
                      : isNext
                      ? 'bg-surface-container-lowest border-2 border-primary'
                      : 'bg-surface-container-high border-2 border-outline'
                  }`}
                >
                  {isCurrent ? (
                    <span className="w-2 h-2 rounded-full bg-white"></span>
                  ) : isTerminus ? (
                    <span className="material-symbols-outlined text-[14px] text-on-secondary">
                      flag
                    </span>
                  ) : isNext ? (
                    <span className="w-2 h-2 rounded-full bg-primary"></span>
                  ) : (
                    <span className="w-2 h-2 rounded-full bg-outline"></span>
                  )}
                </div>

                {/* Content Box */}
                {isCurrent ? (
                  <div className="flex-1 bg-surface-container-low p-4 rounded-xl border-2 border-primary-container shadow-sm space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-primary-container text-on-primary text-[11px] font-bold">
                          YOU ARE HERE
                        </span>
                        <span className="text-[14px] font-bold text-primary">
                          {stop.name}
                        </span>
                      </div>
                      <span className="text-[12px] font-extrabold text-load-seats">
                        Bus {service.serviceNo}: ARRIVING
                      </span>
                    </div>
                    {stop.subtext && (
                      <p className="text-[11px] text-on-surface-variant font-medium">
                        {stop.subtext}
                      </p>
                    )}
                  </div>
                ) : (
                  <div
                    onClick={() => onSelectStop && onSelectStop(stop.code, stop.name)}
                    className="flex-1 bg-canvas-light hover:bg-surface-variant/40 p-3 rounded-lg border border-outline-variant/60 flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <div>
                      <div className="text-[14px] text-on-surface font-bold">{stop.name}</div>
                      <div className="text-[11px] text-outline font-medium">
                        {stop.subtext || stop.road}
                      </div>
                    </div>
                    <span
                      className={`text-[11px] px-2 py-0.5 rounded font-bold ${
                        isPassed
                          ? 'bg-surface-variant text-on-surface-variant'
                          : isNext
                          ? 'text-primary bg-primary/10'
                          : isTerminus
                          ? 'text-secondary bg-secondary-container/15'
                          : 'text-outline bg-surface-subtle'
                      }`}
                    >
                      {stop.status}
                    </span>
                  </div>
                )}
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
