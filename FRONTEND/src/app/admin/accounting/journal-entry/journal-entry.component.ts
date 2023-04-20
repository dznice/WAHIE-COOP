import { Component, OnInit} from '@angular/core';
import { WahieService } from '../../../services/wahie.service';
import { Journal } from '../../../model/journal.model';

@Component({
  selector: 'app-journal-entry',
  templateUrl: './journal-entry.component.html',
  styleUrls: ['./journal-entry.component.scss'],
  providers: [WahieService]
})
export class JournalEntryComponent implements OnInit {

  row:any = [
    {
      id : '',
      account: '',
      debit: '',
      credit: '',
      description: '',
      name: ''
    }
  ];
  
  addTable() {
    const obj = {
      id : '',
      account: '',
      debit: '',
      credit: '',
      description: '',
      name: ''
    }
    this.row.push(obj)
  }
  
  deleteRow(x: number){
    var delBtn = confirm(" Do you want to delete ?");
    if ( delBtn == true ) {
      this.row.splice(x, 1 );
    }   
  }

  // isSubmitted=false;
  // selectedJournal: any;
  // selectedMember: any;
  // filteredJournal: any;
  journalEntry = new Journal()
  public journals: any;

  //journalForm:FormGroup
  constructor(private wahieService:WahieService){}

  ngOnInit(): void {
    this.showJournal()
    this.showMembers()
  }

  // selectEvent(item:any) {
  //   // do something with selected item
  // }
  // onChangeSearch(val: String) {
  //   // fetch remote data from here
  //   // And reassign the 'data' which is binded to 'data' property.
  //   console.log(val);
  // }
  // onFocused(e:any){
  //   // do something when input is focused
  // }

  showJournal(): void{
    this.journals = this.wahieService.listJournals().subscribe(journal=>{
      this.journals = journal;
      console.log(this.journals);
    });
  }

  onsubmit(){
    console.log(this.row)
  }

  //journalList = [];
  // search($event: any){
  //   console.log($event);
  // }

  /**MODAL*/
  showModal = -1;
  show(index: number){
    this.showModal = index;
  }

  add(journal_number:string,journal_name:string, journal_type:string){
    this.journals={
      'journal_number': journal_number,
      'journal_name': journal_name,
      'journal_type': journal_type,
    };
    this.wahieService.addJournal(this.journals as any).subscribe(journal=>{
      this.journals = journal
    });
    console.log(this.journals)
  }

  backMethod() {
    if(confirm("Are you sure to back? ")) {
      console.log("Function");
    }
  }

  saveMethod() {
    if(confirm("Save Journal Entry? ")) {
      console.log("Function");
    }
  }

  public members: any ;

  showMembers(): void{
    this.members = this.wahieService.listMembers().subscribe(member=>{
      this.members = member;
      console.log(this.members);

    });
  }

}