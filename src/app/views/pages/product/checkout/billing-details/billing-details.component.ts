import { ProductService } from "../../../../../shared/services/product.service";
import { Product } from "../../../../../shared/models/product";
import { BillingService } from "../../../../../shared/services/billing.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { User, UserDetail } from "../../../../../shared/models/user";
import { AuthService } from "../../../../../shared/services/auth.service";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { map } from "rxjs/operators";
import { UserAddresses } from "../../../../../shared/models/userAddresses";
import { AddressService } from "../../../../../shared/services/address.service";
const moment = require("moment");
const firebase = require('firebase/app');

@Component({
  selector: "app-billing-details",
  templateUrl: "./billing-details.component.html",
  styleUrls: ["./billing-details.component.scss"],
})
export class BillingDetailsComponent implements OnInit {
  userDetails: User;
  products: Product[];
  userDetail: UserDetail;
  userAddresses: UserAddresses[]
  registeredAddress: UserAddresses
  userId: string
  userInfos = JSON.parse(localStorage.getItem('shippingDetails'));
  constructor(
    authService: AuthService,
    private billingService: BillingService,
    productService: ProductService,
    private router: Router,
    private addressService: AddressService
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

  ngOnInit() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.addressService.currentUserId()
        this.userId = localStorage.getItem('userId')
        localStorage.removeItem('userId')
        // User logged in already or has just logged in.
        this.addressService.getAddressesById(this.userId).valueChanges().subscribe(data => {
          this.userAddresses = data
          //console.log(this.userAddresses)
        })
      }
    }
    )
  }

  onChange(deviceValue) {
    for (let i = 0; i < this.userAddresses.length; i++) {
      if (deviceValue == this.userAddresses[i].addressName) {
        this.userInfos.address1 = this.userAddresses[i].address1
        this.userInfos.address2 = this.userAddresses[i].address2
        this.userInfos.country = this.userAddresses[i].country
        this.userInfos.emailId = this.userAddresses[i].emailId
        this.userInfos.firstName = this.userAddresses[i].firstName
        this.userInfos.lastName = this.userAddresses[i].lastName
        this.userInfos.state = this.userAddresses[i].state
        this.userInfos.userName = this.userAddresses[i].userName
        this.userInfos.zip = this.userAddresses[i].zip
      }
    }
  }

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
    let totalPriceFloat = 0;
    const products = [];
    this.products.forEach((product) => {
      delete product.$key;
      totalPriceFloat += +(product.productPrice);
      products.push(product);
    });
    totalPrice = Number(totalPriceFloat.toFixed(1)) + parseInt(localStorage.getItem("shipment"))
    const data = {
      ...form.value,
      emailId: this.userDetail.emailId,
      //userId: this.userDetails.$key,
      products,
      totalPrice,
      billingDate: moment().unix(),
      orderStatus: 1,
      billingID: this.getUniqueId(4),
      referanceNumber: this.getUniqueId(5)
    };
    localStorage.setItem('billingDetails', JSON.stringify(data));
    this.router.navigate([
      "checkouts",
      { outlets: { checkOutlet: ["result"] } },
    ]);
  }
}
