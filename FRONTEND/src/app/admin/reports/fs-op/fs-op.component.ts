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
  assets: any[];
  otherAssets: any[];
  nonAssets: any[];
  passets: any[];
  potherAssets: any[];
  pnonAssets: any[];
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
    this.assets = [];
    this.otherAssets = [];
    this.nonAssets = [];
  
    for (const item of this.ledgers) {
      const journalName = item.result.journType.toLowerCase(); // Convert to lowercase for case-insensitive comparison
      console.log('Journal Name:', journalName);

      if (['cash and cash equivalents', 'loans and receivables', 'financial assets', 'biologicals assets'].includes(journalName)) {
        this.assets.push(item);
      } else if (journalName === 'other current assets') {
        this.otherAssets.push(item);
      } else if (['non current assets', 'biological assets', 'intangible assets'].includes(journalName)) {
        this.nonAssets.push(item);
      }
    }
    
    console.log('Ledgers:', this.ledgers);
    console.log('Assets:', this.assets);
    console.log('Other Assets:', this.otherAssets);
    console.log('Non-Assets:', this.nonAssets);
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
  
    for (const items of this.pledgers) {
      const journalName = items.result.journType.toLowerCase(); // Convert to lowercase for case-insensitive comparison
      console.log('Journal Name:', journalName);

      if (['cash and cash equivalents', 'loans and receivables', 'financial assets', 'biologicals assets'].includes(journalName)) {
        this.passets.push(items);
      } else if (journalName === 'other current assets') {
        this.potherAssets.push(items);
      } else if (['non current assets', 'biological assets', 'intangible assets'].includes(journalName)) {
        this.pnonAssets.push(items);
      }
    }
    
    console.log('Ledgers:', this.ledgers);
    console.log('Assets:', this.assets);
    console.log('Other Assets:', this.otherAssets);
    console.log('Non-Assets:', this.nonAssets);
  }

  calculateTotalBalance(): number {
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

}
