import { Component, OnInit } from '@angular/core';
import { TicketRecord } from '../../models/ticket.model';
import { TicketsService } from '../../services/tickets.service';

@Component({
  selector: 'app-my-tickets',
  templateUrl: './my-tickets.component.html',
  styleUrls: ['./my-tickets.component.scss'],
  standalone: false
})
export class MyTicketsComponent implements OnInit {
  tickets: TicketRecord[] = [];

  constructor(private readonly ticketsService: TicketsService) {}

  ngOnInit(): void {
    this.ticketsService.getMyTickets().subscribe((tickets) => {
      this.tickets = tickets;
    });
  }
}
