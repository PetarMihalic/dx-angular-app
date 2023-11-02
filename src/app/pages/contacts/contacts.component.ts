import { Component } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import DataSource from "devextreme/data/data_source";

import { lastValueFrom } from 'rxjs';
 
import CustomStore from 'devextreme/data/custom_store';   
import { LoadOptions } from 'devextreme/data';

import { formatMessage } from 'devextreme/localization';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent {
  dataSource: any;

  readonly allowedPageSizes = [5, 10, 20];

  readonly displayModes = [{ text: "Display Mode 'full'", value: 'full' }, { text: "Display Mode 'compact'", value: 'compact' }];

  displayMode = 'full';

  showPageSizeSelector = true;

  showInfo = true;

  showNavButtons = true;

  formatMessage = formatMessage;

    constructor(private http: HttpClient) {

      const isNotEmpty = (value: unknown) => value !== undefined && value !== null && value !== '';
 
      this.dataSource = new DataSource({
          store: new CustomStore({
              key: 'id',
              load: (loadOptions: LoadOptions) => {
                  let params: HttpParams = new HttpParams();
                  [
                      'filter',
                      'group',
                      'groupSummary',
                      'parentIds',
                      'requireGroupCount',
                      'requireTotalCount',
                      'searchExpr',
                      'searchOperation',
                      'searchValue',
                      'select',
                      'sort',
                      'skip',
                      'take',
                      'totalSummary',
                      'userData',
                      'page',
                      'limit'
                  ].forEach(function (i) {
                      const optionValue = loadOptions[i as keyof LoadOptions];
                      if (i in loadOptions && isNotEmpty(optionValue)) {
                          params = params.set(i, JSON.stringify(optionValue));
                      }
                      params = params.set('limit', params.get('take')!);
                      params = params.set('page', Number(params.get('skip')!)/Number(params.get('limit')!)+1);
                  });

                  return lastValueFrom(this.http.get('https://ocdev.chaos.hr/api/contacts',{ params, withCredentials: true }))
                    .then((response: any) => {
                      return {
                          data: response?.rows,
                          totalCount: response?.count
                      };
                      }).catch(() => { throw 'Data loading error'; });
              },
              insert: (values) => {
                  return lastValueFrom(this.http.post('https://ocdev.chaos.hr/api/contacts/add', values, {withCredentials: true}))
                  .then((response: any) => {
                    return response;
                    }).catch(() => { throw 'Insertion failed' });
              }/*,
              remove: (key) => {
                  return lastValueFrom(this.http.post('https://ocdev.chaos.hr/api/accounts/delete/' + encodeURIComponent(key), {}, {withCredentials: true}))
                  .then((response: any) => {
                    return response;
                    }).catch(() => { throw 'Deletion failed' });
              },
              update: (key, values) => {
                  return lastValueFrom(this.http.post('https://ocdev.chaos.hr/api/accounts/edit/' + encodeURIComponent(key), values, {withCredentials: true}))
                  .then((response: any) => {
                    return response;
                    }).catch(() => { throw 'Update failed' });
              }*/
            }),
          });
    }
}
