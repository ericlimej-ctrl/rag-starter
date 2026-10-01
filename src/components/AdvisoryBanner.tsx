import React from 'react';

export const AdvisoryBanner: React.FC = () => {
  return (
    <div className="bg-surface-container-high border-b border-outline-variant/60 py-2 px-4 md:px-6 text-[12px] font-medium">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[11px] bg-load-seats/20 text-load-seats font-bold uppercase tracking-wider">
            Normal
          </span>
          <span className="text-on-surface-variant flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px] text-load-seats">verified</span>
            Normal service frequency along Tampines corridors &amp; Expressway routes (518, 65, 23).
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-outline text-[11px]">
          <span>Fare System: Distance Fare Card / SimplyGo</span>
          <span className="text-outline-variant">|</span>
          <span>Peak Window: 07:30 - 09:30</span>
        </div>
      </div>
    </div>
  );
};
