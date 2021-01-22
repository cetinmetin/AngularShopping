import { AdminPanelComponent } from "./admin-panel.component";
import { Routes, RouterModule } from "@angular/router";
import { AdminGaurd } from "./../../../shared/guards/admin-gaurd";
import { AdminNewOrdersComponent } from "./admin-new-orders/admin-new-orders.component";
import { AdminConfirmedOrdersComponent } from "./admin-confirmed-orders/admin-confirmed-orders.component";
import { AdminShippedOrdersComponent } from "./admin-shipped-orders/admin-shipped-orders.component";
import { AdminCompletedOrdersComponent } from "./admin-completed-orders/admin-completed-orders.component";

export const AdminRoutes: Routes = [
  {
    path: "",
    component: AdminPanelComponent,
    canActivate: [AdminGaurd],
    children: [
      {
        path: "admin-new-orders",
        component: AdminNewOrdersComponent,
        canActivate: [AdminGaurd]
      },
      {
        path: "admin-confirmed-orders",
        component: AdminConfirmedOrdersComponent,
        canActivate: [AdminGaurd]
      },
      {
        path: "admin-shipped-orders",
        component: AdminShippedOrdersComponent,
        canActivate: [AdminGaurd]
      },
      {
        path: "admin-completed-orders",
        component: AdminCompletedOrdersComponent,
        canActivate: [AdminGaurd]
      },
    ],
  },
];