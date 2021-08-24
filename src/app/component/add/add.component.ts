import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})

export class AddComponent implements OnInit {

  constructor() { }

  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }
    return value;
  }

  ngOnInit(): void {
  }

}
