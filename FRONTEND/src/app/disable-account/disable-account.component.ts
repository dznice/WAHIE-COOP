import { Component, OnInit, OnDestroy, ViewEncapsulation, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { slider, slideright} from '../animation';
import { AuthGuardService } from '../services/auth-guard.service';

@Component({
  selector: 'app-disable-account',
  templateUrl: './disable-account.component.html',
  styleUrls: ['./disable-account.component.scss'],
  animations:[slideright, slider],
  encapsulation: ViewEncapsulation.Emulated,
})
export class DisableAccountComponent implements OnInit, OnDestroy {

  isDisplayed: boolean = true;
  toggleDiv(){
    this.isDisplayed = this.isDisplayed? false:true;
  }
  
  constructor(@Inject(DOCUMENT) private _document: any, private auth:AuthGuardService){}

  ngOnInit() {
    this._document.body.classList.add('body');
  }

  ngOnDestroy() {
    this._document.body.classList.add('body');
  }

  logout(event:MouseEvent){
    event.preventDefault();
    this.auth.changeStatus(false);
    localStorage.clear();
  }
}
