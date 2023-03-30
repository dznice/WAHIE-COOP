import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPassComponent } from './forgot-pass/forgot-pass.component';
import { VerifyAccountComponent } from './verify-account/verify-account.component';
import { CheckEmailComponent } from './check-email/check-email.component';

const routes: Routes = [{
  path: 'login', 
  component: LoginComponent
},
{
  path: 'register', 
  component: RegisterComponent
},
{
  path: '',
  redirectTo: 'login',
  pathMatch: 'full'
},
{
  path: 'forgot-pass', 
  component: ForgotPassComponent
},
{
  path: 'verify-account', 
  component: VerifyAccountComponent
},
{
  path: 'check-email', 
  component: CheckEmailComponent
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
