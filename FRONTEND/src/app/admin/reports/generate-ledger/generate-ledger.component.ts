import{ Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray,FormGroup } from '@angular/forms';
import { WahieService } from '../../../services/wahie.service';
import { ExportAsService, ExportAsConfig } from 'ngx-export-as';

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
  constructor(private builder:FormBuilder, private wahieService:WahieService, private exportAsService: ExportAsService){
    //this.tableData = [];
  }

  exportAsPdf: ExportAsConfig = {
    type: 'pdf',
    elementIdOrContent: 'trialFile',
    options: {
      image: { type: 'jpeg', quality: 1 },
      html2canvas:  { scale: 3},
      margin:  [5, 2, 5, 2],
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
      jsPDF: {
        orientation: 'portrait',
        format: 'letter',
        precision: 16
      }
    }
  }

  exportAsExcel: ExportAsConfig = {
    type: 'xlsx',
    elementIdOrContent: 'trialFile'
  }

  exportPDF() {
    this.exportAsService.save(this.exportAsPdf, 'Reports').subscribe(() => {
      // save started
    });
  }

  exportEXCEL() {
    this.exportAsService.save(this.exportAsExcel, 'Reports').subscribe(() => {
      // save started
    });
  }
  
  ngOnInit(): void {
    this.showMembers();
    this.showLibJournal();
    this.showReport = false;
    //this.showJournalLogs(1);
  }

  ledgerForm=this.builder.group({
    account:this.builder.control(''),
    member:this.builder.control(''),
    startDate:this.builder.control(''),
    endDate:this.builder.control('')
  });

  public members: any ;
  public libJournals: any ;
  public ledgers: any ;
  public pledgers: any ;

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
    //let acc = this.ledgerForm.get('account')?.value;
    //let mem = this.ledgerForm.get('member')?.value;
    //let sd = this.ledgerForm.get('startDate')?.value;
    //let ed = this.ledgerForm.get('endDate')?.value;
    //this.showSLedger(mem, acc, sd, ed );
    //this.showPastSLedger(mem, acc, sd, ed );
    //this.PastslData = this.PastslData;
    //this.slData = this.tableData;
    //console.log(this.PastslData);
    //console.log(this.slData);
    if(this.ledgerForm.get('account')?.value==null){
      this.ledgerForm.get("account")?.setValue('');
    }
    if(this.ledgerForm.get('member')?.value==null){
      this.ledgerForm.get("member")?.setValue('');
    }
    console.log(this.ledgerForm.getRawValue());
    this.submittedFormData = this.ledgerForm.getRawValue();
    this.showReport = true;
    this.trialData = this.showReport;
  }
}
