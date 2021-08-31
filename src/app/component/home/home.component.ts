import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/model/employee';
import { DataService } from 'src/app/service/data.service';
import { HttpService } from 'src/app/service/http.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public employeeCount: number = 10;
  public employeeList: Employee[] = [];
  public employee: Employee;


  constructor(
    private httpService: HttpService, 
    private dataService: DataService, 
    private router: Router) 
    { }

  ngOnInit(): void {
    this.httpService.getEmployeeData().subscribe(responce => {
      this.employeeList = responce.data;
      console.log(responce);

      this.employeeCount = this.employeeList.length;
      console.log(this.employeeList.length);
    });
  }

  remove(id: number) {
    this.httpService.deleteEmployeeData(id).subscribe(data => {
      console.log(data);
      this.ngOnInit();
    });
  }

  update(employee: Employee): void {
    this.dataService.changeEmployee(employee);
    this.router.navigateByUrl('/form/' + employee.id)
  }


}


