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
	projectsStore: CustomStore = this.crudService.getStore("Projects");
	statusesStore: CustomStore = this.crudService.getStore("TicketStatuses");
	contactsStore: CustomStore = this.crudService.getStore("Contacts");
	usersStore: CustomStore = this.crudService.getStore("Users");

	accordionTitles: any[] = [
		{title: "Members"},
		{title: "Info"},
		{title: "Additional information"}
	];
	checkBoxValue: boolean | null | undefined = false;
	reminderDisabled: boolean = true;

	onCustomItemCreating(args: any) {
		this.contactsStore.push([{ type: "insert", key: "id", data: {id: args.text, type: "email" }}]);
		const newValue = args.text;
		console.log(newValue);
	//	const isItemInDataSource = this.contactsStore.keyOf((item:any) => item === newValue);
	//	if (!isItemInDataSource) {
	//	  this.contactsStore.insert(newValue);
	//	}
		args.customItem = newValue;
	  }

	onCheckBoxClick(){
		if(this.checkBoxValue) this.reminderDisabled = false;
		else this.reminderDisabled = true;
		console.log(this.projectsStore);
	}

	getFullName(item: any): string{
		return item && item.first_name + ' ' + item.last_name;
	}

}