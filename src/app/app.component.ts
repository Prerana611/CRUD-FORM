import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeComponent } from './employee/employee.component';
import { employeeService } from './Services/enroll.services';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from './Core/core.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'CRUD';

  displayedColumns: string[] = ['id', 'firstname', 'lastname', 'email', 'dob', 'gender', 'education', 'company',
    'experience', 'package',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _dialog: MatDialog,
    private _emplist: employeeService,
    private _coreservice: CoreService) {

  }
  opendialog() {
    const dialogref = this._dialog.open(EmployeeComponent);
    dialogref.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getemployeelist();
        }
      }
    })
  }
  getemployeelist() {
    this._emplist.getemployee().subscribe({
      next: (res: any) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    })
  }
  ngOnInit(): void {
    this.getemployeelist();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteemployee(id: number) {
    this._emplist.deleteemployee(id).subscribe({
      next: (res) => {
        this._coreservice.openSnackBar('employee deleted', 'done');
        this.getemployeelist();
      },
      error: console.log,
    })
  }
  openedit(data: any) {
    const dialogref = this._dialog.open(EmployeeComponent, {
      data: data,
    });
    this._dialog.open(EmployeeComponent);
    dialogref.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getemployeelist();
        }
      }
    })
  }


}

