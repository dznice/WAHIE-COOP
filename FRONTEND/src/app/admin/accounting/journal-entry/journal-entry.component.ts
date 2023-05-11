import { Component, OnInit } from '@angular/core';
import { WahieService } from '../../../services/wahie.service';
import { FormBuilder, Validators, FormArray,FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-journal-entry',
  templateUrl: './journal-entry.component.html',
  styleUrls: ['./journal-entry.component.scss'],
})
export class JournalEntryComponent implements OnInit {

  useid = localStorage.getItem('userData');
  journ: any;

  constructor(private builder:FormBuilder, private wahieService:WahieService, private http: HttpClient,private route:Router){
  }
  journalEntryRow !: FormArray<any>;
  amount !: FormGroup<any>;
  public libJournals: any;
  public journalEntries: any;
  public journId:any;
  public member:any;

  ngOnInit(): void{
    this.showLibJournal()
    this.showMembers()
    this.showJournalEntry()
    this.getJournalNo()
    this.getJournalNot()
    this.showJourn()
  }





  getJournalNo(){
    console.log(this.useid)
  }

  showJourn(){
    this.http.get('http://127.0.0.1:8000/api/journ').subscribe(
      (res:any)=>
      {

        this.journId = res;
        console.log(this.journId);
    });
  }

  getJournalNot(){
    console.log(this.journId)
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

  rowArray=this.builder.group({
    account:this.builder.control('', Validators.required),
    debit:this.builder.control('', Validators.required),
    credit:this.builder.control('', Validators.required),
    description:this.builder.control(''),
    name:this.builder.control('',Validators.required),
  });



  journalEntryForm=this.builder.group({
    journal_date:this.builder.control('',Validators.required),
    journal_no:this.builder.control('',Validators.required),
    entries:this.builder.array([]),
    userId:this.builder.control(this.useid),
    totaldebit:this.builder.control({ value: 0, disabled: true }),
    totalcredit:this.builder.control({ value: 0, disabled: true })
  })


  saveEntry(){
    this.journalEntryForm.controls.journal_no.setValue( this.journId )
    let total_debit = this.journalEntryForm.get("totaldebit")?.value;
    let total_credit = this.journalEntryForm.get("totalcredit")?.value;
    if(this.journalEntryForm.valid && total_debit == total_credit){
      this.wahieService.saveJournalEntry(this.journalEntryForm.getRawValue()).subscribe(res=>{
        let result:any;
        result=res;
        console.log(result);
        this.route.navigateByUrl('admin/accounting')
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
      account:this.builder.control('', Validators.required),
      debit:this.builder.control('', Validators.required),
      credit:this.builder.control('', Validators.required),
      description:this.builder.control(''),
      name:this.builder.control('',Validators.required),
    });
  }

  autoZero(index: any) {
    this.journalEntryRow = this.journalEntryForm.get("entries") as FormArray;
    this.amount = this.journalEntryRow.at(index) as FormGroup;
    let debit = this.amount.get("debit")?.value;
    let credit = this.amount.get("credit")?.value;
    if((debit==null || credit==null)){
      if(debit==null){
        this.amount.get("credit")?.setValue(null);
        this.amount.get("credit")?.setValue('');
        this.amount.get("debit")?.setValue('');
      }
      else if(credit==null){
        this.amount.get("debit")?.setValue(null);
        this.amount.get("debit")?.setValue('');
        this.amount.get("credit")?.setValue('');
      }
    }

    else if(debit > 0){
      this.amount.get("credit")?.setValue(0);
    }
    else if(credit > 0){
      this.amount.get("debit")?.setValue(0);
    }

    this.balance_summary();
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

  back(){
    this.route.navigateByUrl('admin/accounting')
  }
}
