import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaterLookupComponent } from './water-lookup.component';

describe('WaterLookupComponent', () => {
  let component: WaterLookupComponent;
  let fixture: ComponentFixture<WaterLookupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaterLookupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WaterLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
