import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { isJoinChatGuard } from './is-join-chat.guard';

describe('isJoinChatGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => isJoinChatGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
