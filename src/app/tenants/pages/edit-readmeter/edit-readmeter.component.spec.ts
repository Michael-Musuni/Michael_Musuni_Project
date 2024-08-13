import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditReadmeterComponent } from './edit-readmeter.component';

describe('EditReadmeterComponent', () => {
  let component: EditReadmeterComponent;
  let fixture: ComponentFixture<EditReadmeterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditReadmeterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditReadmeterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
