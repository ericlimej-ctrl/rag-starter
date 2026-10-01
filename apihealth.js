/**
 * Health check monitor endpoint for Vercel and Node.js
 * Path: /apihealth.js (or /apihealth)
 */

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const hasLtaKey = Boolean(process.env.LTA_ACCOUNT_KEY || process.env.VITE_LTA_ACCOUNT_KEY);

  let ltaGatewayStatus = 'not_configured';
  let latencyMs = null;

  if (hasLtaKey) {
    const start = Date.now();
    try {
      const pingRes = await fetch(
        'https://datamall2.mytransport.sg/ltaodataservice/v3/BusArrival?BusStopCode=83139&ServiceNo=15',
        {
          headers: {
            AccountKey: process.env.LTA_ACCOUNT_KEY || process.env.VITE_LTA_ACCOUNT_KEY || '',
            accept: 'application/json'
          },
          signal: AbortSignal.timeout(4000)
        }
      );
      latencyMs = Date.now() - start;
      ltaGatewayStatus = pingRes.ok ? 'connected' : `http_${pingRes.status}`;
    } catch (err) {
      latencyMs = Date.now() - start;
      ltaGatewayStatus = `error: ${err.message}`;
    }
  }

  const payload = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime ? process.uptime() : 0),
    ltaService: {
      accountKeyConfigured: hasLtaKey,
      gatewayEndpoint: 'https://datamall2.mytransport.sg/ltaodataservice/v3/BusArrival',
      gatewayStatus: ltaGatewayStatus,
      latencyMs
    },
    version: '3.0.0',
    documentation: {
      busArrival: '/api/bus-arrival?BusStopCode=83139&ServiceNo=15',
      healthCheck: '/apihealth.js'
    }
  };

  return res.status(200).json(payload);
}
