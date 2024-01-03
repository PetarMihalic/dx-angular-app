import { Component, Inject, Input, NgModule, ViewChild } from '@angular/core';
import { CrudService } from '../../services/crud.service';
import CustomStore from 'devextreme/data/custom_store';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { lastValueFrom, map } from 'rxjs';
import { DxFormComponent } from 'devextreme-angular';
import notify from 'devextreme/ui/notify';
import { ActivatedRoute } from '@angular/router';
import { AppInfoService, AppMessage, AuthService } from '../../services';
import { CommonModule } from '@angular/common';

// https://www.digitalocean.com/community/tutorials/angular-component-inheritance
// https://angular-training-guide.rangle.io/components/app_structure_with_components/passing_data_into_components

@Component({
	selector: 'app-editor-component',
	template: ''
})
export class EditorComponent {
	@ViewChild(DxFormComponent, {static: false}) form: DxFormComponent | undefined;
	//@Input() action: string = 'add'; //grab it from component parameter
	
	protected urlAction: string = 'add';
	protected urlEntityId?: number;
	
	protected formAction: string = 'add'; //add, view, edit
	protected formEntityId?: number = 0; //TODO This is redundant with urlEntityId
	protected formData: any = {};
	
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
		console.log(this.constructor.name+"->"+this.formAction);

		this.route.queryParams.subscribe(params => {
			this.urlAction = params['action'];
			this.urlEntityId = params['id'];
			if(this.isChildEditor)
				this.formData[this.mapUrlEntityIdToFormField] = this.urlEntityId;
			
			switch(this.urlAction){
				case 'add':
					this.formShow = !this.isChildEditor;
					this.formReadOnly = false;
					this.form?.instance.reset();
					this.formData = {};
					break;
				case 'view':
					this.formShow = true;
					this.formReadOnly = true;
					break;
				case 'edit':
					this.formShow = true;
					this.formReadOnly = false;
					break;
				default:
					console.warn("urlAction", this.urlAction, "is not implemented");	
			}

			if(!this.backendControllerAction)
				this.formAction = this.urlAction;

			if(!this.isChildEditor && this.urlEntityId && ['view', 'edit'].includes(this.urlAction)){
				this.formLoading = true;
				this.crudService.read('tickets', this.urlEntityId).then((data: any) => { //TODO TICKETS hardcoded
					this.formLoading = false;
					this.formData = data;
				});
			}	
		});
		
	}
	
	onCancel(): void{
		console.log('Cancel');
		notify("Neki warning ovdje stoji.....", "error", 3000);
		
	}

	async onFormSubmit(e: any){
		e.preventDefault();
		//if(!['add', 'edit'].includes(this.formAction)) return;
		
		this.formLoading = true;
		try{
			var action = this.backendControllerAction ?? this.formAction;
			var url = `${environment.apiUrl}/${this.backendControllerName}/${action}`;
			if(this.urlEntityId != null)
				url += `/${this.urlEntityId}`;
			const result$ = this.http.post(url, this.formData, {withCredentials: true}).pipe(map((rsp: any) => {
				return rsp;
			}));
			const result = await lastValueFrom(result$);
			notify("Record saved successfully", "success", 3000);
			this.appInfoService.messages.next(new AppMessage(this.constructor.name, 'afterSave'));
		}catch(e){
			if(e instanceof HttpErrorResponse){
				if(e.status == 400){
					console.log(e.error.errors);
					for(var i in e.error.errors){
						var msg = [];
						for(var j in e.error.errors[i]){
							msg.push(e.error.errors[i][j]);
						}
						this.form?.instance.getEditor(i)?.option({
							validationError: {message: msg},
							isValid: false
						});
					}
					notify("Failed to save record, please check form for errors.", "error", 3000);
				}else{
					console.error("Unhandled Http Error Response with status "+e.status+". Text: "+e.statusText, e);
				}
			}else{
				console.error("Unhandled error" , e);
			}
		}finally{
			this.formLoading = false;
		}
	}
	 
}