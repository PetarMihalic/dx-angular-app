import { Component, OnInit } from '@angular/core';
import { formatMessage } from 'devextreme/localization';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  formatMessage = formatMessage;
  constructor() { }

  ngOnInit(): void {
  }

}
