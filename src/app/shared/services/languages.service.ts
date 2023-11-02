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
      Dashboard: 'Dashboard',
      Contacts: 'Contacts',
      FirstName: 'First Name',
      LastName: 'Last Name',
      Address: 'Address',
      Description: 'Description',
      Title: 'Title',
      Budget: 'Budget',
      Emails: 'Emails',
      AccountID: 'Account ID',
      MyTickets: 'MY TICKETS',
      New: 'New',
      InProgress: 'In Progress',
      Waiting: 'Waiting',
      AllTickets: 'ALL TICKETS',
      SolvedTickets: 'SOLVED TICKETS',
      Today: 'Today',
      ThisWeek: 'This week',
      ThisMonth: 'This month',
      NewInteractions: 'NEW INTERACTIONS',
      EMail: 'E-mail',
      MissedCalls: 'Missed calls',
      WhatsApp: 'WhatsApp',
      Viber: 'Viber',
      CallsInQueue: 'Calls in queue',
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
        Dashboard: 'Dashboard',
        Contacts: 'Kontakte',
        FirstName: 'Vorname',
        LastName: 'Nachname',
        Address: 'Adresse',
        Description: 'Beschreibung',
        Title: 'Titel',
        Budget: 'Budget',
        Emails: 'E-Mails',
        AccountID: 'Kontonummer',
        MyTickets: 'MEINE TICKETS',
        New: 'Neu',
        InProgress: 'In Bearbeitung',
        Waiting: 'Warten',
        AllTickets: 'ALLE TICKETS',
        SolvedTickets: 'GELÖSTE TICKETS',
        Today: 'Heute',
        ThisWeek: 'Diese Woche',
        ThisMonth: 'Diesen Monat',
        NewInteractions: 'NEUE INTERAKTIONEN',
        EMail: 'E-Mail',
        MissedCalls: 'Verpasste Anrufe',
        WhatsApp: 'WhatsApp',
        Viber: 'Viber',
        CallsInQueue: 'Anrufe in der Warteschlange',
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
  
