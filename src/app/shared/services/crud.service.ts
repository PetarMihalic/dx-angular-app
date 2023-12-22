import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lastValueFrom, map } from "rxjs";
import { environment } from "src/environments/environment";
import CustomStore from "devextreme/data/custom_store";

@Injectable({providedIn: 'root'})
export class CrudService{

	constructor(private http: HttpClient){}

	async readAll(controller: string, loadOptions: any){
		console.log(controller, loadOptions);
		//Grid sometimes sends empty {} for loadOptions, skip loading in that case
		//if(loadOptions.take === undefined)
		//	return null;

		try{
			const opts = {
				params: {
					limit: loadOptions.take ?? 20, 
					page: loadOptions.skip / loadOptions.take + 1,
					sort: 'id',
					direction: 'asc'
				},
				withCredentials: true //needed to force angular send cookie auth, move tthis to interceptor
			};
			if(loadOptions.sort && loadOptions.sort.length > 0){
				opts.params.sort = loadOptions.sort[0].selector;
				opts.params.direction = loadOptions.sort[0].desc ? 'desc' : 'asc'
			}
			return lastValueFrom(this.http.get(`${environment.apiUrl}/${controller}`, opts).pipe(map((rsp: any) => {
				return {
					data: rsp.rows,
					totalCount: rsp.count
				}
			})));
		}catch(error){
			console.log('Ullllaaaalaaaa failed to get data....');
			console.error(error);
			return null;
		}
	}

	async read(controller: string, id: number){
		try{
			const options = {
				withCredentials: true
			}
			const result$ = this.http.get(`${environment.apiUrl}/${controller}/view/${id}`, options).pipe(map((rsp: any) => {
				return rsp;
			}));
			const result = lastValueFrom(result$);
			return result;
		}catch(error){
			console.log('Ullllaaaalaaaa failed to get data....');
			console.error(error);
			return null;
		}
	}

	async create(controller: string, model: any){
		const url = `${environment.apiUrl}/${controller}/add`;
		const options = {
			withCredentials: true
		};
		try{
			const result$ = this.http.post(url, model, options).pipe(map((rsp: any) => {
				return rsp;
			}));
			const result = await lastValueFrom(result$);
			return result;
		}catch(e){
			console.log("Ufatio sam ga....");
			if(e instanceof HttpErrorResponse){
				console.log("Http Error Response with status "+e.status+". Text: "+e.statusText);
				e.error.violations.forEach((x: any) => {
					console.log(x);
				});
			}
			console.error(e);
			return null;
		}
	}

	getStore(controller: string): CustomStore{
		return new CustomStore({
			key: 'id',
			load: (loadOptions) => this.readAll(controller, loadOptions),
			byKey: (key) => {
			  return this.read(controller, key);
			},
		  });
	}
}