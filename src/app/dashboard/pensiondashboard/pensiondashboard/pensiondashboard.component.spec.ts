import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PensiondashboardComponent } from './pensiondashboard.component';

describe('PensiondashboardComponent', () => {
  let component: PensiondashboardComponent;
  let fixture: ComponentFixture<PensiondashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PensiondashboardComponent]
    });
    fixture = TestBed.createComponent(PensiondashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
