import { Component, OnInit } from '@angular/core';
import { Billing } from "../../../../shared/models/billing"
import { BillingService } from "../../../../shared/services/billing.service"

@Component({
  selector: 'app-admin-shipped-orders',
  templateUrl: './admin-shipped-orders.component.html',
  styleUrls: ['./admin-shipped-orders.component.scss']
})
export class AdminShippedOrdersComponent implements OnInit {

  billings: Billing[];

  constructor(private billingService: BillingService) { }

  ngOnInit() {
    this.billingService.getBillings().valueChanges().subscribe(data => {
      this.billings = data
    })
  }

  completeOrder(id) {
    for (let index = 0; index < this.billings.length; index++) {
      if (this.billings[index].billingID == id) {
        this.billings[index].orderStatus = 4;
        localStorage.setItem('TempBill', JSON.stringify(this.billings[index]));
        this.billingService.updateBilling(this.billings[index].billingID, JSON.parse(localStorage.getItem('TempBill')))
        localStorage.removeItem("TempBill");
      }
    }
  }

}
