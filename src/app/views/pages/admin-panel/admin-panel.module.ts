import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdminPanelComponent } from "./admin-panel.component";
import { SharedModule } from "src/app/shared/shared.module";
import { AdminRoutes } from "./admin.routing";
import { RouterModule } from "@angular/router";

@NgModule({
  imports: [CommonModule, SharedModule, RouterModule.forChild(AdminRoutes)],
  declarations: [AdminPanelComponent],
})
export class AdminPanelModule {}
