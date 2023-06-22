import { CanActivateFn, Router } from '@angular/router';
import { ChatService } from '../signal-r/chat.service';
import { inject } from '@angular/core';

export const isJoinChatGuard: CanActivateFn = (route, state) => {
  const chatSrv = inject(ChatService);
  const router = inject(Router);
  if (!!chatSrv.connectionId()) {
    return true;
  } else {
    router.navigate(['']);
    return false;
  }
};
