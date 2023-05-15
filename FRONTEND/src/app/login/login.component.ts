import { Component,OnInit, OnDestroy, ViewEncapsulation, Inject  } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { formState, formState2, formState3, formState4, formState5, slideleft, slideright } from '../animation';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import {BackendService} from '../services/backend.service';
import {TokenService} from '../services/token.service';
import { Router } from '@angular/router';
import { AuthGuardService } from '../services/auth-guard.service';
import { NgToastService } from'ng-angular-popup';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [formState, formState2, formState3, formState4, formState5, slideleft, slideright],
  encapsulation: ViewEncapsulation.Emulated,
})
export class LoginComponent implements OnInit, OnDestroy  {


  isDisplayed: boolean = true;
  toggleDiv(){
    this.isDisplayed = this.isDisplayed? false:true;
  }
  
  visible:boolean = true;
  changetype:boolean = true;
  viewpass(){
    this.visible = !this.visible
    this.changetype = !this.changetype
  }

  cvisible:boolean = true;
  cchangetype:boolean = true;
  cviewpass(){
    this.cvisible = !this.cvisible
    this.cchangetype = !this.cchangetype
  }

  
  submitted:boolean = false;

  constructor(@Inject(DOCUMENT) private _document: any , private backend:BackendService,
   private token:TokenService, private route:Router , private Auth:AuthGuardService, private toast: NgToastService ){
    localStorage.clear();
    sessionStorage.clear();
   }


  loginForm = new FormGroup({
  
    email : new FormControl("", [Validators.required]),

    password : new FormControl("", [Validators.required]),

  })
  public form = {
    email:null,
    password:null
  }

  getControl(name: any): AbstractControl | null{
    return this.loginForm.get(name)
  }

  onSubmit(){
    this.submitted = true;
    if(this.loginForm.invalid){
      return;
    }
  }

  ngOnInit() {
    this._document.body.classList.add('body');
  }

  ngOnDestroy() {
    this._document.body.classList.add('body');
    
  }
  public error = null;

  submitLogin(){
    return this.backend.login(this.form).subscribe( 
      data=>this.handleResponse(data),
    )
  }
  get f() { return this.loginForm.controls; } 

  handleResponse(user:any){
    console.log(user.access_token);
    localStorage.setItem('userData', JSON.stringify(user.user['id']))
    localStorage.setItem('userRole', JSON.stringify(user.user['role_id']))
    sessionStorage.setItem('name', (user.user['name']))


    //admin
    if(user.user['role_id']==1){
       //otpinput
      if(user.user['code']!=0){
        this.token.ftoken(user.access_token);
        this.route.navigateByUrl('admin-chpass');
        this.toast.success({detail:'Success',summary:'Change your password',duration:2000, sticky:false,position:'tr'});  
      }
      else if(user.user['code']==0){
        
           if(user.user['status']==1){
            this.token.handle(user.access_token);
            this.Auth.changeStatus(true);
            this.route.navigateByUrl('admin/admin-home');//verified
            this.toast.success({detail:'Welcome',summary:'Successfully logged in',duration:2000, sticky:false,position:'tr'});  
          } 
          else if(user.user['status']==0){
            this.route.navigateByUrl('disable-account');//disabled
            this.toast.warning({detail:'Sorry',summary:'Your account is disabled',duration:2000, sticky:false,position:'tr'});
          }
      }

    }
    
    //superadmin
    else if(user.user['role_id']==2){
      if(user.user['code']!=0){
        this.token.ftoken(user.access_token);
        this.route.navigateByUrl('sadmin-chpass');
        this.toast.success({detail:'Success',summary:'Change your password',duration:2000, sticky:false,position:'tr'});  
      }else{
        this.token.handle(user.access_token);
        this.route.navigateByUrl('super-admin/sadmin-home');
        this.toast.success({detail:'Welcome back',summary:'Successfully logged in',duration:2000, sticky:false,position:'tr'}); 
      }
     
    }
   
    //members
    else if(user.user['role_id']==3){
      if(user.user['code']!=0){
        sessionStorage.setItem('email', user.user['email'])
        this.token.ftoken(user.access_token);
        this.route.navigateByUrl('verify-account');//code not yet input
        this.toast.success({detail:'Welcome',summary:'Please input first the otp',duration:2000, sticky:false,position:'tr'}); 
      }
      else if(user.user['code']==0){
        //verified
          if(user.user['status']==2){
            this.route.navigateByUrl('not-verified');//not verified
            this.toast.warning({detail:'Sorry',summary:'You are not yet verified',duration:2000, sticky:false,position:'tr'});
          }
          else if(user.user['status']==1){
            if(user.user['fillInfo']==1){
              sessionStorage.setItem('email', user.user['email'])
              this.token.ftoken(user.access_token);
              this.route.navigateByUrl('additional-info');// not complete information
              this.toast.success({detail:'Welcome',summary:'Please update your information',duration:2000, sticky:false,position:'tr'});
            }else if(user.user['fillInfo']==0){
              this.token.handle(user.access_token);
              this.Auth.changeStatus(true);
              this.route.navigateByUrl('member/member-home');//verified
              this.toast.success({detail:'Welcome back',summary:'Successfully logged in',duration:2000, sticky:false,position:'tr'});  
            }
           
          } 
          else if(user.user['status']==0){
            this.route.navigateByUrl('disable-account');//disabled
            this.toast.warning({detail:'Sorry',summary:'Your account has been disabled',duration:2000 , sticky:false,position:'tr'});
          }
      }
     
    }
 
  }
  handleError(error:any){
    this.error = error.error.error;
    
  }

}