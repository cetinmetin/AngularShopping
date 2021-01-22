import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdminPanelComponent } from "./admin-panel.component";
import { SharedModule } from "src/app/shared/shared.module";
import { AdminRoutes } from "./admin.routing";
import { RouterModule } from "@angular/router";
import { AdminNewOrdersComponent } from './admin-new-orders/admin-new-orders.component';
import { AdminConfirmedOrdersComponent } from './admin-confirmed-orders/admin-confirmed-orders.component';
import { AdminShippedOrdersComponent } from './admin-shipped-orders/admin-shipped-orders.component';
import { AdminCompletedOrdersComponent } from './admin-completed-orders/admin-completed-orders.component';

@NgModule({
  imports: [CommonModule, SharedModule, RouterModule.forChild(AdminRoutes)],
  declarations: [AdminPanelComponent, AdminNewOrdersComponent, AdminConfirmedOrdersComponent, AdminShippedOrdersComponent, AdminCompletedOrdersComponent],
})
export class AdminPanelModule {}
