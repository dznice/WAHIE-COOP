import { Component, OnInit, OnDestroy, ViewEncapsulation, Inject} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { slideleft2, slideright2 } from '../animation';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { passwordMatch } from '../validators/passwordMatch';
import { BackendService } from '../services/backend.service';
import { TokenService } from '../services/token.service';
import { Router } from '@angular/router';
import { AuthGuardService } from '../services/auth-guard.service';


@Component({
  selector: 'app-reg-members',
  templateUrl: './reg-members.component.html',
  styleUrls: ['./reg-members.component.scss'],
  animations: [slideleft2, slideright2],
  encapsulation: ViewEncapsulation.Emulated,
})
export class RegMembersComponent implements OnInit, OnDestroy {


    
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
  
    checkvisible:boolean = true;
    checkBox(){
      this.checkvisible = !this.checkvisible
    }
  
    submitted:boolean = false;
    
    constructor(@Inject(DOCUMENT) private _document: any, private backend:BackendService,
    private token:TokenService, private route:Router, private Auth:AuthGuardService ){}
  
    memberForm = new FormGroup({
      first_name : new FormControl("", [Validators.required]),
      middle_name : new FormControl(""),
      last_name : new FormControl("", [Validators.required]),
      suffix : new FormControl(""),
      mobile_number : new FormControl("",[Validators.required]),
      gender : new FormControl(""),
      birthdate : new FormControl(""),
      company_name : new FormControl("", [Validators.required]),   
      department : new FormControl("", [Validators.required]),
      email : new FormControl("", [Validators.required]),
      password : new FormControl("", [Validators.required]),
      confirm_pass : new FormControl("", [Validators.required]),
    }, [ passwordMatch("password", "confirm_pass") ])
  
    getControl(name: any): AbstractControl | null{
      return this.memberForm.get(name)
    }
  
    onSubmit(){
      this.submitted = true;
      if(this.memberForm.invalid){
        return;
      }
    }
  
    ngOnInit() {
      this._document.body.classList.add('body');
    }
  
    ngOnDestroy() {
      this._document.body.classList.add('body');
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
      sessionStorage.setItem('userData', JSON.stringify(data['id']));
      this.route.navigateByUrl('verify-account');
    }
  
    handleError(error:any){
      this.error = error.error.error;
    }
  }
  

