import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MegasavingComponent } from './megasaving.component';

describe('MegasavingComponent', () => {
  let component: MegasavingComponent;
  let fixture: ComponentFixture<MegasavingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MegasavingComponent]
    });
    fixture = TestBed.createComponent(MegasavingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
