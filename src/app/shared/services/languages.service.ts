import { Injectable } from '@angular/core';

export class Locale {
    Name: string | undefined;
  
    Value: string | undefined;
  }

const locales: Locale[] = [{
    Name: 'English',
    Value: 'en',
  }, {
    Name: 'Deutsch',
    Value: 'de',
  }];

  export class Dictionary {
    [key: string]: any;
  }
  
  const dictionary: Dictionary = {
    en: {
      Id: 'Id',
      Name: 'Name',
      ContactNr: 'Contact Number',
      Language: 'Language',
      Timezone: 'Timezone',
      Package: 'Package',
      Status: 'Status',
      Options: 'Options',
      Accounts: 'Accounts',
      Home: 'Home',
      Tasks: 'Tasks',
    },
    de: {
        Id: 'Kennung',
        Name: 'Name',
        ContactNr: 'Kontaktnummer',
        Language: 'Sprache',
        Timezone: 'Zeitzone',
        Package: 'Paket',
        Status: 'Status',
        Options: 'Optionen',
        Accounts: 'Konten',
        Home: 'Startseite',
        Tasks: 'Aufgaben',
      }
  };

  @Injectable()
  export class LanguagesService {
  
    getLocales() {
      return locales;
    }
  
    getDictionary() {
      return dictionary;
    }
  }
  
