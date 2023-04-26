import { Component, OnInit } from '@angular/core';
import { itemService } from './memItem.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss'],
  providers: [itemService],
})
export class MembersComponent implements OnInit {

  term:string = '';

  memberList : any[] = [];
  Loaded = false;
  updateFormActive = false;

  account_id: number = 0;
  first_name: string = "";
  last_name: string = "";
  email: string = "";
  status: number = 0;


  constructor( private http: HttpClient, private route:Router) {
    this.showMembers();
  }

  ngOnInit(): void {

  }
 
  showMembers(){
    this.http.get('http://127.0.0.1:8000/api/memberList').subscribe(
      (res:any)=>
      {  
        this.Loaded = true;      
        console.log(res); 
        this.memberList = res;  
      }
    )
  }
    memberInfo(data : any){
      this.http.get('http://127.0.0.1:8000/api/memberList/' + data).subscribe(
        (res:any)=>
        {  
          this.route.navigateByUrl('admin/members/member-info/' + data)
        }
        )}

}
