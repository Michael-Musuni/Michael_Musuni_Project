import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMajiComponent } from './edit-maji.component';

describe('EditMajiComponent', () => {
  let component: EditMajiComponent;
  let fixture: ComponentFixture<EditMajiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditMajiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMajiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
