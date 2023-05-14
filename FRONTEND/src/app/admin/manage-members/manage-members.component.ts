import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { WahieService } from '../../services/wahie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-members',
  templateUrl: './manage-members.component.html',
  styleUrls: ['./manage-members.component.scss']
})
export class ManageMembersComponent {


  
  /* Switch declaration */
  selected: boolean;
  libJournals: any;
  type: string;


  Loaded = false;
  updateFormActive = false;

  searchText = '';
  p: number = 1;
  ben: any[] = [];
  index: number;
  id = '';
  name: string = '';
  email: string = '';
  coop: string = '';
  status: number = 0;

  constructor(private http: HttpClient, private wahieService:WahieService, private route:Router) {
    this.showUsers();
  }

  ngOnInit(): void {

  }

  
  memAccounts: any[] = [];

  showUsers() {
    this.http.get('http://127.0.0.1:8000/api/users').subscribe((res: any) => {
      this.Loaded = true;
      console.log(res);
      this.memAccounts = res;
    });
  }
  isChecked: boolean = true;

  getValue() {
    this.isChecked = !this.isChecked;
  }

  selectIndex: number;
  changeSelection(event: any, index: any) {
    this.selectIndex = event?.target.checked ? index : undefined;
    if ((this.status = 1)) {
      this.isChecked = true;
    } else {
      this.isChecked = false;
    }
  }

  showLibJournal(): void{
    this.libJournals = this.wahieService.listLibJournals().subscribe(libjournal=>{
      this.libJournals = libjournal;
      console.log(this.libJournals);
    });
  }

  activateUser(data: any) {
    (this.id = data.id),
    (this.status = 1),
    (this.name = data.name),
    (this.email = data.email);
    this.coop = data.coop;
    this.activated();
  }
  deactivateTOactivate(data: any) {
    (this.id = data.id),
    (this.status = 0),
    (this.name = data.name),
    (this.email = data.email);
    this.deactivated();
  }

  activated() {
    let updateStatus = {
      status: 0,
      id: this.id,
      name: this.name,
      email: this.email,
      coop: this.coop,
    };
    this.http
      .put('http://127.0.0.1:8000/api/users' + '/' + this.id, updateStatus)
      .subscribe((res: any) => {
        console.log(res);
        this.showUsers();
        this.id = '';
        this.status = 1;
        this.name = '';
        this.email = '';
        this.coop = '';
      });
  }

  deactivated() {
    let updateStatus2 = {
      status: 1,
      id: this.id,
      name: this.name,
      email: this.email,
    };
    this.http
      .put('http://127.0.0.1:8000/api/users' + '/' + this.id, updateStatus2)
      .subscribe((res: any) => {
        console.log(res);
        this.showUsers();
        this.id = '';
        this.status = 0;
        this.name = '';
        this.email = '';
      });
  }
  activateUser2(data: any) {
    (this.id = data.id),
    (this.status = 1),
    (this.name = data.name),
    (this.email = data.email);
    this.coop = data.coop;
    this.activated2();
  }
  activated2() {
    let updateStatus = {
      status: 1,
      id: this.id,
      name: this.name,
      email: this.email,
      coop: this.coop,
    };
    this.http
      .put('http://127.0.0.1:8000/api/users' + '/' + this.id, updateStatus)
      .subscribe((res: any) => {
        console.log(res);
        this.showUsers();
        this.id = '';
        this.status = 0;
        this.name = '';
        this.email = '';
        this.coop = '';
        this.isChecked = true;
      });
  }

  memberInfo(data: any) {
    this.http.get('http://127.0.0.1:8000/api/memberAccount/' + data)
      .subscribe((res: any) => {
        this.route.navigateByUrl('admin/accounting/member-info/' + res);
      });
  } 



}




