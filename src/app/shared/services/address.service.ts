import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList, AngularFireObject } from "@angular/fire/database";
import { User } from "../models/user";
import { UserAddresses } from "../models/userAddresses";
import { AngularFireAuth } from "@angular/fire/auth";
import { BehaviorSubject, Observable } from "rxjs";
import { UserService } from "./user.service";
import { AuthService } from "./auth.service";
const firebase = require('firebase/app');

@Injectable({ providedIn: 'root' })

export class AddressService {
    authService: AuthService
    user: Observable<firebase.User>;
    addresses: AngularFireList<UserAddresses>;
    firebaseAuth: AngularFireAuth
    userId: string
    constructor(private db: AngularFireDatabase, public userService: UserService) {
        this.getAddresses()
    }

    currentUserId(): any {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // User logged in already or has just logged.
                localStorage.removeItem('userId')
                localStorage.setItem('userId', user.uid)
            }
            else {
                // User not logged in or has just logged out.
            }
        });
    }

    createAddress(data: UserAddresses, callback: () => void) {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.db.database.ref('addresses').child(user.uid).push(data)
            }
        }
        )
        callback();
    }

    getAddressesById(key: string) {
        this.addresses = this.db.list("addresses/" + key);
        return this.addresses;
    }

    getAddresses() {
        this.addresses = this.db.list("addresses/" + this.userId)
        return this.addresses;
    }
}