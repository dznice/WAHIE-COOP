import { Component, OnInit, OnDestroy, ViewEncapsulation, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { slider, slideright} from '../animation';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.scss'],
  animations:[slideright, slider],
  encapsulation: ViewEncapsulation.None,
})
export class ChangePassComponent implements OnInit, OnDestroy {

  form!: FormGroup;

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
  
  constructor(@Inject(DOCUMENT) private _document: any, private fb: FormBuilder){}

  ngOnInit(): void {
    this._document.body.classList.add('body');
    this.form = this.fb.group({
      password: ['', Validators.required],
    });
  }

  ngOnDestroy() {
    this._document.body.classList.add('body');
  }

  onStrengthChange(score: any) {
    console.log('new score', score);
  }


}