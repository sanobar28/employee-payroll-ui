import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators, FormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';
import { Employee } from 'src/app/model/employee';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { HttpService } from '../../service/http.service';
import { DataService } from 'src/app/service/data.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})

export class AddComponent implements OnInit {

  public employee: Employee = new Employee;
  public employeeFormGroup: FormGroup;
  subscription: Subscription;


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
   * @param fb FormBulider object
   */
  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService,
    private dataService: DataService,
    private activatedRoute: ActivatedRoute
  ) {
    this.employeeFormGroup = this.formBuilder.group({
      name: new FormControl(''),
      profilePic: new FormControl(''),
      gender: new FormControl(''),
      department: this.formBuilder.array([], [Validators.required]),
      salary: new FormControl(''),
      startDate: new FormControl(''),
      notes: new FormControl('')
    })
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
   * Submit form
   */
  onSubmit() {
    this.employee = this.employeeFormGroup.value;
    this.httpService.addEmployeeData(this.employee).subscribe(response => {
      console.log(response);
    });
  }


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