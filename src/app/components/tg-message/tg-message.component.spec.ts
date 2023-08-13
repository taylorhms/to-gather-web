import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TgMessageComponent } from './tg-message.component';

describe('TgMessageComponent', () => {
  let component: TgMessageComponent;
  let fixture: ComponentFixture<TgMessageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TgMessageComponent]
    });
    fixture = TestBed.createComponent(TgMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
