export interface CheckoutFormValue {
  name: string;
  email: string;
  card: string;
  expiration: string;
  cvv: string;
}

export interface CreateOrderRequest {
  event_id: number;
  seat_ids: string[];
  payment: CheckoutFormValue;
}

export interface CreateOrderResponse {
  orderId: string;
  eventTitle: string;
  message: string;
  ticketsDownloadUrl?: string;
}
