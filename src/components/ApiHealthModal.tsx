import React, { useState, useEffect } from 'react';
import { checkApiHealth, fetchBusArrivals } from '../utils/ltaApi';

interface ApiHealthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ApiHealthModal: React.FC<ApiHealthModalProps> = ({ isOpen, onClose }) => {
  const [healthData, setHealthData] = useState<any>(null);
  const [sampleArrivalData, setSampleArrivalData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchHealth = async () => {
    setLoading(true);
    setError(null);
    try {
      const health = await checkApiHealth();
      setHealthData(health);

      const sample = await fetchBusArrivals('83139', '15');
      setSampleArrivalData(sample);
    } catch (err: any) {
      setError(err.message || 'Failed to ping health check');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchHealth();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-outline-variant flex items-center justify-between bg-surface-container-low">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-load-seats text-[24px]">
              monitor_heart
            </span>
            <div>
              <h3 className="text-[16px] font-bold text-on-surface">
                API Health &amp; LTA DataMall Monitor
              </h3>
              <p className="text-[11px] text-on-surface-variant font-medium">
                Live status of <code className="bg-surface-subtle px-1 rounded">/apihealth.js</code> and LTA v3 proxy
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-outline hover:text-on-surface hover:bg-surface-variant transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4 text-[13px]">
          {/* Status Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-canvas-light border border-outline-variant">
              <div className="text-[11px] font-bold text-outline uppercase tracking-wider">
                API Server Health
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="w-2.5 h-2.5 rounded-full bg-load-seats pulse-indicator"></span>
                <span className="text-[16px] font-extrabold text-on-surface">
                  {healthData?.status === 'healthy' ? 'Healthy (200 OK)' : loading ? 'Checking...' : 'Active'}
                </span>
              </div>
              <div className="text-[11px] text-outline mt-1 font-mono">
                Endpoint: /apihealth.js
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-canvas-light border border-outline-variant">
              <div className="text-[11px] font-bold text-outline uppercase tracking-wider">
                LTA_ACCOUNT_KEY Status
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    healthData?.ltaService?.accountKeyConfigured
                      ? 'bg-load-seats'
                      : 'bg-amber-500'
                  }`}
                ></span>
                <span className="text-[15px] font-bold text-on-surface">
                  {healthData?.ltaService?.accountKeyConfigured
                    ? 'Connected (Production Key)'
                    : 'Pending Vercel Env Var'}
                </span>
              </div>
              <div className="text-[11px] text-outline mt-1">
                {healthData?.ltaService?.accountKeyConfigured
                  ? `Latency: ${healthData.ltaService.latencyMs || 0}ms`
                  : 'Add LTA_ACCOUNT_KEY in Vercel settings'}
              </div>
            </div>
          </div>

          {/* Vercel Environment Instructions */}
          {!healthData?.ltaService?.accountKeyConfigured && (
            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-[12px] space-y-1.5">
              <div className="font-bold flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-amber-700">info</span>
                How to activate live LTA DataMall feed in Vercel:
              </div>
              <ol className="list-decimal list-inside space-y-1 text-amber-800">
                <li>Go to your project dashboard on Vercel: <strong>Settings &rarr; Environment Variables</strong></li>
                <li>Add Key: <code className="bg-amber-100 px-1 rounded font-bold">LTA_ACCOUNT_KEY</code></li>
                <li>Paste your LTA DataMall AccountKey and hit <strong>Save</strong></li>
                <li>Redeploy or trigger a new deployment for changes to take effect</li>
              </ol>
            </div>
          )}

          {/* Live response preview */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-bold text-[12px] text-on-surface">
                Sample Live Response for Stop 83139 (Service 15):
              </span>
              <button
                onClick={fetchHealth}
                disabled={loading}
                className="text-[11px] font-bold text-primary hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[14px]">refresh</span>
                {loading ? 'Testing...' : 'Re-test API'}
              </button>
            </div>

            <pre className="p-3 rounded-xl bg-slate-900 text-emerald-400 font-mono text-[11px] overflow-x-auto max-h-48 border border-slate-800">
              {JSON.stringify(sampleArrivalData || healthData, null, 2)}
            </pre>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-surface-container-lowest border-t border-outline-variant flex items-center justify-between text-[12px]">
          <span className="text-outline">
            Endpoint: <code className="font-bold">/api/bus-arrival?BusStopCode=83139</code>
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-primary text-white font-bold rounded-lg hover:bg-primary-container transition-colors cursor-pointer"
          >
            Close Monitor
          </button>
        </div>
      </div>
    </div>
  );
};
