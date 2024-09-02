import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'WeekSalary', url: '/folder/weeksalary', icon: 'mail' },
    { title: 'Outbox', url: '/folder/progress', icon: 'paper-plane' },
  ];


  constructor(

  ) {}



}
