export type LoadStatus = 'Seats Available' | 'Standing Available' | 'Limited Standing';
export type LoadColor = 'Green' | 'Amber' | 'Red';
export type FleetDeck = 'Double Deck (DD)' | 'Single Deck (SD)' | 'Bendy';

export interface BusArrivalInfo {
  busNumber: string;
  arrivalText: string;
  arrivalMinutes: number;
  distanceKm?: number;
  approachingLandmark: string;
  load: LoadStatus;
  loadColor: LoadColor;
  fleet: FleetDeck;
  isWab: boolean;
  busId?: string;
}

export interface RouteStop {
  id: string;
  code: string;
  name: string;
  road: string;
  distanceKm: number;
  journeyTimeDesc?: string;
  isCurrent?: boolean;
  status: 'Passed' | 'YOU ARE HERE' | 'Next Stop' | 'En Route' | 'Final Terminus';
  subtext?: string;
}

export interface BusService {
  serviceNo: string;
  operator: string;
  category: 'Trunk' | 'Express' | 'Feeder';
  isLoop: boolean;
  direction1: {
    origin: string;
    destination: string;
    originCode: string;
    destCode: string;
    description: string;
    currentStopCode: string;
    currentStopName: string;
    stops: RouteStop[];
  };
  direction2?: {
    origin: string;
    destination: string;
    originCode: string;
    destCode: string;
    description: string;
    currentStopCode: string;
    currentStopName: string;
    stops: RouteStop[];
  };
  arrivals: BusArrivalInfo[];
  operatingHours: {
    firstBus: string;
    lastBus: string;
    headway: string;
    distance: string;
    fareCard: string;
    fareCash: string;
    stopsCount: number;
  };
}

export interface NearbyStopInfo {
  code: string;
  name: string;
  road: string;
  distanceMeters: number;
  walkTimeMins: number;
  services: {
    serviceNo: string;
    destination: string;
    etaMinutes: number | string;
    load: LoadStatus;
    fleet: FleetDeck;
    isWab: boolean;
    isExpress?: boolean;
  }[];
}
