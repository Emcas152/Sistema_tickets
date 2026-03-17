import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DashboardEmpComponent } from './dashboard-emp.component';

describe('DashboardEmpComponent', () => {
  let component: DashboardEmpComponent;
  let fixture: ComponentFixture<DashboardEmpComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardEmpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardEmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
