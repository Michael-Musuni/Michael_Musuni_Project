import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualMeterReadingsComponent } from './manual-meter-readings.component';

describe('ManualMeterReadingsComponent', () => {
  let component: ManualMeterReadingsComponent;
  let fixture: ComponentFixture<ManualMeterReadingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManualMeterReadingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManualMeterReadingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
