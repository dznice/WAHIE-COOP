import { Component, OnInit } from '@angular/core';
import { Item } from './hItem';
import { itemService } from './hItem.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss'],
  providers: [itemService],
})
export class AdminHomeComponent implements OnInit {
  nullcheck: number = 0;
  item: any[] = [];
  term: string = '';
  p: number = 1;
  type: string;
  stat: string;

  types: string[] = ['Journal Entry', 'Invoice', 'Payment'];
  stats: string[] = ['Overdue', 'Pending', 'Closed', 'Paid'];

  startDate: string = '';
  endDate: string = '';
  duedit: any;

  ledgers: any;
  revenue: any[];
  expense: any[];

  constructor(private http: HttpClient, private route: Router) {}
  
  ngOnInit(): void {
    this.showAccounting();
    this.checkDue();
    this.showSLedger();
    this.processLedgerData();
  }

  public entries: any;
  public account: any;

  last_day: any;
  today = new Date();

  showAccounting(): void {
    this.http.get('http://127.0.0.1:8000/api/account').subscribe((res: any) => {
      console.log(res.length);
      this.account = res;
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

  memberJournal(data: any) {
    this.http
      .get('http://127.0.0.1:8000/api/transacList/' + data)
      .subscribe((res: any) => {
        if (data != null) {
          console.log(data);
          this.route.navigateByUrl('admin/accounting/journal-transac/' + data);
        }
      });
  }

  hello: string = 'hello';
  checkDue() {
    console.log('checkdueee');
    this.http
      .post('http://127.0.0.1:8000/api/dueDateSMS', this.hello)
      .subscribe((res: any) => {
        console.log(res);
      });
  }

  showSLedger(): void {
    this.http.get('http://127.0.0.1:8000/api/totaljour').subscribe(
      (res: any) => {
        console.log(res);
        this.ledgers = res;
        this.processLedgerData();
        console.log(this.processLedgerData())
      }
    );
  }
  
  processLedgerData(): void {
    this.revenue = [];
    this.expense = [];
  
    for (const item of this.ledgers) {
      const journalName = item.result.journType.toLowerCase(); // Convert to lowercase for case-insensitive comparison
      console.log('Journal Name:', journalName);

      if (['revenue', 'cost of goods sold', 'cost of services'].includes(journalName)) {
        this.revenue.push(item);
      } else if (['expenses', 'other items – subsidy/ gain (losses)'].includes(journalName)) {
        this.expense.push(item);
      } 
    }
    
  }

  reserveFund : any;
  cetFund : any;
  cdFund : any;
  optionalFund : any;
  dueToUnion : any;
  statutoryFund : any;
  netFundAfterSF : any;
  
  calculateTotalBalance(): number {
    let totalBalance = 0;
    let totalExpenses = 0;
    let totalRevenue = 0;
  
    for (const item of this.revenue) {
      totalRevenue += item.result.total_balance;
    }
  
    for (const item of this.expense) {
      totalExpenses += item.result.total_balance;
    }

    totalBalance = totalRevenue - totalExpenses;

    this.reserveFund = totalBalance * 0.1;
    this.cetFund = totalBalance * 0.05;
    this.cdFund = totalBalance * 0.03;
    this.optionalFund = totalBalance * 0.07;
    this.dueToUnion = totalBalance * 0.05
  
    this.statutoryFund = this.reserveFund+this.cetFund+this.cdFund+this.optionalFund+this.dueToUnion;

    this.netFundAfterSF = totalBalance - this.statutoryFund;

    return totalBalance;
  }
}
