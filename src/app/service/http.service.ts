import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../model/employee';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  baseUrl: String = "http://localhost:8081/employeepayrollservice";

  constructor(
    private httpClient : HttpClient) {
   
  }
  
  getEmployeeData() : Observable<any> {
    return this.httpClient.get(this.baseUrl + "/get");
  }

  addEmployeeData(body: any): Observable<any> {
    return this.httpClient.post(this.baseUrl + "/create", body);
  }

  deleteEmployeeData(id: number): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/delete/${id}`);   
  }

  updateEmployeeData(id, employee: Employee) {
    return this.httpClient.put(`${this.baseUrl}/update/${id}`, employee);
  }

}
