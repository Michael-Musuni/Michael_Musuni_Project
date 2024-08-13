import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeterReadComponent } from './meter-read.component';

describe('MeterReadComponent', () => {
  let component: MeterReadComponent;
  let fixture: ComponentFixture<MeterReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeterReadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeterReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
