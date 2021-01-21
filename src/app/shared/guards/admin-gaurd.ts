import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { UserService } from "../services/user.service"
@Injectable()
export class AdminGaurd implements CanActivate {
  constructor(private router: Router, private authService: AuthService) { }

  canActivate() {
    let isLoggedIn, isAdmin;
    this.authService.isLoggedIn$.subscribe(data => {
      isLoggedIn = data
    });
    this.authService.isAdmin$.subscribe(data => {
      isAdmin = data
    });

    if (isLoggedIn == true && isAdmin == true) {
      return true;
    }
    else {
      this.router.navigate(["no-access"]);
      console.log("admin değilsin")
      return false;
    }
  }
}
