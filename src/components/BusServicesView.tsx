import React, { useState } from 'react';
import { BUS_SERVICES } from '../data/busData';

interface BusServicesViewProps {
  onSelectService: (svc: string) => void;
}

export const BusServicesView: React.FC<BusServicesViewProps> = ({ onSelectService }) => {
  const [filterType, setFilterType] = useState<'All' | 'Trunk' | 'Express'>('All');
  const [query, setQuery] = useState('');

  const services = Object.values(BUS_SERVICES).filter((s) => {
    const matchesFilter = filterType === 'All' || s.category === filterType;
    const matchesQuery =
      s.serviceNo.toLowerCase().includes(query.toLowerCase()) ||
      s.direction1.origin.toLowerCase().includes(query.toLowerCase()) ||
      s.direction1.destination.toLowerCase().includes(query.toLowerCase());
    return matchesFilter && matchesQuery;
  });

  return (
    <div className="space-y-6">
      <div className="bg-surface-container-lowest rounded-xl border border-on-background/10 p-5 md:p-6 shadow-sm">
        <div className="space-y-2">
          <h2 className="text-[20px] font-bold text-primary">Bus Services Directory</h2>
          <p className="text-[14px] text-on-surface-variant">
            Explore SBS Transit network routes, terminals, operating hours, and live frequencies.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4">
          <div className="relative w-full sm:w-80">
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-outline text-[18px]">
              search
            </span>
            <input
              type="text"
              placeholder="Search service number or terminal..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-canvas-light border border-outline-variant rounded-xl text-[13px] text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="flex items-center gap-1.5 self-start sm:self-auto">
            {(['All', 'Trunk', 'Express'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterType(cat)}
                className={`px-3 py-1.5 rounded-lg text-[12px] font-bold transition-all cursor-pointer ${
                  filterType === cat
                    ? 'bg-primary text-white shadow-xs'
                    : 'bg-surface-subtle text-on-surface-variant hover:bg-surface-variant'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((svc) => (
          <div
            key={svc.serviceNo}
            onClick={() => onSelectService(svc.serviceNo)}
            className="bg-surface-container-lowest rounded-xl border border-outline-variant p-5 shadow-xs hover:border-primary hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span
                  className={`w-12 h-12 rounded-xl text-[18px] font-extrabold flex items-center justify-center text-white transition-transform group-hover:scale-105 ${
                    svc.category === 'Express' ? 'bg-secondary' : 'bg-on-background'
                  }`}
                >
                  {svc.serviceNo}
                </span>
                <span
                  className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                    svc.category === 'Express'
                      ? 'bg-red-100 text-secondary'
                      : 'bg-surface-container text-primary'
                  }`}
                >
                  {svc.category}
                </span>
              </div>

              <h3 className="text-[15px] font-bold text-on-surface group-hover:text-primary transition-colors">
                {svc.direction1.destination}
              </h3>
              <p className="text-[12px] text-outline mt-1 font-medium">
                Origin: {svc.direction1.origin}
              </p>

              <div className="mt-3 pt-3 border-t border-outline-variant/60 flex items-center justify-between text-[11px] text-on-surface-variant font-medium">
                <span>Headway: {svc.operatingHours.headway}</span>
                <span>{svc.operatingHours.distance}</span>
              </div>
            </div>

            <div className="mt-4 pt-3 flex items-center justify-between text-[12px] font-bold text-primary group-hover:translate-x-1 transition-transform">
              <span>Inspect Live Arrival</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
