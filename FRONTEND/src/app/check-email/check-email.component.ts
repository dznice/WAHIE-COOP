import { Component, OnInit, OnDestroy, ViewEncapsulation, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { slider, slideright} from '../animation';
import { HttpClient } from '@angular/common/http';
import { NgToastService } from 'ng-angular-popup';


@Component({
  selector: 'app-check-email',
  templateUrl: './check-email.component.html',
  styleUrls: ['./check-email.component.scss'],
  animations:[slideright, slider],
  encapsulation: ViewEncapsulation.Emulated,
})
export class CheckEmailComponent implements OnInit, OnDestroy {

  isDisplayed: boolean = true;
  toggleDiv() {
    this.isDisplayed = this.isDisplayed? false:true;
  }

  constructor(@Inject(DOCUMENT) private _document: any, private http:HttpClient, private toast:NgToastService){
    this.email = sessionStorage.getItem('email')
  }

  ngOnInit() {
    this._document.body.classList.add('body');
   
  }

  ngOnDestroy() {
    this._document.body.classList.add('body');
  }

  email:any='';

  resendEmail(){
    this.toast.success({detail:'Success',summary:'Email sent',duration:2000, sticky:false,position:'tr'});
    let body = {
      'email': this.email,
    }
    this.http.post('http://127.0.0.1:8000/api/users/forgotPass' + '/' + this.email, body).subscribe((res: any) => { 
          console.log(res);
  
    })
}
}
