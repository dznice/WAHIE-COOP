import { Component, Input , OnInit } from '@angular/core';
import { WahieService } from '../../../services/wahie.service';

@Component({
  selector: 'app-sl-accounts',
  templateUrl: './sl-accounts.component.html',
  styleUrls: ['./sl-accounts.component.scss']
})
export class SlAccountsComponent {
  @Input() formData: any;
  @Input() trial: any;
  @Input() slData: any[];
  @Input() PastslData: any[];

  showReport: boolean;
  public ledgers: any 
  public pledgers: any 
  public libJournals: any 
  constructor( private wahieService:WahieService){

  }

  ngOnInit():void{
    this.showSLedger(this.formData.member, this.formData.account, this.formData.startDate, this.formData.endDate);
    this.showPastSLedger(this.formData.member, this.formData.account, this.formData.startDate, this.formData.endDate);
    console.log(this.slData);
    console.log(this.PastslData);
  }

  showLibJournal(): void{
    this.libJournals = this.wahieService.listLibJournals().subscribe(libjournal=>{
      this.libJournals = libjournal;
    });
  }

  showSLedger(mem:any, acc:any, sd:any, ed:any): void{
    this.ledgers = this.wahieService.sLegder(mem, acc, sd, ed).subscribe(ledger=>{
      this.ledgers = ledger;
       console.log(this.ledgers);
       console.log(this.ledgers.result[1].name);
        //let num=0;
      //   ledger.forEach((x:any)=>{
      //   if(x.totald=0){
      //     x.totald=x.totalc;
      //     console.log(x.totald);
      //     console.log('hello');
      //   }
      // });
    });
  }

  showPastSLedger(mem:any, acc:any, sd:any, ed:any): void{
    this.pledgers = this.wahieService.pastLegder(mem, acc, sd, ed).subscribe(pledger=>{
      this.pledgers = pledger;
        
    });
  }

}
