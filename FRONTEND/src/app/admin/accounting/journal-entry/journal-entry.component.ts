import { Component, OnInit } from '@angular/core';
import { WahieService } from '../../../services/wahie.service';
import {FormBuilder, Validators, FormArray,FormGroup } from '@angular/forms';

@Component({
  selector: 'app-journal-entry',
  templateUrl: './journal-entry.component.html',
  styleUrls: ['./journal-entry.component.scss'],
})
export class JournalEntryComponent implements OnInit {
  deb: string= '';
  cred: string='';

  constructor(private builder:FormBuilder, private wahieService:WahieService){
  }
  journalEntryRow !: FormArray<any>;
  amount !: FormGroup<any>;
  public libJournals: any;
  public journalEntries: any;

  ngOnInit(): void{
    this.showLibJournal()
    this.showMembers()
    this.showJournalEntry()
  }

  getJournalNo(){
    
  }

  showLibJournal(): void{
    this.libJournals = this.wahieService.listLibJournals().subscribe(libjournal=>{
      this.libJournals = libjournal;
      console.log(this.libJournals);
    });
  }

  showJournalEntry(): void{
    this.journalEntries = this.wahieService.listJournalEntry().subscribe(journalEntry=>{
      this.journalEntries = journalEntry;
      console.log(this.journalEntries);
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
    totaldebit:this.builder.control({ value: 0, disabled: true }),
    totalcredit:this.builder.control({ value: 0, disabled: true }),
    entries:this.builder.array([])
  })
  
  saveEntry(){
    let total_debit = this.journalEntryForm.get("totaldebit")?.value;
    let total_credit = this.journalEntryForm.get("totalcredit")?.value;
    if(this.journalEntryForm.valid && total_debit == total_credit){
      this.wahieService.saveJournalEntry(this.journalEntryForm.getRawValue()).subscribe(res=>{
        let result:any;
        result=res;
        console.log(result);
      })
    }else{
      console.log("Error: Fill all input or need balance the amount to submit");
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
      this.balance_summary();
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

  autoZero(index: any) {
    this.journalEntryRow = this.journalEntryForm.get("entries") as FormArray;
    this.amount = this.journalEntryRow.at(index) as FormGroup;
    let debit = this.amount.get("debit")?.value;
    let credit = this.amount.get("credit")?.value;
    let num = 0;
    if(debit > 0){
      this.amount.get("credit")?.setValue(0);
    }
    else if(debit==null){
      this.amount.get("credit")?.setValue('');
    }
    if(credit > 0){
      this.amount.get("debit")?.setValue(0);
    }
    else if(credit==null){
      this.amount.get("debit")?.setValue('');
    }
    this.balance_summary();
  //   this.invoicedetail = this.invoiceform.get("details") as FormArray;
  //   this.invoiceproduct = this.invoicedetail.at(index) as FormGroup;
  //   let qty = this.invoiceproduct.get("qty")?.value;
  //   let price = this.invoiceproduct.get("salesPrice")?.value;
  //   let total = qty * price;
  //   this.invoiceproduct.get("total")?.setValue(total);
  }
  
  balance_summary(){
    let array=this.journalEntryForm.getRawValue().entries;
    let total_debit = 0;
    let total_credit = 0;
    
    array.forEach((x:any)=>{
      total_debit=total_debit+x.debit;
      total_credit=total_credit+x.credit;
    });
    this.journalEntryForm.get("totaldebit")?.setValue(total_debit);
    this.journalEntryForm.get("totalcredit")?.setValue(total_credit);
  }


  add(journal_number:string,journal_name:string, journal_type:string){
    this.libJournals={
      'journal_number': journal_number,
      'journal_name': journal_name,
      'journal_type': journal_type,
    };
    this.wahieService.addLibJournal(this.libJournals as any).subscribe(libjournal=>{
      this.libJournals = libjournal
    });
    console.log(this.libJournals)
  }
}
