import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinChatComponent } from './join-chat.component';

describe('JoinChatComponent', () => {
  let component: JoinChatComponent;
  let fixture: ComponentFixture<JoinChatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [JoinChatComponent]
    });
    fixture = TestBed.createComponent(JoinChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
