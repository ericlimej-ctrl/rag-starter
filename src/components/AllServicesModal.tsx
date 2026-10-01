import React from 'react';
import { CURRENT_STOP_DATA } from '../data/busData';

interface AllServicesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectService: (serviceNo: string) => void;
}

export const AllServicesModal: React.FC<AllServicesModalProps> = ({
  isOpen,
  onClose,
  onSelectService
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-outline-variant flex items-center justify-between bg-surface-container-low">
          <div>
            <h3 className="text-[16px] font-bold text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[22px]">
                departure_board
              </span>
              All Services at Stop {CURRENT_STOP_DATA.code}
            </h3>
            <p className="text-[12px] text-on-surface-variant font-medium">
              {CURRENT_STOP_DATA.name} • {CURRENT_STOP_DATA.road} ({CURRENT_STOP_DATA.services.length} Total Services)
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-outline hover:text-on-surface hover:bg-surface-variant transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* List of all services */}
        <div className="p-6 overflow-y-auto space-y-3">
          {CURRENT_STOP_DATA.services.map((svc) => (
            <div
              key={svc.serviceNo}
              onClick={() => {
                onSelectService(svc.serviceNo);
                onClose();
              }}
              className="p-3.5 rounded-xl bg-canvas-light border border-outline-variant/70 hover:border-primary hover:shadow-xs transition-all flex items-center justify-between cursor-pointer group"
            >
              <div className="flex items-center gap-3.5">
                <span
                  className={`w-12 h-12 rounded-xl font-extrabold text-[18px] flex items-center justify-center shadow-xs transition-transform group-hover:scale-105 ${
                    svc.isExpress
                      ? 'bg-secondary text-on-secondary'
                      : 'bg-on-background text-on-primary'
                  }`}
                >
                  {svc.serviceNo}
                </span>
                <div>
                  <div className="text-[15px] font-bold text-on-surface flex items-center gap-2">
                    <span>{svc.destination}</span>
                    {svc.isExpress && (
                      <span className="text-[11px] bg-red-100 text-secondary px-1.5 py-0.5 rounded font-bold">
                        Express
                      </span>
                    )}
                  </div>
                  <div className="text-[12px] text-outline font-medium flex items-center gap-2 mt-0.5">
                    <span>{svc.fleet}</span>
                    {svc.isWab && (
                      <>
                        <span>•</span>
                        <span className="text-primary font-semibold flex items-center gap-0.5">
                          <span className="material-symbols-outlined text-[13px]">accessible</span>
                          WAB
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="text-right flex items-center gap-4">
                <div>
                  <div
                    className={`text-[18px] font-extrabold ${
                      svc.etaMinutes === 'Arr'
                        ? 'text-load-seats'
                        : svc.load === 'Seats Available'
                        ? 'text-load-seats'
                        : 'text-load-standing'
                    }`}
                  >
                    {svc.etaMinutes}
                  </div>
                  <div
                    className={`text-[11px] font-bold ${
                      svc.load === 'Seats Available'
                        ? 'text-load-seats'
                        : 'text-load-standing'
                    }`}
                  >
                    {svc.load}
                  </div>
                </div>
                <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors text-[20px]">
                  chevron_right
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-surface-container-lowest border-t border-outline-variant flex items-center justify-between text-[12px] text-outline">
          <span>Tap any bus route to inspect live telemetry</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-surface-subtle hover:bg-surface-variant text-on-surface font-bold rounded-lg border border-outline-variant transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
