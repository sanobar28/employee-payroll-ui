import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Employee } from '../model/employee';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }


  private employeeSource = new BehaviorSubject(new Employee());
  currentEmployee = this.employeeSource.asObservable();


  changeEmployee(employee: Employee) {
    this.employeeSource.next(employee);
  }

}
