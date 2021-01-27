import { Component, OnInit } from '@angular/core';
import { Billing } from "../../../../shared/models/billing"
import { BillingService } from "../../../../shared/services/billing.service"
const firebase = require('firebase/app');
@Component({
  selector: 'app-admin-new-orders',
  templateUrl: './admin-new-orders.component.html',
  styleUrls: ['./admin-new-orders.component.scss']
})
export class AdminNewOrdersComponent implements OnInit {

  billings: Billing[];

  constructor(private billingService: BillingService) { }


  ngOnInit(): void {
    this.billingService.getBillings().valueChanges().subscribe(data => {
      this.billings = data
    })
  }

  confirmOrder(id) {
    for (let index = 0; index < this.billings.length; index++) {
      if (this.billings[index].billingID == id) {
        this.billings[index].orderStatus = 2;
        localStorage.setItem('TempBill', JSON.stringify(this.billings[index]));
        this.billingService.updateBilling(this.billings[index].billingID, JSON.parse(localStorage.getItem('TempBill')))
        localStorage.removeItem("TempBill");
      }
    }
  }

  rejectOrder() {

  }

}
