import { Component } from '@angular/core';
import CustomStore from 'devextreme/data/custom_store';
import { EditorComponent } from '../editor-component/editor.component';
import { DatePipe } from '@angular/common';


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
	ticketTypes: object[] = [
		{key: 'sales', label: 'Type 1'},
		{key: 'high', label: 'Type 2'},
		{key: 'normal', label: 'Type 3'},
		{key: 'low', label: 'Type 4'},
	];
	ticketSubtypes: object[] = [
		{key: 'newService', label: 'Subtype 1'},
		{key: 'high', label: 'Subtype 2'},
		{key: 'normal', label: 'Subtype 3'},
		{key: 'low', label: 'Subtype 4'},
	];
	productCategories: object[] = [
		{key: 'newService', label: 'Category 1'},
		{key: 'high', label: 'Category 2'},
		{key: 'normal', label: 'Category 3'},
		{key: 'low', label: 'Category 4'},
	];
	productSubategories: object[] = [
		{key: 'newService', label: 'Subcategory 1'},
		{key: 'high', label: 'Subcategory 2'},
		{key: 'normal', label: 'Subcategory 3'},
		{key: 'low', label: 'Subcategory 4'},
	];
	status: object[] = [
		{key: 'new', label: 'New'},
		{key: 'pending', label: 'Pending'},
		{key: 'customer', label: 'Waiting for customer'},
		{key: 'colaborator', label: 'Waiting for colaborator'},
		{key: 'finished', label: 'Finished'},
		{key: 'closed', label: 'Closed'}
	];
	projectsStore: CustomStore = this.crudService.getStore("Projects");
	statusesStore: CustomStore = this.crudService.getStore("TicketStatuses");
	contactsStore: CustomStore = this.crudService.getStore("Contacts");

	accordionTitles: any[] = [
		{title: "Members"},
		{title: "Info"},
		{title: "Additional information"}
	];
	checkBoxValue: boolean | null | undefined = false;
	reminderDisabled: boolean = true;

	onCheckBoxClick(){
		if(this.checkBoxValue) this.reminderDisabled = false;
		else this.reminderDisabled = true;
	}

	getContactName(item: any): string{
		return item && item.first_name + ' ' + item.last_name;
	}

}