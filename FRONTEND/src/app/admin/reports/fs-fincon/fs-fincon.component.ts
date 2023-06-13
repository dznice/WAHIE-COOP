import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ExportAsService, ExportAsConfig } from 'ngx-export-as';
import { NgToastService } from 'ng-angular-popup';

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


  constructor(private http:HttpClient, private exportAsService: ExportAsService, private toast:NgToastService ) {}
    
  ngOnInit(): void {
    this.getLogo();
    this.formatDate();
    this.oneYearAgo = new Date(this.maxDate);
    this.oneYearAgo.setFullYear(this.oneYearAgo.getFullYear() - 1);
    this.showSLedger();
    this.showPastSLedger();
    this.processLedgerData();
    console.log(this.maxDate)
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
  
  preLogo:any;
  id:any;


  getLogo(){
    this.id = localStorage.getItem('userData')
    this.http.get('http://127.0.0.1:8000/api/getLogo/' + this.id).subscribe((res: any) => {
      this.preLogo= 'http://127.0.0.1:8000/storage/image/'+ res
    });
  }
  
  chLogo(event:any){
    let fileName =  event.target.files[0].name;
    let fileType = event.target.files[0].type;
    if(fileType.match(/image\/*/)){
      let upload = new FileReader();
      upload.readAsDataURL(event.target.files[0]);
      upload.onload = (event:any)=>(
        this.preLogo = event.target.result

      
      );   
    //   this.id = localStorage.getItem('userData')
    // let upLogo = {
    //   fileName : fileName
    //   }
    //   this.http.post('http://127.0.0.1:8000/api/chLogo/'+ this.id,upLogo).subscribe((res: any) => {
    //     this.toast.success({detail:'Success',summary:'Logo changed',duration:2000, sticky:false,position:'tr'});
    //   }); 
    }else{
      this.toast.error({detail:'Error',summary:'Please upload correct image format',duration:2000, sticky:false,position:'tr'});
    }
  }

}
