import { Component, OnInit, OnDestroy, ViewEncapsulation, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { slider, slideright} from '../animation';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BackendService } from '../services/backend.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TokenService } from '../services/token.service';
import { NgToastService } from 'ng-angular-popup';
import { empty } from 'rxjs';

@Component({
  selector: 'app-admin-chpass',
  templateUrl: './admin-chpass.component.html',
  styleUrls: ['./admin-chpass.component.scss'],
  animations:[slideright, slider],
  encapsulation: ViewEncapsulation.Emulated
})
export class AdminChpassComponent implements OnInit, OnDestroy {

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

  chpassForm!: FormGroup;

  constructor(@Inject(DOCUMENT) private _document: any, private fb: FormBuilder, private http:HttpClient, 
  private backend:BackendService, private route:Router, private token:TokenService,private toast:NgToastService ){}

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
    return this.chpassForm.controls;
  }

  ngOnInit(): void {
    this._document.body.classList.add('body');

    this.chpassForm = this.fb.group(
      {
        name: new FormControl(null),
        password: new FormControl(null),

        confirm_pass: new FormControl(null),
      },
      {
        validator: this.passwordMatch('password', 'confirm_pass'),
      }
    );

    /*this.form = this.fb.group({
      password: ['', Validators.required],
    });*/
  }

  onSubmit() {
    this.chpassForm.get('password')?.markAsTouched();

    this.chpassForm.get('confirm_pass')?.markAsTouched();
  }

  ngOnDestroy() {
    this._document.body.classList.add('body');
    // this.toast.success({detail:'Success',summary:'Successfuly logged out', sticky:false,position:'false'}); 
  }

  onStrengthChange(score: any) {
    console.log('new score', score);
  }

  id = localStorage.getItem('userData');
  public chform = {
    id : null,
    name: null,
    password: null,
    confirm_pass: null
  }


  submitPass(){
    
    // if( this.chpassForm.valid){
    //   this.toast.warning({detail:'Input required',summary:'Fill all the inputs to submit',duration:500 , sticky:false,position:'tr'}); 
    
    // }
    if (this.chpassForm.invalid){
      this.toast.error({detail:'Error',summary:'Password not match ',duration:2000 , sticky:false,position:'tr'}); 
     }

 else{
      
    this.http.post('http://127.0.0.1:8000/api/users/adminChange' + '/' + this.id, this.chform).subscribe(
      (res:any)=>{
        console.log(res.id);
        this.token.handle(sessionStorage.getItem('ftoken'));
        sessionStorage.clear();
        sessionStorage.setItem('name', res.name);
        this.route.navigateByUrl('admin/admin-home');
        this.toast.success({detail:'Welcome',summary:'Successfully logged in',duration:2000, sticky:false,position:'tr'});  
      
    },
    error => {
      this.toast.warning({detail:'Input required',summary:'Fill all the inputs to submit',duration:2000, sticky:false,position:'tr'});
    }
    ); 
  }
  }
}
