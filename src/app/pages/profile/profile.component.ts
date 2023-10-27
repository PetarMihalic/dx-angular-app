import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services';

@Component({
  templateUrl: 'profile.component.html',
  styleUrls: [ './profile.component.scss' ]
})

export class ProfileComponent{
  employee: any;
  colCountByScreen: object;

  constructor(private authService: AuthService) {
    this.employee = {
      ID: 7,
      FirstName: this.authService.userValue.user.first_name,
      LastName: this.authService.userValue.user.last_name,
      Prefix: this.authService.userValue.user.account.prefix,
      Position: this.authService.userValue.user.role.name
    };
    this.colCountByScreen = {
      xs: 1,
      sm: 2,
      md: 3,
      lg: 4
    };
  }
}
