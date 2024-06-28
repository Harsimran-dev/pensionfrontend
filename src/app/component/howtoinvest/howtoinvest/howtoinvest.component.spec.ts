import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HowtoinvestComponent } from './howtoinvest.component';

describe('HowtoinvestComponent', () => {
  let component: HowtoinvestComponent;
  let fixture: ComponentFixture<HowtoinvestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HowtoinvestComponent]
    });
    fixture = TestBed.createComponent(HowtoinvestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
