import { Component, ViewChild } from '@angular/core';
import { CrudService } from '../../services/crud.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppInfoService } from '../../services';
import { DxListComponent } from 'devextreme-angular';

@Component({
	selector: 'app-tickets-list',
	templateUrl: './tickets-list.component.html',
	styleUrls: ['./tickets-list.component.scss']
})
export class TicketsListComponent {
	@ViewChild(DxListComponent, {static: false}) list: DxListComponent | undefined;
	dataSource: any;
	itemSelected: any;

	constructor(
		private crudService: CrudService,
		private route: ActivatedRoute,
		private router: Router,
		private appInfoService: AppInfoService
	) {
		this.dataSource = crudService.getStore("Tickets");
		console.log(this.dataSource);
		this.appInfoService.messages.subscribe(msg => {
			// TicketEditorComponent == TicketsListComponent
			if(msg.sender == this.constructor.name.replace("sList", "Editor") && msg.message == "afterSave"){
				console.log(this.constructor.name+" reloading...");
				this.list?.instance.reload();
				//this.list?.instance.getDataSource().reload();
			} 
		});
	 }

	 onRefreshClick(e: any){
		this.list?.instance.reload();
	 }

	 onItemClick(e: any){
		this.router.navigate([], {relativeTo: this.route, queryParams: {action: 'edit', id: e.itemData.id}});
		this.itemSelected = e.itemData.id;
	}
	
}