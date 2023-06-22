import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { isJoinChatGuard } from './shared/guard/is-join-chat.guard';
import { isNotJoinChatGuard } from './shared/guard/is-not-join-chat.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [isNotJoinChatGuard],
    loadComponent: () =>
      import('./join-chat/join-chat.component').then(
        (m) => m.JoinChatComponent
      ),
  },
  {
    path: 'chat',
    canActivate: [isJoinChatGuard],
    loadComponent: () =>
      import('./chat/chat.component').then((m) => m.ChatComponent),
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
