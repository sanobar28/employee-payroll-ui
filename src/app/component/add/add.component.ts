import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators, FormsModule } from '@angular/forms';
import { ValueTransformer } from '@angular/compiler/src/util';
import { NgModule } from '@angular/core';
import { Employee } from 'src/app/model/employee';
import { MatCheckboxChange } from '@angular/material/checkbox';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})

export class AddComponent implements OnInit {

  public employee: Employee = new Employee();
  employeeFormGroup: FormGroup;


  /**
   * Array of objects to store departments
   */
  Departments: Array<any> = [
    {
      id: 1,
      name: "HR",
      value: "HR",
    },
    {
      id: 2,
      name: "Sales",
      value: "Sales",

    },
    {
      id: 3,
      name: "Finance",
      value: "Finance",

    },
    {
      id: 4,
      name: "Engineer",
      value: "Engineer",

    },
    {
      id: 5,
      name: "Other",
      value: "Other",

    }
  ]

  /**
   * Creates the object of employee form on submit 
   * @param fb FormBulider object
   */
  constructor(private fb: FormBuilder) {
    this.employeeFormGroup = this.fb.group({
      fullName: new FormControl(''),
      profilePic: new FormControl(''),
      gender: new FormControl(''),
      deptList: this.fb.array([], [Validators.required]),
      salaryOutput: new FormControl(''),
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
    const deptList: FormArray = this.employeeFormGroup.get('deptList') as FormArray;

    if (event.checked) {
      deptList.push(new FormControl(event.source.value));
    } else {
      const index = deptList.controls.findIndex(x => x.value === event.source.value);
      deptList.removeAt(index);
    }
  }


  /**
   * To read Salary value from slider
   */
  salaryOutput: number = 400000;
  updateSetting(event) {
    this.salaryOutput = event.value;
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
    console.log(this.employeeFormGroup.value)
  }


  ngOnInit(): void {

  }

}
