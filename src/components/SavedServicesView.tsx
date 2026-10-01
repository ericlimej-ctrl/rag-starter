import React from 'react';
import { BUS_SERVICES } from '../data/busData';

interface SavedServicesViewProps {
  savedServices: string[];
  onSelectService: (svc: string) => void;
  onRemoveSaved: (svc: string) => void;
}

export const SavedServicesView: React.FC<SavedServicesViewProps> = ({
  savedServices,
  onSelectService,
  onRemoveSaved
}) => {
  if (savedServices.length === 0) {
    return (
      <div className="bg-surface-container-lowest rounded-xl border border-on-background/10 p-12 text-center shadow-sm space-y-4">
        <div className="w-16 h-16 rounded-full bg-surface-subtle text-outline mx-auto flex items-center justify-center">
          <span className="material-symbols-outlined text-[32px]">bookmark_border</span>
        </div>
        <h3 className="text-[18px] font-bold text-on-surface">No Saved Services Yet</h3>
        <p className="text-[13px] text-outline max-w-md mx-auto">
          Tap the "Save Service" bookmark button on any bus inspection card to bookmark your frequent transit routes here for fast 1-click access.
        </p>
        <button
          onClick={() => onSelectService('65')}
          className="px-5 py-2.5 bg-primary text-white font-bold rounded-xl text-[13px] hover:bg-primary-container transition-colors cursor-pointer"
        >
          View Bus Service 65
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-surface-container-lowest rounded-xl border border-on-background/10 p-5 md:p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-[20px] font-bold text-primary flex items-center gap-2">
              <span className="material-symbols-outlined text-[24px]">bookmark</span>
              Saved Transit Services ({savedServices.length})
            </h2>
            <p className="text-[13px] text-on-surface-variant font-medium mt-0.5">
              Quick access to your bookmarked SBS Transit routes and pinned arrival schedules.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {savedServices.map((svcNo) => {
          const svc = BUS_SERVICES[svcNo];
          if (!svc) return null;

          return (
            <div
              key={svcNo}
              className="bg-surface-container-lowest rounded-xl border border-outline-variant p-5 shadow-xs hover:border-primary transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-12 h-12 rounded-xl text-[18px] font-extrabold flex items-center justify-center text-white ${
                        svc.category === 'Express' ? 'bg-secondary' : 'bg-on-background'
                      }`}
                    >
                      {svc.serviceNo}
                    </span>
                    <div>
                      <div className="text-[11px] font-bold text-primary">{svc.category} Route</div>
                      <div className="text-[11px] text-outline">{svc.operator}</div>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveSaved(svcNo);
                    }}
                    className="p-1.5 text-outline hover:text-red-500 rounded-lg hover:bg-surface-subtle transition-colors cursor-pointer"
                    title="Remove from saved"
                  >
                    <span className="material-symbols-outlined text-[18px]">delete</span>
                  </button>
                </div>

                <h3 className="text-[15px] font-bold text-on-surface">
                  {svc.direction1.destination}
                </h3>
                <p className="text-[12px] text-outline mt-1 font-medium">
                  Origin: {svc.direction1.origin}
                </p>

                <div className="mt-3 pt-3 border-t border-outline-variant/60 flex items-center justify-between text-[11px] font-semibold text-load-seats">
                  <span>Next: {svc.arrivals[0]?.arrivalText === 'Arr' ? 'Arriving' : `${svc.arrivals[0]?.arrivalText} mins`}</span>
                  <span>{svc.arrivals[0]?.load}</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-outline-variant/60">
                <button
                  onClick={() => onSelectService(svcNo)}
                  className="w-full py-2 bg-primary hover:bg-primary-container text-white font-bold rounded-xl text-[12px] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Inspect Real-Time Telemetry</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
