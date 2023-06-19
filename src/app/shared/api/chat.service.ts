import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GetLiveChatRoomResponse } from './chat.model';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class ChatService {
  http = inject(HttpClient);

  getLiveChatRoom() {
    return this.http.get<GetLiveChatRoomResponse>(
      `${environment.baseUrl}/chat`
    );
  }
}
