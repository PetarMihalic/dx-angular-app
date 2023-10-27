import { Component, Inject } from '@angular/core';
import { HttpClient, HttpClientModule, HttpParams } from "@angular/common/http";
import * as AspNetData from 'devextreme-aspnet-data-nojquery';
import { AuthService } from 'src/app/shared/services';
import DataSource from "devextreme/data/data_source";

import { lastValueFrom } from 'rxjs';
 
import CustomStore from 'devextreme/data/custom_store';   
import { LoadOptions } from 'devextreme/data';

import { locale, loadMessages, formatMessage } from 'devextreme/localization';

import deMessages from 'devextreme/localization/messages/de.json';

import { Locale, LanguagesService } from 'src/app/shared/services/languages.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent{

  dataSource: any;

  readonly allowedPageSizes = [5, 10, 20];

  readonly displayModes = [{ text: "Display Mode 'full'", value: 'full' }, { text: "Display Mode 'compact'", value: 'compact' }];

  displayMode = 'full';

  showPageSizeSelector = true;

  showInfo = true;

  showNavButtons = true;

  locale: string;

  locales: Locale[];

  formatMessage = formatMessage;

    constructor(private http: HttpClient, private service: LanguagesService) {

      this.locale = this.getLocale();
      this.locales = service.getLocales();

      this.initMessages();
      locale(this.locale);

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

                  return lastValueFrom(this.http.get('https://ocdev.chaos.hr/api/accounts',{ params, withCredentials: true }))
                    .then((response: any) => {
                      return {
                          data: response?.rows,
                          totalCount: response?.count
                      };
                      }).catch(() => { throw 'Data loading error'; });
              },
              insert: (values) => {
                  return lastValueFrom(this.http.post('https://ocdev.chaos.hr/api/accounts/add', JSON.stringify(values), {withCredentials: true}))
                  .then((response: any) => {
                    return response;
                    }).catch(() => { throw 'Insertion failed' });
              },
              remove: (key) => {
                  return lastValueFrom(this.http.post('https://ocdev.chaos.hr/api/accounts/delete/' + encodeURIComponent(key), {}, {withCredentials: true}))
                  .then((response: any) => {
                    return response;
                    }).catch(() => { throw 'Deletion failed' });
              },
              update: (key, values) => {
                  return lastValueFrom(this.http.post('https://ocdev.chaos.hr/api/accounts/edit/' + encodeURIComponent(key), JSON.stringify(values), {withCredentials: true}))
                  .then((response: any) => {
                    return response;
                    }).catch(() => { throw 'Update failed' });
              }
            }),
          });
      
    }

    initMessages() {
      loadMessages(deMessages);
      loadMessages(this.service.getDictionary());
    }

    changeLocale(data : any) {
      this.setLocale(data.value);
      parent.document.location.reload();
    }
  
    getLocale() {
      const locale = sessionStorage.getItem('locale');
      return locale != null ? locale : 'en';
    }
  
    setLocale(locale : any) {
      sessionStorage.setItem('locale', locale);
    }
/*
  url: string;

  constructor(private authService: AuthService) { 

    this.url = 'https://ocdev.chaos.hr/api';

    const that = this;

    this.dataSource = AspNetData.createStore({
      key: "id",
      loadUrl: `${this.url}/accounts`,
      insertUrl: `${this.url}/accounts/add`,
      updateUrl: `${this.url}/accounts/edit`,
      deleteUrl: `${this.url}/accounts/delete`,
      onBeforeSend(method, ajaxOptions) {
        ajaxOptions.xhrFields = { withCredentials: true };
      },
    });
  }*/
}
