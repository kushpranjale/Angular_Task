import { EmployeeDataComponent } from "./employee-data/employee-data.component";
import { EmployeeFormComponent } from "./employee-form/employee-form.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    component: EmployeeFormComponent,
  },
  {
    path: "manage-employee",
    component: EmployeeDataComponent,
  },
  {
    path: ":id",
    component: EmployeeFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
