import { Component, OnInit, OnDestroy, ViewEncapsulation, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { slider, slideright } from '../animation';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BackendService } from '../services/backend.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { NgToastService } from'ng-angular-popup';

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.scss'],
  animations: [slideright, slider],
  encapsulation: ViewEncapsulation.Emulated,
})
export class ChangePassComponent implements OnInit, OnDestroy {
  isDisplayed: boolean = true;
  toggleDiv() {
    this.cvisible = !this.cvisible;
    this.cchangetype = !this.cchangetype;
  }

  visible: boolean = true;
  changetype: boolean = true;
  viewpass() {
    this.visible = !this.visible;
    this.changetype = !this.changetype;
  }

  cvisible: boolean = true;
  cchangetype: boolean = true;
  cviewpass() {
    this.cvisible = !this.cvisible;
    this.cchangetype = !this.cchangetype;
  }

  changePassForm!: FormGroup;

  constructor(
    @Inject(DOCUMENT) private _document: any,
    private fb: FormBuilder, private backend:BackendService, private http:HttpClient,
    private aRouter: ActivatedRoute, private route:Router, private toast: NgToastService
  ) {

  }

  passwordMatch(controlName: string, matchControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchControl = formGroup.controls[matchControlName];
      if (matchControl.errors && !matchControl.errors['passwordMatch']) {
        return;
      }
      if (control.value !== matchControl.value) {
        matchControl.setErrors({ passwordMatch: true });
        
      } else {
        matchControl.setErrors(null);
      }
    };
  }

  get frm() {
    return this.changePassForm.controls;
  }
  private urlId : Subscription;
  id:string = '';
  token:string = '';
  
  ngOnInit() {
    this.aRouter.url.subscribe(console.log);
    this.urlId = this.aRouter.params.subscribe(
      params=>{

      console.log(params);
      console.log(params['id'])
      this.id = params['id']
      console.log(params['token'])
      this.token = params['token']
     
    })  
    
    this._document.body.classList.add('body');

    this.changePassForm = this.fb.group(
      {
        password: new FormControl(null, [Validators.required]),

        confirm_pass: new FormControl(null, [Validators.required]),
      },
      {
        validator: this.passwordMatch('password', 'confirm_pass'),
      }
    );
  }

  onSubmit() {
    
    this.changePassForm.get('password')?.markAsTouched();

    this.changePassForm.get('confirm_pass')?.markAsTouched();
    
  }

  ngOnDestroy() {
    this._document.body.classList.add('body');
  }

  onStrengthChange(score: any) {
    console.log('new score', score);
  }


  public fpform ={
    password: null,
    confirm_pass:null,
    token: this.token,
    id: this.id
  }


  changePass(){
    if( this.changePassForm.pristine){
      this.toast.error({detail:'Input required',summary:'Fill all the inputs to submit',duration:2000 , sticky:false,position:'tr'}); 
    
    }
    else if (this.changePassForm.invalid){
      this.toast.error({detail:'Error',summary:'Password not match ',duration:2000 , sticky:false,position:'tr'}); 
     }
    else{
      this.http.post('http://127.0.0.1:8000/api/users/forgotChange' + '/' + this.id, this.fpform).subscribe(
        (res: any) => {
          console.log(res);
          this.toast.success({detail:'Success',summary:'Password changed',duration:2000, sticky:false,position:'tr'});  
          this.route.navigateByUrl('login');
          
        });
    }
  }
  
}