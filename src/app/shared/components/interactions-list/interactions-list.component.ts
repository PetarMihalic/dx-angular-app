import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from '../../services/crud.service';
import { DxListComponent } from 'devextreme-angular';
import { AppInfoService } from '../../services';

@Component({
	selector: 'app-interactions-list',
	templateUrl: './interactions-list.component.html',
	styleUrls: ['./interactions-list.component.scss']
})
export class InteractionsListComponent {
	@ViewChild(DxListComponent, {static: false}) list: DxListComponent | undefined;
	dataSource: any;
	ticketId?: number;
	messageId?: number;

	constructor(
		private crudService: CrudService,
		private route: ActivatedRoute,
		private router: Router,
		private appInfoService: AppInfoService
	) {
		this.dataSource = crudService.getStore("Audits");
		console.log(this.dataSource);
		this.appInfoService.messages.subscribe(msg => {
			if(msg.sender == "TicketEditorComponent" && msg.message == "afterSave"){
				console.log(this.constructor.name+" reloading...");
				this.list?.instance.reload();
				//this.list?.instance.getDataSource().reload();
			} 
		});
		/*this.route.queryParams.subscribe(params => {
			//this.messageId = params['messageId'];
			this.ticketId = params['id'];
			this.list?.instance.reload();
			//TODO apply messageId & ticketId to store
			if(this.ticketId){
				this.crudService.read('audits', this.ticketId).then((data: any) => {
					this.dataSource = data;
				});
			}
		});*/
		
	 }

	onRefreshClick(e: any){
		this.list?.instance.reload();
	}

	onItemClick(e: any){
		//this.router.navigate([], {relativeTo: this.route, queryParams: {action: 'edit', ticketId: e.itemData.id}});
		console.log(e.itemData.id);
	}
}