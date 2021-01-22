import { Component, OnInit } from '@angular/core';
import { Billing } from "../../../../shared/models/billing"
import { BillingService } from "../../../../shared/services/billing.service"
@Component({
  selector: 'app-admin-new-orders',
  templateUrl: './admin-new-orders.component.html',
  styleUrls: ['./admin-new-orders.component.scss']
})
export class AdminNewOrdersComponent implements OnInit {

  billings: Billing[];

  constructor(private billingService: BillingService) { }


  ngOnInit(): void {
    this.billingService.getBillings().valueChanges().subscribe(data=>{
      this.billings = data
      console.log(this.billings)
    })
  }

}
