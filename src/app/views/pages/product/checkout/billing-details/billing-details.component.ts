import { ProductService } from "../../../../../shared/services/product.service";
import { Product } from "../../../../../shared/models/product";
import { BillingService } from "../../../../../shared/services/billing.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { User, UserDetail } from "../../../../../shared/models/user";
import { AuthService } from "../../../../../shared/services/auth.service";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { map } from "rxjs/operators";
const moment = require("moment");
@Component({
  selector: "app-billing-details",
  templateUrl: "./billing-details.component.html",
  styleUrls: ["./billing-details.component.scss"],
})
export class BillingDetailsComponent implements OnInit {
  userDetails: User;
  products: Product[];
  userDetail: UserDetail;

  userInfos = JSON.parse(localStorage.getItem('shippingDetails'));
  constructor(
    authService: AuthService,
    private billingService: BillingService,
    productService: ProductService,
    private router: Router
  ) {
    /* Hiding Shipping Tab Element */
    document.getElementById("productsTab").style.display = "none";
    document.getElementById("shippingTab").style.display = "none";
    document.getElementById("billingTab").style.display = "block";
    document.getElementById("resultTab").style.display = "none";

    this.userDetail = new UserDetail();
    this.products = productService.getLocalCartProducts();
    authService.user$.pipe(
      map((user) => {
        this.userDetails = user;
      })
    );
  }

  ngOnInit() { }

  getUniqueId(parts: number): string {
    const stringArr = [];
    for (let i = 0; i < parts; i++) {
      // tslint:disable-next-line:no-bitwise
      const S4 = (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      stringArr.push(S4);
    }
    return stringArr.join('-');
  }

  updateUserDetails(form: NgForm) {
    let totalPrice = 0;
    const products = [];
    this.products.forEach((product) => {
      delete product.$key;
      totalPrice += +(product.productPrice);
      products.push(product);
    });

    const data = {
      ...form.value,
      emailId: this.userDetail.emailId,
      //userId: this.userDetails.$key,
      products,
      totalPrice,
      billingDate: moment().unix(),
      orderStatus: 1,
      billingID: this.getUniqueId(4)
    };
    localStorage.setItem('billingDetails', JSON.stringify(data));
    this.router.navigate([
      "checkouts",
      { outlets: { checkOutlet: ["result"] } },
    ]);
  }
}
