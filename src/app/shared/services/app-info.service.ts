import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AppInfoService {
	public messages: BehaviorSubject<AppMessage> = new BehaviorSubject<AppMessage>(new AppMessage("", ""));

  constructor() {}

  public get title() {
    return 'CALLIA CONTACT';
  }

  public get currentYear() {
    return new Date().getFullYear();
  }
}

export class AppMessage{

	constructor(
		public  sender: string,
		//public recipient: string,
		public message: string,
		public data?: any
	){

	}
}
