import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevenuesStatementComponent } from './revenues-statement.component';

describe('RevenuesStatementComponent', () => {
  let component: RevenuesStatementComponent;
  let fixture: ComponentFixture<RevenuesStatementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevenuesStatementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RevenuesStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
