import { PageNotFoundComponent } from "./shared/components/page-not-found/page-not-found.component";
import { NoAccessComponent } from "./shared/components/no-access/no-access.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./views/base/index/index.module").then((m) => m.IndexModule),
      },
      {
        path: "products",
        loadChildren: () =>
          import("./views/pages/product/product.module").then(
            (m) => m.ProductModule
          ),
      },
      {
        path: "users",
        loadChildren: () =>
          import("./views/pages/user/user.module").then((m) => m.UserModule),
      },
      {
        path: "admin-panel",
        loadChildren: () =>
          import("./views/pages/admin-panel/admin-panel.module").then((m) => m.AdminPanelModule),
      },
    ],
  },
  { path: "no-access", component: NoAccessComponent },
  { path: "**", component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
