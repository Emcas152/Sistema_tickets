export type SeatStatus = 'available' | 'reserved' | 'sold' | 'selected';

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
}

export interface EventZone {
  id: string;
  name: string;
  color: string;
  price: number;
  seats: EventSeat[];
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
}

export interface EventListResponse {
  data: EventSummary[];
  meta?: {
    total: number;
    page: number;
    perPage: number;
  };
}
