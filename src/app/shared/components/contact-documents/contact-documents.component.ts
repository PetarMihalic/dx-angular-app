import { Component } from '@angular/core';
import { CrudService } from '../../services/crud.service';
import { HttpClient} from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { AppInfoService, AuthService } from '../../services';


@Component({
	selector: 'app-contact-documents',
	templateUrl: './contact-documents.component.html',
	styleUrls: ['./contact-documents.component.scss']
})
export class ContactDocumentsComponent{
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