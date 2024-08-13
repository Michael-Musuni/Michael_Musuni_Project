import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberStatementComponent } from './member-statement.component';

describe('MemberStatementComponent', () => {
  let component: MemberStatementComponent;
  let fixture: ComponentFixture<MemberStatementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberStatementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
