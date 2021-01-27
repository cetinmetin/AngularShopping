import { Component, OnInit } from '@angular/core';
import { Billing } from "../../../../shared/models/billing"
import { BillingService } from "../../../../shared/services/billing.service"

@Component({
  selector: 'app-admin-completed-orders',
  templateUrl: './admin-completed-orders.component.html',
  styleUrls: ['./admin-completed-orders.component.scss']
})
export class AdminCompletedOrdersComponent implements OnInit {
  billings: Billing[];
  constructor(private billingService: BillingService) { }

  ngOnInit() {
    this.billingService.getBillings().valueChanges().subscribe(data => {
      this.billings = data
    })
  }
}
