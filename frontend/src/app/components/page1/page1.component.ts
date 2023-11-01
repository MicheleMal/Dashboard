import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeService } from 'src/app/services/employee.service';
import { EditEmployeeComponent } from '../edit-employee/edit-employee.component';
import { environment } from 'src/environments/environment';

export interface EmployeeData {
  _id: number;
  name: string;
  surname: string;
  email: string;
  password: string;
  salary: number;
  assumptionDate: Date;
  dateBirth: Date;
}

@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.css'],
})
export class Page1Component implements OnInit {
  displayedColumns: string[] = [
    'select',
    'name',
    'surname',
    'email',
    'salary',
    'assumptionDate',
    'dateBirth',
    'edit'
  ];

  constructor(
    private employeeService: EmployeeService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  employees: any;
  dataSource: any;
  selection = new SelectionModel<EmployeeData>(true, []);

  ngOnInit(): void {        
    setTimeout(() => {
      this.employeeService        
        .getAllEmployee(`${environment.URL_API}/employee/all`)
        .subscribe((data) => {
          this.employees = data;
          this.dataSource = new MatTableDataSource<EmployeeData>(
            this.employees.data
          );
        });
    }, 2000);
  }

  // Open dialog
  onEdit(employee: any) {
    this.dialog.open(EditEmployeeComponent, {data: employee})
  }

  hPosition: MatSnackBarHorizontalPosition = 'center';
  vPosition: MatSnackBarVerticalPosition = 'top';
  res: any;
  onDelete() {
    this.selection.selected.forEach((data) => {
      this.employeeService
        .deleteEmployee(`${environment.URL_API}/employee/delete/${data._id}`)
        .subscribe((data) => {
          this.res = data;
          if (this.res.check === true) {
            this.dataSource.data = this.dataSource.data.filter(
              (item: EmployeeData) => item._id !== this.res.data._id
            );
            this.snackBar.open('Utenti eliminati con successo', 'Chiudi', {
              duration: 3000,
              horizontalPosition: this.hPosition,
              verticalPosition: this.vPosition,
            });
          }
        });
    });
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    let numRows: number = 0;
    let numSelected: number = 0;
    if (this.dataSource != undefined) {
      numSelected = this.selection.selected.length;
      numRows = this.dataSource.data.length;
    }
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    if (this.dataSource != undefined) {
      this.selection.select(...this.dataSource.data);
    }
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: EmployeeData): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} this row`;
  }
}
