import { Component } from '@angular/core';
import CustomStore from 'devextreme/data/custom_store';
import { EditorComponent } from '../editor-component/editor.component';


@Component({
	selector: 'app-ticket-editor',
	templateUrl: './ticket-editor.component.html',
	styleUrls: ['./ticket-editor.component.scss']
})
export class TicketEditorComponent extends EditorComponent{
	protected override backendControllerName: string = 'Tickets';
	priorities: object[] = [
		{key: 'urgent', label: 'Urgent'},
		{key: 'high', label: 'High'},
		{key: 'normal', label: 'Normal'},
		{key: 'low', label: 'Low'},
	];
	projectsStore: CustomStore = this.crudService.getStore("Projects");
	statusesStore: CustomStore = this.crudService.getStore("TicketStatuses");
	contactsStore: CustomStore = this.crudService.getStore("Contacts");


	getContactName(item: any): string{
		return item && item.first_name + ' ' + item.last_name;
	}

}