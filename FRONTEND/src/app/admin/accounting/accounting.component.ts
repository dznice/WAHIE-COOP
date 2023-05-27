import { Component, OnInit } from '@angular/core';
import { WahieService } from '../../services/wahie.service';
import { itemService } from './memItem.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-accounting',
  templateUrl: './accounting.component.html',
  styleUrls: ['./accounting.component.scss'],
  providers: [itemService],
})
export class AccountingComponent implements OnInit {
  term: string = '';

  memberList: any[] = [];
  Loaded = false;
  updateFormActive = false;

  p: number = 1;
  account_id: number = 0;
  first_name: string = '';
  last_name: string = '';
  email: string = '';
  status: number = 0;
  paidmem: any;
  opentransac: any;
  overdue: any;
  membalance: any;
  duedit: any;

  constructor( private http: HttpClient, private route: Router, private toast: NgToastService) {
    this.showMembers();
  }

  ngOnInit(): void {
    this.PaidMember();
    this.OpenTransaction();
    this.OverduePay();
    this.memberBalance();
    this.dueDate();
  }

  showMembers() {
    this.http
      .get('http://127.0.0.1:8000/api/memberList')
      .subscribe((res: any) => {
        this.Loaded = true;
        console.log(res);
        this.memberList = res;
      });
  }

  dueDate(): void {
    this.http.get('http://127.0.0.1:8000/api/duedate').subscribe((res: any) => {
      console.log(res);
      this.duedit = res;
    });
  }

  memberInfo(data: any) {
    this.http
      .get('http://127.0.0.1:8000/api/memberList/' + data)
      .subscribe((res: any) => {
        this.route.navigateByUrl('admin/accounting/member-info/' + data);
      });
  }

  memberAccounting(data: any) {
    this.http
      .get('http://127.0.0.1:8000/api/account/' + data)
      .subscribe((res: any) => {
        res.forEach((x: any) => {
          if (data == x.debit.cred.transac.member.id) {
            this.route.navigateByUrl('admin/accounting/add-payment/' + data);
          } else {
            // this.toast.error({detail:'Failed',summary:'No Transactions Yet',duration:2000, sticky:false,position:'tr'});
          }
        });
      },
      // error => {
      //   this.toast.warning({detail:'Invalid email',summary:'Please check your email',duration:2000, sticky:false,position:'tr'});
      // }
    );
  }

  PaidMember() {
    this.http
      .get('http://127.0.0.1:8000/api/totalPaid')
      .subscribe((res: any) => {
        this.Loaded = true;
        console.log(res);
        this.paidmem = res;
      });
  }

  OpenTransaction() {
    this.http
      .get('http://127.0.0.1:8000/api/totalOpen')
      .subscribe((res: any) => {
        this.Loaded = true;
        console.log(res);
        this.opentransac = res;
      });
  }

  OverduePay() {
    this.http
      .get('http://127.0.0.1:8000/api/totalOverdue')
      .subscribe((res: any) => {
        this.Loaded = true;
        console.log(res);
        this.overdue = res;
      });
  }
  memberBalance(): void{
    this.http.get('http://127.0.0.1:8000/api/totalMemBalance').subscribe(
      (res:any)=>
      {
        console.log(res);
        this.membalance = res
    });
  }
}
