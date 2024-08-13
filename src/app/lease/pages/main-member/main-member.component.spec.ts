import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainMemberComponent } from './main-member.component';

describe('MainMemberComponent', () => {
  let component: MainMemberComponent;
  let fixture: ComponentFixture<MainMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainMemberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
