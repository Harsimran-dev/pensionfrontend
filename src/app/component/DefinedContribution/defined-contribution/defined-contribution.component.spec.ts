import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefinedContributionComponent } from './defined-contribution.component';

describe('DefinedContributionComponent', () => {
  let component: DefinedContributionComponent;
  let fixture: ComponentFixture<DefinedContributionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DefinedContributionComponent]
    });
    fixture = TestBed.createComponent(DefinedContributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
