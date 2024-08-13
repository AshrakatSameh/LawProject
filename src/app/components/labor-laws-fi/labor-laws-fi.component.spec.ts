import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaborLawsFiComponent } from './labor-laws-fi.component';

describe('LaborLawsFiComponent', () => {
  let component: LaborLawsFiComponent;
  let fixture: ComponentFixture<LaborLawsFiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LaborLawsFiComponent]
    });
    fixture = TestBed.createComponent(LaborLawsFiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
