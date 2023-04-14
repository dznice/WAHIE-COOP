import { Component, OnInit, OnDestroy, ViewEncapsulation, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { slider, slideright} from '../animation';



@Component({
  selector: 'app-not-verified',
  templateUrl: './not-verified.component.html',
  styleUrls: ['./not-verified.component.scss'],
  animations:[slideright, slider],
  encapsulation: ViewEncapsulation.Emulated,
})
export class NotVerifiedComponent implements OnInit, OnDestroy {

  isDisplayed: boolean = true;
  toggleDiv(){
    this.isDisplayed = this.isDisplayed? false:true;
  }
  
  constructor(@Inject(DOCUMENT) private _document: any){}

  ngOnInit() {
    this._document.body.classList.add('body');
  }

  ngOnDestroy() {
    this._document.body.classList.add('body');
  }

}