import { Component, Input , OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { WahieService } from '../../../services/wahie.service';

@Component({
  selector: 'app-sl-accounts',
  templateUrl: './sl-accounts.component.html',
  styleUrls: ['./sl-accounts.component.scss']
})
export class SlAccountsComponent implements OnChanges {
  @Input() formData: any;
  //@Input() trial: any;
  // @Input() slData: any[];
  // @Input() PastslData: any[];

  showReport: boolean;
  public ledgers: any;
  public pledgers: any;
  public accInfos: any;
  public memInfos: any;

  maxDate: any;
  constructor( private wahieService:WahieService){

  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['formData']) {
      // Perform necessary actions based on the submitted value
      this.ngOnInit();
      this.formatDate();
      
    }
  }

  ngOnInit(): void{
    this.showLibJournalInfo(this.formData.account);
    this.showMemberInfo(this.formData.member);
    this.showSLedger(this.formData.member, this.formData.account, this.formData.startDate, this.formData.endDate);
    this.showPastSLedger(this.formData.member, this.formData.account, this.formData.startDate, this.formData.endDate);
    // console.log(this.slData);
    // console.log(this.PastslData);
  }

  showLibJournalInfo(accID:any): void{
    this.accInfos = this.wahieService.getLibJournalInfo(accID).subscribe(accInfo=>{
      this.accInfos = accInfo;
    });
  }

  showMemberInfo(memID:any): void{
    this.memInfos = this.wahieService.getMemberInfo(memID).subscribe(memInfo=>{
      this.memInfos = memInfo;
    });
  }

  showSLedger(mem:any, acc:any, sd:any, ed:any): void{
    this.ledgers = this.wahieService.sLegder(mem, acc, sd, ed).subscribe(ledger=>{
      this.ledgers = ledger;
       console.log(this.ledgers); 
    });
  }

  showPastSLedger(mem:any, acc:any, sd:any, ed:any): void{
    this.pledgers = this.wahieService.pastLegder(mem, acc, sd, ed).subscribe(pledger=>{
      this.pledgers = pledger;
        
    });
  }

  private formatDate() {
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
