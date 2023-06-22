import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { isNotJoinChatGuard } from './is-not-join-chat.guard';

describe('isNotJoinChatGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => isNotJoinChatGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
