import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPassComponent } from './forgot-pass/forgot-pass.component';
import { VerifyAccountComponent } from './verify-account/verify-account.component';
import { CheckEmailComponent } from './check-email/check-email.component';
import { ChangePassComponent } from './change-pass/change-pass.component';
import { PassDoneComponent } from './pass-done/pass-done.component';
import { AdminComponent } from './admin/admin.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { AccountingComponent } from './admin/accounting/accounting.component';
import { InventoryComponent } from './admin/inventory/inventory.component';
import { SadminChpassComponent } from './sadmin-chpass/sadmin-chpass.component';
import { SadminHomeComponent } from './super-admin/sadmin-home/sadmin-home.component';
import { ActivityLogsComponent } from './super-admin/activity-logs/activity-logs.component';
import { SadminSettingsComponent } from './super-admin/sadmin-settings/sadmin-settings.component';
import { JournalEntryComponent } from './admin/accounting/journal-entry/journal-entry.component';
import { AddInvoiceComponent } from './admin/accounting/add-invoice/add-invoice.component';
import { AddPaymentComponent } from './admin/accounting/add-payment/add-payment.component';
import { AdminBodyComponent } from './admin/admin-body/admin-body.component';
import { SadminBodyComponent } from './super-admin/sadmin-body/sadmin-body.component';
import { SuperAdminComponent } from './super-admin/super-admin.component';
import { NotVerifiedComponent } from './not-verified/not-verified.component';
import { DisableAccountComponent } from './disable-account/disable-account.component';
import { MemberInfoComponent } from './admin/accounting/member-info/member-info.component';
import { AuthGuardService } from './services/auth-guard.service';
import { LoggedInService } from './services/logged-in.service';
import { NotLoggedInService } from './services/not-logged-in.service';
import { AdminOnlyService } from './services/admin-only.service';
import { SuperadminOnlyService } from './services/superadmin-only.service';
import { RegMembersComponent } from './reg-members/reg-members.component';
import { MemberHomeComponent } from './member/member-home/member-home.component';
import { AdditionalInfoComponent } from './member/additional-info/additional-info.component';
import { MemberComponent } from './member/member.component';
import { MemberProfileComponent } from './member/member-profile/member-profile.component';
import { MemberBodyComponent } from './member/member-body/member-body.component';
import { MemberOnlyService } from './services/member-only.service';
import { NullPageComponent } from './null-page/null-page.component';
import { ManageMembersComponent } from './admin/manage-members/manage-members.component';
import { AdminChpassComponent } from './admin-chpass/admin-chpass.component';
import { JournalTransacComponent } from './admin/accounting/journal-transac/journal-transac.component';
import { ReportsComponent } from './admin/reports/reports.component';
import { GenerateLedgerComponent } from './admin/reports/generate-ledger/generate-ledger.component';
import { FsFinconComponent } from './admin/reports/fs-fincon/fs-fincon.component';
import { FsOpComponent } from './admin/reports/fs-op/fs-op.component';
import { SlAccountsComponent } from './admin/reports/sl-accounts/sl-accounts.component';
import { SlMembersComponent } from './admin/reports/sl-members/sl-members.component';
import { TrialBalanceComponent } from './admin/reports/trial-balance/trial-balance.component';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate : [NotLoggedInService]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate : [NotLoggedInService]
  },
  {
    path: 'register-member',
    component: RegMembersComponent,

  },
  {
    path: '',
    pathMatch: 'full',
    component: NullPageComponent,
  },
  {
    path: 'forgot-pass',
    component: ForgotPassComponent,
  },
  {
    path: 'verify-account',
    component: VerifyAccountComponent,
  },
  {
    path: 'check-email',
    component: CheckEmailComponent,
  },
  {
    path: 'change-pass/:id/:token',
    component: ChangePassComponent,
  },
  {
    path: 'pass-done',
    component: PassDoneComponent,
  },
  {
    path: 'sadmin-chpass',
    component: SadminChpassComponent,
  },
  {
    path: 'not-verified',
    component: NotVerifiedComponent,
  },
  {
    path: 'disable-account',
    component: DisableAccountComponent,
  },
  {
    path: 'member-home',
    component: MemberHomeComponent,
  },
  {
  path: 'additional-info',
  component: AdditionalInfoComponent
  },
  {
    path: 'admin-chpass',
    component: AdminChpassComponent,
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate : [LoggedInService , AdminOnlyService],
    children : [
      {path: '', redirectTo: 'admin-home', pathMatch: 'full'},
      {path: 'admin-home', component: AdminHomeComponent},
      {path: 'accounting', component: AccountingComponent},
      {path: 'accounting/journal-entry', component: JournalEntryComponent},
      {path: 'accounting/add-invoice', component: AddInvoiceComponent},
      {path: 'accounting/add-payment', component: AddPaymentComponent},
      {path: 'accounting/journal-transac', component: JournalTransacComponent},
      {path: 'accounting/journal-transac/:transacId', component: JournalTransacComponent},
      {path: 'accounting/add-payment/:memberId', component: AddPaymentComponent},
      {path: 'accounting/member-info/:memberId', component: MemberInfoComponent},
      {path: 'manage-members', component: ManageMembersComponent},
      {path: 'reports', component: ReportsComponent},
      {path: 'reports/generate-ledger', component: GenerateLedgerComponent},
      {path: 'reports/fs-fincon', component: FsFinconComponent},
      {path: 'reports/fs-op', component: FsOpComponent},
      {path: 'reports/sl-accounts', component: SlAccountsComponent},
      {path: 'reports/sl-members', component: SlMembersComponent},
      {path: 'reports/trial-balance', component: TrialBalanceComponent},
      {path: 'inventory', component: InventoryComponent},
      {path: 'admin-body', component: AdminBodyComponent}
    ]
  },
  {
    path: 'member',
    component: MemberComponent,
    canActivate : [LoggedInService, MemberOnlyService],
    children : [
      {path: '', redirectTo: 'member-home', pathMatch: 'full'},
      {path: 'member-home', component: MemberHomeComponent},
      {path: 'member-profile', component: MemberProfileComponent},
      {path: 'member-body', component: MemberBodyComponent}
    ]
  },
  {
    path: 'super-admin',
    component: SuperAdminComponent,
    canActivate : [LoggedInService, SuperadminOnlyService],
    children : [
      {path: '', redirectTo: 'sadmin-home', pathMatch: 'full'},
      {path: 'sadmin-home', component: SadminHomeComponent},
      {path: 'activity-logs', component: ActivityLogsComponent},
      {path: 'sadmin-settings', component: SadminSettingsComponent},
      {path: 'sadmin-body', component: SadminBodyComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuardService]
})
export class AppRoutingModule {}
