/**
 * Vercel Serverless Function: LTA DataMall v3 Bus Arrival API Proxy
 * Endpoint: /api/bus-arrival?BusStopCode=83139&ServiceNo=15
 */

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, AccountKey'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { BusStopCode, busStopCode, ServiceNo, serviceNo } = req.query || {};
  const stopCode = BusStopCode || busStopCode || '83139';
  const svcNo = ServiceNo || serviceNo || '';

  const apiKey = process.env.LTA_ACCOUNT_KEY || process.env.VITE_LTA_ACCOUNT_KEY;

  // Build target LTA DataMall v3 URL
  let ltaUrl = `https://datamall2.mytransport.sg/ltaodataservice/v3/BusArrival?BusStopCode=${encodeURIComponent(stopCode)}`;
  if (svcNo) {
    ltaUrl += `&ServiceNo=${encodeURIComponent(svcNo)}`;
  }

  // If API key is available, fetch from LTA
  if (apiKey) {
    try {
      const response = await fetch(ltaUrl, {
        method: 'GET',
        headers: {
          AccountKey: apiKey,
          accept: 'application/json'
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        return res.status(response.status).json({
          error: `LTA DataMall responded with status ${response.status}`,
          details: errorText,
          busStopCode: stopCode,
          serviceNo: svcNo
        });
      }

      const data = await response.json();
      res.setHeader('Cache-Control', 's-maxage=15, stale-while-revalidate=5');
      return res.status(200).json(data);
    } catch (err) {
      return res.status(502).json({
        error: 'Failed to connect to LTA DataMall gateway',
        message: err.message,
        busStopCode: stopCode
      });
    }
  }

  // Fallback simulation when LTA_ACCOUNT_KEY is not yet populated in Vercel environment
  const now = Date.now();
  const makeArrival = (offsetMinutes, load, type, feature = 'WAB') => ({
    OriginCode: '75009',
    DestinationCode: '14009',
    EstimatedArrival: new Date(now + offsetMinutes * 60 * 1000).toISOString(),
    Latitude: (1.3521 + Math.random() * 0.01).toFixed(6),
    Longitude: (103.9452 + Math.random() * 0.01).toFixed(6),
    VisitNumber: '1',
    Load: load,
    Feature: feature,
    Type: type,
    Monitored: 1
  });

  return res.status(200).json({
    'odata.metadata': 'https://datamall2.mytransport.sg/ltaodataservice/v3/BusArrival',
    BusStopCode: stopCode,
    _status: 'SIMULATED_DATA',
    _notice: 'LTA_ACCOUNT_KEY environment variable is not configured. Add LTA_ACCOUNT_KEY in your Vercel project settings to enable live production LTA telemetry.',
    Services: [
      {
        ServiceNo: svcNo || '65',
        Operator: 'SBST',
        NextBus: makeArrival(0.5, 'SEA', 'DD'),
        NextBus2: makeArrival(11, 'SDA', 'SD'),
        NextBus3: makeArrival(24, 'LSD', 'DD')
      },
      {
        ServiceNo: '23',
        Operator: 'SBST',
        NextBus: makeArrival(5, 'SEA', 'DD'),
        NextBus2: makeArrival(14, 'SEA', 'DD'),
        NextBus3: makeArrival(26, 'SDA', 'SD')
      },
      {
        ServiceNo: '81',
        Operator: 'SBST',
        NextBus: makeArrival(8, 'SDA', 'SD'),
        NextBus2: makeArrival(19, 'SEA', 'DD'),
        NextBus3: makeArrival(31, 'SEA', 'SD')
      },
      {
        ServiceNo: '518',
        Operator: 'SBST',
        NextBus: makeArrival(14, 'SEA', 'DD'),
        NextBus2: makeArrival(27, 'SEA', 'DD'),
        NextBus3: makeArrival(42, 'SEA', 'DD')
      }
    ].filter((s) => !svcNo || s.ServiceNo === svcNo)
  });
}
