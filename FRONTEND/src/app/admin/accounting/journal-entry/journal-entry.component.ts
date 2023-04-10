import { Component, OnInit} from '@angular/core';
import { WahieService } from '../../../services/wahie.service';

@Component({
  selector: 'app-journal-entry',
  templateUrl: './journal-entry.component.html',
  styleUrls: ['./journal-entry.component.scss'],
  providers: [WahieService]
})
export class JournalEntryComponent implements OnInit {

  row = [
    {
      id : '',
      account: '',
      debits: '',
      credits: '',
      description: '',
      name: ''
    },
    {
      id : '',
      account: '',
      debits: '',
      credits: '',
      description: '',
      name: ''
    },
    {
      id : '',
      account: '',
      debits: '',
      credits: '',
      description: '',
      name: ''
    }
  ];
  
  addTable() {
    const obj = {
      id : '',
      account: '',
      debits: '',
      credits: '',
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

  selectedJournal: any;

  filteredJournal: any;
  
  keyword= 'journal_name';
  public journals: any ;

  constructor(private wahieService:WahieService){}

  ngOnInit(): void {
    this.showJournal()
  }

  selectEvent(item:any) {
    // do something with selected item
  }
 
  onChangeSearch(val: String) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }
  
  onFocused(e:any){
    // do something when input is focused
  }

  showJournal(): void{
    this.journals = this.wahieService.listJournals().subscribe(journal=>{
      this.journals = journal;
      console.log(this.journals);
    });
  } 

}


