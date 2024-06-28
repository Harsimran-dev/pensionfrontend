import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DreamfundComponent } from './dreamfund.component';

describe('DreamfundComponent', () => {
  let component: DreamfundComponent;
  let fixture: ComponentFixture<DreamfundComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DreamfundComponent]
    });
    fixture = TestBed.createComponent(DreamfundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
