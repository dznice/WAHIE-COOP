import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { WahieService } from '../../services/wahie.service';
import { FormGroup,FormControl,Validators,FormBuilder, AbstractControl } from '@angular/forms';
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
  types: string[] = ['Admin', 'Member'];
  type: string;

  userrole: number[] = [1, 3];

  constructor(private http: HttpClient, private wahieService: WahieService, private route: Router, private backend: BackendService,
    private toast: NgToastService
  ) {
    this.showUsers();
    //this.Departments();
  }

  autoAdminForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
  });

  addDepartment = new FormGroup({
    department: new FormControl('', [Validators.required]),
  });

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
  department: string = '';

  AccountType: string;

  ngOnInit(): void {}

  @HostListener('window:keydown.esc', ['$event'])
  onEsc(event: KeyboardEvent) {
    console.log(event);
    this.show(2);
    this.showdept(2);
  }

  showModal = -1;
  show(index: number) {
    this.showModal = index;
  }

  public form = {
    username: null,
    email: null,
    department: null,
  };

  autoAdmin() {
    console.log(this.form);
    return this.backend.adminadd(this.form).subscribe((res: any) => {
    
      this.show(2);
      this.toast.success({detail: 'Success', summary: 'Admin account created', sticky: false, position: 'false'});
      this.log.activity = 'Account created: ' + ' ' + this.form.email;
      this.activityLog();
     
    },
    error => {
      this.toast.error({detail:'Invalid email',summary:'Please try again',duration:2000, sticky:false,position:'tr'}); 
    }
    );

  }


  public depform = {
    department:null
  }
  
  deptModal = -1;
  showdept(index: number){
    this.deptModal = index;
  }

  addDept(){
    console.log(this.depform)
    return this.backend.deptAdd(this.depform).subscribe((res:any)=>{
      this.showdept(2)
      this.toast.success({detail:'Success',summary:'New department added', sticky:false,position:'false'});  
    });
  }

  showUsers() {
    this.http
      .get('http://127.0.0.1:8000/api/userrole')
      .subscribe((res: any) => {
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

  showLibJournal(): void {
    this.libJournals = this.wahieService
      .listLibJournals()
      .subscribe((libjournal) => {
        this.libJournals = libjournal;
        console.log(this.libJournals);
      });
  }

  //disable user status 1 to 0
  activateUser(data: any) {
    (this.id = data.id),
      (this.status = 1),
      (this.name = data.name),
      (this.email = data.email);
    this.coop = data.coop;
    this.activated();
  }

  activated() {
    let updateStatus = {
      status: 0,
      id: this.id,
      name: this.name,
      email: this.email,
      coop: this.coop,
    };
    this.log.activity = 'Disable Account for' + ' ' + this.email;
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
        this.activityLog();
      });
  }

  //Enable user status 0 to 1
  deactivateTOactivate(data: any) {
    (this.id = data.id),
      (this.status = 0),
      (this.name = data.name),
      (this.email = data.email);
    this.deactivated();
  }
  deactivated() {
    let updateStatus2 = {
      status: 1,
      id: this.id,
      name: this.name,
      email: this.email,
    };

    this.log.activity = 'Enable Account for' + ' ' + this.email;
    this.http
      .put('http://127.0.0.1:8000/api/users' + '/' + this.id, updateStatus2)
      .subscribe((res: any) => {
        console.log(res);
        this.showUsers();
        this.id = '';
        this.status = 0;
        this.name = '';
        this.email = '';
        this.activityLog();
      });
  }

  //activate member from status 2 to 1
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
    this.log.activity ='Activate account for' + ' ' + this.email
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
        this.activityLog();
      });
  }

  public log = {
    name: sessionStorage.getItem('name'),
    department: sessionStorage.getItem('department'),
    activity: 'login',
  };
  activityLog() {
    this.http
      .post('http://127.0.0.1:8000/api/addActivity', this.log)
      .subscribe((res: any) => {
        console.log(res);
      });
  }
}
