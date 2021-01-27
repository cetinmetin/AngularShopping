import { Component, OnInit } from '@angular/core';
import { Billing } from "../../../../shared/models/billing"
import { BillingService } from "../../../../shared/services/billing.service"
@Component({
  selector: 'app-admin-confirmed-orders',
  templateUrl: './admin-confirmed-orders.component.html',
  styleUrls: ['./admin-confirmed-orders.component.scss']
})
export class AdminConfirmedOrdersComponent implements OnInit {

  billings: Billing[];
  billing: Billing[]
  constructor(private billingService: BillingService) { }

  ngOnInit(): void {
    this.billingService.getBillings().valueChanges().subscribe(data => {
      this.billings = data
    })
  }
  shipTheOrder(id) {
    for (let index = 0; index < this.billings.length; index++) {
      if (this.billings[index].billingID == id) {
        this.billings[index].orderStatus = 3;
        localStorage.setItem('TempBill', JSON.stringify(this.billings[index]));
        this.billingService.updateBilling(this.billings[index].billingID, JSON.parse(localStorage.getItem('TempBill')))
        localStorage.removeItem("TempBill");
      }
    }
  }
}
