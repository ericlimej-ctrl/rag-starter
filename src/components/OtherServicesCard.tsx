import React from 'react';
import { CURRENT_STOP_DATA } from '../data/busData';

interface OtherServicesCardProps {
  onSelectService: (serviceNo: string) => void;
  onViewAllServices: () => void;
  currentStopCode: string;
}

export const OtherServicesCard: React.FC<OtherServicesCardProps> = ({
  onSelectService,
  onViewAllServices,
  currentStopCode
}) => {
  const displayedServices = CURRENT_STOP_DATA.services.slice(0, 4);

  return (
    <div className="bg-surface-container-lowest rounded-xl border border-on-background/10 p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-outline-variant pb-3">
        <h4 className="text-[16px] font-bold text-on-surface flex items-center gap-1.5">
          <span className="material-symbols-outlined text-primary text-[20px]">
            departure_board
          </span>
          Also at Stop {currentStopCode}
        </h4>
        <span className="text-[11px] text-primary font-bold">
          {CURRENT_STOP_DATA.services.length} Routes
        </span>
      </div>

      {/* Service List Rows */}
      <div className="space-y-3">
        {displayedServices.map((svc) => (
          <div
            key={svc.serviceNo}
            onClick={() => onSelectService(svc.serviceNo)}
            className="p-3 rounded-xl bg-canvas-light border border-outline-variant/70 hover:border-primary/40 hover:shadow-xs transition-all flex items-center justify-between cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <span
                className={`w-10 h-10 rounded-lg font-bold text-[16px] flex items-center justify-center transition-transform group-hover:scale-105 ${
                  svc.isExpress
                    ? 'bg-secondary text-on-secondary'
                    : 'bg-on-background text-on-primary'
                }`}
              >
                {svc.serviceNo}
              </span>
              <div>
                <div className="text-[14px] text-on-surface font-bold flex items-center gap-1">
                  <span>{svc.destination}</span>
                  {svc.isExpress && (
                    <span className="text-[11px] bg-red-100 text-secondary px-1 rounded font-bold">
                      Exp
                    </span>
                  )}
                </div>
                <div className="text-[11px] text-outline font-medium">
                  {svc.fleet.includes('Double') ? 'Double Deck' : 'Single Deck'}
                  {svc.isWab ? ' • WAB' : ''}
                </div>
              </div>
            </div>

            <div className="text-right">
              <div
                className={`text-[16px] font-bold ${
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
                className={`text-[11px] font-semibold ${
                  svc.load === 'Seats Available' ? 'text-load-seats' : 'text-load-standing'
                }`}
              >
                {svc.load === 'Seats Available' ? 'Seats Avail' : 'Standing'}
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={onViewAllServices}
        className="w-full py-2.5 bg-surface-subtle hover:bg-surface-variant text-primary rounded-xl text-[12px] font-bold transition-colors border border-outline-variant/70 flex items-center justify-center gap-1 cursor-pointer"
      >
        <span>View All {CURRENT_STOP_DATA.services.length} Services at this Stop</span>
        <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
      </button>
    </div>
  );
};
