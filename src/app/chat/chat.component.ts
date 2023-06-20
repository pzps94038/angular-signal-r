import { Component, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatService } from '../shared/signal-r/chat.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnDestroy {
  chatSrv = inject(ChatService);

  ngOnDestroy() {
    this.chatSrv.stop();
  }
}
