import { BaseResponse } from './shared/shared.model';

export type LiveChatRoom = {
  connectionId: string;
  name: string;
};

export type LiveChatRooms = LiveChatRoom[];

export type GetLiveChatRoomResponse = BaseResponse<LiveChatRooms>;
