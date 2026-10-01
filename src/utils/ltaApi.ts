import { BusArrivalInfo, LoadStatus, LoadColor, FleetDeck } from '../types/bus';

export interface LtaRawBusInfo {
  OriginCode?: string;
  DestinationCode?: string;
  EstimatedArrival?: string;
  Latitude?: string;
  Longitude?: string;
  VisitNumber?: string;
  Load?: 'SEA' | 'SDA' | 'LSD' | string;
  Feature?: 'WAB' | string;
  Type?: 'SD' | 'DD' | 'BD' | string;
  Monitored?: number;
}

export interface LtaRawService {
  ServiceNo: string;
  Operator: string;
  NextBus?: LtaRawBusInfo;
  NextBus2?: LtaRawBusInfo;
  NextBus3?: LtaRawBusInfo;
}

export interface LtaBusArrivalResponse {
  'odata.metadata'?: string;
  BusStopCode: string;
  Services: LtaRawService[];
  _status?: string;
  _notice?: string;
}

export function parseLtaLoad(loadCode?: string): { load: LoadStatus; loadColor: LoadColor } {
  switch (loadCode) {
    case 'SEA':
      return { load: 'Seats Available', loadColor: 'Green' };
    case 'SDA':
      return { load: 'Standing Available', loadColor: 'Amber' };
    case 'LSD':
      return { load: 'Limited Standing', loadColor: 'Red' };
    default:
      return { load: 'Seats Available', loadColor: 'Green' };
  }
}

export function parseLtaFleet(typeCode?: string): FleetDeck {
  switch (typeCode) {
    case 'DD':
      return 'Double Deck (DD)';
    case 'SD':
      return 'Single Deck (SD)';
    case 'BD':
      return 'Bendy';
    default:
      return 'Double Deck (DD)';
  }
}

export function parseLtaArrival(busInfo?: LtaRawBusInfo, fallbackNumber = 'SBS 6512T'): BusArrivalInfo | null {
  if (!busInfo || !busInfo.EstimatedArrival) return null;

  const arrivalDate = new Date(busInfo.EstimatedArrival);
  const now = Date.now();
  const diffMinutes = Math.round((arrivalDate.getTime() - now) / 60000);

  const { load, loadColor } = parseLtaLoad(busInfo.Load);
  const fleet = parseLtaFleet(busInfo.Type);
  const isWab = busInfo.Feature === 'WAB';

  let arrivalText = 'Arr';
  if (diffMinutes > 1) {
    arrivalText = String(diffMinutes);
  } else if (diffMinutes <= 0) {
    arrivalText = 'Arr';
  }

  return {
    busNumber: fallbackNumber,
    arrivalText,
    arrivalMinutes: Math.max(0, diffMinutes),
    distanceKm: busInfo.Latitude ? Number((Math.max(1, diffMinutes * 0.4)).toFixed(1)) : undefined,
    approachingLandmark: diffMinutes <= 1
      ? 'Approaching junction'
      : `En route (${diffMinutes} mins away)`,
    load,
    loadColor,
    fleet,
    isWab
  };
}

/**
 * Fetch bus arrival information from the configured local / Vercel API proxy
 */
export async function fetchBusArrivals(busStopCode: string, serviceNo?: string): Promise<LtaBusArrivalResponse> {
  const url = `/api/bus-arrival?BusStopCode=${encodeURIComponent(busStopCode)}${
    serviceNo ? `&ServiceNo=${encodeURIComponent(serviceNo)}` : ''
  }`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch arrival data: HTTP ${res.status}`);
  }
  return res.json();
}

/**
 * Ping /apihealth.js to inspect health and LTA key configuration
 */
export async function checkApiHealth(): Promise<any> {
  const res = await fetch('/apihealth.js');
  if (!res.ok) {
    throw new Error(`Health check returned HTTP ${res.status}`);
  }
  return res.json();
}
