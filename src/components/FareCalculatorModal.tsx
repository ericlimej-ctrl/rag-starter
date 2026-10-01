import React, { useState } from 'react';
import { BusService } from '../types/bus';

interface FareCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: BusService;
}

export const FareCalculatorModal: React.FC<FareCalculatorModalProps> = ({
  isOpen,
  onClose,
  service
}) => {
  const [passengerType, setPassengerType] = useState<
    'adult' | 'student' | 'senior' | 'pwd' | 'workfare'
  >('adult');
  const [paymentMode, setPaymentMode] = useState<'card' | 'cash'>('card');
  const [boardStop, setBoardStop] = useState('76199');
  const [alightStop, setAlightStop] = useState('14009');

  if (!isOpen) return null;

  const stops = service.direction1.stops;

  // Approximate distance calculation based on stop index
  const boardIndex = stops.findIndex((s) => s.code === boardStop);
  const alightIndex = stops.findIndex((s) => s.code === alightStop);

  const distBoard = boardIndex !== -1 ? stops[boardIndex].distanceKm : 2.2;
  const distAlight = alightIndex !== -1 ? stops[alightIndex].distanceKm : 26.4;
  const journeyDistance = Math.max(0.8, Math.abs(distAlight - distBoard));

  // Distance fare brackets
  const calculateFare = () => {
    const isExpress = service.category === 'Express';

    if (paymentMode === 'cash') {
      if (isExpress) return 3.40;
      if (journeyDistance <= 3.2) return 1.90;
      if (journeyDistance <= 12.2) return 2.40;
      return 2.90;
    }

    // Card fares
    let base = 1.09;
    if (journeyDistance > 3.2) {
      base += Math.min((journeyDistance - 3.2) * 0.045, 1.25);
    }
    if (isExpress) base += 0.65;

    if (passengerType === 'student') {
      return Number(Math.min(base * 0.45, 0.70).toFixed(2));
    }
    if (passengerType === 'senior' || passengerType === 'pwd') {
      return Number(Math.min(base * 0.55, 0.98).toFixed(2));
    }
    if (passengerType === 'workfare') {
      return Number((base * 0.82).toFixed(2));
    }

    return Number(base.toFixed(2));
  };

  const calculatedFare = calculateFare();
  const cashEquivalent = service.category === 'Express' ? 3.40 : 2.90;
  const savings = Math.max(0, cashEquivalent - calculatedFare);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant max-w-lg w-full shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-outline-variant flex items-center justify-between bg-surface-container-low">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[22px]">calculate</span>
            <h3 className="text-[16px] font-bold text-on-surface">
              Distance Fare Calculator (Service {service.serviceNo})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-outline hover:text-on-surface hover:bg-surface-variant transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4 text-[13px]">
          {/* Passenger Type */}
          <div>
            <label className="block text-[11px] font-bold uppercase text-outline mb-1.5">
              Passenger Concession Category
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                { id: 'adult', label: 'Adult' },
                { id: 'student', label: 'Student' },
                { id: 'senior', label: 'Senior (60+)' },
                { id: 'pwd', label: 'Disabilities' },
                { id: 'workfare', label: 'Workfare' }
              ].map((p) => (
                <button
                  key={p.id}
                  onClick={() => setPassengerType(p.id as any)}
                  className={`py-2 px-2.5 rounded-xl border text-[12px] font-semibold text-center cursor-pointer transition-all ${
                    passengerType === p.id
                      ? 'bg-primary text-white border-primary shadow-xs'
                      : 'bg-canvas-light text-on-surface border-outline-variant hover:bg-surface-variant'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <label className="block text-[11px] font-bold uppercase text-outline mb-1.5">
              Payment Method
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setPaymentMode('card')}
                className={`py-2.5 px-3 rounded-xl border text-[12px] font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                  paymentMode === 'card'
                    ? 'bg-primary text-white border-primary shadow-xs'
                    : 'bg-canvas-light text-on-surface border-outline-variant hover:bg-surface-variant'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">credit_card</span>
                <span>SimplyGo / Contactless</span>
              </button>
              <button
                onClick={() => setPaymentMode('cash')}
                className={`py-2.5 px-3 rounded-xl border text-[12px] font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                  paymentMode === 'cash'
                    ? 'bg-primary text-white border-primary shadow-xs'
                    : 'bg-canvas-light text-on-surface border-outline-variant hover:bg-surface-variant'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">payments</span>
                <span>Cash Fare</span>
              </button>
            </div>
          </div>

          {/* Stops Dropdown */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div>
              <label className="block text-[11px] font-bold uppercase text-outline mb-1">
                Boarding Stop
              </label>
              <select
                value={boardStop}
                onChange={(e) => setBoardStop(e.target.value)}
                className="w-full p-2.5 bg-canvas-light border border-outline-variant rounded-xl font-medium text-on-surface text-[12px]"
              >
                {stops.map((s) => (
                  <option key={s.code} value={s.code}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase text-outline mb-1">
                Alighting Stop
              </label>
              <select
                value={alightStop}
                onChange={(e) => setAlightStop(e.target.value)}
                className="w-full p-2.5 bg-canvas-light border border-outline-variant rounded-xl font-medium text-on-surface text-[12px]"
              >
                {stops.map((s) => (
                  <option key={s.code} value={s.code}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Result Card */}
          <div className="bg-surface-container-low rounded-xl p-4 border border-outline-variant space-y-2 mt-2">
            <div className="flex items-center justify-between text-on-surface-variant">
              <span>Calculated Journey Distance:</span>
              <span className="font-bold text-on-surface">{journeyDistance.toFixed(1)} km</span>
            </div>
            <div className="flex items-center justify-between text-on-surface-variant">
              <span>Approx. Travel Time:</span>
              <span className="font-bold text-on-surface">
                ~{Math.round(journeyDistance * 2.2)} mins
              </span>
            </div>
            <div className="pt-2 border-t border-outline-variant/60 flex items-center justify-between">
              <span className="font-bold text-on-surface text-[14px]">Calculated Fare:</span>
              <span className="text-[24px] font-extrabold text-load-seats">
                ${calculatedFare.toFixed(2)}
              </span>
            </div>
            {paymentMode === 'card' && savings > 0 && (
              <div className="text-[11px] text-load-seats bg-emerald-50 border border-load-seats/20 rounded-lg p-2 font-semibold flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">savings</span>
                You save ${savings.toFixed(2)} compared to standard cash fare!
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-surface-container-lowest border-t border-outline-variant flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-primary text-white font-bold rounded-xl text-[12px] hover:bg-primary-container transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
