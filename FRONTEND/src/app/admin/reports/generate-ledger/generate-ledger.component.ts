import{ Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray,FormGroup } from '@angular/forms';
import { WahieService } from '../../../services/wahie.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-generate-ledger',
  templateUrl: './generate-ledger.component.html',
  styleUrls: ['./generate-ledger.component.scss']
})
export class GenerateLedgerComponent {

  selectedOption: string;
  showReport: boolean;
  tableData: any[];
  pastTableData: any[];
  constructor(
    private builder:FormBuilder, 
    private wahieService:WahieService,  
    private toast: NgToastService
  ){
    //this.tableData = [];
  }
  
  ngOnInit(): void {
    this.showMembers();
    this.showLibJournal();
    this.showReport=false;
    this.formatDate();
  }

  ledgerForm=this.builder.group({
    account:this.builder.control(''),
    member:this.builder.control(''),
    startDate:this.builder.control(0),
    endDate:this.builder.control(0)
  });

  public members: any ;
  public libJournals: any ;
  public ledgers: any ;
  public pledgers: any ;
  maxDate:any;

  showMembers(): void{
    this.members = this.wahieService.listMembers().subscribe(member=>{
      this.members = member;
    });
  }

  showLibJournal(): void{
    this.libJournals = this.wahieService.listLibJournals().subscribe(libjournal=>{
      this.libJournals = libjournal;
    });
  }


  // showSLedger(mem:any, acc:any, sd:any, ed:any){
  //   return this.wahieService.sLegder(mem, acc, sd, ed).subscribe(ledger=>{
  //     this.ledgers = ledger;
  //     this.tableData = this.ledgers;
  //     console.log(this.tableData);
  //   });
  // }

  // showPastSLedger(mem:any, acc:any, sd:any, ed:any){
  //   return this.wahieService.pastLegder(mem, acc, sd, ed).subscribe(pledger=>{
  //     this.pledgers = pledger;
  //     this.PastslData = this.pledgers;
  //     console.log(this.pledgers);
  //   });
  // }

  submittedFormData: any;
  trialData: any;
  slData:any[];
  PastslData:any[];
  
  onSubmit(){
    let acc = this.ledgerForm.get('account')?.value;
    let mem = this.ledgerForm.get('member')?.value;
    let sd = this.ledgerForm.get('startDate')?.value;
    let ed = this.ledgerForm.get('endDate')?.value;
    //this.showSLedger(mem, acc, sd, ed );
    //this.showPastSLedger(mem, acc, sd, ed );
    //this.PastslData = this.PastslData;
    //this.slData = this.tableData;
    //console.log(this.PastslData);
    //console.log(this.slData);
    console.log(acc, mem, sd, ed)
    if((sd==(0-0-0) && ed!=(0-0-0)) || (ed==(0-0-0) && sd!=(0-0-0))){
      this.toast.error({
        detail: 'Failed',
        summary: 'Make sure to fill all date input if you want a range of date',
        duration: 2000,
        sticky: false,
        position: 'tr',
      });
      this.showReport=false;
    }
    else if((acc=="" && mem=="" && sd==0 && ed==0)
    ||(acc==null && mem=="" && sd==0 && ed==0)
    ||(acc=="" && mem==null && sd==0 && ed==0)
    ||(acc==null && mem==null && sd==0 && ed==0)){
      this.toast.error({
        detail: 'Failed',
        summary: 'Fill the Journal Accounts or Member Field to Generate',
        duration: 2000,
        sticky: false,
        position: 'tr',
      });
      console.log(this.ledgerForm.getRawValue());
      this.showReport=false;
    }else{
    if(acc==null){
      this.ledgerForm.get("account")?.setValue('');
    }
    if(mem==null){
      this.ledgerForm.get("member")?.setValue('');
    }
    console.log(this.ledgerForm.getRawValue());
    this.submittedFormData = this.ledgerForm.getRawValue();
    this.showReport = true;
    this.trialData = this.showReport
    }
  }

  denyDate() {
    let sDate = this.ledgerForm.get('startDate')?.value;
    let eDate = this.ledgerForm.get('endDate')?.value;
    if(sDate==null){
      sDate = (0-0-0);
    }else{
      sDate = sDate;
    }

    if(eDate==null){
      eDate = (0-0-0);
    }else{
      eDate = eDate;
    }
    
    if (sDate > this.maxDate) {
      this.ledgerForm.get('startDate')?.setValue(this.maxDate);
    }

    if (eDate > this.maxDate) {
      this.ledgerForm.get('endDate')?.setValue(this.maxDate);
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
    return null;
  }

  
}
