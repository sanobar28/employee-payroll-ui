import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators, FormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';
import { Employee } from 'src/app/model/employee';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { HttpService } from '../../service/http.service';
import { DataService } from 'src/app/service/data.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})

export class AddComponent implements OnInit {

  public employee: Employee = new Employee;
  public employeeFormGroup: FormGroup;
  subscription: Subscription;
  message: string;


  /**
   * Array of objects to store departments
   */
  departments: Array<any> = [
    {
      name: "HR",
      value: "HR",
    },
    {
      name: "Sales",
      value: "Sales",

    },
    {
      name: "Finance",
      value: "Finance",

    },
    {
      name: "Engineer",
      value: "Engineer",

    },
    {
      name: "Other",
      value: "Other",

    }
  ]

  /**
   * Creates the object of employee form on submit 
   * @param formBuilder FormBulider object
   */
  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService,
    private dataService: DataService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.employeeFormGroup = this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.pattern("^[A-Z][a-zA-z\\s]{2,}$")]),
      profilePic: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      department: this.formBuilder.array([], [Validators.required]),
      salary: new FormControl('', Validators.required),
      startDate: new FormControl('', Validators.required),
      notes: new FormControl('', Validators.required)
    })
  }

  /**
   * To show error message for invalid or missing data
   * @param controlName 
   * @param errorName  
   * @returns error message 
   */
  public checkError = (controlName: string, errorName: string) => {
    return this.employeeFormGroup.controls[controlName].hasError(errorName);
  }


  /**
   * On change event for checkbox. In this we can select multiple checkobox 
   * for department and store is as an array.
   * @param event 
   */
  onCheckboxChange(event: MatCheckboxChange) {
    const department: FormArray = this.employeeFormGroup.get('department') as FormArray;

    if (event.checked) {
      department.push(new FormControl(event.source.value));
    } else {
      const index = department.controls.findIndex(x => x.value === event.source.value);
      department.removeAt(index);
    }
  }


  /**
   * To read Salary value from slider
   */
  salary: number = 400000;
  updateSetting(event) {
    this.salary = event.value;
  }

  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }
    return value;
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


  /**
   * Submit form method in which it is checking user input validations errors.
   * If there are errors it will pop up mat snackbar with error message.
   * It will check while submitting form that it is request for update form or else it will submit 
   * new data. 
   */
  onSubmit(): void {
    var dateString = this.employeeFormGroup.get('startDate').value;
    var myDate = new Date(dateString);
    var today = new Date();
    if (myDate > today) {
      this.message = "StartDate should not be future date.";
      this.openSnackBar(this.message, "CLOSE");
    }
    if (this.employeeFormGroup.invalid) {
      if (this.employeeFormGroup.get('department').value.length == 0) {
        this.message = "Department is empty";
        this.openSnackBar(this.message, "CLOSE");
      }
      else {
        this.message = "1. Profile Pic required" + "\n" +
          "2. Gender required" + "\n" +
          "3. Min Wage should be more than 10000";
        this.openSnackBar(this.message, "CLOSE");
      }
    }
    else {
      this.employee = this.employeeFormGroup.value;
      if (this.activatedRoute.snapshot.params['id'] != undefined) {
        this.httpService.updateEmployeeData(this.activatedRoute.snapshot.params['id'], this.employee).subscribe(response => {
          console.log(response);
          this.router.navigateByUrl('/home');
        });
      }
      else {
        this.httpService.addEmployeeData(this.employee).subscribe(response => {
          console.log(response);
          this.router.navigateByUrl('/home');
        });
      }
    }
  }

  /**
   * To set previously submmitted form values while updating form data
   */
  ngOnInit(): void {
    if (this.activatedRoute.snapshot.params['id'] != undefined) {
      this.dataService.currentEmployee.subscribe(employee => {
        if (Object.keys(employee).length !== 0) {
          this.employeeFormGroup.get('name')?.setValue(employee.name);
          this.employeeFormGroup.get('gender')?.setValue(employee.gender);
          this.employeeFormGroup.get('notes')?.setValue(employee.notes);
          this.employeeFormGroup.get('startDate')?.setValue(employee.startDate);
          this.employeeFormGroup.get('profilePic')?.setValue(employee.profilePic);
          this.employeeFormGroup.get('salary')?.setValue(employee.salary);

          employee.department.forEach(departmentElement => {
            for (let index = 0; index < this.departments.length; index++) {
              if (this.departments[index].name === departmentElement) {
                this.departments[index].checked = true;
              }
            }
          });
        }

      });
    }

  }

}