import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ExportAsService, ExportAsConfig } from 'ngx-export-as';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-trial-balance',
  templateUrl: './trial-balance.component.html',
  styleUrls: ['./trial-balance.component.scss']
})
export class TrialBalanceComponent implements OnInit {
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
  revenue : any[];
  expenses : any[];

  constructor(private http:HttpClient, private exportAsService: ExportAsService, private toast:NgToastService) {}
    
  ngOnInit(): void {
    this.getLogo();
    this.showSLedger();
    this.showPastSLedger();
    this.processLedgerData();
    this.totalBalance = this.calculateTotalBalance();
    this.reserveFund = this.totalBalance * 0.1;
    this.cetFund = this.totalBalance * 0.05;
    this.cdFund = this.totalBalance * 0.03;
    this.optionalFund = this.totalBalance * 0.07;
  }

  exportAsPdf: ExportAsConfig = {
    type: 'pdf',
    elementIdOrContent: 'trialBalance',
    options: {
      image: { type: 'jpeg', quality: 1 },
      html2canvas:  { scale: 3},
      margin:  [5, 2, 5, 2],
      fontSize: 12,
      //pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
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
    elementIdOrContent: 'trialBalance'
  }

  exportPDF() {
    this.exportAsService.save(this.exportAsPdf, 'Trial-Balance').subscribe(() => {
      // save started
    });
  }

  exportEXCEL() {
    this.exportAsService.save(this.exportAsExcel, 'Trial-Balance').subscribe(() => {
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
    this.expenses = [];
  
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
      } else if (journalName === 'equity') {
        if (item.result.total_balance !== null && item.result.total_balance !== 0) {
        this.equity.push(item);
        }
      } else if (['revenue', 'cost of goods sold' , 'cost of services'].includes(journalName)) {
        if (item.result.total_balance !== null && item.result.total_balance !== 0) {
        this.revenue.push(item);
        }
      } else if (['expense', 'other items – subsidy/ gain (losses)'].includes(journalName)) {
        if (item.result.total_balance !== null && item.result.total_balance !== 0) {
        this.expenses.push(item);
        }
      } 
    }
  }

  
  reserveFund : any;
  cetFund : any;
  cdFund : any;
  optionalFund : any;
  statutoryFund : any;
  totalBalance : any;

  calculateTotalBalance(): number {
    let totalBalance = 0;
    let totalExpenses = 0;
    let totalRevenue = 0;
    let statutoryFund = 0;
  
    for (const item of this.revenue) {
      totalRevenue += item.result.total_balance;
    }
  
    for (const item of this.expenses) {
      totalExpenses += item.result.total_balance;
    }

    totalBalance = totalRevenue - totalExpenses;

    this.reserveFund = totalBalance * 0.1;
    this.cetFund = totalBalance * 0.05;
    this.cdFund = totalBalance * 0.03;
    this.optionalFund = totalBalance * 0.07;
  
    this.statutoryFund = this.reserveFund+this.cetFund+this.cdFund+this.optionalFund;
    totalBalance = this.reserveFund+this.cetFund+this.cdFund+this.optionalFund;

    return totalBalance;
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
    this.passets = [];
    this.potherAssets = [];
    this.pnonAssets = [];
    this.pliabilities = [];
    this.pnonLiabilities = [];
    this.pequity = [];
  
    for (const items of this.pledgers) {
      const journalName = items.result.journType.toLowerCase(); // Convert to lowercase for case-insensitive comparison
      console.log('Journal Name:', journalName);

      if (['cash and cash equivalents', 'loans and receivables', 'financial assets', 'biologicals assets'].includes(journalName)) {
        this.passets.push(items);
      } else if (journalName === 'other current assets') {
        this.potherAssets.push(items);
      } else if (['non current assets', 'biological assets', 'intangible assets'].includes(journalName)) {
        this.pnonAssets.push(items);
      } else if (['liabilities', 'other current liabilities'].includes(journalName)) {
        this.pliabilities.push(items);
      } else if (['current liabilities', 'other non-current liabilities'].includes(journalName)) {
        this.pnonLiabilities.push(items);
      } else if (journalName === 'equity') {
        this.pequity.push(items);
      } 
    }
    
  }
  
  calculateAssetandRevenueTotalBalance(): number {
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
    for (const item of this.revenue) {
      totalBalance += item.result.total_balance;
    }
  
    return totalBalance;
  }

  calculateLiabilityEquityandExpensesTotalBalance(): number {
    let totalBalance = 0;
  
    for (const item of this.liabilities) {
      totalBalance += item.result.total_balance;
    }
  
    for (const item of this.nonLiabilities) {
      totalBalance += item.result.total_balance;
    }
  
    for (const item of this.equity) {
      totalBalance += item.result.total_balance;
    }
    for (const item of this.expenses) {
      totalBalance += item.result.total_balance;
    }

    totalBalance = totalBalance + this.calculateTotalBalance();
  
    return totalBalance;
  }
  
  preLogo:any;
  id:any;
  getLogo(){
    this.id = localStorage.getItem('userData')
    this.http.get('http://127.0.0.1:8000/api/getLogo/' + this.id).subscribe((res: any) => {
      this.preLogo= 'http://127.0.0.1:8000/storage/image/'+ res
    });
  }
  
  chLogo(event:any){
    let fileType = event.target.files[0].type;
    let file =  event.target.files[0];
    if(fileType.match(/image\/*/)){
      let upload = new FileReader();
      upload.readAsDataURL(event.target.files[0]);
      upload.onload = (event:any)=>(
        this.preLogo = event.target.result

      
      );   
      var myFormData = new FormData();
      this.id = localStorage.getItem('userData')
      myFormData.append('image', file);

      this.http.post('http://127.0.0.1:8000/api/chLogo/'+ this.id,myFormData).subscribe((res: any) => {
        this.toast.success({detail:'Success',summary:'Logo changed',duration:2000, sticky:false,position:'tr'});
        this.preLogo= 'http://127.0.0.1:8000/storage/image/'+ res
      }); 
    }else{
      this.toast.error({detail:'Error',summary:'Please upload correct image format',duration:2000, sticky:false,position:'tr'});
    }
  }

}
