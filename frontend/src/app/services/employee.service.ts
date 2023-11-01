import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient) {}

  getAllEmployee(url: string) {
    return this.http.get(url);
  }

  deleteEmployee(url:string){
    return this.http.delete(url)
  }
}
