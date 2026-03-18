export interface CartItem {
  eventId: number;
  eventTitle: string;
  venue: string;
  startsAt: string;
  seatId: string;
  seatLabel: string;
  zoneName: string;
  price: number;
  holdToken?: string;
}

export interface CartState {
  items: CartItem[];
  total: number;
  expiresAt: string | null;
  eventId: number | null;
}
