export type SeatStatus = 'available' | 'reserved' | 'sold' | 'selected';

export interface SeatCoordinate {
  x: number;
  y: number;
}

export interface EventTableLayout {
  id?: string;
  label?: string;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  rotation?: number;
  seatIds?: string[];
}

export interface EventZoneLayout {
  seatsPerTable?: number;
  tableWidth?: number;
  tableHeight?: number;
  tables?: EventTableLayout[];
}

export interface EventVenueLayout {
  width?: number;
  height?: number;
  stageLabel?: string;
  stageImage?: string;
  sidebarImage?: string;
  entranceLabel?: string;
}

export interface TicketType {
  id: number | string;
  name: string;
  price: number;
  availability: number;
}

export interface EventSeat {
  id: string;
  label: string;
  row: string;
  number: number;
  price: number;
  status: SeatStatus;
  zoneId: string;
  holdExpiresAt?: string | null;
  position?: SeatCoordinate;
}

export interface EventZone {
  id: string;
  name: string;
  color: string;
  price: number;
  seats: EventSeat[];
  layout?: EventZoneLayout;
}

export interface EventSummary {
  id: number;
  slug?: string;
  title: string;
  venue: string;
  city: string;
  startsAt: string;
  heroImage: string;
  minPrice: number;
  status?: string;
  availableTickets: number;
}

export interface EventDetail extends EventSummary {
  description: string;
  address: string;
  seatMap: EventZone[];
  ticketTypes: TicketType[];
  venueLayout?: EventVenueLayout;
}

export interface EventListResponse {
  data: EventSummary[];
  meta?: {
    total: number;
    page: number;
    perPage: number;
  };
}
