import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ExportAsService, ExportAsConfig } from 'ngx-export-as';

@Component({
  selector: 'app-fs-fincon',
  templateUrl: './fs-fincon.component.html',
  styleUrls: ['./fs-fincon.component.scss']
})
export class FsFinconComponent implements OnInit {
  ledgers: any;
  pledgers: any;
  assets: any[];
  otherAssets: any[];
  nonAssets: any[];
  passets: any[];
  potherAssets: any[];
  pnonAssets: any[];
  pliabilities : any[];
  pnonLiabilities : any[];
  pequity : any[];
  item: any[];
  liabilities : any[];
  nonLiabilities : any[];
  equity : any[];
  sscc : any[];
  src : any[];
  srp : any[];
  pscp : any[];
  tscp : any[];
  dscp : any[];
  uns : any[];
  nl : any[];
  dg : any[];
  maxDate: any;
  oneYearAgo: any;
  revenue: any[];
  expense: any[];
  prevenue: any[];
  pexpense: any[];
  psscc : any[];
  psrc : any[];
  psrp : any[];
  ppscp : any[];
  ptscp : any[];
  pdscp : any[];
  puns : any[];
  pnl : any[];
  pdg : any[];


  constructor(private http:HttpClient, private exportAsService: ExportAsService ) {}
    
  ngOnInit(): void {

    this.formatDate();
    this.oneYearAgo = new Date(this.maxDate);
    this.oneYearAgo.setFullYear(this.oneYearAgo.getFullYear() - 1);
    this.showSLedger();
    this.showPastSLedger();
    this.processLedgerData();
  }

  exportAsPdf: ExportAsConfig = {
    type: 'pdf',
    elementIdOrContent: 'fsFincon',
    options: {
      image: { type: 'jpeg', quality: 1 },
      html2canvas:  { scale: 1},
      margin:  [2, 2, 2, 2],
      fontSize: 1,
      //pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
      jsPDF: {
        orientation: 'portrait',
        format: 'letter',
        defaultFontSize: 1,
        precision: 16
      }
    }
  }

  exportAsExcel: ExportAsConfig = {
    type: 'xlsx',
    elementIdOrContent: 'fsFincon'
  }

  exportPDF() {
    this.exportAsService.save(this.exportAsPdf, 'FS-Financial-Condition').subscribe(() => {
      // save started
    });
  }

  exportEXCEL() {
    this.exportAsService.save(this.exportAsExcel, 'FS-Financial-Condition').subscribe(() => {
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
    this.assets = [];
    this.otherAssets = [];
    this.nonAssets = [];
    this.liabilities = [];
    this.nonLiabilities = [];
    this.equity = [];
    this.revenue = [];
    this.expense = [];
    this.sscc = [];
    this.src = [];
    this.srp = [];
    this.pscp = [];
    this.tscp = [];
    this.dscp = [];
    this.uns = [];
    this.nl = [];
    this.dg = [];

    for (const item of this.ledgers) {
      const journalName = item.result.journType.toLowerCase(); // Convert to lowercase for case-insensitive comparison
      console.log('Journal Name:', journalName);

      if (['cash and cash equivalents', 'loans and receivables', 'financial assets', 'biologicals assets'].includes(journalName)) {
        if (item.result.total_balance !== null && item.result.total_balance !== 0) {
        this.assets.push(item);
        }
      } else if (journalName === 'other current assets') {
        if (item.result.total_balance !== null && item.result.total_balance !== 0) {
        this.otherAssets.push(item);
        }
      } else if (['non current assets', 'biological assets', 'intangible assets'].includes(journalName)) {
        if (item.result.total_balance !== null && item.result.total_balance !== 0) {
        this.nonAssets.push(item);
        }
      } else if (['liabilities', 'other current liabilities'].includes(journalName)) {
        if (item.result.total_balance !== null && item.result.total_balance !== 0) {
        this.liabilities.push(item);
        }
      } else if (['current liabilities', 'other non-current liabilities'].includes(journalName)) {
        if (item.result.total_balance !== null && item.result.total_balance !== 0) {
        this.nonLiabilities.push(item);
        }
      } else if (['revenue', 'cost of goods sold', 'cost of services'].includes(journalName)) {
        this.revenue.push(item);
      } else if (['expenses', 'other items – subsidy/ gain (losses)'].includes(journalName)) {
        this.expense.push(item);
      } else if (journalName === 'equity') {
        // this.equity.push(item);
        if (item.result.journal_name === 'Subscribed Share Capital - Common') {
          this.sscc.push(item);
        } else if (item.result.journal_name === 'Subscription Receivable - Common') {
          this.src.push(item);
        } else if (item.result.journal_name === 'Subscriptions Receivable Preferred') {
          this.srp.push(item);
        } else if (item.result.journal_name === 'Paid-up Share Capital-Preferred') {
          this.pscp.push(item);
        } else if (item.result.journal_name === 'Treasury Shares Capital -Preferred') {
          this.tscp.push(item);
        } else if (item.result.journal_name === 'Deposit for Share Capital Subscription') {
          this.dscp.push(item);
        } else if (item.result.journal_name === 'Undivided Net Surplus') {
          this.uns.push(item);
        } else if (item.result.journal_name === 'Net Loss') {
          this.nl.push(item);
        } else if (item.result.journal_name === 'Donations/Grants') {
          this.dg.push(item);
      } 
    
    } 
  }
}

calculateMemberEquity(): number {
  let totalBalance = 0;

  for (const item of this.sscc) {
    totalBalance += item.result.total_balance;
  }

  for (const item of this.src) {
    totalBalance += item.result.total_balance;
  }

  for (const item of this.srp) {
    totalBalance += item.result.total_balance;
  }
  for (const item of this.pscp) {
    totalBalance += item.result.total_balance;
  }

  for (const item of this.tscp) {
    totalBalance += item.result.total_balance;
  }

  for (const item of this.dscp) {
    totalBalance += item.result.total_balance;
  }
  for (const item of this.uns) {
    totalBalance += item.result.total_balance;
  }

  for (const item of this.nl) {
    totalBalance += item.result.total_balance;
  }

  for (const item of this.dg) {
    totalBalance += item.result.total_balance;
  }

  return totalBalance;
}
  
  
  showPastSLedger(): void {
    this.http.get('http://127.0.0.1:8000/api/totaljourlastyear').subscribe(
      (res: any) => {
        console.log(res);
        this.pledgers = res;
        this.pastProcessLedgerData();
        console.log(this.pastProcessLedgerData())
      }
    );
  }

  pastProcessLedgerData(): void {
    this.passets = [];
    this.potherAssets = [];
    this.pnonAssets = [];
    this.pliabilities = [];
    this.pnonLiabilities = [];
    this.pequity = [];
    this.psscc = [];
    this.psrc = [];
    this.psrp = [];
    this.ppscp = [];
    this.ptscp = [];
    this.pdscp = [];
    this.puns = [];
    this.pnl = [];
    this.pdg = [];
  
    for (const items of this.pledgers) {
      const journalName = items.result.journType.toLowerCase(); // Convert to lowercase for case-insensitive comparison
      console.log('Journal Name:', journalName);

      if (['cash and cash equivalents', 'loans and receivables', 'financial assets', 'biologicals assets'].includes(journalName)) {
        if (items.result.total_balance !== null && items.result.total_balance !== 0) {
        this.passets.push(items);
        }
      } else if (journalName === 'other current assets') {
        if (items.result.total_balance !== null && items.result.total_balance !== 0) {
        this.potherAssets.push(items);
        }
      } else if (['non current assets', 'biological assets', 'intangible assets'].includes(journalName)) {
        if (items.result.total_balance !== null && items.result.total_balance !== 0) {
        this.pnonAssets.push(items);
        }
      } else if (['liabilities', 'other current liabilities'].includes(journalName)) {
        if (items.result.total_balance !== null && items.result.total_balance !== 0) {
        this.pliabilities.push(items);
        }
      } else if (['current liabilities', 'other non-current liabilities'].includes(journalName)) {
        if (items.result.total_balance !== null && items.result.total_balance !== 0) {
        this.pnonLiabilities.push(items);
        }
      } else if (['revenue', 'cost of goods sold', 'cost of services'].includes(journalName)) {
        this.prevenue.push(items);
      } else if (['expenses', 'other items – subsidy/ gain (losses)'].includes(journalName)) {
        this.pexpense.push(items);
      } else if (journalName === 'equity') {
        // this.pequity.push(items);
        if (items.result.journal_name === 'Subscribed Share Capital - Common') {
          this.psscc.push(items);
        } else if (items.result.journal_name === 'Subscription Receivable - Common') {
          this.psrc.push(items);
        } else if (items.result.journal_name === 'Subscriptions Receivable Preferred') {
          this.psrp.push(items);
        } else if (items.result.journal_name === 'Paid-up Share Capital-Preferred') {
          this.ppscp.push(items);
        } else if (items.result.journal_name === 'Treasury Shares Capital -Preferred') {
          this.ptscp.push(items);
        } else if (items.result.journal_name === 'Deposit for Share Capital Subscription') {
          this.pdscp.push(items);
        } else if (items.result.journal_name === 'Undivided Net Surplus') {
          this.puns.push(items);
        } else if (items.result.journal_name === 'Net Loss') {
          this.pnl.push(items);
        } else if (items.result.journal_name === 'Donations/Grants') {
          this.pdg.push(items);
      } 
      } 
    }
    
  }

  calculateAssetTotalBalance(): number {
    let totalBalance = 0;
  
    for (const item of this.assets) {
      totalBalance += item.result.total_balance;
    }
  
    for (const item of this.otherAssets) {
      totalBalance += item.result.total_balance;
    }
  
    for (const item of this.nonAssets) {
      totalBalance += item.result.total_balance;
    }
  
    return totalBalance;
  }

  calculateLiabilityTotalBalance(): number {
    let totalBalance = 0;
  
    for (const item of this.liabilities) {
      totalBalance += item.result.total_balance;
    }
  
    for (const item of this.nonLiabilities) {
      totalBalance += item.result.total_balance;
    }
  
    return totalBalance;
  }

  calculateLastYearAssetTotalBalance(): number {
    let totalBalance = 0;
  
    for (const items of this.passets) {
      totalBalance += items.result.total_balance;
    }
  
    for (const items of this.potherAssets) {
      totalBalance += items.result.total_balance;
    }
  
    for (const items of this.pnonAssets) {
      totalBalance += items.result.total_balance;
    }
  
    return totalBalance;
  }

  calculateLastYearLiabilityandEquityTotalBalance(): number {
    let totalBalance = 0;
  
    for (const items of this.pliabilities) {
      totalBalance += items.result.total_balance;
    }
  
    for (const items of this.pnonLiabilities) {
      totalBalance += items.result.total_balance;
    }
  
    for (const items of this.pequity) {
      totalBalance += items.result.total_balance;
    }
  
    return totalBalance;
  }

  calculateFSCEquityTotalBalance(): number {
    let totalBalance = 0;
  
    for (const item of this.ledgers) {
      const value = item.journal_name === 'Subscribed Share Capital - Common' ? item.result.total_balance : 0;
      totalBalance += value;
    }
  
    for (const item of this.ledgers) {
      const value = item.journal_name === 'Subscription Receivable - Common' ? item.result.total_balance : 0;
      totalBalance += value;
    }
  
    for (const item of this.ledgers) {
      const value = item.journal_name === 'Subscriptions Receivable Preferred' ? item.result.total_balance : 0;
      totalBalance += value;
    }
    
    for (const item of this.ledgers) {
      const value = item.journal_name === 'Paid-up Share Capital-Preferred' ? item.result.total_balance : 0;
      totalBalance += value;
    }

    for (const item of this.ledgers) {
      const value = item.journal_name === 'Treasury Shares Capital -Preferred' ? item.result.total_balance : 0;
      totalBalance += value;
    }

    for (const item of this.ledgers) {
      const value = item.journal_name === 'Deposit for Share Capital Subscription' ? item.value : 0;
      totalBalance += value;
    }
    
    for (const item of this.ledgers) {
      const value = item.journal_name === 'Undivided Net Surplus' ? item.result.total_balance : 0;
      totalBalance += value;
    }
    
    for (const item of this.ledgers) {
      const value = item.journal_name === 'Net Loss' ? item.result.total_balance : 0;
      totalBalance += value;
    }

    for (const item of this.ledgers) {
      const value = item.journal_name === 'Donations/Grants' ? item.result.total_balance : 0;
      totalBalance += value;
    }
  
    return totalBalance;
    console.log(totalBalance)
  }

  
  reserveFund : any;
  cetFund : any;
  cdFund : any;
  optionalFund : any;
  dueToUnion : any;
  statutoryFund : any;
  netFundAfterSF : any;
  combinedEquityTotalBalance : any;
  combinedLiabilityandEquityBalance : any;
  
  calculateTotalBalance(): number {
    let totalBalance = 0;
    let totalExpenses = 0;
    let totalRevenue = 0;
    let statutoryFund = 0;
  
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
  
    statutoryFund = this.reserveFund+this.cetFund+this.cdFund+this.optionalFund;

    return statutoryFund;
  }

  calculateCombinedMemberEquity(): number {
    const statutoryFund = this.calculateTotalBalance();
    const memberEquity = this.calculateFSCEquityTotalBalance();
    const combinedTotalBalance = statutoryFund + memberEquity;
    return combinedTotalBalance;
  }

  calculateCombinedTotalLiabilityandEquity(): number {
    const liabiltyBalance = this.calculateLiabilityTotalBalance();
    const membersEquity = this.calculateCombinedMemberEquity();
    const combinedTotalBalance = liabiltyBalance + membersEquity;
    return combinedTotalBalance;
  }

  preserveFund : any;
  pcetFund : any;
  pcdFund : any;
  poptionalFund : any;
  pdueToUnion : any;
  pstatutoryFund : any;
  pnetFundAfterSF : any;
  pioc : any;
  ppatRef : any;
  
  calculateLastYearTotalBalance(): number {
    let totalBalance = 0;
    let totalExpenses = 0;
    let totalRevenue = 0;
    let pstatutoryFund = 0
  
    for (const items of this.prevenue) {
      totalRevenue += items.result.total_balance;
    }
  
    for (const items of this.pexpense) {
      totalExpenses += items.result.total_balance;
    }

    totalBalance = totalRevenue - totalExpenses;

    this.preserveFund = totalBalance * 0.1;
    this.pcetFund = totalBalance * 0.05;
    this.pcdFund = totalBalance * 0.03;
    this.poptionalFund = totalBalance * 0.07;
  
    pstatutoryFund = this.preserveFund+this.pcetFund+this.pcdFund+this.poptionalFund;

    return pstatutoryFund;
  }

  calculateLastYearCombinedMemberEquity(): number {
    const statutoryFund = this.calculateLastYearTotalBalance();
    const memberEquity = this.calculateFSCEquityTotalBalance();
    const combinedTotalBalance = statutoryFund + memberEquity;
    return combinedTotalBalance;
  }

  calculateLastYearCombinedTotalLiabilityandEquity(): number {
    const liabiltyBalance = this.calculateLiabilityTotalBalance();
    const membersEquity = this.calculateCombinedMemberEquity();
    const combinedTotalBalance = liabiltyBalance + membersEquity;
    return combinedTotalBalance;
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
