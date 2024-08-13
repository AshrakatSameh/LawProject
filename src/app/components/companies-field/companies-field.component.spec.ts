import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompaniesFieldComponent } from './companies-field.component';

describe('CompaniesFieldComponent', () => {
  let component: CompaniesFieldComponent;
  let fixture: ComponentFixture<CompaniesFieldComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompaniesFieldComponent]
    });
    fixture = TestBed.createComponent(CompaniesFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
