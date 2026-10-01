import { BusService, NearbyStopInfo } from '../types/bus';

export const BUS_SERVICES: Record<string, BusService> = {
  '65': {
    serviceNo: '65',
    operator: 'SBS Transit',
    category: 'Trunk',
    isLoop: true,
    direction1: {
      origin: 'Tampines Concourse Int',
      destination: 'HarbourFront Interchange',
      originCode: '75009',
      destCode: '14009',
      description: 'Towards HarbourFront Interchange',
      currentStopCode: '76199',
      currentStopName: 'Opp Tampines Mall',
      stops: [
        {
          id: '1',
          code: '75009',
          name: 'Tampines Concourse Int (75009)',
          road: 'Tampines Concourse',
          distanceKm: 0,
          status: 'Passed',
          subtext: 'Terminal Origin • Departed 12 mins ago'
        },
        {
          id: '2',
          code: '76201',
          name: 'Blk 945 (76201)',
          road: 'Tampines Ave 4',
          distanceKm: 1.1,
          status: 'Passed',
          subtext: 'Tampines Ave 4'
        },
        {
          id: '3',
          code: '76199',
          name: 'Opp Tampines Mall (76199)',
          road: 'Tampines Ave 4',
          distanceKm: 2.2,
          isCurrent: true,
          status: 'YOU ARE HERE',
          subtext: 'Next interchange connection: Tampines MRT (East-West Line / Downtown Line within 200m)'
        },
        {
          id: '4',
          code: '76029',
          name: 'Opp SAFRA Tampines (76029)',
          road: 'Tampines Ave 1',
          distanceKm: 3.4,
          status: 'Next Stop',
          subtext: 'Tampines Ave 1 • ~4 mins journey'
        },
        {
          id: '5',
          code: '75199',
          name: 'Waterfront Isle (75199)',
          road: 'Bedok Reservoir Rd',
          distanceKm: 5.1,
          status: 'En Route',
          subtext: 'Bedok Reservoir Rd • ~8 mins journey'
        },
        {
          id: '6',
          code: '14009',
          name: 'HarbourFront Int (14009)',
          road: 'Seah Im Rd',
          distanceKm: 26.4,
          status: 'Final Terminus',
          subtext: 'Terminus Hub • Cruise Centre • Vivocity'
        }
      ]
    },
    direction2: {
      origin: 'HarbourFront Int',
      destination: 'Tampines Concourse Interchange',
      originCode: '14009',
      destCode: '75009',
      description: 'Towards Tampines Concourse Interchange',
      currentStopCode: '76191',
      currentStopName: 'Tampines Mall / MRT',
      stops: [
        {
          id: 'r1',
          code: '14009',
          name: 'HarbourFront Int (14009)',
          road: 'Seah Im Rd',
          distanceKm: 0,
          status: 'Passed',
          subtext: 'Terminal Origin'
        },
        {
          id: 'r2',
          code: '14021',
          name: 'Opp VivoCity (14021)',
          road: 'Telok Blangah Rd',
          distanceKm: 0.8,
          status: 'Passed',
          subtext: 'Telok Blangah Rd'
        },
        {
          id: 'r3',
          code: '76191',
          name: 'Tampines Mall / MRT (76191)',
          road: 'Tampines Ave 4',
          distanceKm: 24.8,
          isCurrent: true,
          status: 'YOU ARE HERE',
          subtext: 'Next interchange connection: Tampines MRT / Bus Interchange'
        },
        {
          id: 'r4',
          code: '76209',
          name: 'Opp Blk 945 (76209)',
          road: 'Tampines Ave 4',
          distanceKm: 25.5,
          status: 'Next Stop',
          subtext: 'Tampines Ave 4 • ~2 mins journey'
        },
        {
          id: 'r5',
          code: '75009',
          name: 'Tampines Concourse Int (75009)',
          road: 'Tampines Concourse',
          distanceKm: 26.4,
          status: 'Final Terminus',
          subtext: 'Terminus Hub • Tampines Concourse'
        }
      ]
    },
    arrivals: [
      {
        busNumber: 'SBS 6512T',
        arrivalText: 'Arr',
        arrivalMinutes: 0,
        approachingLandmark: 'Approaching junction Tampines Ave 4 / Ave 5',
        load: 'Seats Available',
        loadColor: 'Green',
        fleet: 'Double Deck (DD)',
        isWab: true
      },
      {
        busNumber: 'SBS 6833X',
        arrivalText: '11',
        arrivalMinutes: 11,
        distanceKm: 4.2,
        approachingLandmark: 'Passing Tampines West MRT Station',
        load: 'Standing Available',
        loadColor: 'Amber',
        fleet: 'Single Deck (SD)',
        isWab: true
      },
      {
        busNumber: 'SBS 6994G',
        arrivalText: '24',
        arrivalMinutes: 24,
        distanceKm: 8.9,
        approachingLandmark: 'Departed Tampines Concourse Inter',
        load: 'Limited Standing',
        loadColor: 'Red',
        fleet: 'Double Deck (DD)',
        isWab: true
      }
    ],
    operatingHours: {
      firstBus: '05:30 (Weekdays / Sat / Sun)',
      lastBus: '23:45',
      headway: '8 - 12 mins',
      distance: '26.4 km (44 Stops)',
      fareCard: '$1.95 (Card) / $2.90 (Cash)',
      fareCash: '$2.90',
      stopsCount: 44
    }
  },
  '81': {
    serviceNo: '81',
    operator: 'SBS Transit',
    category: 'Trunk',
    isLoop: false,
    direction1: {
      origin: 'Tampines Interchange',
      destination: 'Serangoon Interchange',
      originCode: '75009',
      destCode: '66009',
      description: 'Towards Serangoon Interchange',
      currentStopCode: '76199',
      currentStopName: 'Opp Tampines Mall',
      stops: [
        {
          id: '1',
          code: '75009',
          name: 'Tampines Int (75009)',
          road: 'Tampines Central 1',
          distanceKm: 0,
          status: 'Passed',
          subtext: 'Terminal Origin'
        },
        {
          id: '2',
          code: '76199',
          name: 'Opp Tampines Mall (76199)',
          road: 'Tampines Ave 4',
          distanceKm: 1.2,
          isCurrent: true,
          status: 'YOU ARE HERE',
          subtext: 'Tampines Town Centre'
        },
        {
          id: '3',
          code: '76161',
          name: 'Tampines Stadium (76161)',
          road: 'Tampines Ave 5',
          distanceKm: 2.1,
          status: 'Next Stop',
          subtext: 'Tampines Ave 5'
        },
        {
          id: '4',
          code: '66009',
          name: 'Serangoon Int (66009)',
          road: 'Serangoon Ave 2',
          distanceKm: 18.2,
          status: 'Final Terminus',
          subtext: 'NEX Shopping Mall • Serangoon MRT'
        }
      ]
    },
    arrivals: [
      {
        busNumber: 'SBS 8122K',
        arrivalText: '8',
        arrivalMinutes: 8,
        distanceKm: 2.4,
        approachingLandmark: 'Approaching Tampines Central 1',
        load: 'Standing Available',
        loadColor: 'Amber',
        fleet: 'Single Deck (SD)',
        isWab: true
      },
      {
        busNumber: 'SBS 8190Y',
        arrivalText: '19',
        arrivalMinutes: 19,
        distanceKm: 6.8,
        approachingLandmark: 'At Pasir Ris Dr 1',
        load: 'Seats Available',
        loadColor: 'Green',
        fleet: 'Double Deck (DD)',
        isWab: true
      },
      {
        busNumber: 'SBS 8230M',
        arrivalText: '31',
        arrivalMinutes: 31,
        distanceKm: 11.2,
        approachingLandmark: 'At Tampines Int Depo',
        load: 'Seats Available',
        loadColor: 'Green',
        fleet: 'Single Deck (SD)',
        isWab: true
      }
    ],
    operatingHours: {
      firstBus: '05:30 (Daily)',
      lastBus: '23:30',
      headway: '9 - 14 mins',
      distance: '18.2 km (36 Stops)',
      fareCard: '$1.75 (Card) / $2.60 (Cash)',
      fareCash: '$2.60',
      stopsCount: 36
    }
  },
  '23': {
    serviceNo: '23',
    operator: 'SBS Transit',
    category: 'Trunk',
    isLoop: true,
    direction1: {
      origin: 'Tampines Interchange',
      destination: 'Rochor MRT / Jalan Besar Loop',
      originCode: '75009',
      destCode: '07531',
      description: 'Towards Rochor MRT / Rochor Canal Rd',
      currentStopCode: '76199',
      currentStopName: 'Opp Tampines Mall',
      stops: [
        {
          id: '1',
          code: '75009',
          name: 'Tampines Int (75009)',
          road: 'Tampines Central 1',
          distanceKm: 0,
          status: 'Passed',
          subtext: 'Terminal Origin'
        },
        {
          id: '2',
          code: '76199',
          name: 'Opp Tampines Mall (76199)',
          road: 'Tampines Ave 4',
          distanceKm: 0.9,
          isCurrent: true,
          status: 'YOU ARE HERE',
          subtext: 'Tampines Ave 4'
        },
        {
          id: '3',
          code: '76041',
          name: 'Opp Blk 112 (76041)',
          road: 'Tampines Ave 1',
          distanceKm: 2.3,
          status: 'Next Stop',
          subtext: 'Tampines Ave 1 • ~3 mins'
        },
        {
          id: '4',
          code: '07531',
          name: 'Rochor Stn (07531)',
          road: 'Rochor Canal Rd',
          distanceKm: 16.5,
          status: 'Final Terminus',
          subtext: 'Downtown Line Connection • Sim Lim Square'
        }
      ]
    },
    arrivals: [
      {
        busNumber: 'SBS 2311A',
        arrivalText: '5',
        arrivalMinutes: 5,
        distanceKm: 1.8,
        approachingLandmark: 'Turning from Tampines Ave 5',
        load: 'Seats Available',
        loadColor: 'Green',
        fleet: 'Double Deck (DD)',
        isWab: true
      },
      {
        busNumber: 'SBS 2388C',
        arrivalText: '14',
        arrivalMinutes: 14,
        distanceKm: 5.1,
        approachingLandmark: 'Departing Tampines Int',
        load: 'Seats Available',
        loadColor: 'Green',
        fleet: 'Double Deck (DD)',
        isWab: true
      },
      {
        busNumber: 'SBS 2419T',
        arrivalText: '26',
        arrivalMinutes: 26,
        distanceKm: 9.7,
        approachingLandmark: 'Approaching Tampines Hub',
        load: 'Standing Available',
        loadColor: 'Amber',
        fleet: 'Single Deck (SD)',
        isWab: true
      }
    ],
    operatingHours: {
      firstBus: '05:40 (Weekdays / Sat / Sun)',
      lastBus: '23:50',
      headway: '7 - 11 mins',
      distance: '16.5 km (32 Stops)',
      fareCard: '$1.68 (Card) / $2.50 (Cash)',
      fareCash: '$2.50',
      stopsCount: 32
    }
  },
  '147': {
    serviceNo: '147',
    operator: 'SBS Transit',
    category: 'Trunk',
    isLoop: false,
    direction1: {
      origin: 'Hougang Central Int',
      destination: 'Clementi Interchange',
      originCode: '64009',
      destCode: '17009',
      description: 'Towards Clementi Interchange',
      currentStopCode: '64009',
      currentStopName: 'Hougang Central Int',
      stops: [
        {
          id: '1',
          code: '64009',
          name: 'Hougang Central Int (64009)',
          road: 'Hougang Central',
          distanceKm: 0,
          status: 'Passed',
          subtext: 'Origin Terminal'
        },
        {
          id: '2',
          code: '64389',
          name: 'Opp The Midtown (64389)',
          road: 'Upper Serangoon Rd',
          distanceKm: 1.2,
          isCurrent: true,
          status: 'YOU ARE HERE',
          subtext: 'Hougang Ave 10 junction'
        },
        {
          id: '3',
          code: '17009',
          name: 'Clementi Int (17009)',
          road: 'Clementi Ave 3',
          distanceKm: 27.2,
          status: 'Final Terminus',
          subtext: 'Clementi Mall & MRT'
        }
      ]
    },
    arrivals: [
      {
        busNumber: 'SBS 1471P',
        arrivalText: '3',
        arrivalMinutes: 3,
        distanceKm: 1.1,
        approachingLandmark: 'Approaching Upper Serangoon Rd',
        load: 'Seats Available',
        loadColor: 'Green',
        fleet: 'Double Deck (DD)',
        isWab: true
      },
      {
        busNumber: 'SBS 1490X',
        arrivalText: '12',
        arrivalMinutes: 12,
        distanceKm: 4.8,
        approachingLandmark: 'At Potong Pasir',
        load: 'Standing Available',
        loadColor: 'Amber',
        fleet: 'Double Deck (DD)',
        isWab: true
      },
      {
        busNumber: 'SBS 1502H',
        arrivalText: '21',
        arrivalMinutes: 21,
        distanceKm: 8.5,
        approachingLandmark: 'At Serangoon Central',
        load: 'Limited Standing',
        loadColor: 'Red',
        fleet: 'Single Deck (SD)',
        isWab: true
      }
    ],
    operatingHours: {
      firstBus: '05:30 (Daily)',
      lastBus: '23:45',
      headway: '6 - 10 mins',
      distance: '27.2 km (48 Stops)',
      fareCard: '$1.98 (Card) / $2.95 (Cash)',
      fareCash: '$2.95',
      stopsCount: 48
    }
  },
  '518': {
    serviceNo: '518',
    operator: 'SBS Transit',
    category: 'Express',
    isLoop: true,
    direction1: {
      origin: 'Pasir Ris Interchange',
      destination: 'Bayfront Ave / Marina Centre',
      originCode: '77009',
      destCode: '03549',
      description: 'Towards Bayfront Ave / Marina Bay Sands',
      currentStopCode: '76199',
      currentStopName: 'Opp Tampines Mall',
      stops: [
        {
          id: '1',
          code: '77009',
          name: 'Pasir Ris Int (77009)',
          road: 'Pasir Ris Central',
          distanceKm: 0,
          status: 'Passed',
          subtext: 'Origin Terminal'
        },
        {
          id: '2',
          code: '76199',
          name: 'Opp Tampines Mall (76199)',
          road: 'Tampines Ave 4',
          distanceKm: 3.5,
          isCurrent: true,
          status: 'YOU ARE HERE',
          subtext: 'Expressway Boarding Stop'
        },
        {
          id: '3',
          code: '03549',
          name: 'Bayfront Stn / Marina Bay Sands (03549)',
          road: 'Bayfront Ave',
          distanceKm: 21.0,
          status: 'Final Terminus',
          subtext: 'MBS • Gardens by the Bay'
        }
      ]
    },
    arrivals: [
      {
        busNumber: 'SBS 5188E',
        arrivalText: '14',
        arrivalMinutes: 14,
        distanceKm: 5.6,
        approachingLandmark: 'Entering Tampines Expressway (TPE)',
        load: 'Seats Available',
        loadColor: 'Green',
        fleet: 'Double Deck (DD)',
        isWab: true
      },
      {
        busNumber: 'SBS 5192L',
        arrivalText: '27',
        arrivalMinutes: 27,
        distanceKm: 10.4,
        approachingLandmark: 'Departing Pasir Ris Dr 1',
        load: 'Seats Available',
        loadColor: 'Green',
        fleet: 'Double Deck (DD)',
        isWab: true
      },
      {
        busNumber: 'SBS 5201J',
        arrivalText: '42',
        arrivalMinutes: 42,
        distanceKm: 16.2,
        approachingLandmark: 'At Pasir Ris Int',
        load: 'Seats Available',
        loadColor: 'Green',
        fleet: 'Double Deck (DD)',
        isWab: true
      }
    ],
    operatingHours: {
      firstBus: '06:00 (Daily)',
      lastBus: '23:30',
      headway: '12 - 16 mins',
      distance: '21.0 km (29 Stops)',
      fareCard: '$2.45 (Express Card) / $3.40 (Cash)',
      fareCash: '$3.40',
      stopsCount: 29
    }
  },
  '87': {
    serviceNo: '87',
    operator: 'SBS Transit',
    category: 'Trunk',
    isLoop: false,
    direction1: {
      origin: 'Sengkang Interchange',
      destination: 'Bedok Interchange',
      originCode: '67009',
      destCode: '84009',
      description: 'Towards Bedok Interchange',
      currentStopCode: '76199',
      currentStopName: 'Opp Tampines Mall',
      stops: [
        {
          id: '1',
          code: '67009',
          name: 'Sengkang Int (67009)',
          road: 'Compassvale Rd',
          distanceKm: 0,
          status: 'Passed',
          subtext: 'Origin Terminal'
        },
        {
          id: '2',
          code: '76199',
          name: 'Opp Tampines Mall (76199)',
          road: 'Tampines Ave 4',
          distanceKm: 8.4,
          isCurrent: true,
          status: 'YOU ARE HERE',
          subtext: 'Tampines Avenue 4'
        },
        {
          id: '3',
          code: '84009',
          name: 'Bedok Int (84009)',
          road: 'Bedok North Ave 1',
          distanceKm: 14.8,
          status: 'Final Terminus',
          subtext: 'Bedok Mall & MRT'
        }
      ]
    },
    arrivals: [
      {
        busNumber: 'SBS 8701M',
        arrivalText: '6',
        arrivalMinutes: 6,
        distanceKm: 2.1,
        approachingLandmark: 'Hougang Ave 7 junction',
        load: 'Seats Available',
        loadColor: 'Green',
        fleet: 'Double Deck (DD)',
        isWab: true
      },
      {
        busNumber: 'SBS 8722K',
        arrivalText: '16',
        arrivalMinutes: 16,
        distanceKm: 6.0,
        approachingLandmark: 'Compassvale Bow',
        load: 'Standing Available',
        loadColor: 'Amber',
        fleet: 'Single Deck (SD)',
        isWab: true
      },
      {
        busNumber: 'SBS 8755L',
        arrivalText: '29',
        arrivalMinutes: 29,
        distanceKm: 11.5,
        approachingLandmark: 'Sengkang Int',
        load: 'Seats Available',
        loadColor: 'Green',
        fleet: 'Double Deck (DD)',
        isWab: true
      }
    ],
    operatingHours: {
      firstBus: '05:30 (Daily)',
      lastBus: '23:45',
      headway: '8 - 12 mins',
      distance: '14.8 km (28 Stops)',
      fareCard: '$1.60 (Card) / $2.40 (Cash)',
      fareCash: '$2.40',
      stopsCount: 28
    }
  },
  '190': {
    serviceNo: '190',
    operator: 'SMRT / SBS Transit Joint',
    category: 'Trunk',
    isLoop: false,
    direction1: {
      origin: 'Choa Chu Kang Int',
      destination: 'Kampong Bahru Terminal',
      originCode: '44009',
      destCode: '10049',
      description: 'Towards Kampong Bahru Terminal',
      currentStopCode: '76199',
      currentStopName: 'Opp Tampines Mall',
      stops: [
        {
          id: '1',
          code: '44009',
          name: 'Choa Chu Kang Int (44009)',
          road: 'Choa Chu Kang Loop',
          distanceKm: 0,
          status: 'Passed',
          subtext: 'Origin Terminal'
        },
        {
          id: '2',
          code: '76199',
          name: 'Opp Tampines Mall (76199)',
          road: 'Tampines Ave 4',
          distanceKm: 12.0,
          isCurrent: true,
          status: 'YOU ARE HERE',
          subtext: 'Connecting Hub'
        },
        {
          id: '3',
          code: '10049',
          name: 'Kampong Bahru Ter (10049)',
          road: 'Spooner Rd',
          distanceKm: 23.5,
          status: 'Final Terminus',
          subtext: 'Kampong Bahru Terminal'
        }
      ]
    },
    arrivals: [
      {
        busNumber: 'SMB 1902T',
        arrivalText: '7',
        arrivalMinutes: 7,
        distanceKm: 2.8,
        approachingLandmark: 'Along Bukit Panjang Rd',
        load: 'Standing Available',
        loadColor: 'Amber',
        fleet: 'Double Deck (DD)',
        isWab: true
      },
      {
        busNumber: 'SMB 1944Z',
        arrivalText: '18',
        arrivalMinutes: 18,
        distanceKm: 7.2,
        approachingLandmark: 'Approaching BKE Flyover',
        load: 'Limited Standing',
        loadColor: 'Red',
        fleet: 'Double Deck (DD)',
        isWab: true
      },
      {
        busNumber: 'SMB 1980Y',
        arrivalText: '30',
        arrivalMinutes: 30,
        distanceKm: 12.5,
        approachingLandmark: 'Choa Chu Kang Way',
        load: 'Seats Available',
        loadColor: 'Green',
        fleet: 'Double Deck (DD)',
        isWab: true
      }
    ],
    operatingHours: {
      firstBus: '05:30 (Daily)',
      lastBus: '23:30',
      headway: '7 - 12 mins',
      distance: '23.5 km (38 Stops)',
      fareCard: '$1.88 (Card) / $2.80 (Cash)',
      fareCash: '$2.80',
      stopsCount: 38
    }
  }
};

export const CURRENT_STOP_DATA: NearbyStopInfo = {
  code: '76199',
  name: 'Opp Tampines Mall',
  road: 'Tampines Ave 4',
  distanceMeters: 120,
  walkTimeMins: 2,
  services: [
    {
      serviceNo: '23',
      destination: 'To Rochor MRT',
      etaMinutes: '5 mins',
      load: 'Seats Available',
      fleet: 'Double Deck (DD)',
      isWab: true
    },
    {
      serviceNo: '81',
      destination: 'To Serangoon Int',
      etaMinutes: '8 mins',
      load: 'Standing Available',
      fleet: 'Single Deck (SD)',
      isWab: true
    },
    {
      serviceNo: '292',
      destination: 'Tampines St 22 Loop',
      etaMinutes: 'Arr',
      load: 'Seats Available',
      fleet: 'Single Deck (SD)',
      isWab: false
    },
    {
      serviceNo: '518',
      destination: 'Bayfront Ave',
      etaMinutes: '14 mins',
      load: 'Seats Available',
      fleet: 'Double Deck (DD)',
      isWab: true,
      isExpress: true
    },
    {
      serviceNo: '67',
      destination: 'To Choa Chu Kang Int',
      etaMinutes: '12 mins',
      load: 'Seats Available',
      fleet: 'Double Deck (DD)',
      isWab: true
    },
    {
      serviceNo: '27',
      destination: 'To Changi Airport PTB 1/2/3',
      etaMinutes: '3 mins',
      load: 'Standing Available',
      fleet: 'Single Deck (SD)',
      isWab: true
    }
  ]
};

export const DETAILED_INTERMEDIATE_STOPS_65 = [
  { code: '75009', name: 'Tampines Concourse Int', road: 'Tampines Concourse' },
  { code: '76201', name: 'Blk 945', road: 'Tampines Ave 4' },
  { code: '76199', name: 'Opp Tampines Mall', road: 'Tampines Ave 4' },
  { code: '76029', name: 'Opp SAFRA Tampines', road: 'Tampines Ave 1' },
  { code: '75199', name: 'Waterfront Isle', road: 'Bedok Reservoir Rd' },
  { code: '75189', name: 'Blk 745', road: 'Bedok Reservoir Rd' },
  { code: '75179', name: 'Archipelago', road: 'Bedok Reservoir Rd' },
  { code: '71039', name: 'Aft Kaki Bukit Stn Exit A', road: 'Kaki Bukit Ave 1' },
  { code: '70251', name: 'MacPherson Stn Exit A', road: 'Ubi Ave 2' },
  { code: '70241', name: 'Bef Circuit Rd', road: 'Circuit Link' },
  { code: '70179', name: 'Bef Mattar Stn Exit B', road: 'Mattar Rd' },
  { code: '60109', name: 'Opp Aljunied Park', road: 'Aljunied Rd' },
  { code: '60019', name: 'Potong Pasir Stn Exit B', road: 'Upper Serangoon Rd' },
  { code: '60029', name: 'Boon Keng Stn / Blk 22', road: 'Serangoon Rd' },
  { code: '60049', name: 'Sri Srinivasa Perumal Temple', road: 'Serangoon Rd' },
  { code: '07021', name: 'Tekka Ctr / Little India Stn', road: 'Serangoon Rd' },
  { code: '08057', name: 'Dhoby Ghaut Stn', road: 'Orchard Rd' },
  { code: '08138', name: 'Opp Somerset Stn', road: 'Orchard Rd' },
  { code: '10041', name: 'Opp Kampong Bahru Bus Ter', road: 'Spooner Rd' },
  { code: '14009', name: 'HarbourFront Int', road: 'Seah Im Rd' }
];
