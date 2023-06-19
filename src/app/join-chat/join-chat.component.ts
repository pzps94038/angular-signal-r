import { Component, DestroyRef, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { heroXMark } from '@ng-icons/heroicons/outline';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputComponent } from '../shared/component/form/input/input.component';
import {
  AnimationPathConfig,
  NgLottieComponent,
} from '../shared/component/ng-lottie/ng-lottie.component';
import { Router } from '@angular/router';
import { DialogRef } from '@ngneat/dialog';
import { catchError, finalize } from 'rxjs';
import { ChatService } from '../shared/signal-r/chat.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReturnCode } from '../shared/api/shared/shared.model';
@Component({
  selector: 'app-join-chat',
  standalone: true,
  imports: [
    CommonModule,
    InputComponent,
    ReactiveFormsModule,
    NgLottieComponent,
    NgIconComponent,
  ],
  providers: [provideIcons({ heroXMark })],
  templateUrl: './join-chat.component.html',
  styleUrls: ['./join-chat.component.scss'],
})
export class JoinChatComponent {
  chatSrv = inject(ChatService);
  router = inject(Router);
  loading = signal(false);

  errMsg = signal<string | undefined>(undefined);
  private _destroyRef = inject(DestroyRef);

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

  get name() {
    return this.form.controls['name'] as FormControl;
  }

  options: AnimationPathConfig = {
    path: 'assets/lottie/login.json',
  };

  submit() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.loading.set(true);
      this.chatSrv
        .joinLiveChatRoom(this.name.value)
        .pipe(
          finalize(() => this.loading.set(false)),
          takeUntilDestroyed(this._destroyRef)
        )
        .subscribe({
          next: ({ returnMessage, returnCode, data }) => {
            if (returnCode === ReturnCode.Success) {
              this.chatSrv.connectionId.set(data);
              this.router.navigate(['/chat']);
            } else {
              this.errMsg.set(returnMessage);
            }
          },
          error: () => this.errMsg.set('系統發生錯誤'),
        });
    }
  }
}
