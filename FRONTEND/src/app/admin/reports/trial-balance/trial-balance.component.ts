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

  constructor(private http:HttpClient, private exportAsService: ExportAsService, private toast:NgToastService) {}
    
  ngOnInit(): void {

    this.showSLedger();
    this.showPastSLedger();
    this.processLedgerData();
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
  
    for (const item of this.ledgers) {
      const journalName = item.result.journType.toLowerCase(); // Convert to lowercase for case-insensitive comparison
      console.log('Journal Name:', journalName);

      if (['cash and cash equivalents', 'loans and receivables', 'financial assets', 'biologicals assets'].includes(journalName)) {
        this.assets.push(item);
      } else if (journalName === 'other current assets') {
        this.otherAssets.push(item);
      } else if (['non current assets', 'biological assets', 'intangible assets'].includes(journalName)) {
        this.nonAssets.push(item);
      } else if (['liabilities', 'other current liabilities'].includes(journalName)) {
        this.liabilities.push(item);
      } else if (['current liabilities', 'other non-current liabilities'].includes(journalName)) {
        this.nonLiabilities.push(item);
      } else if (journalName === 'equity') {
        this.equity.push(item);
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

  calculateLiabilityandEquityTotalBalance(): number {
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
  
    return totalBalance;
  }
  
  preLogo ="assets/image/coop-logo.png"

  chLogo(event:any){
    let fileType = event.target.files[0].type;
    if(fileType.match(/image\/*/)){
      let upload = new FileReader();
      upload.readAsDataURL(event.target.files[0]);
      upload.onload = (event:any)=>(
        this.preLogo = event.target.result
      
      );  this.toast.success({detail:'Success',summary:'Logo changed',duration:2000, sticky:false,position:'tr'});
    }else{
      this.toast.error({detail:'Error',summary:'Please upload correct image format',duration:2000, sticky:false,position:'tr'});
    }
  }

}
