import { Product } from "../../../../../shared/models/product";
import { ShippingService } from "../../../../../shared/services/shipping.service";
import { UserDetail, User } from "../../../../../shared/models/user";
import { AuthService } from "../../../../../shared/services/auth.service";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { ProductService } from "../../../../../shared/services/product.service";
import { map } from "rxjs/operators";
import { Variable } from "@angular/compiler/src/render3/r3_ast";
import { UserAddresses } from "../../../../../shared/models/userAddresses";
import { AddressService } from "../../../../../shared/services/address.service";

const firebase = require('firebase/app');

@Component({
  selector: "app-shipping-details",
  templateUrl: "./shipping-details.component.html",
  styleUrls: ["./shipping-details.component.scss"],
})
export class ShippingDetailsComponent implements OnInit {
  userDetails: User;
  userDetail: UserDetail;
  products: Product[];
  userAddresses: UserAddresses[]
  registeredAddress: UserAddresses
  userId: string
  constructor(
    authService: AuthService,
    private shippingService: ShippingService,
    productService: ProductService,
    private router: Router,
    private addressService: AddressService
  ) {
    /* Hiding products Element */
    document.getElementById("productsTab").style.display = "none";
    document.getElementById("shippingTab").style.display = "block";
    document.getElementById("productsTab").style.display = "none";
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
        this.userDetail.address1 = this.userAddresses[i].address1
        this.userDetail.address2 = this.userAddresses[i].address2
        this.userDetail.country = this.userAddresses[i].country
        this.userDetail.emailId = this.userAddresses[i].emailId
        this.userDetail.firstName = this.userAddresses[i].firstName
        this.userDetail.lastName = this.userAddresses[i].lastName
        this.userDetail.state = this.userAddresses[i].state
        this.userDetail.userName = this.userAddresses[i].userName
        this.userDetail.zip = this.userAddresses[i].zip
      }
    }
  }

  updateUserDetails(form: NgForm) {
    const products = [];
    let totalPrice = 0;
    this.products.forEach((product) => {
      delete product.$key;
      totalPrice += product.productPrice;
      products.push(product);
    });
    const data = {
      ...form.value,
      emailId: this.userDetail.emailId,
      //userId: this.userDetail.$key,
      products,
      totalPrice,
      shippingDate: Date.now(),
    };
    localStorage.setItem('shippingDetails', JSON.stringify(data));
    this.router.navigate([
      "checkouts",
      { outlets: { checkOutlet: ["billing-details"] } },
    ]);
  }
}
