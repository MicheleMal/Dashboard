import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-page2',
  templateUrl: './page2.component.html',
  styleUrls: ['./page2.component.css'],
})
export class Page2Component implements OnInit {
  constructor(private employeeService: EmployeeService) {}

  employees: any;
  ngOnInit(): void {
    setTimeout(() => {
      this.employeeService
        .getAllEmployee(`${environment.URL_API}/employee/all`)
        .subscribe((data) => {
          this.employees = data;
        });
    }, 2000);
  }
}
