import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteLookupComponent } from './route-lookup.component';

describe('RouteLookupComponent', () => {
  let component: RouteLookupComponent;
  let fixture: ComponentFixture<RouteLookupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RouteLookupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
