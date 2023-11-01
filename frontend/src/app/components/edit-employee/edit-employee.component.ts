import { Component, Inject, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css'],
})
export class EditEmployeeComponent{

  @ViewChild("editForm") form!: NgForm

  constructor(private dialog: MatDialogRef<EditEmployeeComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private authService: AuthService, private snackBar: MatSnackBar) {}

  onCancel() {
    this.dialog.close();    
  }

  hPosition: MatSnackBarHorizontalPosition = "center"
  vPosition: MatSnackBarVerticalPosition = "top"

  res: any
  onSave() {
    this.authService.edit(`${environment.URL_API}/employee/modify/${this.data._id}`, this.form.value).subscribe((data)=>{
      this.res = data

      if(this.res.check===true){
        this.dialog.close()
        this.snackBar.open("Informazioni dipendente aggiornate con successo", "Chiudi",{
          duration: 3000,
          horizontalPosition: this.hPosition,
          verticalPosition: this.vPosition
        })
      }
    })
  }
}
