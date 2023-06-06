import { Component, OnInit, OnDestroy, ViewEncapsulation, Inject, ErrorHandler } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TokenService } from '../services/token.service';;
import { AuthGuardService } from '../services/auth-guard.service';
import { BackendService } from '../services/backend.service';
import { NgToastService } from'ng-angular-popup';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.component.html',
  styleUrls: ['./verify-account.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class VerifyAccountComponent implements OnInit, OnDestroy {

  otpForm!: FormGroup;


  constructor(@Inject(DOCUMENT) private _document: any, private fb: FormBuilder,private token:TokenService, private Auth:AuthGuardService,
  private backend:BackendService, private route:Router, private http:HttpClient, private toast: NgToastService
  ){}

  ngOnInit() {
    this._document.body.classList.add('body');

    this.otpForm = this.fb.group(
      {
        code: new FormControl(null),
      },
    );

  }

  ngOnDestroy() {
    this._document.body.classList.add('body');
  }

  /**MODAL*/
  showModal = -1;
  show() {
    this.showModal = 1;
  }

  id = localStorage.getItem('userData');
  public form = {
    id: null,
    otp: null,
  }

  otp: string = "";

  email = sessionStorage.getItem('email');

  getOtp(data: any) {
    if(this.otpForm.invalid){
      this.toast.error({detail:'Error',summary:'Invalid code, no code input',duration:2000, sticky:false,position:'tr'}); 

    
    
  }
  else{
    console.log(data);
    this.id = localStorage.getItem('userData'),
    this.otp = (<HTMLInputElement>document.getElementById("otp")).value;
    this.updateData();
  }

  }

  updateData() {
    let body = {
      'code': this.otp,
      'id' : this.id
    }
    
    console.log(this.otp)
    
    this.http.post('http://127.0.0.1:8000/api/users/updateOtp' + '/' + this.id, body).subscribe(
      (res:any)=>{
      
    console.log(res)
      if(res.status==2) {
        this.toast.success({detail:'success',summary:'Please wait for a moment.',duration:2000, sticky:false,position:'tr'}); 
       this.route.navigateByUrl('not-verified');
       
      } else if(res.status==0) {
        this.route.navigateByUrl('disable-account');
      } else if(res.status==1) {
        this.route.navigateByUrl('login');
        this.toast.success({detail:'Success',summary:'Email has been verified',duration:2000, sticky:false,position:'tr'}); 
      }
      
      },
      error => {
        this.toast.error({detail:'Error',summary:'Invalid code, no code input',duration:2000, sticky:false,position:'tr'}); 
      }
    )
  }

  resendOtp() {
    let body = {
      code: this.otp,
      id: this.id,
    };
    console.log(this.otp);
    this.http.post('http://127.0.0.1:8000/api/users/resendOtp' + '/' + this.id, body).subscribe((res: any) => {
        console.log(res);
      });
  }

  public error = null;
  handleError(error: any) {
    this.error = error.error.error;
  }
}
