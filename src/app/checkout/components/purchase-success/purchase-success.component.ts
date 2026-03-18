import { Component } from '@angular/core';

@Component({
  selector: 'app-purchase-success',
  templateUrl: './purchase-success.component.html',
  styleUrls: ['./purchase-success.component.scss'],
  standalone: false
})
export class PurchaseSuccessComponent {
  readonly state = history.state as {
    eventTitle?: string;
    order?: { orderId?: string; ticketsDownloadUrl?: string; };
  };
}
