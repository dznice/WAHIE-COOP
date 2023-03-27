import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { SuperAdminComponent } from './super-admin/super-admin.component';
import { BodyComponent } from './admin/body/body.component';
import { AdminSidenavComponent } from './admin/admin-sidenav/admin-sidenav.component';
import { AccountingComponent } from './admin/accounting/accounting.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { MembersComponent } from './admin/members/members.component';
import { InventoryComponent } from './admin/inventory/inventory.component';
import { JournalEntryComponent } from './admin/accounting/journal-entry/journal-entry.component';
import { AddInvoiceComponent } from './admin/members/add-invoice/add-invoice.component';
import { AddMembersComponent } from './admin/members/add-members/add-members.component';
import { AddPaymentComponent } from './admin/members/add-payment/add-payment.component';
import { SadminSidenavComponent } from './super-admin/sadmin-sidenav/sadmin-sidenav.component';
import { SadminHomeComponent } from './super-admin/sadmin-home/sadmin-home.component';
import { ActivityLogsComponent } from './super-admin/activity-logs/activity-logs.component';
import { SadminSettingsComponent } from './super-admin/sadmin-settings/sadmin-settings.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { VerifyAccountComponent } from './verify-account/verify-account.component';
import { ForgotPassComponent } from './forgot-pass/forgot-pass.component';
import { CheckEmailComponent } from './check-email/check-email.component';
import { ChangePassComponent } from './change-pass/change-pass.component';
import { PassDoneComponent } from './pass-done/pass-done.component';
import { SadminChpassComponent } from './sadmin-chpass/sadmin-chpass.component';
import { SadminPassdoneComponent } from './sadmin-passdone/sadmin-passdone.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    SuperAdminComponent,
    BodyComponent,
    AdminSidenavComponent,
    AccountingComponent,
    AdminHomeComponent,
    MembersComponent,
    InventoryComponent,
    JournalEntryComponent,
    AddInvoiceComponent,
    AddMembersComponent,
    AddPaymentComponent,
    SadminSidenavComponent,
    SadminHomeComponent,
    ActivityLogsComponent,
    SadminSettingsComponent,
    LoginComponent,
    RegisterComponent,
    VerifyAccountComponent,
    ForgotPassComponent,
    CheckEmailComponent,
    ChangePassComponent,
    PassDoneComponent,
    SadminChpassComponent,
    SadminPassdoneComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
