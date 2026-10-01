import React, { useState } from 'react';
import { BusService } from '../types/bus';

interface MapViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: BusService;
  directionKey: 'direction1' | 'direction2';
}

export const MapViewModal: React.FC<MapViewModalProps> = ({
  isOpen,
  onClose,
  service,
  directionKey
}) => {
  const [activeLayer, setActiveLayer] = useState<'route' | 'traffic' | 'satellite'>('route');
  const [zoomLevel, setZoomLevel] = useState(1);

  if (!isOpen) return null;

  const activeDirection = directionKey === 'direction2' && service.direction2
    ? service.direction2
    : service.direction1;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-outline-variant flex items-center justify-between bg-surface-container-low">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary text-white font-bold flex items-center justify-center text-sm">
              {service.serviceNo}
            </div>
            <div>
              <h3 className="text-[16px] font-bold text-on-surface">
                Interactive Route Map • Service {service.serviceNo}
              </h3>
              <p className="text-[12px] text-on-surface-variant font-medium">
                {activeDirection.description} (Origin: {activeDirection.origin})
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-outline hover:text-on-surface hover:bg-surface-variant transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Map Canvas / Simulated GIS View */}
        <div className="relative flex-1 min-h-[380px] bg-slate-100 overflow-hidden flex items-center justify-center">
          {/* SVG Map Canvas */}
          <div
            className="w-full h-full relative transition-transform duration-300 flex items-center justify-center p-8 select-none"
            style={{ transform: `scale(${zoomLevel})` }}
          >
            {/* Background Singapore Map Grid */}
            <svg
              className="w-full h-[360px] max-w-2xl text-slate-300"
              viewBox="0 0 600 320"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Roads and expressway networks */}
              <path
                d="M 50,60 Q 200,80 320,120 T 550,140"
                stroke="#E2E8F0"
                strokeWidth="16"
                strokeLinecap="round"
              />
              <path
                d="M 120,290 C 220,240 280,180 520,130"
                stroke="#CBD5E1"
                strokeWidth="10"
                strokeLinecap="round"
              />
              <path
                d="M 80,180 L 520,180"
                stroke="#E2E8F0"
                strokeWidth="8"
                strokeDasharray="6 6"
              />

              {/* Main Transit Corridor Route Line for Service */}
              <path
                d="M 100,260 C 180,220 280,170 380,150 S 490,130 520,100"
                stroke="#5e0081"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Waypoints along the line */}
              {/* Stop 1: Origin */}
              <circle cx="520" cy="100" r="7" fill="#7b1fa2" stroke="#fff" strokeWidth="2.5" />
              <text x="500" y="85" fill="#4e4351" fontSize="10" fontWeight="bold" textAnchor="end">
                {activeDirection.stops[0]?.name.split('(')[0] || 'Origin'}
              </text>

              {/* Stop 2: Near Current */}
              <circle cx="430" cy="140" r="6" fill="#807382" stroke="#fff" strokeWidth="2" />

              {/* Stop 3: YOU ARE HERE */}
              <circle cx="360" cy="155" r="9" fill="#0D8A4E" stroke="#fff" strokeWidth="3" />
              <circle cx="360" cy="155" r="15" fill="#0D8A4E" fillOpacity="0.2" className="pulse-indicator" />
              <text x="360" y="185" fill="#0D8A4E" fontSize="11" fontWeight="bold" textAnchor="middle">
                Opp Tampines Mall (YOU ARE HERE)
              </text>

              {/* Stop 4 */}
              <circle cx="270" cy="175" r="6" fill="#807382" stroke="#fff" strokeWidth="2" />

              {/* Stop 5: Intermediate */}
              <circle cx="190" cy="215" r="6" fill="#807382" stroke="#fff" strokeWidth="2" />

              {/* Stop 6: Terminus */}
              <circle cx="100" cy="260" r="8" fill="#ba0a06" stroke="#fff" strokeWidth="2.5" />
              <text x="95" y="285" fill="#ba0a06" fontSize="10" fontWeight="bold" textAnchor="start">
                {activeDirection.destination.split(' ')[0]} Int
              </text>
            </svg>

            {/* Live Bus Pins Floating Overlay */}
            {/* Bus 1: Arr - Near Stop 3 */}
            <div className="absolute top-[125px] right-[270px] bg-load-seats text-white text-[11px] font-bold px-2 py-1 rounded-full shadow-md flex items-center gap-1 border-2 border-white animate-bounce">
              <span className="material-symbols-outlined text-[14px]">directions_bus</span>
              <span>Bus 1: Arr</span>
            </div>

            {/* Bus 2: 11 mins - Near Stop 2 */}
            <div className="absolute top-[105px] right-[190px] bg-amber-500 text-white text-[11px] font-bold px-2 py-1 rounded-full shadow-md flex items-center gap-1 border-2 border-white">
              <span className="material-symbols-outlined text-[14px]">directions_bus</span>
              <span>Bus 2: 11m</span>
            </div>

            {/* Bus 3: 24 mins - Near Origin */}
            <div className="absolute top-[65px] right-[95px] bg-red-600 text-white text-[11px] font-bold px-2 py-1 rounded-full shadow-md flex items-center gap-1 border-2 border-white">
              <span className="material-symbols-outlined text-[14px]">directions_bus</span>
              <span>Bus 3: 24m</span>
            </div>
          </div>

          {/* Map Controls */}
          <div className="absolute bottom-4 right-4 flex flex-col gap-1.5 bg-white/95 p-1 rounded-xl shadow-md border border-outline-variant">
            <button
              onClick={() => setZoomLevel((z) => Math.min(z + 0.2, 1.6))}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-on-surface hover:bg-surface-subtle font-bold cursor-pointer"
              title="Zoom In"
            >
              +
            </button>
            <button
              onClick={() => setZoomLevel((z) => Math.max(z - 0.2, 0.8))}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-on-surface hover:bg-surface-subtle font-bold cursor-pointer"
              title="Zoom Out"
            >
              -
            </button>
            <button
              onClick={() => setZoomLevel(1)}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-primary hover:bg-surface-subtle cursor-pointer"
              title="Reset View"
            >
              <span className="material-symbols-outlined text-[18px]">center_focus_strong</span>
            </button>
          </div>

          {/* Layer switcher */}
          <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-white/95 p-1 rounded-xl shadow-md border border-outline-variant text-[11px]">
            <button
              onClick={() => setActiveLayer('route')}
              className={`px-2.5 py-1 rounded-lg font-bold cursor-pointer transition-colors ${
                activeLayer === 'route'
                  ? 'bg-primary text-white'
                  : 'text-on-surface-variant hover:bg-surface-subtle'
              }`}
            >
              Route Line
            </button>
            <button
              onClick={() => setActiveLayer('traffic')}
              className={`px-2.5 py-1 rounded-lg font-bold cursor-pointer transition-colors ${
                activeLayer === 'traffic'
                  ? 'bg-primary text-white'
                  : 'text-on-surface-variant hover:bg-surface-subtle'
              }`}
            >
              Live Traffic
            </button>
          </div>
        </div>

        {/* Modal Footer / Telemetry Bar */}
        <div className="px-6 py-3.5 bg-surface-container-lowest border-t border-outline-variant flex flex-wrap items-center justify-between gap-3 text-[12px]">
          <div className="flex items-center gap-4 text-on-surface-variant font-medium">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-load-seats"></span> Bus 1 (Seats Avail)
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-load-standing"></span> Bus 2 (Standing)
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-load-limited"></span> Bus 3 (Crowded)
            </span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-surface-subtle hover:bg-surface-variant text-on-surface font-bold rounded-lg border border-outline-variant transition-colors cursor-pointer"
          >
            Close Map
          </button>
        </div>
      </div>
    </div>
  );
};
