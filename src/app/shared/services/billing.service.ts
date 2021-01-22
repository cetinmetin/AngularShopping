import {
  AngularFireList,
  AngularFireObject,
  AngularFireDatabase,
} from "@angular/fire/database";
import { Billing } from "./../models/billing";
import { Injectable } from "@angular/core";

const firebase = require('firebase/app');
@Injectable({
  providedIn: "root",
})
export class BillingService {
  billings: AngularFireList<Billing>;
  billing: AngularFireObject<Billing>;
  constructor(private db: AngularFireDatabase) {
    this.getBillings();
  }

  createBillings(data: Billing) {
    this.billings.push(data);
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.db.database.ref('billings').child(user.uid).push(data)
      }
    }
    )
  }

  getBillings() {
    this.billings = this.db.list("billings");
    return this.billings;
  }

  getBillingById(key: string) {
    this.billings = this.db.list("billings/" + key);
    return this.billings;
  }

  updateBilling(data: Billing) {
    this.billings.update(data.$key, data);
  }

  deleteBilling(key: string) {
    this.billings.remove(key);
  }
}
