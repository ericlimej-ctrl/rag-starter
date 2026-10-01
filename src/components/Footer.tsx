import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-surface-container-lowest border-t border-outline-variant mt-12 py-8 text-on-surface-variant text-[14px]">
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary-container text-on-primary flex items-center justify-center font-extrabold text-sm">
            SBS
          </div>
          <div>
            <div className="text-on-surface font-bold">SBS Transit Live Bus Arrival</div>
            <div className="text-[11px] text-outline font-medium">
              Powered by Land Transport Authority (LTA) DataMall v2 API
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 text-[12px] font-medium">
          <button
            onClick={() => {}}
            className="hover:text-primary transition-colors cursor-pointer"
          >
            Conditions of Carriage
          </button>
          <button
            onClick={() => {}}
            className="hover:text-primary transition-colors cursor-pointer"
          >
            Bus Interchange Directory
          </button>
          <button
            onClick={() => {}}
            className="hover:text-primary transition-colors cursor-pointer"
          >
            SimplyGo Card Top-up
          </button>
          <button
            onClick={() => {}}
            className="hover:text-primary transition-colors cursor-pointer"
          >
            Feedback &amp; Lost Property
          </button>
        </div>

        <div className="text-[12px] text-outline font-medium">
          © 2025 SBS Transit Ltd. Singapore.
        </div>
      </div>
    </footer>
  );
};
