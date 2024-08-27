import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MpesaStatementComponent } from './mpesa-statement.component';

describe('MpesaStatementComponent', () => {
  let component: MpesaStatementComponent;
  let fixture: ComponentFixture<MpesaStatementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MpesaStatementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MpesaStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
