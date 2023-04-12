import { Component, OnInit, OnDestroy, ViewEncapsulation, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.component.html',
  styleUrls: ['./verify-account.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class VerifyAccountComponent implements OnInit, OnDestroy{

  constructor(@Inject(DOCUMENT) private _document: any){}
  
    ngOnInit() {
      this._document.body.classList.add('body');
    }
  
    ngOnDestroy() {
      this._document.body.classList.add('body');
    }

    /**MODAL*/
    showModal = -1;
    show(index: number){
      this.showModal = index;
    }

}
