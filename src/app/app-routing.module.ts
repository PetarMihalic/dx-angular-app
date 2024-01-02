import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent, ResetPasswordFormComponent, CreateAccountFormComponent, ChangePasswordFormComponent } from './shared/components';
import { AuthGuardService } from './shared/services';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { DxDataGridModule, DxFormModule, DxButtonModule, DxLoadIndicatorModule, DxBoxModule, DxListModule, DxToolbarModule, 
  DxTabPanelModule, DxLoadPanelModule, DxScrollViewModule, DxHtmlEditorModule, DxTextAreaModule, DxTextBoxModule, 
  DxFileUploaderModule, DxAccordionModule, DxSelectBoxModule, DxTagBoxModule, DxDateBoxModule, DxCheckBoxModule } from 'devextreme-angular';
import { AccountsComponent } from './pages/accounts/accounts.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TicketsComponent } from './pages/tickets/tickets.component';
import { TicketsListComponent } from './shared/components/tickets-list/tickets-list.component';
import { TicketEditorComponent } from './shared/components/ticket-editor/ticket-editor.component';
import { InteractionsListComponent } from './shared/components/interactions-list/interactions-list.component';
import { EmailEditorComponent } from './shared/components/email-editor/email-editor.component';
import { InternalNoteEditorComponent } from './shared/components/internal-note-editor/internal-note-editor.component';
import { ContactInfoComponent } from './shared/components/contact-info/contact-info.component';
import { ContactHistoryComponent } from './shared/components/contact-history/contact-history.component';
import { DatePipe, NgClass, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { AngularSplitModule } from 'angular-split';
import { ContactDocumentsComponent } from './shared/components/contact-documents/contact-documents.component';

const routes: Routes = [
  {
    path: 'pages/tickets',
    component: TicketsComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'pages/dashboard',
    component: DashboardComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'pages/contacts',
    component: ContactsComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'pages/accounts',
    component: AccountsComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'login-form',
    component: LoginFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'reset-password',
    component: ResetPasswordFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'create-account',
    component: CreateAccountFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'change-password/:recoveryCode',
    component: ChangePasswordFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true }), 
    DxDataGridModule, 
    DxFormModule, 
    DxButtonModule, 
    DxTextAreaModule,
    DxLoadIndicatorModule, 
    DxBoxModule, 
    DxTextBoxModule,
    DxListModule, 
    DxToolbarModule,
    DxTabPanelModule,
    DxLoadPanelModule,
    DxScrollViewModule,
    DxHtmlEditorModule,
    DxFileUploaderModule,
    DxAccordionModule,
    DxSelectBoxModule,
    DxTagBoxModule,
    DxDateBoxModule,
    DxCheckBoxModule,
    NgSwitch, NgSwitchCase, NgSwitchDefault, NgIf, NgClass,
    DatePipe,
    AngularSplitModule
  ],
  providers: [AuthGuardService],
  exports: [RouterModule],
  declarations: [
    HomeComponent,
    ProfileComponent,
    AccountsComponent,
    ContactsComponent,
    DashboardComponent,
    TicketsComponent,
    TicketsListComponent,
    TicketEditorComponent,
    InteractionsListComponent,
    EmailEditorComponent,
    InternalNoteEditorComponent,
    ContactInfoComponent,
    ContactHistoryComponent,
    ContactDocumentsComponent
  ]
})
export class AppRoutingModule { }
