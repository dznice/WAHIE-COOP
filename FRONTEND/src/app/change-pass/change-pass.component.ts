import { Component, OnInit, OnDestroy, ViewEncapsulation, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { slider, slideright} from '../animation';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.scss'],
  animations:[slideright, slider],
  encapsulation: ViewEncapsulation.Emulated,
})
export class ChangePassComponent implements OnInit, OnDestroy {


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

  changePassForm!:FormGroup
  
  constructor(@Inject(DOCUMENT) private _document: any, private fb: FormBuilder){}

  passwordMatch(controlName: string, matchControlName: string){
    return (formGroup: FormGroup)=> {
        const control = formGroup.controls[controlName];
        const matchControl = formGroup.controls[matchControlName];
            if(matchControl.errors && !matchControl.errors['passwordMatch']){
                return;
            }
            if(control.value !== matchControl.value){
                matchControl.setErrors({passwordMatch:true});
            }else{
                matchControl.setErrors(null)
            }
    }
}

  get frm(){
    return this.changePassForm.controls;
  }

  
  ngOnInit() {
      this._document.body.classList.add('body');

      this.changePassForm = this.fb.group({
        
        "password": new FormControl(null, [Validators.required]),

        "confirm_pass": new FormControl(null, [Validators.required])
      }, {
        validator: this.passwordMatch('password', 'confirm_pass')
      })  
    }

  onSubmit(){
    this.changePassForm.get('password')?.markAsTouched();

    this.changePassForm.get('confirm_pass')?.markAsTouched();
  }

  ngOnDestroy() {
    this._document.body.classList.add('body');
  }

  onStrengthChange(score: any){
    console.log('new score', score);
  }

}