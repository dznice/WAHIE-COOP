import { Component, OnInit } from '@angular/core';
import { WahieService } from '../../services/wahie.service';
// import { Item } from './item';
// import { itemService } from './item.service';
import { itemService } from './memItem.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgToastService } from'ng-angular-popup';

@Component({
  selector: 'app-accounting',
  templateUrl: './accounting.component.html',
  styleUrls: ['./accounting.component.scss'],
  providers: [itemService],
})
export class AccountingComponent implements OnInit {


  // term: string = '';
  // transactions: any[] = [];

  // type: string;
  // stat: string;
  // transaction_number: string = '';
  // transaction_date: string;
  // id: any;

  // types: string[] = ['Journal Entry', 'Invoice', 'Payment'];
  // stats: string[] = ['Overdue', 'Pending', 'Closed'];

  // startDate: string = '';
  // endDate: string = '';
  // listentries: any;

  // constructor(
  //   private ItemService: itemService,
  //   private wahieService: WahieService,
  //   private http: HttpClient,
  //   private route: Router
  // ) {}

  // ngOnInit(): void {
  //   // this.item = this.ItemService.item;
  //   this.showDebits();
  //   this.showCredits();
  //   this.showPayables();
  //   this.showTransactions();
  //   this.showEntries();
  //   this.showAccounting();
  // }
  // // Try to Import in one TS in Accounting
  // public debits: any;
  // public credits: any;
  // public payables: any;
  // // public transactions:any;
  // public entries: any;
  // public account: any;

  // memberInfo(data: any) {
  //   this.http
  //     .get('http://127.0.0.1:8000/api/memberList/' + data)
  //     .subscribe((res: any) => {
  //       this.route.navigateByUrl('admin/members/member-info/' + data);
  //       console.log(res);
  //     });
  // }

  // payment(data: any) {
  //   this.http
  //     .get('http://127.0.0.1:8000/api/memberList/' + data)
  //     .subscribe((res: any) => {
  //       this.route.navigateByUrl('admin/members/add-payment/' + data);
  //       console.log(res);
  //     });
  // }

  // showDebits(): void {
  //   this.debits = this.wahieService.debits().subscribe((debit) => {
  //     this.debits = debit;
  //     console.log(this.debits);
  //   });
  // }

  // showCredits(): void {
  //   this.credits = this.wahieService.credits().subscribe((credit) => {
  //     this.credits = credit;
  //     console.log(this.credits);
  //   });
  // }

  // showPayables(): void {
  //   this.http
  //     .get('http://127.0.0.1:8000/api/payables')
  //     .subscribe((res: any) => {
  //       console.log(res);
  //       this.payables = res;
  //     });
  // }

  // showTransactions(): void {
  //   this.http
  //     .get('http://127.0.0.1:8000/api/transactions')
  //     .subscribe((res: any) => {
  //       console.log(res);
  //       this.transactions = res;
  //     });
  // }
  // // this.transactions = this.wahieService.transactions().subscribe(transaction=>{
  // //   this.transactions = transaction;
  // //   console.log(this.transactions);
  // showEntries(): void {
  //   this.http.get('http://127.0.0.1:8000/api/entries').subscribe((res: any) => {
  //     console.log(res);
  //     this.entries = res;
  //   });
  // }

  // showAccounting(): void {
  //   this.http.get('http://127.0.0.1:8000/api/account').subscribe((res: any) => {
  //     console.log(res);
  //     this.account = res;
  //   });
  // }

  // Try to Import in one TS in Accounting

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

  constructor(private http: HttpClient, private route: Router, private toast: NgToastService) {
    this.showMembers();
  }

  ngOnInit(): void {
    this.PaidMember();
    this.OpenTransaction();
    this.OverduePay();


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
        res.forEach((x:any)=>{
          if(data==x.debit.cred.transac.member.id){
            this.route.navigateByUrl('admin/accounting/add-payment/' + data);
          }else{
            //this.toast.error({detail:'Failed',summary:'No Transactions Yet',duration:2000, sticky:false,position:'tr'});
          }
        });

      });
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
}
