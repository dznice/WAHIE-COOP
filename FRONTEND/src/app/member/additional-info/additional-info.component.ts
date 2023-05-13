import {
  Component,
  OnInit,
  OnDestroy,
  ViewEncapsulation,
  Inject,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { slideleft2, slideright2 } from '../../animation';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  AbstractControl,
} from '@angular/forms';
import { TokenService } from '../../services/token.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-additional-info',

  templateUrl: './additional-info.component.html',
  styleUrls: ['./additional-info.component.scss'],
  animations: [slideleft2, slideright2],
  encapsulation: ViewEncapsulation.Emulated,
})
export class AdditionalInfoComponent implements OnInit, OnDestroy {
  isDisplayed: boolean = true;
  toggleDiv() {
    this.isDisplayed = this.isDisplayed ? false : true;
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

  checkvisible: boolean = true;
  checkBox() {
    this.checkvisible = !this.checkvisible;
  }

  submitted: boolean = false;

  constructor( @Inject(DOCUMENT) private _document: any, private http: HttpClient, 
  private token: TokenService, private route: Router) {
    this.getmemberId();
   
   
  }

  // updateMemberInfo = new FormGroup({
  // tin_number : new FormControl("", [Validators.required]),
  // spouse : new FormControl(""),
  // employment_status : new FormControl("", [Validators.required]),
  // occupation : new FormControl(""),
  // company_address : new FormControl("",[Validators.required]),
  // address : new FormControl("", [Validators.required]),
  // current_address : new FormControl("", [Validators.required]),
  // city_town : new FormControl("", [Validators.required]),
  // province : new FormControl("", [Validators.required]),
  // postal_code : new FormControl("", [Validators.required]),
  // barangay : new FormControl("", [Validators.required]),

  // })

  // getControl(name: any): AbstractControl | null{
  //   return this.updateMemberInfo.get(name)
  // }

  // onSubmit(){
  //   this.submitted = true;
  //   if(this.updateMemberInfo.invalid){
  //     return;
  //   }
  // }

  ngOnInit() {
    this._document.body.classList.add('body');

  }

  ngOnDestroy() {
    this._document.body.classList.add('body');
  }

  public error: any = [];

  email = sessionStorage.getItem('email');
  memberId:string = '';

    getmemberId(){
    this.http.get('http://127.0.0.1:8000/api/members/' + this.email).subscribe(
      (res:any)=>{    
        console.log('mem' + res);
        this.memberId = res;
        
    }); 
  }
 
  id = localStorage.getItem('userData');
  
  //bene
  row = [
    {
      benificiary_name: '',
      benificiary_birthdate: '',
      benificiary_relation: '',
    },
    {
      benificiary_name: '',
      benificiary_birthdate: '',
      benificiary_relation: '',
    },
    {
      benificiary_name: '',
      benificiary_birthdate: '',
      benificiary_relation: '',
    },
  ];

  addTable() {
    const obj = {
      benificiary_name: '',
      benificiary_birthdate: '',
      benificiary_relation: '',
    };
    this.row.push(obj);
  }

  deleteRow(x: number) {
    var delBtn = confirm(' Do you want to delete ?');
    if (delBtn == true) {
      this.row.splice(x, 1);
    }
  }




  public updateMemberform = {
    email:this.email,
    tin_number:null,
    civil_status:null,
    spouse:null,
    employment_status:null,
    occupation:null,
    company_address:null,
    address:null,
    job_title:null,
   
    memId: this.memberId,
    row: this.row,
    current_address:null,
    city_town:null,
    province:null,
    postal_code:null,
    barangay:null,
  }

  memberInfo() {

    console.log(this.row);
    this.http .post('http://127.0.0.1:8000/api/memberInfo' + '/' + this.email, this.updateMemberform)
      .subscribe((res: any) => 
      {
        console.log(res);
        this.token.handle(sessionStorage.getItem('ftoken'));
        this.route.navigateByUrl('member/member-home');
      });
  }
}
