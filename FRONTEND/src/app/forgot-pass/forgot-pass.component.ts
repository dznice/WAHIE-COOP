import { Component , OnInit, OnDestroy, ViewEncapsulation, Inject} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { formState, formState5, formState6, slider, slideright} from '../animation';
import { Router } from '@angular/router';
import { BackendService } from '../services/backend.service';
import { HttpClient } from '@angular/common/http';
import { NgToastService } from 'ng-angular-popup';
@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.component.html',
  styleUrls: ['./forgot-pass.component.scss'],
  animations:[formState, formState5, formState6,slideright, slider],
  encapsulation: ViewEncapsulation.Emulated,
})
export class ForgotPassComponent  implements OnInit, OnDestroy {

  loader = false;
  loader2 = true;

  // state = 'forgot-pass';
  // toggle() {
  //   this.state = this.state == 'forgot-pass'?'check-email':'new-pass';
  // }

  // get forgotpassState() {
  //   return this.state == 'forgot-pass'?'show':'hide';
  // }p

  // get checkemailState() {
  //   return this.state == 'check-email'?'show':'hide';
  // }

  isDisplayed: boolean = true;
  toggleDiv(){
    this.isDisplayed = this.isDisplayed? false:true;
  }

  constructor(@Inject(DOCUMENT) private _document: any, private route:Router, private backend:BackendService,
  private http:HttpClient, private toast:NgToastService){}

  ngOnInit() {
    this._document.body.classList.add('body');
  }

  ngOnDestroy() {
    this._document.body.classList.add('body');
  }

  email:string ='null'
  
  submitEmail(){
  this.email = (<HTMLInputElement>document.getElementById("email")).value;
  this.sendLink();
}



sendLink(){
  let body = {
    'email': this.email,
  }
  this.http.post('http://127.0.0.1:8000/api/users/forgotPass' + '/' + this.email, body).subscribe((res: any) => {
 
        console.log(res);
        sessionStorage.setItem('email', this.email)
        this.route.navigateByUrl('check-email'); 
      
    });

    
}

}
