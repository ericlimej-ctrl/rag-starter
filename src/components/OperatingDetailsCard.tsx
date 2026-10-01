import React from 'react';
import { BusService } from '../types/bus';

interface OperatingDetailsCardProps {
  service: BusService;
  onOpenFareCalculator: () => void;
}

export const OperatingDetailsCard: React.FC<OperatingDetailsCardProps> = ({
  service,
  onOpenFareCalculator
}) => {
  const { operatingHours } = service;

  return (
    <div className="bg-surface-container-lowest rounded-xl border border-on-background/10 p-5 shadow-sm space-y-4">
      <h4 className="text-[16px] font-bold text-on-surface flex items-center gap-1.5 border-b border-outline-variant pb-3">
        <span className="material-symbols-outlined text-primary text-[20px]">info</span>
        Service {service.serviceNo} Operating Details
      </h4>

      <div className="space-y-3 text-[12px]">
        <div className="flex items-center justify-between py-1 border-b border-outline-variant/40">
          <span className="text-on-surface-variant font-medium">First Bus:</span>
          <span className="font-bold text-on-surface">{operatingHours.firstBus}</span>
        </div>

        <div className="flex items-center justify-between py-1 border-b border-outline-variant/40">
          <span className="text-on-surface-variant font-medium">Last Bus:</span>
          <span className="font-bold text-on-surface">{operatingHours.lastBus}</span>
        </div>

        <div className="flex items-center justify-between py-1 border-b border-outline-variant/40">
          <span className="text-on-surface-variant font-medium">Typical Headway:</span>
          <span className="font-bold text-on-surface">{operatingHours.headway}</span>
        </div>

        <div className="flex items-center justify-between py-1 border-b border-outline-variant/40">
          <span className="text-on-surface-variant font-medium">
            Distance to {service.direction1.destination.split(' ')[0]}:
          </span>
          <span className="font-bold text-on-surface">{operatingHours.distance}</span>
        </div>

        <div className="flex items-center justify-between py-1">
          <span className="text-on-surface-variant font-medium">Est. Adult Card Fare:</span>
          <span className="font-bold text-load-seats">{operatingHours.fareCard}</span>
        </div>
      </div>

      <div className="pt-2">
        <button
          onClick={onOpenFareCalculator}
          className="w-full py-2.5 bg-primary hover:bg-primary-container text-on-primary rounded-xl text-[12px] font-bold transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer active:scale-98"
        >
          <span className="material-symbols-outlined text-[18px]">calculate</span>
          <span>Calculate Exact Journey Fare</span>
        </button>
      </div>
    </div>
  );
};
