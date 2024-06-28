import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContributiondashboardComponent } from './contributiondashboard.component';

describe('ContributiondashboardComponent', () => {
  let component: ContributiondashboardComponent;
  let fixture: ComponentFixture<ContributiondashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContributiondashboardComponent]
    });
    fixture = TestBed.createComponent(ContributiondashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
