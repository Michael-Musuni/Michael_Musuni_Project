import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetreLookupComponent } from './metre-lookup.component';

describe('MetreLookupComponent', () => {
  let component: MetreLookupComponent;
  let fixture: ComponentFixture<MetreLookupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MetreLookupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MetreLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
