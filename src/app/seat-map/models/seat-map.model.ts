export interface ReserveSeatRequest {
  eventId: number;
  seatId: string;
}

export interface ReserveSeatResponse {
  seatId: string;
  holdToken: string;
  expiresAt: string;
}
