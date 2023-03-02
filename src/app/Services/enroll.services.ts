import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
// import { Observable, throwError } from 'rxjs';
// import { catchError, retry } from 'rxjs/operators';
@Injectable()
export class employeeService {
    constructor(private http: HttpClient) {

    }
    addemployee(data: any): Observable<any> {
        return this.http.post('http://localhost:3000/employees', data)
    }
    editemployee(id: number, data: any): Observable<any> {
        return this.http.put(`http://localhost:3000/employees/${id}`, data)
    }
    getemployee(): Observable<any> {
        return this.http.get('http://localhost:3000/employees')
    }
    deleteemployee(id: number): Observable<any> {
        return this.http.delete(`http://localhost:3000/employees/${id}`)
    }
}