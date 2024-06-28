import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefinedbenifitComponent } from './definedbenifit.component';

describe('DefinedbenifitComponent', () => {
  let component: DefinedbenifitComponent;
  let fixture: ComponentFixture<DefinedbenifitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DefinedbenifitComponent]
    });
    fixture = TestBed.createComponent(DefinedbenifitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
