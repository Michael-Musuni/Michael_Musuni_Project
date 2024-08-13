import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnpaidInvoiceComponent } from './unpaid-invoice.component';

describe('UnpaidInvoiceComponent', () => {
  let component: UnpaidInvoiceComponent;
  let fixture: ComponentFixture<UnpaidInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnpaidInvoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnpaidInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
