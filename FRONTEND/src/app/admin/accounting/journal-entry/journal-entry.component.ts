import { Component, OnInit} from '@angular/core';
import { WahieService } from '../../../services/wahie.service';
import {FormBuilder, FormGroup} from '@angular/forms';

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

  samples=[
    {id:1, name:'Asset0'},
    {id:2, name:'Asset1'},
    {id:3, name:'Asset2'},
    {id:4, name:'Asset3'},
    {id:5, name:'Asset4'},
    {id:5, name:'Asset5'},
  ];

  CreateNew(sample:any){
    alert("Create New Clicked : "+ sample)
  }

  isSubmitted=false;

  frm!:FormGroup;

  onPost= ()=>this.isSubmitted=true;

  selectedJournal: any;

  filteredJournal: any;

  keyword1= 'journal_number';
  keyword= 'journal_name';
  keyword3= 'journal_type';
  public journals: any;

  constructor(private wahieService:WahieService, private fb:FormBuilder){}

  ngOnInit(): void {
    this.showJournal()
    this.frm = this.fb.group({
      'selectedSample':[''],
      'description':['']
    })
  }

  selectEvent(item:any) {
    // do something with selected item
  }
 
  onChangeSearch(val: String) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
    console.log(val);
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


  journalList = [];

  search($event: any){
    console.log($event);
  }

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
}




