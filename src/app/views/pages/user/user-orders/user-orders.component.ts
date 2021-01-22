import { Component, OnInit } from '@angular/core';
import { Billing } from "../../../../shared/models/billing"
import { BillingService } from "../../../../shared/services/billing.service"

const firebase = require('firebase/app');
@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.scss']
})
export class UserOrdersComponent implements OnInit {

  billings: Billing[];

  constructor(private billingService: BillingService) { }

  ngOnInit(): void {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User logged in already or has just logged in.
        this.billingService.getBillingById(user.uid).valueChanges().subscribe(data => {
          this.billings = data
          console.log(this.billings)
        })
      }
    }
    )
  }
}
