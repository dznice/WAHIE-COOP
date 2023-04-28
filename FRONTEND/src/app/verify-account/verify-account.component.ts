import { Component, OnInit, OnDestroy, ViewEncapsulation, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TokenService } from '../services/token.service';;
import { AuthGuardService } from '../services/auth-guard.service';
import { BackendService } from '../services/backend.service';

@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.component.html',
  styleUrls: ['./verify-account.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class VerifyAccountComponent implements OnInit, OnDestroy {
  constructor(@Inject(DOCUMENT) private _document: any, private token:TokenService, private Auth:AuthGuardService,
  private backend:BackendService, private route:Router, private http:HttpClient
  ){}

  ngOnInit() {
    this._document.body.classList.add('body');
  }

  ngOnDestroy() {
    this._document.body.classList.add('body');
  }

  /**MODAL*/
  showModal = -1;
  show(index: number) {
    this.showModal = index;
  }

  id = localStorage.getItem('userData');
  public form = {
    id: null,
    otp: null,
  }

  otp: string = "";

  email = sessionStorage.getItem('email');

  getOtp(data: any) {
    console.log(data);
    this.id = sessionStorage.getItem('userData'),
    this.otp = (<HTMLInputElement>document.getElementById("otp")).value;
    this.updateData();
  }

  updateData() {
    let body = {
      'code': this.otp,
      'id' : this.id
    }
    
    console.log(this.otp)
    this.http.post('http://127.0.0.1:8000/api/users/updateOtp' + '/' + this.id, body).subscribe(
      (res:any)=>{
      if(res.status==2) {
       this.route.navigateByUrl('not-verified');
      } else if(res.status==0) {
        this.route.navigateByUrl('disable-account');
      } else if(res.status==1) {
        this.token.verifyHandle(sessionStorage.getItem('ftoken'));  
        this.Auth.changeStatus(true);
        this.route.navigateByUrl('members-home');
      }
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
