import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EmpDialogComponent } from './emp-dialog.component';

describe('EmpDialogComponent', () => {
  let component: EmpDialogComponent;
  let fixture: ComponentFixture<EmpDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
