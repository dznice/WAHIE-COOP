import { Component, OnInit, OnDestroy, ViewEncapsulation, Inject} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { formState2, slideright2, slideleft2 } from '../animation';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BackendService } from '../services/backend.service';
import { TokenService } from '../services/token.service';
import { Router } from '@angular/router';
import { AuthGuardService } from '../services/auth-guard.service';


@Component({
  selector: 'app-reg-members',
  templateUrl: './reg-members.component.html',
  styleUrls: ['./reg-members.component.scss'],
  animations: [formState2, slideright2, slideleft2],
  encapsulation: ViewEncapsulation.Emulated,
})
export class RegMembersComponent implements OnInit, OnDestroy {

  state = 'info1';
  toggle() {
    this.state = this.state == 'info1'?'info2':'info3';
  }

  toggle3(){
    this.state = this.state == 'info1'?'info2':'info2';
  }
  
  toggle2() {
    this.state = this.state == 'info3'?'info2':'info1';
  }

  get info1State() {
    return this.state == 'info1'?'show':'hide';
  }

  get info2State() {
    return this.state == 'info2'?'show':'hide';
  }
  get info3State() {
    return this.state == 'info3'?'show':'hide';
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

  checkvisible:boolean = true;
  checkBox(){
    this.checkvisible = !this.checkvisible
  }

  registerForm!:FormGroup

  
  isDisplayed: boolean = true;
  toggleDiv(){
    this.isDisplayed = this.isDisplayed? false:true;
  }

  isDisplayed2: boolean = false;
  toggleDiv2(){
    this.isDisplayed2 = !this.isDisplayed2;
  }

  constructor(@Inject(DOCUMENT) private _document: any, private fb:FormBuilder, private backend:BackendService,
  private token:TokenService, private route:Router, private Auth:AuthGuardService){}

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
  return this.registerForm.controls;
}

ngOnInit() {
  this._document.body.classList.add('body');

  this.registerForm = this.fb.group({
    
    "first_name": new FormControl(null, [Validators.required]),

    "last_name": new FormControl(null, [Validators.required]),

    "middle_name": new FormControl(null, [Validators.required]),

    "suffix": new FormControl(null, [Validators.required]),

    "gender": new FormControl(null, [Validators.required]),

    "birthdate": new FormControl(null, [Validators.required]),

    "mobile_number": new FormControl(null, [Validators.required]),

    "company_name": new FormControl(null, [Validators.required]),

    "department": new FormControl(null, [Validators.required]),

    "email": new FormControl(null, [Validators.required]),

    "pass": new FormControl(null, [Validators.required]),
    
    "cpass": new FormControl(null, [Validators.required])
  }, {
    validator: this.passwordMatch('pass', 'cpass')
  })
}

onSubmit(){
  /**
  this.registerForm.get('name')?.markAsTouched();
  
  this.registerForm.get('email')?.markAsTouched();
   */

  this.registerForm.get('pass')?.markAsTouched();
  
  this.registerForm.get('cpass')?.markAsTouched();
  
}

  ngOnDestroy() {
    this._document.body.classList.add('body');
  }

  onStrengthChange(score: any){
    console.log('new score', score);
  }

  
    public error:any= [];
  
    public form = {
      first_name:null,
      middle_name:null,
      last_name:null,
      suffix:null,
      email:null,
      password:null,
     confirm_pass:null,
     mobile_number:null,
     gender:null,
     birthdate:null,
     company_name:null,
     department:null,
     

    }

    
    regMember(){
      console.log(this.form)
      return this.backend.register(this.form).subscribe(     
        data=>this.handleData(data)
   
        );
    }

    handleData(data:any){
  
      sessionStorage.setItem('email', JSON.stringify(data['email']));
      localStorage.setItem('userData', JSON.stringify(data['id']));
      this.route.navigateByUrl('verify-account');
    }
  
    handleError(error:any){
      this.error = error.error.error;
    }

    
    // isDisplayed: boolean = true;
    // toggleDiv(){
    //   this.isDisplayed = this.isDisplayed? false:true;
    // }
    
    // visible:boolean = true;
    // changetype:boolean = true;
    // viewpass(){
    //   this.visible = !this.visible
    //   this.changetype = !this.changetype
    // }
  
    // cvisible:boolean = true;
    // cchangetype:boolean = true;
    // cviewpass(){
    //   this.cvisible = !this.cvisible
    //   this.cchangetype = !this.cchangetype
    // }
  
    // checkvisible:boolean = true;
    // checkBox(){
    //   this.checkvisible = !this.checkvisible
    // }
  
    // submitted:boolean = false;
    
    // constructor(@Inject(DOCUMENT) private _document: any, private backend:BackendService,
    // private token:TokenService, private route:Router, private Auth:AuthGuardService ){}
  
    // memberForm = new FormGroup({
    //   first_name : new FormControl("", [Validators.required]),
    //   middle_name : new FormControl(""),
    //   last_name : new FormControl("", [Validators.required]),
    //   suffix : new FormControl(""),
    //   mobile_number : new FormControl("",[Validators.required]),
    //   gender : new FormControl(""),
    //   birthdate : new FormControl(""),
    //   company_name : new FormControl("", [Validators.required]),   
    //   department : new FormControl("", [Validators.required]),
    //   email : new FormControl("", [Validators.required]),
    //   password : new FormControl("", [Validators.required]),
    //   confirm_pass : new FormControl("", [Validators.required]),
    // }, [ passwordMatch("password", "confirm_pass") ])
  
    // getControl(name: any): AbstractControl | null{
    //   return this.memberForm.get(name)
    // }
  
    // onSubmit(){
    //   this.submitted = true;
    //   if(this.memberForm.invalid){
    //     return;
    //   }
    // }
  
    // ngOnInit() {
    //   this._document.body.classList.add('body');
    // }
  
    // ngOnDestroy() {
    //   this._document.body.classList.add('body');
    // }
  
    // public error:any= [];
  
    // public form = {
    //   first_name:null,
    //   middle_name:null,
    //   last_name:null,
    //   suffix:null,
    //   email:null,
    //   password:null,
    //  confirm_pass:null,
    //  mobile_number:null,
    //  gender:null,
    //  birthdate:null,
    //  company_name:null,
    //  department:null,

    // }

  

    // regMember(){
    //   console.log(this.form)
    //   return this.backend.register(this.form).subscribe(     
    //     data=>this.handleData(data)
   
    //     );
    // }

  
    // handleError(error:any){
    //   this.error = error.error.error;
    // }
  }
  

