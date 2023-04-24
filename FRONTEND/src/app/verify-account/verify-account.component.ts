import { Component, OnInit, OnDestroy, ViewEncapsulation, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { BackendService } from '../services/backend.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.component.html',
  styleUrls: ['./verify-account.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class VerifyAccountComponent implements OnInit, OnDestroy {
  constructor(
    @Inject(DOCUMENT) private _document: any,
    private backend: BackendService,
    private route: Router,
    private http: HttpClient
  ) {}

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
  getOtp(data: any) {
    this.id = localStorage.getItem('userData'),
    this.otp = (<HTMLInputElement>document.getElementById('otp')).value;
    this.updateData();
  }

  updateData() {
    let body = {
      'code': this.otp,
      'id': this.id,
    }
    console.log(this.otp);
    this.http.post('http://127.0.0.1:8000/api/users/updateOtp' + '/' + this.id, body).subscribe(
      (res: any) => {
        console.log(res);
        if (res.status == 2) {
          this.route.navigateByUrl('not-verified');
        } else if (res.status == 1) {
          this.route.navigateByUrl('disable-account');
        } else if (res.status == 1) {
          this.route.navigateByUrl('admin/admin-home');
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
