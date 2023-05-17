import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { WahieService } from '../../services/wahie.service';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { passwordMatch } from '../../validators/passwordMatch';
import { BackendService } from '../../services/backend.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-sadmin-home',
  templateUrl: './sadmin-home.component.html',
  styleUrls: ['./sadmin-home.component.scss'],
})
export class SadminHomeComponent {

  /* Switch declaration */
  selected: boolean;
  libJournals: any;
  types: string[] = ["Admin", "Member"];
  type: string;

  userrole: number[] = [1,3];

  constructor(private http: HttpClient, private wahieService:WahieService, private route:Router, private backend:BackendService,
    private toast:NgToastService) {
    this.showUsers();

  }

  autoAdminForm = new FormGroup({
    username : new FormControl("", [Validators.required]),
    email : new FormControl("", [Validators.required])
  })

  userAccounts: any[] = [];
  Loaded = false;
  updateFormActive = false;

  searchText = '';
  p: number = 1;

  index: number;
  id = '';
  name: string = '';
  email: string = '';
  coop: string = '';
  status: number = 0;

  AccountType: string;

  ngOnInit(): void {    
}


  showModal = -1;
  show(index: number){
    this.showModal = index;
  }


  back(){
    this.route.navigateByUrl('super-admin/sadmin-home')
  }

  public form = {
    username:null,
    email:null
  }

  autoAdmin(){
    console.log(this.form)
    return this.backend.adminadd(this.form).subscribe((res:any)=>{
      this.show(2)
      this.toast.success({detail:'added',summary:'account added', sticky:false,position:'false'});  
    }
    
    );
  }



  showUsers() {
    this.http.get('http://127.0.0.1:8000/api/userrole').subscribe((res: any) => {
      this.Loaded = true;
      console.log(res);
      this.userAccounts = res;
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
}