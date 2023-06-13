import { Component, Input , OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { WahieService } from '../../../services/wahie.service';
import { NgToastService } from 'ng-angular-popup';

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
  constructor( private wahieService:WahieService, private toast:NgToastService){

  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['formData']) {
      // Perform necessary actions based on the submitted value
      this.ngOnInit();
      
    }
  }

  ngOnInit(): void{
    this.formatDate();
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

       this.calculateExample();
    });
  }

  showPastSLedger(mem:any, acc:any, sd:any, ed:any): void{
    this.pledgers = this.wahieService.pastLegder(mem, acc, sd, ed).subscribe(pledger=>{
      this.pledgers = pledger;
       
      this.calculateExample();
    });
  }

  calculateExample(): void {
    if (this.ledgers && this.pledgers) {
      for (let item of this.ledgers) {
        
        for (let items of this.pledgers) {
          if (item.result.journId === items.result.journId) {
            item.example = item.result.total_balance - items.result.total_balance;
            break;
          }
        }
      }
    }
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
