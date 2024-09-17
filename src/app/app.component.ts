import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Weekly Salary', url: '/folder/weeksalary', icon: 'cash' },
    { title: 'Progress', url: '/folder/progress', icon: 'barbell' },
    { title: 'Mistakes', url: '/folder/mistake', icon: 'barbell' },
  ];


  constructor(

  ) {}



}
