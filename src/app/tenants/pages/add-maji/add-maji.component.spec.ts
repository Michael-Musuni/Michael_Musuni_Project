import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMajiComponent } from './add-maji.component';

describe('AddMajiComponent', () => {
  let component: AddMajiComponent;
  let fixture: ComponentFixture<AddMajiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMajiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMajiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
