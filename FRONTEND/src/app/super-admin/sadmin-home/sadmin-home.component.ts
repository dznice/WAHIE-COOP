import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sadmin-home',
  templateUrl: './sadmin-home.component.html',
  styleUrls: ['./sadmin-home.component.scss']
})
export class SadminHomeComponent {

  /* Switch declaration */
  selected: boolean;


  constructor(private http: HttpClient){
    this.showUsers();
  }
  userAccounts : any[] = [];
  Loaded = false;
  updateFormActive = false;

  searchText = '';
  p: number = 1;

  id = "";
  name: string = "";
  email: string = "";
  coop: string = "";
  status: number = 0;
  
  ngOnInit(): void {

  }

  showUsers(){
    this.http.get('http://127.0.0.1:8000/api/users').subscribe(
      (res:any)=>
      {  
        this.Loaded = true;      
        console.log(res); 
        this.userAccounts = res;  
      }
    )
  }
  isChecked: boolean=true ;
  isChecked2: boolean=false ;

       

  getValue() {
    this.isChecked = !this.isChecked;
  }

  activateUser(data:any) {
    this.id = data.id,
    this.status = 1,
    this.name = data.name,
    this.email = data.email
    this.coop = data.coop
    this.activated();
    this.isChecked=false
  }
  deactivateTOactivate(data:any) {
    this.id = data.id,
    this.status = 0,
    this.name = data.name,
    this.email = data.email
    this.deactivated();
    this.isChecked2=false;

    
  }

  activated(){
  
    let updateStatus = {
     'status': 0,   
     'id' : this.id,
     'name': this.name,
     'email': this.email,
     'coop': this.coop
    }
    this.http.put('http://127.0.0.1:8000/api/users' + '/' + this.id, updateStatus).subscribe(
      (res:any)=>{
        console.log(res);
        this.showUsers();
        this.id = '';
        this.status = 0;
        this.name = '';
        this.email = '';
        this.coop = '';
        this.isChecked=false;
      }
    )
    }

  deactivated(){
    let updateStatus2 = {
      'status': 1, 
      'id' : this.id,
      'name': this.name,
      'email': this.email,
      
    
     }
     this.http.put('http://127.0.0.1:8000/api/users' + '/' + this.id, updateStatus2).subscribe(
      (res:any)=>{
        console.log(res);
        this.showUsers();
        this.id = '';
        this.status = 1;
        this.name = '';
        this.email = '';
        this.isChecked=true;
      }
    )
  }
}
