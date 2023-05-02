import { Component, OnInit, OnDestroy, ViewEncapsulation, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { slider, slideright} from '../animation';
import { FormBuilder, FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { passwordMatch } from '../validators/passwordMatch';
import { BackendService } from '../services/backend.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-admin-chpass',
  templateUrl: './admin-chpass.component.html',
  styleUrls: ['./admin-chpass.component.scss'],
  animations:[slideright, slider],
  encapsulation: ViewEncapsulation.Emulated
})
export class AdminChpassComponent implements OnInit, OnDestroy {
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

  
  submitted:boolean = false;
  constructor(@Inject(DOCUMENT) private _document: any, private fb: FormBuilder, private http:HttpClient, 
  private backend:BackendService, private route:Router, private token:TokenService ){}

  chpassForm = new FormGroup({

    password : new FormControl("", [Validators.required]),

    confirm_pass : new FormControl("", [Validators.required]),


  }, [ passwordMatch("password", "confirm_pass") ])

  getControl(name: any): AbstractControl | null{
    return this.chpassForm.get(name)
  }
  onSubmit(){
    this.submitted = true;
    if(this.chpassForm.invalid){
      return;
    }
  }
  ngOnInit(): void {
    this._document.body.classList.add('body');

    /*this.form = this.fb.group({
      password: ['', Validators.required],
    });*/
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
    password:null,
   confirm_pass:null
  }


  submitPass(){
    this.http.post('http://127.0.0.1:8000/api/users/superChange' + '/' + this.id, this.chform).subscribe(
      (res:any)=>{
        console.log(res.id)
        this.token.handle(sessionStorage.getItem('ftoken'));
        this.route.navigateByUrl('super-admin/sadmin-home');
    }); 
  }
}
