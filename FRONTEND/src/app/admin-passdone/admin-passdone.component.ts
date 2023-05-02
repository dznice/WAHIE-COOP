import { Component, OnInit, OnDestroy, ViewEncapsulation, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { slider, slideright} from '../animation';

@Component({
  selector: 'app-admin-passdone',
  templateUrl: './admin-passdone.component.html',
  styleUrls: ['./admin-passdone.component.scss'],
  animations:[slideright, slider],
  encapsulation: ViewEncapsulation.Emulated
})
export class AdminPassdoneComponent implements OnInit, OnDestroy {

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
