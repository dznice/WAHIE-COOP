import{ Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray,FormGroup } from '@angular/forms';
import { WahieService } from '../../../services/wahie.service';
import { ExportAsService, ExportAsConfig } from 'ngx-export-as';

@Component({
  selector: 'app-ledger',
  templateUrl: './ledger.component.html',
  styleUrls: ['./ledger.component.scss']
})
export class LedgerComponent implements OnInit{
  selectedOption: string;
  showReport: boolean;
  tableData: any[];
  constructor(private builder:FormBuilder, private wahieService:WahieService, private exportAsService: ExportAsService){
    this.tableData = [];
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
  showJournalLogs(mem:any, acc:any, sd:any, ed:any): void{
    this.ledgers = this.wahieService.sLegder(mem, acc, sd, ed).subscribe(ledger=>{
      this.ledgers = ledger;
      console.log(this.ledgers);
    });
  }

  submittedFormData: any;
  onSubmit(formData: any) {
    let acc = this.ledgerForm.get('account')?.value;
    let mem = this.ledgerForm.get('member')?.value;
    let sd = this.ledgerForm.get('startDate')?.value;
    let ed = this.ledgerForm.get('endDate')?.value;
    this.showReport = true;
    this.showJournalLogs(mem, acc, sd, ed);
    // Set the submitted form data in the parent component
    this.submittedFormData = formData;
  }

}
