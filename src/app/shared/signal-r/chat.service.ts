import { Injectable, signal } from '@angular/core';
import { Observable, from, map, of, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as signalR from '@microsoft/signalr';
import { JoinLiveChatRoomResponse } from './chat.model';
@Injectable({
  providedIn: 'root',
})
export class ChatService {
  connectionId = signal<undefined | string>(undefined);
  private _connection$?: Observable<signalR.HubConnection>;

  /**
   * 啟動連接
   * @returns
   */
  start() {
    if (this._connection$) {
      return this._connection$;
    } else {
      const connection = new signalR.HubConnectionBuilder()
        .withUrl(`${environment.baseUrl}/chatHub`)
        .build();
      this._connection$ = from(connection.start()).pipe(
        switchMap(() => of(connection))
      );
      return this._connection$;
    }
  }

  /**
   * 暫停
   */
  stop() {
    if (this._connection$) {
      this._connection$.subscribe((connection) => connection.stop());
    }
  }

  /**
   * 加入聊天室
   * @param name
   * @returns
   */
  joinLiveChatRoom(name: string) {
    return this.start().pipe(
      switchMap((connection) =>
        from(
          connection.invoke<JoinLiveChatRoomResponse>('JoinLiveChatRoom', name)
        )
      )
    );
  }

  /**
   * 公開聊天室及時更新列表
   * @returns
   */
  publicLiveChatRoom() {
    return this.start().pipe(
      switchMap(
        (connection) =>
          new Observable<any>((subscriber) => {
            connection.on('PublicLiveChatRoom', (liveChatRoom) => {
              subscriber.next(liveChatRoom);
            });
          })
      )
    );
  }

  /**
   * 公開訊息及時更新
   * @returns
   */
  publicMessage() {
    this.start().pipe(
      switchMap(
        (connection) =>
          new Observable<any>((subscriber) => {
            connection.on('PublicMessage', (name, msg) => {
              subscriber.next({
                name,
                msg,
              });
            });
          })
      )
    );
  }

  /**
   * 私密訊息及時更新
   * @returns
   */
  privateMessage() {
    this.start().pipe(
      switchMap(
        (connection) =>
          new Observable<any>((subscriber) => {
            connection.on('PrivateMessage', (name, msg) => {
              subscriber.next({
                name,
                msg,
              });
            });
          })
      )
    );
  }
}
