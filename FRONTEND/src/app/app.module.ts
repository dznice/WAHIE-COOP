import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { SuperAdminComponent } from './super-admin/super-admin.component';
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
import { FormsModule, NgSelectOption, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StrengthMeterModule } from "ngx-strength-meter";
import { AdminBodyComponent } from './admin/admin-body/admin-body.component';
import { SadminBodyComponent } from './super-admin/sadmin-body/sadmin-body.component';
import { NotVerifiedComponent } from './not-verified/not-verified.component';
import { DisableAccountComponent } from './disable-account/disable-account.component';
import { MemberInfoComponent } from './admin/members/member-info/member-info.component';
import { RegMembersComponent } from './reg-members/reg-members.component';
import { AdditionalInfoComponent } from './member/additional-info/additional-info.component';
import { MemberComponent } from './member/member.component';
import { MemberProfileComponent } from './member/member-profile/member-profile.component';
import { MemberHomeComponent } from './member/member-home/member-home.component';
import { MemberBodyComponent } from './member/member-body/member-body.component';
import { MemberSidenavComponent } from './member/member-sidenav/member-sidenav.component';
import { AdminChpassComponent } from './admin-chpass/admin-chpass.component';
import { AdminPassdoneComponent } from './admin-passdone/admin-passdone.component';

import { HttpClientModule } from '@angular/common/http';
import { AuthGuardService } from './services/auth-guard.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';  
import { NgToastModule}  from 'ng-angular-popup';
import { NgSelectModule } from '@ng-select/ng-select';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { FilterPipe } from './admin/accounting/filter.pipe';
import { FilterDatePipe } from './admin/accounting/filter-date.pipe';
import { FilterMemberPipe } from './admin/members/filter-member.pipe';
import { FilterHomePipe } from './admin/admin-home/hfilter.pipe';
import { FilterHomeDatePipe } from './admin/admin-home/hfilter-date.pipe';
import { FilterInvPipe } from './admin/inventory/filter-inv.pipe';
import { SearchPipe } from './super-admin/sadmin-home/accSearch.pipe';
import { FilterLogDatePipe } from './super-admin/activity-logs/logDate.pipe';
import { FilterLogsPipe } from './super-admin/activity-logs/filterLog.pipe';
import { FilterMemHomeDatePipe } from './member/member-home/mfilter-date.pipe';
import { FilterPaymentDatePipe } from './admin/members/add-payment/pfilter-date.pipe';
import { NullPageComponent } from './null-page/null-page.component';
import { ManageMembersComponent } from './admin/manage-members/manage-members.component';


@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    SuperAdminComponent,
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
    SadminPassdoneComponent,
    AdminBodyComponent,
    SadminBodyComponent,
    NotVerifiedComponent,
    DisableAccountComponent,
    MemberInfoComponent,
    FilterPipe,
    FilterDatePipe,
    FilterMemberPipe,
    FilterHomePipe,
    FilterHomeDatePipe,
    SearchPipe,
    FilterLogDatePipe,
    FilterLogsPipe,
    FilterInvPipe,
    RegMembersComponent,
    AdditionalInfoComponent,
    MemberComponent,
    MemberProfileComponent,
    MemberHomeComponent,
    MemberBodyComponent,
    MemberSidenavComponent,
    AdminChpassComponent,
    AdminPassdoneComponent,
    FilterMemHomeDatePipe,
    FilterPaymentDatePipe,
    NullPageComponent,
    ManageMembersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    StrengthMeterModule,
    FilterPipeModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    HttpClientModule,
    NgToastModule,
    NgSelectModule
  ],
  providers: [AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
