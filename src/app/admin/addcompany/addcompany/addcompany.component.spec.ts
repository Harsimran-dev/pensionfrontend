import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcompanyComponent } from './addcompany.component';

describe('AddcompanyComponent', () => {
  let component: AddcompanyComponent;
  let fixture: ComponentFixture<AddcompanyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddcompanyComponent]
    });
    fixture = TestBed.createComponent(AddcompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
