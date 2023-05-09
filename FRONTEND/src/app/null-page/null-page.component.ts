import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-null-page',
  templateUrl: './null-page.component.html',
  styleUrls: ['./null-page.component.scss']
})
export class NullPageComponent implements OnInit {
  constructor(private route:Router){

  }
  role= localStorage.getItem('userRole')
  ngOnInit() {
  localStorage.clear()
  sessionStorage.clear()
  this.route.navigateByUrl('login')
  // if(this.role=='1'){
  //   this.route.navigateByUrl('admin/admin-home')
  // }
  // else if(this.role=='2')
  // {
  //   this.route.navigateByUrl('super-admin/sadmin-home')
  // }
  // else if(this.role=='3')
  // {
  //   this.route.navigateByUrl('member/member-home')
  // }else{
  //   this.route.navigateByUrl('login')
  // }
 
  }

}
