// Core Dependencies
import { RouterModule } from "@angular/router";
import {
  NgModule,
  NO_ERRORS_SCHEMA,
  CUSTOM_ELEMENTS_SCHEMA,
} from "@angular/core";
import { CommonModule } from "@angular/common";

// Configuration and Services
import { UserRoutes } from "./user.routing";

// Components
import { UserComponent } from "./user.component";
import { UserAccountComponent } from "./user-account/user-account.component";
import { SharedModule } from "src/app/shared/shared.module";
import { UserOrdersComponent } from './user-orders/user-orders.component';

@NgModule({
  imports: [CommonModule, SharedModule, RouterModule.forChild(UserRoutes)],
  declarations: [UserComponent, UserAccountComponent, UserOrdersComponent],
  providers: [],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
})
export class UserModule {}
