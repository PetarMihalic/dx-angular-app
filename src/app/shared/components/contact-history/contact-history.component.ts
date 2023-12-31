import { Component } from '@angular/core';
import { CrudService } from '../../services/crud.service';
import { HttpClient} from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { AppInfoService, AuthService } from '../../services';


@Component({
	selector: 'app-contact-history',
	templateUrl: './contact-history.component.html',
	styleUrls: ['./contact-history.component.scss']
})
export class ContactHistoryComponent{
	protected ticketId?: number;
	protected contactId?: number;
	protected contactInfo: any = {};
	
	public formLoading: boolean = false;
	public formShow: boolean = false;
	public formReadOnly: boolean = false;

	protected backendControllerName: string = '';
	protected backendControllerAction?: string; //Override default form action with a custom action

	protected isChildEditor: boolean = false;
	protected mapUrlEntityIdToFormField: string = 'parent_id';

	dataSouce: object[] = [
		{
			icon: 'info', 
			title: 'Changed Phone Number',
			dateTime: '18.12.2023. - 12:38:22',
			author: 'Agent One',
			description: '042 777 777 to 042 123 456.'
		},{
			icon: 'attach', 
			title: 'Added file',
			dateTime: '18.12.2023. - 12:37:03',
			author: 'Agent One',
			description: 'Ugovor-2023-12.pdf.'
		},{
			icon: 'event', 
			title: 'Added Calendar Event',
			dateTime: '18.12.2023. - 12:33:38',
			author: 'Agent One',
			description: 'Sastanak za potpisivane ugovota at 02.12.2023. - 13:00.'
		},{
			icon: 'textdocument', 
			title: 'Created Ticket',
			dateTime: '16.12.2023. - 13:02:05',
			author: 'System',
			description: 'T2135 - Ponuda za novu uslugu od sljedeće godine.'
		},{
			icon: 'info', 
			title: 'Created Contact',
			dateTime: '11.12.2023. - 07:11:41',
			author: 'Agent One',
			description: 'Contact One.'
		},
	];
	
	constructor(
		protected crudService: CrudService,
		protected http: HttpClient,
		protected route: ActivatedRoute,
		protected appInfoService: AppInfoService,
		protected authService: AuthService
		//@Inject(String) protected controller: string
	){
		
	}
	
	ngOnInit(): void {
		this.route.queryParams.subscribe(params => {
			this.formLoading = true;
			this.ticketId = params['id'];
			if(this.ticketId){
				this.crudService.read('tickets', this.ticketId).then((data: any) => {
					this.formLoading = false;
					this.contactId = data.contact_id;
					if(this.contactId){
						this.crudService.read('contacts', this.contactId).then((data: any) => { 
							this.contactInfo = data;
							if(this.contactInfo){
								this.formLoading = false;
								this.formShow=true;
							}
						});
					}
				});
			}	
		});
		
	}

}