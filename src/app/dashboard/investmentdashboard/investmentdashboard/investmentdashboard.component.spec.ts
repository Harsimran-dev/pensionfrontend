import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentdashboardComponent } from './investmentdashboard.component';

describe('InvestmentdashboardComponent', () => {
  let component: InvestmentdashboardComponent;
  let fixture: ComponentFixture<InvestmentdashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvestmentdashboardComponent]
    });
    fixture = TestBed.createComponent(InvestmentdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
