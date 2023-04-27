import { Component, OnInit } from '@angular/core';
import { WahieService } from '../../../services/wahie.service';
import {FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-journal-entry',
  templateUrl: './journal-entry.component.html',
  styleUrls: ['./journal-entry.component.scss'],
})
export class JournalEntryComponent implements OnInit {

  constructor(private builder:FormBuilder, private wahieService:WahieService){
  }
  journalEntryRow !: FormArray<any>;
  public journals: any;

  ngOnInit(): void{
    this.showJournal()
    this.showMembers()
  }

  showJournal(): void{
    this.journals = this.wahieService.listJournals().subscribe(journal=>{
      this.journals = journal;
      console.log(this.journals);
    });
  }

  showModal = -1;
  show(index: number){
    this.showModal = index;
  }

  public members: any ;

  showMembers(): void{
    this.members = this.wahieService.listMembers().subscribe(member=>{
      this.members = member;
      console.log(this.members);

    });
  }

  journalEntryForm=this.builder.group({
    journal_date:this.builder.control('',Validators.required),
    journal_no:this.builder.control('',Validators.required),
    // total_debit:this.builder.control(''),
    entries:this.builder.array([])
  })
  
  saveEntry(){
    if(this.journalEntryForm.valid){
      this.wahieService.saveJournalEntry(this.journalEntryForm.getRawValue()).subscribe(res=>{
        let result:any;
        result=res;
        console.log(result);
      })
    }else{
      console.log("error");
    }
    console.log(this.journalEntryForm.value);
  }


  addRow(){
    this.journalEntryRow=this.journalEntryForm.get("entries") as FormArray;
    this.journalEntryRow.push(this.Generaterow());
  }

  removeRow(index:any){
    if(confirm('Do you want to remove?')){
      this.journalEntryRow.removeAt(index);
    }
  }

  get entryRow(){
    return this.journalEntryForm.get("entries") as FormArray;
  }

  Generaterow(){
    return this.builder.group({
      account:this.builder.control(''),
      debit:this.builder.control(''),
      credit:this.builder.control(''),
      description:this.builder.control(''),
      name:this.builder.control(''),
    });
  }

  // balance_summary(){
  //   let array=this.journalEntryForm.getRawValue().try;
  //   let total_debit= 0;
  //   array.forEach((x:any)=>{
  //     total_debit=total_debit+x.debit;
  //   })
  //   this.journalEntryForm.get("debit")?.setValue(total_debit);
  // }

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
