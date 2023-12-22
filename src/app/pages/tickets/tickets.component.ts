import { Component, OnInit } from '@angular/core';
import { formatMessage } from 'devextreme/localization';
import { CrudService } from 'src/app/shared/services/crud.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, NavigationEnd } from '@angular/router';
import { AppInfoService, AuthService } from 'src/app/shared/services'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent {
	public showTicketDetails: boolean = false;

  formatMessage = formatMessage;
  constructor(
    protected crudService: CrudService,
		protected http: HttpClient,
		protected route: ActivatedRoute,
		protected appInfoService: AppInfoService,
		protected authService: AuthService,
    protected router: Router
	){
		router.events.forEach((event) => {
      if(event instanceof NavigationEnd) {
        console.log(event.url)
        if(event.url.includes("action=edit")){
          this.showTicketDetails = true;
        }
        else{
          this.showTicketDetails = false;
        }
        console.log("Prikaz detalja ticketa: "+this.showTicketDetails)
      }
    });
	}

  ngOnInit(): void {
  }
}
