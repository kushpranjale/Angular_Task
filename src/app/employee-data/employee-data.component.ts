import { Employee } from "./../models/employee.model";
import { EmployeeService } from "./../Services/employee.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";

@Component({
  selector: "app-employee-data",
  templateUrl: "./employee-data.component.html",
  styleUrls: ["./employee-data.component.css"],
})
export class EmployeeDataComponent implements OnInit {
  empData: Employee[] = [];
  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    this.getAllEmployees();
    this.employeeService.employeeListener().subscribe((res) => {
      this.getAllEmployees();
    });
  }
  getAllEmployees() {
    this.employeeService.getAllEmployees().subscribe((data) => {
      this.empData = data;
      console.log(data);
    });
  }
  onDelete(id: string) {
    this.employeeService.deleteEmployee(id);
  }
}
