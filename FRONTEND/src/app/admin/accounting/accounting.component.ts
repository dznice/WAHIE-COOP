import { Component, OnInit } from '@angular/core';
import { WahieService } from '../../services/wahie.service';
import { Item } from './item';
import { itemService } from './item.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accounting',
  templateUrl: './accounting.component.html',
  styleUrls: ['./accounting.component.scss'],
  providers: [itemService],
})
export class AccountingComponent implements OnInit {
  term: string = '';
  transactions: any[] = [];

  p: number = 1;
  type: string;
  stat: string;
  transaction_number: string ="";
  transaction_date: string;
  id: any;



  types: string[]= ["Journal Entry", "Invoice", "Payment" ];
  stats: string[]= ["Overdue", "Pending", "Closed" ];

  startDate: string = '';
  endDate : string = '';
  listentries: any;

  constructor(private ItemService: itemService, private wahieService:WahieService,private http: HttpClient, private route:Router) {}

  ngOnInit(): void {
    // this.item = this.ItemService.item;
    this.showDebits()
    this.showCredits()
    this.showPayables()
    this.showTransactions()
    this.showEntries()
    this.showAccounting()
  }
// Try to Import in one TS in Accounting
  public debits:any;
  public credits:any;
  public payables:any;
  // public transactions:any;
  public entries:any;
  public account: any;

  memberInfo(data : any){
    this.http.get('http://127.0.0.1:8000/api/memberList/' + data).subscribe(
      (res:any)=>
      {
        this.route.navigateByUrl('admin/members/member-info/' + data)
      }
      )}



  showDebits(): void{
    this.debits = this.wahieService.debits().subscribe(debit=>{
      this.debits = debit;
      console.log(this.debits);
    });
  }

  showCredits(): void{
    this.credits = this.wahieService.credits().subscribe(credit=>{
      this.credits = credit;
      console.log(this.credits);
    });
  }

  showPayables(): void{
    this.http.get('http://127.0.0.1:8000/api/payables').subscribe(
      (res:any)=>
      {
        console.log(res);
        this.payables = res
    });
  }

  showTransactions(): void{
    this.http.get('http://127.0.0.1:8000/api/transactions').subscribe(
      (res:any)=>
      {
        console.log(res);
        this.transactions = res
    });
  }
// this.transactions = this.wahieService.transactions().subscribe(transaction=>{
    //   this.transactions = transaction;
    //   console.log(this.transactions);
  showEntries(): void{

    this.http.get('http://127.0.0.1:8000/api/entries').subscribe(
      (res:any)=>
      {
        console.log(res);
        this.entries = res
    });
  }

  showAccounting(): void{
    this.http.get('http://127.0.0.1:8000/api/account').subscribe(
      (res:any)=>
      {
        console.log(res);
        this.account = res
    });
  }



  // Try to Import in one TS in Accounting


}
