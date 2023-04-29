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
import { MembersComponent } from './admin/members/members.component';
import { InventoryComponent } from './admin/inventory/inventory.component';
import { SadminChpassComponent } from './sadmin-chpass/sadmin-chpass.component';
import { SadminPassdoneComponent } from './sadmin-passdone/sadmin-passdone.component';
import { SadminHomeComponent } from './super-admin/sadmin-home/sadmin-home.component';
import { ActivityLogsComponent } from './super-admin/activity-logs/activity-logs.component';
import { SadminSettingsComponent } from './super-admin/sadmin-settings/sadmin-settings.component';
import { JournalEntryComponent } from './admin/accounting/journal-entry/journal-entry.component';
import { AddInvoiceComponent } from './admin/members/add-invoice/add-invoice.component';
import { AddMembersComponent } from './admin/members/add-members/add-members.component';
import { AddPaymentComponent } from './admin/members/add-payment/add-payment.component';
import { AdminBodyComponent } from './admin/admin-body/admin-body.component';
import { SadminBodyComponent } from './super-admin/sadmin-body/sadmin-body.component';
import { SuperAdminComponent } from './super-admin/super-admin.component';
import { NotVerifiedComponent } from './not-verified/not-verified.component';
import { DisableAccountComponent } from './disable-account/disable-account.component';
import { MemberInfoComponent } from './admin/members/member-info/member-info.component';
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
    redirectTo: 'login',
    pathMatch: 'full',
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
    path: 'change-pass',
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
    path: 'sadmin-passdone',
    component: SadminPassdoneComponent,
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
    path: 'admin',
    component: AdminComponent,
    canActivate : [LoggedInService , AdminOnlyService],
    children : [
      {path: '', redirectTo: 'admin-home', pathMatch: 'full'},
      {path: 'admin-home', component: AdminHomeComponent},
      {path: 'accounting', component: AccountingComponent},
      {path: 'accounting/journal-entry', component: JournalEntryComponent},
      {path: 'members', component: MembersComponent},
      {path: 'members/add-invoice', component: AddInvoiceComponent},
      {path: 'members/add-members', component: AddMembersComponent},
      {path: 'members/add-payment', component: AddPaymentComponent},
      {path: 'members/member-info/:memberId', component: MemberInfoComponent},
      {path: 'inventory', component: InventoryComponent},
      {path: 'admin-body', component: AdminBodyComponent},
    ]
  },
  {
    path: 'member',
    component: MemberComponent,
    canActivate : [LoggedInService],
    children : [
      {path: '', redirectTo: 'member-home', pathMatch: 'full'},
      {path: 'member-home', component: MemberHomeComponent},
      {path: 'member-profile', component: MemberProfileComponent},
      {path: 'member-body', component: MemberBodyComponent},
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
