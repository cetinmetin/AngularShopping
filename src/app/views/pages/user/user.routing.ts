import { AuthGuard } from "./../../../shared/guards/auth_gaurd";
import { UserComponent } from "./user.component";
import { UserAccountComponent } from "./user-account/user-account.component";
import { Routes, RouterModule } from "@angular/router";
import {UserOrdersComponent} from "./user-orders/user-orders.component"
import {UserAddressesComponent} from "./user-addresses/user-addresses.component"
export const UserRoutes: Routes = [
  {
    path: "",
    component: UserComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "",
        component: UserAccountComponent,
      },
      {
        path: "user-orders",
        component: UserOrdersComponent
      },
      {
        path: "user-addresses",
        component: UserAddressesComponent
      },
    ],
  },
];
