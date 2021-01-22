import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminShippedOrdersComponent } from './admin-shipped-orders.component';

describe('AdminShippedOrdersComponent', () => {
  let component: AdminShippedOrdersComponent;
  let fixture: ComponentFixture<AdminShippedOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminShippedOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminShippedOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
