import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainWaterComponent } from './main-water.component';

describe('MainWaterComponent', () => {
  let component: MainWaterComponent;
  let fixture: ComponentFixture<MainWaterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainWaterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainWaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
