import { Employee } from "./../models/employee.model";
import { FormGroup } from "@angular/forms";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { tap } from "rxjs/operators";
import { Subject, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class EmployeeService {
  updatedEmployee = new Subject();
  url = "http://localhost:8080/api/";
  constructor(private httpClient: HttpClient) {}
  employeeListener() {
    return this.updatedEmployee.asObservable();
  }

  addEmployee(formData: FormGroup) {
    const data = {
      emp_id: formData.value.emp_id,
      name: formData.value.name,
      email: formData.value.email,
      phone: formData.value.phone,
      address: formData.value.address,
      dob: formData.value.dob,
      createdDate: new Date(),
      isActive: formData.value.isActive,
    };
    this.httpClient
      .post(`${this.url}add_emp`, data)
      .pipe(
        tap(() => {
          this.updatedEmployee.next();
        })
      )
      .subscribe();
  }

  getAllEmployees(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(`${this.url}employees`);
  }

  deleteEmployee(id: string) {
    this.httpClient
      .delete(`${this.url}deleteEmployee/${id}`)
      .pipe(
        tap(() => {
          this.updatedEmployee.next();
        })
      )
      .subscribe();
  }

  getSingleEmployee(id: string) {
    return this.httpClient.get(`${this.url}findEmp/${id}`);
  }

  editEmployee(id: string, formData: FormGroup) {
    const data = {
      emp_id: formData.value.emp_id,
      name: formData.value.name,
      email: formData.value.email,
      phone: formData.value.phone,
      address: formData.value.address,
      dob: formData.value.dob,
      createdDate: new Date(),
      isActive: formData.value.isActive,
    };
    this.httpClient
      .put(`${this.url}editEmployee/${id}`, data)
      .pipe(
        tap(() => {
          this.updatedEmployee.next();
        })
      )
      .subscribe();
  }
}
