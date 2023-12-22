import { Component } from '@angular/core';
import { EditorComponent } from '../editor-component/editor.component';

@Component({
	selector: 'app-internal-note-editor',
	templateUrl: './internal-note-editor.component.html',
	styleUrls: ['./internal-note-editor.component.scss']
})
export class InternalNoteEditorComponent extends EditorComponent{
	override backendControllerName: string = 'Notes';
	override backendControllerAction: string = 'add';
	protected override isChildEditor: boolean = true;
	protected override mapUrlEntityIdToFormField: string = 'ticket_id';

	override ngOnInit(): void {
		super.ngOnInit();
		
		/*
		if(this.route.snapshot.routeConfig?.path == 'pages/tickets' && this.route.snapshot.queryParams['action'] == 'edit'){
			this.showEditor = true;
		}else{
			this.showEditor = false;
		}
		*/
/*
		this.route.queryParams.subscribe(params => {
			this.urlAction = params['action'];
			this.urlEntityId = params['id'];
			console.log("queryParams subscription", this.urlAction, this.urlEntityId);

			switch(this.route.snapshot.routeConfig?.path){
				case 'pages/tickets':
					this.formData.ticket_id = this.urlEntityId;
					break;
				case 'pages/contacts':
					this.formData.contact_id = this.urlEntityId;
					break;
			}
			console.log(this.formData);

			if(this.urlAction == 'edit'){
				this.showEditor = true;
				this.formData.ticket_id = this.urlEntityId;
				
			}else{
				this.showEditor = false;
			}
			this.form?.instance.resetValues();
*/
			/*
			switch(this.urlAction){
				case 'add':
					this.readOnly = false;
					this.form?.instance.resetValues();
					break;
				case 'view':
					this.readOnly = true;
					break;
				case 'edit':
					this.readOnly = false;
					break;
			}

			if(this.urlEntityId !== undefined && ['view', 'edit'].includes(this.urlAction)){
				this.loading = true;
				this.crudService.read('tickets', this.urlEntityId).then((data: any) => {
					this.loading = false;
					this.entity = data;
				});
			}
			
		});
		*/

	}

	/*
	constructor(
		protected override crudService: CrudService,
		protected override http: HttpClient,
		protected override route: ActivatedRoute,
		protected override appInfoService: AppInfoService
	){
		super(crudService, http, route, appInfoService);
	}
	*/

	/*

	onCancel(): void{
		console.log('Cancel');
	}
	*/
}
