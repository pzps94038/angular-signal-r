import { Component, inject } from '@angular/core';
import { SignalRService } from './shared/services/signal-r.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  signalRSrv = inject(SignalRService);
  constructor() {}
}
