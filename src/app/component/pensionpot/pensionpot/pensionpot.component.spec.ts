import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PensionpotComponent } from './pensionpot.component';

describe('PensionpotComponent', () => {
  let component: PensionpotComponent;
  let fixture: ComponentFixture<PensionpotComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PensionpotComponent]
    });
    fixture = TestBed.createComponent(PensionpotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
