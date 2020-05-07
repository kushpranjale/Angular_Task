import { Employee } from "./../models/employee.model";
import { EmployeeService } from "./../Services/employee.service";
import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormGroupDirective,
} from "@angular/forms";
import { ParamMap, ActivatedRoute } from "@angular/router";
import { MatSnackBar } from "@angular/material";

@Component({
  selector: "app-employee-form",
  templateUrl: "./employee-form.component.html",
  styleUrls: ["./employee-form.component.css"],
})
export class EmployeeFormComponent implements OnInit {
  employeeGroup: FormGroup;
  id: string;
  mode = "create";
  emp_status = [
    {
      name: "active",
    },
    {
      name: "not-active",
    },
  ];
  constructor(
    private formBuilder: FormBuilder,
    private empService: EmployeeService,
    private routes: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.employeeGroup = this.formBuilder.group({
      emp_id: ["", [Validators.required]],
      name: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      phone: ["", [Validators.required]],
      address: ["", [Validators.required]],
      dob: ["", [Validators.required]],
      isActive: ["", [Validators.required]],
    });
    this.routes.paramMap.subscribe((paramap: ParamMap) => {
      if (paramap.get("id")) {
        this.id = paramap.get("id");
        this.empService
          .getSingleEmployee(this.id)
          .subscribe((data: Employee) => {
            console.log(data);
            this.employeeGroup.setValue({
              emp_id: data.emp_id,
              name: data.name,
              email: data.email,
              phone: data.phone,
              address: data.address,
              dob: data.dob,
              isActive: data.isActive,
            });
          });
        console.log(paramap.get("id"));
        this.mode = "edit";
      }
    });
  }
  onSubmit(formDirective: FormGroupDirective) {
    if (this.employeeGroup.invalid) {
      console.log("invalid");

      console.log(this.employeeGroup.get("email").errors);

      return;
    } else {
      if (this.mode === "edit") {
        this.empService.editEmployee(this.id, this.employeeGroup);
        formDirective.resetForm();
        this.employeeGroup.reset();
        this.snackBar.open("Successfully edit", "ok", {
          duration: 2000,
        });
      } else {
        this.empService.addEmployee(this.employeeGroup);
        formDirective.resetForm();
        this.employeeGroup.reset();
        this.snackBar.open("Successfully Employee add", "ok", {
          duration: 2000,
        });
      }
    }
  }
}
