import { Component } from '@angular/core';
import { formatMessage } from 'devextreme/localization';

@Component({
  templateUrl: 'home.component.html',
  styleUrls: [ './home.component.scss' ]
})

export class HomeComponent {
  formatMessage = formatMessage;
  constructor() {
  }
}
