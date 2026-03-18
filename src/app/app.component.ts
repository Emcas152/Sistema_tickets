import { Component, OnInit } from '@angular/core';
import { MobileAppService } from './core/services/mobile-app.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: false
})
export class AppComponent implements OnInit {
  constructor(private readonly mobileAppService: MobileAppService) {}

  ngOnInit(): void {
    void this.mobileAppService.init();
  }
}
