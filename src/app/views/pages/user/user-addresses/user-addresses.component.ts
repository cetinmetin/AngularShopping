import { Component, OnInit } from '@angular/core';
import { Billing } from "../../../../shared/models/billing";


@Component({
  selector: 'app-user-addresses',
  templateUrl: './user-addresses.component.html',
  styleUrls: ['./user-addresses.component.scss']
})
export class UserAddressesComponent implements OnInit {
  userInfos: Billing
  registeredAdresses: string[]
  constructor() { }

  ngOnInit(): void {
  }

  updateUserDetails(form) {

  }
  onChange(deviceValue) {
  }
}
