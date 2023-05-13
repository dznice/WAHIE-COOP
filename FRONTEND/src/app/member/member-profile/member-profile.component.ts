import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-member-profile',
  templateUrl: './member-profile.component.html',
  styleUrls: ['./member-profile.component.scss']
})
export class MemberProfileComponent implements OnInit, OnDestroy{
constructor(private http:HttpClient){
  this.myProfile();
  this.myBene();
}

ngOnDestroy() {
  
}
ngOnInit(){

}

 id = localStorage.getItem('userData');
 memId:string = '';
 first_name:string = '';
 middle_name:string = '';
 last_name:string = '';
 suffix:string = '';
 gender:string = '';
 address:string = '';
 mobile_number:string = '';
 birthdate:string = '';
 civil_status:string = '';
 company_address:string = '';
 company_name:string = '';
 occupation:string = '';
 spouse:string = '';
 tin_number:string = '';
 email:string = '';
 department:string = '';
 employment_status:string = '';




myProfile(){
  this.http.get('http://127.0.0.1:8000/api/users/myProfile/' + this.id).subscribe(
    (res: any) =>
    {
    console.log('myprof' + res);
    this.memId = res.id;
    this.first_name = res.first_name;
    this.middle_name = res.middle_name;
    this.last_name = res.last_name;
    this.suffix = res.suffix;
    this.email = res.email;
    this.address = res.address;
    this.mobile_number = res.mobile_number;
    this.birthdate = res.birthdate;
    this.civil_status = res.civil_status;
    this.company_address = res.company_address;
    this.company_name = res.company_name;
    this.occupation = res.occupation;
    this.spouse = res.spouse;
    this.tin_number = res.tin_number;
    this.gender = res.gender;
    this.employment_status = res.employment_status;
    this.department = res.department;

    })
}


ben: any[]=[];
myBene(){
  this.http.get('http://127.0.0.1:8000/api/beneficiaries').subscribe(
    (res:any)=>
    {
      console.log(res)
      this.ben = res;
    }
  )
}
}