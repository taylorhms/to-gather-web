import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TgHeaderComponent } from './tg-header.component';

describe('TgHeaderComponent', () => {
  let component: TgHeaderComponent;
  let fixture: ComponentFixture<TgHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TgHeaderComponent]
    });
    fixture = TestBed.createComponent(TgHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
