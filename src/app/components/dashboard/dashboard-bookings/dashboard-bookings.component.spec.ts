import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardBookingsComponent } from './dashboard-bookings.component';

describe('DashboardBookingsComponent', () => {
  let component: DashboardBookingsComponent;
  let fixture: ComponentFixture<DashboardBookingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardBookingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardBookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
