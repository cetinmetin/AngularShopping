import { AdminPanelComponent } from "./admin-panel.component";
import { Routes, RouterModule } from "@angular/router";
import { AdminGaurd } from "./../../../shared/guards/admin-gaurd";

export const AdminRoutes: Routes = [
  {
    path: "",
    component: AdminPanelComponent,
    canActivate: [AdminGaurd],
    children: [
      {
        path: "admin-panel",
        component: AdminPanelComponent,
        canActivate: [AdminGaurd]
      },
    ],
  },
];