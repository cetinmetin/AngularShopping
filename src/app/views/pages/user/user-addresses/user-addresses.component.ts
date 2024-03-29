import { Component, OnInit } from '@angular/core';
import { UserAddresses } from "../../../../shared/models/userAddresses";
import { NgForm } from "@angular/forms";
import { UserService } from "../../../../shared/services/user.service";
import { AddressService } from "../../../../shared/services/address.service";
import { AngularFireAuth } from "@angular/fire/auth";
import { AuthService } from "./../../../../../app/shared/services/auth.service";
import { BehaviorSubject, Observable } from "rxjs";
import { Router } from "@angular/router";

declare var toastr: any;
const firebase = require('firebase/app');

@Component({
  selector: 'app-user-addresses',
  templateUrl: './user-addresses.component.html',
  styleUrls: ['./user-addresses.component.scss']
})
export class UserAddressesComponent implements OnInit {

  userAddress: UserAddresses
  userAddresses: UserAddresses[]
  registeredAddress: UserAddresses
  userId: string

  constructor(private firebaseAuth: AngularFireAuth, private addressService: AddressService) {
    this.userAddress = new UserAddresses()
  }

  ngOnInit(): void {
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
        this.userAddress.address1 = this.userAddresses[i].address1
        this.userAddress.address2 = this.userAddresses[i].address2
        this.userAddress.addressName = this.userAddresses[i].addressName
        this.userAddress.country = this.userAddresses[i].country
        this.userAddress.emailId = this.userAddresses[i].emailId
        this.userAddress.firstName = this.userAddresses[i].firstName
        this.userAddress.lastName = this.userAddresses[i].lastName
        this.userAddress.state = this.userAddresses[i].state
        this.userAddress.userName = this.userAddresses[i].userName
        this.userAddress.zip = this.userAddresses[i].zip
      }
    }
  }

  addUserAddress(addressForm: NgForm) {
    const payload: UserAddresses = {
      ...addressForm.value
    };
    this.addressService.createAddress(payload, () => {
      this.userAddress = new UserAddresses();
      toastr.success(
        payload.addressName + " Adlı Adres Başarıyla Eklendi",
        "Adres Oluşturma İşlemi"
      );
    });
  }
  
}
