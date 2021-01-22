import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminConfirmedOrdersComponent } from './admin-confirmed-orders.component';

describe('AdminConfirmedOrdersComponent', () => {
  let component: AdminConfirmedOrdersComponent;
  let fixture: ComponentFixture<AdminConfirmedOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminConfirmedOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminConfirmedOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
