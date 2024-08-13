import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegalConsultationsComponent } from './legal-consultations.component';

describe('LegalConsultationsComponent', () => {
  let component: LegalConsultationsComponent;
  let fixture: ComponentFixture<LegalConsultationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LegalConsultationsComponent]
    });
    fixture = TestBed.createComponent(LegalConsultationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
