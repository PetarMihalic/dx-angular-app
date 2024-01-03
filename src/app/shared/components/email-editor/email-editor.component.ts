import { Component } from '@angular/core';
import { EditorComponent } from '../editor-component/editor.component';

@Component({
	selector: 'app-email-editor',
	templateUrl: './email-editor.component.html',
	styleUrls: ['./email-editor.component.scss']
})
export class EmailEditorComponent extends EditorComponent{
	override backendControllerName: string = 'Tickets';
	override backendControllerAction: string = 'replyViaEmail';
	protected override isChildEditor: boolean = true;
	protected override mapUrlEntityIdToFormField: string = 'ticket_id';

	getFileUploadUrl(): string {
		let url = "http://localhost:58765//Files/upload";
		let user = this.authService.userValue;
        if(user && user.sessionId)
			url += '?sessionId='+user.sessionId;
		return url;	
	}
	
	/*
	attachOnBeforeSend(e: any){
		let user = this.authService.userValue;
        if(user && user.sessionId){
			console.log(this.authService.userValue.sesssionId);
			console.log(e.request);
			e.request. setParams("sessionId", user.sessionId);
			let req: XMLHttpRequest = new XMLHttpRequest();
		}
			
	}
	*/
}