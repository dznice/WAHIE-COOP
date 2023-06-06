import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-fs-op',
  templateUrl: './fs-op.component.html',
  styleUrls: ['./fs-op.component.scss']
})
export class FsOpComponent implements OnInit {
  ledgers: any;
  pledgers: any;
  revenue: any[];
  expense: any[];
  prevenue: any[];
  pexpense: any[];
  item: any[];

  constructor(private http:HttpClient) {}
    
  ngOnInit(): void {

    this.showSLedger();
    this.showPastSLedger();
    this.processLedgerData();
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
  
  
  showPastSLedger(): void {
    this.http.get('http://127.0.0.1:8000/api/totaljourlastyear').subscribe(
      (res: any) => {
        console.log(res);
        this.pledgers = res;
        this.pastProcessLedgerData();
        console.log(this.processLedgerData())
      }
    );
  }

  pastProcessLedgerData(): void {
    this.prevenue = [];
    this.pexpense = [];
  
    for (const items of this.pledgers) {
      const journalName = items.result.journType.toLowerCase(); // Convert to lowercase for case-insensitive comparison
      console.log('Journal Name:', journalName);

      if (['revenue', 'cost of goods sold', 'cost of services'].includes(journalName)) {
        this.prevenue.push(items);
      } else if (['expenses', 'other items – subsidy/ gain (losses)'].includes(journalName)) {
        this.pexpense.push(items);
      } 
    }
    
  }


  reserveFund : any;
  cetFund : any;
  cdFund : any;
  optionalFund : any;
  dueToUnion : any;
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
  
    return totalBalance;

    
  }

}
