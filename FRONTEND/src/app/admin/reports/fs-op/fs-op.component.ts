import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ExportAsService, ExportAsConfig } from 'ngx-export-as';

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
  maxDate: any;

  constructor(private http:HttpClient, private exportAsService: ExportAsService) {}
    

  
  ngOnInit(): void {

    this.formatDate();
    this.showSLedger();
    this.showPastSLedger();
    this.processLedgerData();
  }

  exportAsPdf: ExportAsConfig = {
    type: 'pdf',
    elementIdOrContent: 'fsOp',
    options: {
      image: { type: 'jpeg', quality: 1 },
      html2canvas:  { scale: 3},
      margin:  [5, 2, 5, 2],
      fontSize: 12,
      // pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
      jsPDF: {
        orientation: 'portrait',
        format: 'letter',
        defaultFontSize: 12,
        //precision: 16
      }
    }
  }

  exportAsExcel: ExportAsConfig = {
    type: 'xlsx',
    elementIdOrContent: 'fsOp'
  }

  exportPDF() {
    this.exportAsService.save(this.exportAsPdf, 'FS-Operations').subscribe(() => {
      // save started
    });
  }

  exportEXCEL() {
    this.exportAsService.save(this.exportAsExcel, 'FS-Operations').subscribe(() => {
      // save started
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





  formatDate() {
    const d = new Date();
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    this.maxDate = [year, month, day].join('-');
    return this.maxDate;
  }

}
