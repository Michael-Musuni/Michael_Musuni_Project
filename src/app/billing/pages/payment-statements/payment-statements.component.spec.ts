import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentStatementsComponent } from './payment-statements.component';

describe('PaymentStatementsComponent', () => {
  let component: PaymentStatementsComponent;
  let fixture: ComponentFixture<PaymentStatementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentStatementsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentStatementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
