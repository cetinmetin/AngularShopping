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
  key: String[];
  constructor(private db: AngularFireDatabase,) {
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

  updateBilling(id: string, data: Billing) {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        //user billing update
        var ref = firebase.database().ref("billings/" + user.uid).orderByChild("billingID").equalTo(id);
        ref.once("value").then(function (snapshot) {
          snapshot.forEach(function (child) {
            localStorage.setItem('ChildKey', child.key);
          });
        }).then(() => {
          this.db.database.ref('billings/' + user.uid + '/' + localStorage.getItem('ChildKey')).set(data)
          localStorage.removeItem("ChildKey")
        }).then(() => {
          //admin billing update
          var ref = firebase.database().ref("billings").orderByChild("billingID").equalTo(id);
          ref.once("value").then(function (snapshot) {
            snapshot.forEach(function (child) {
              localStorage.setItem('ChildKey', child.key);
            });
          }).then(() => {
            this.db.database.ref('billings/' + localStorage.getItem('ChildKey')).set(data)
            localStorage.removeItem("ChildKey")
          })
        })
      }
    }
    )
  }

  deleteBilling(key: string) {
    this.billings.remove(key);
  }
}
