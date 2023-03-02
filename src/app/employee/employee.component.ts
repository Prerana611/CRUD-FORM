import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from '../Core/core.service';
import { employeeService } from '../Services/enroll.services';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  [x: string]: any;
  empform: FormGroup;
  education: string[] = [
    'Matric',
    'Diploma',
    'Intermediate',
    'Graduate',
    'Post Graduate'
  ]
  constructor(private _fb: FormBuilder, private _enrollSrvice: employeeService,
    private _coreservice: CoreService,
    private _dailogref: MatDialogRef<EmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.empform = this._fb.group({
      firstname: '',
      lastname: '',
      email: '',
      dob: '',
      gender: '',
      education: '',
      company: '',
      experience: '',
      package: ''
    })
  }
  onformsubmit() {
    if (this.data) {
      this._enrollSrvice.editemployee(this.data.id, this.empform.value).subscribe({
        next: (val: any) => {
          this._coreservice.openSnackBar('empleyee updated !!', 'done');
          this._dailogref.close(true);
        },
        error: (err: any) => {
          console.error(err);
        }
      })
    } else {
      this._enrollSrvice.addemployee(this.empform.value).subscribe({
        next: (val: any) => {
          this._coreservice.openSnackBar('empleyee added succesfully', 'done');
          this._dailogref.close(true);
        },
        error: (err: any) => {
          console.error(err);
        }
      })
    }
  }
  ngOnInit() {
    this.empform.patchValue(this.data);
  }
}


