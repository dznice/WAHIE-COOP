import{ Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray,FormGroup } from '@angular/forms';
import { WahieService } from '../../../services/wahie.service';

@Component({
  selector: 'app-ledger',
  templateUrl: './ledger.component.html',
  styleUrls: ['./ledger.component.scss']
})
export class LedgerComponent implements OnInit{

  constructor(private builder:FormBuilder, private wahieService:WahieService, ){

  }
  
  ngOnInit(): void {
    this.showMembers();
    this.showLibJournal();
  }

  ledgerForm=this.builder.group({
    account:this.builder.control(''),
    member:this.builder.control(''),
    startDate:this.builder.control(''),
    endDate:this.builder.control('')
  });

  public members: any ;
  public libJournals: any ;

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
}
