import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
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
    private router: Router,
    private snackBar: MatSnackBar) 
    { }

  /**
   * To get employee data and count on home page
   */
  ngOnInit(): void {
    this.httpService.getEmployeeData().subscribe(responce => {
      this.employeeList = responce.data;
      console.log(responce);

      this.employeeCount = this.employeeList.length;
      console.log(this.employeeList.length);
    });
  }

  /**
   * To remove employee data by its id
   * @param id  employee id
   */
  remove(id: number) {
    this.httpService.deleteEmployeeData(id).subscribe(data => {
      console.log(data);
      this.ngOnInit();
    });
  }

  /**
   * To update employee data it appends employee id in url 
   * @param employee 
   */
  update(employee: Employee): void {
    this.dataService.changeEmployee(employee);
    this.router.navigateByUrl('/form/' + employee.id)
  }

  
  /**
   * 
   * @param message opens snackbar message on submit form
   * @param action 
   */
   openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }


}


