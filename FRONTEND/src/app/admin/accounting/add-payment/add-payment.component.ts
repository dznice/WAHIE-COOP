import { Component, OnInit } from '@angular/core';
import { Item } from './paymentItem';
import { FormBuilder, Validators, FormArray,FormGroup } from '@angular/forms';
import { WahieService } from '../../../services/wahie.service';
import { itemService } from '../../accounting/item.service';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { NgToastService } from'ng-angular-popup';

@Component({
  selector: 'app-add-payment',
  templateUrl: './add-payment.component.html',
  styleUrls: ['./add-payment.component.scss'],
  providers: [itemService]
})
export class AddPaymentComponent implements OnInit {
  item: any[] = [];
  term: string = '';
  p: number = 1;
  private urlId : Subscription;
  useid = localStorage.getItem('userData');

  startDate: string = '';
  endDate: string = '';
  paymentMethod: string = '';
  deposit: string = '';
  transaction_Num: string = '';
  reference_Num: string = '';

  public accounts: any;
  public libJournals: any;
  public members: any;
  public transactionNOs: any;
  public recents: any;
  // paymentForm: FormGroup;

  selectedTNo: any;
  selectedMethod: any;
  paymentRow !: FormArray<any>;
  amount !: FormGroup<any>;
  maxDate: any;
  paymentMethods: any[] =  [
      {value: '1', viewValue: 'Cash'},
      {value: '2', viewValue: 'Check'},
      {value: '3', viewValue: 'Credit Card'},
      {value: '4', viewValue: 'Direct Debit'}
    ];
  deposits: string[] = ["1", "2", "3"];

  constructor(private builder:FormBuilder, private wahieService:WahieService, private ItemService: itemService, private http:HttpClient, private aRouter: ActivatedRoute, private route:Router, private toast: NgToastService){

  }

  id:number = 0;
  ngOnInit(): void {
    this.item = this.ItemService.item;
    this.urlId = this.aRouter.params.subscribe(
      params=>{

      console.log(params);
      console.log(params['memberId'])
      this.id = params['memberId']
      console.log('hello' + this.id)
    })
    console.log('hello' + this.id)
    this.showAccounting();
    this.showAccounting1();
    this.personalInfo(this.id);
    this.optionTransactionNo(this.id);
    this.showLibJournal();
    if(this.selectedTNo>0){
    this.showRecentTransactions(this.id, this.selectedTNo);
    }
    else{
      this.selectedTNo='';
      this.showRecentTransactions(this.id, this.selectedTNo);
    }
  }

  paymentForm=this.builder.group({
    member:this.builder.control({value:'', disabled: true}),
    paymentDate:this.builder.control(this.formatDate()),
    paymentMethod:this.builder.control('',Validators.required),
    referenceNo:this.builder.control('',Validators.required),
    depositTo:this.builder.control('',Validators.required),
    transactionNo:this.builder.control('',Validators.required),
    // invoiceNo:this.builder.control(''),
    // startDate:this.builder.control(''),
    // endDate:this.builder.control(''),
    payables:this.builder.array([
      this.Generaterow(),
      this.Generaterow(),
      this.Generaterow(),
      this.Generaterow()]),

  });

  personalInfo(index:any){
    this.members = this.wahieService.getMemberInfo(index).subscribe((member:any)=>{
      this.members = member;
      this.paymentForm.get("member")?.setValue(this.members.first_name +' '+ this.members.last_name);
      console.log(this.members);
    });
  }

  optionTransactionNo(index:any){
    this.transactionNOs = this.wahieService.listTransactionNo(index).subscribe((optionTransac:any)=>{
      this.transactionNOs = optionTransac;
      console.log(this.transactionNOs);
    });
  }

  showRecentTransactions(mem:any, tran:any){
    this.recents = this.wahieService.listTransaction(mem, tran).subscribe((recent:any)=>{
      this.recents = recent;
      console.log(this.recents);
    });
  }

  showLibJournal(): void{
    this.libJournals = this.wahieService.listLibJournals().subscribe(libjournal=>{
      this.libJournals = libjournal;
      console.log(this.libJournals);
    });
  }

  // showAccounting(): void{
  //   this.accounts = this.wahieService.getListAccount(this.id).subscribe((account:any)=>{
  //     this.accounts = account;
  //     console.log('result');
  //   });
  // }

  showAccounting(): void{
    this.accounts = this.wahieService.getListAccount(this.id).subscribe((account:any[])=>{
        this.accounts = account;
      //   this.paymentForm=this.builder.group({
      //     amountReceived:this.builder.control({value: 0, disabled: true}),
      //     member:this.builder.control({value: account[0].debit.cred.transac.member.first_name
      //       +' '+ account[0].debit.cred.transac.member.last_name, disabled: true}),
      //     email:this.builder.control({value: account[0].debit.cred.transac.member.email, disabled: true}),
      //     paymentDate:this.builder.control(this.formatDate()),
      //     paymentMethod:this.builder.control('',Validators.required),
      //     referenceNo:this.builder.control('',Validators.required),
      //     memberId:this.builder.control(this.id),
      //     userId:this.builder.control(this.useid),
      //     // startDate:this.builder.control(''),
      //     // endDate:this.builder.control(''),
      //     payables: this.builder.array(account.map(trial => this.generateFormGroup(trial))),
      //     amountApply:this.builder.control({value: 0, disabled: true}),
      //     amountCredit:this.builder.control({value: 0, disabled: true}),
      // });
    });
  }

  // private generateFormGroup(trial:any) {

  //   return this.builder.group({
  //     debitId: this.builder.control({ value: trial.id , disabled: true }),
  //     payablesId: this.builder.control({ value: trial.debit.payables_id , disabled: true }),
  //     creditId: this.builder.control({ value: trial.credits_id , disabled: true }),
  //     journal_no: this.builder.control({ value: trial.debit.cred.transaction_number , disabled: true }),
  //     description: this.builder.control({ value: trial.debit.cred.entries.entry_name , disabled: true }),
  //     dueDate: this.builder.control({ value:  trial.debit.due_date, disabled: true }),
  //     origAmount: this.builder.control({ value: trial.orig_amount, disabled: true }),
  //     openBalance: this.builder.control({ value:parseFloat(trial.open_balance.toString()) , disabled: true }),
  //     payment: this.builder.control({value: 0, disabled: false} ,Validators.required)
  //   });
  // }

  get payablesRow(){
    return this.paymentForm.get("payables") as FormArray;
  }

  showAccounting1(): void{
    this.accounts = this.wahieService.listTransactions().subscribe((account:any)=>{
      this.accounts = account;
      console.log(this.accounts);
    });
  }



  // savePayment1(){
  //   //this.paymentForm.get("entries") as FormArray;
  //   // this.paymentForm.controls.journal_no.setValue( this.journId )
  //   // let total_debit = this.journalEntryForm.get("totaldebit")?.value;
  //   // let total_credit = this.journalEntryForm.get("totalcredit")?.value;
  //   if(this.paymentForm.valid){
  //     this.wahieService.savePayment(this.paymentForm.getRawValue()).subscribe(res=>{
  //       let result:any;
  //       result=res;
  //       this.log.activity = 'Receive payment from' + ' ' + this.paymentForm.getRawValue().member
  //       this.activityLog()
  //       this.toast.success({detail:'Success',summary:'Information saved',duration:2000, sticky:false,position:'tr'});
  //       this.route.navigateByUrl('admin/accounting')
  //     })
  //   }else{
  //     this.toast.error({detail:'Failed',summary:'Fill all inputs or balance the amount to submit',duration:2000, sticky:false,position:'tr'});
  //     console.log("Error: Fill all input or need balance the amount to submit");
  //   }
  //   console.log(this.paymentForm.getRawValue());
  //   //this.route.navigateByUrl('admin/accounting')
  // }

  savePayment(){
    if(this.paymentForm.valid){
      this.wahieService.savePayment(this.paymentForm.getRawValue()).subscribe(res=>{
        let result:any;
        result=res;
        this.log.activity = 'Receive payment from' + ' ' + this.paymentForm.getRawValue().member
        this.activityLog()
        this.toast.success({detail:'Success',summary:'Information saved',duration:2000, sticky:false,position:'tr'});
        this.route.navigateByUrl('admin/accounting')
      })
    }else{
      this.toast.error({detail:'Failed',summary:'Fill all inputs or balance the amount to submit',duration:2000, sticky:false,position:'tr'});
      console.log("Error: Fill all input or need balance the amount to submit");
    }
    console.log(this.paymentForm.getRawValue());
    //this.route.navigateByUrl('admin/accounting')
  }

  

  addRow(){
    this.paymentRow=this.paymentForm.get("payables") as FormArray;
    this.paymentRow.push(this.Generaterow());
  }

  get payRow(){
    return this.paymentForm.get("payables") as FormArray;
  }

  Generaterow(){
    return this.builder.group({
      account:this.builder.control('', Validators.required),
      debit:this.builder.control('', Validators.required),
      credit:this.builder.control('', Validators.required),
      //description:this.builder.control(''),
      //dueDate:this.builder.control('',Validators.required),
    });
  }

  removeRow(index:any){
    this.paymentRow = this.paymentForm.get("payables") as FormArray;
    if(confirm('Do you want to remove?')){
      this.paymentRow.removeAt(index);
      //this.balance_summary();
    }
  }

 autoAmount(index: any) {
    this.paymentRow = this.paymentForm.get("payables") as FormArray;
    this.amount = this.paymentRow.at(index) as FormGroup;
    let pay = this.amount.get("payment")?.value;
    let openBal = this.amount.get("openBalance")?.value;
    if(pay>openBal){
      this.amount.get("payment")?.setValue(openBal);
      //this.amount.get("payment")?.setValue(null);
    }
    this.amount_summary();
}

clearValue(index: any) {
  this.paymentRow = this.paymentForm.get("payables") as FormArray;
  this.amount = this.paymentRow.at(index) as FormGroup;
  this.amount.get("payment")?.setValue(null);
}

  amount_summary(){
    let array=this.paymentForm.getRawValue().payables;
    let apply = 0;
    //let credit = 0;
    array.forEach((x:any)=>{
      apply=apply+x.payment;
    });
    console.log(apply)
    //this.paymentForm.get("amountApply")?.setValue(apply);
    //this.paymentForm.get("amountReceived")?.setValue(apply);
    //this.paymentForm.get("totalcredit")?.setValue(total_credit);
  }

  clearMethod(){
    let array=this.paymentForm.getRawValue().payables;
    array.forEach((x:any)=>{
      this.clearValue(x);
    });
  }

  denyDate(){
    let payment_date = this.paymentForm.get("paymentDate")?.value;
    if(payment_date>this.maxDate){
      this.paymentForm.get("paymentDate")?.setValue(this.maxDate);
    }
  }

  private formatDate() {
    const d = new Date();
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    this.maxDate = [year, month, day].join('-')
    console.log(this.id)
    return this.maxDate;
  }

  changeMethod(){
    this.selectedMethod = this.paymentForm.get("paymentMethod")?.value;
    if(this.selectedMethod=='1'){
      this.paymentForm.get("referenceNo")?.setValue('');
    }
    else{
      this.paymentForm.get("referenceNo")?.setValue(null);
    }
  }

  changeTNo(){
    this.selectedTNo = this.paymentForm.get("transactionNo")?.value;
    this.ngOnInit();
    // if(this.selectedTNo>0){
    //   this.paymentForm.get("referenceNo")?.setValue('');
    // }
    // else{
    //   this.paymentForm.get("referenceNo")?.setValue(null);
    // }
  }

  public log ={
    name: sessionStorage.getItem('name'),
    department:sessionStorage.getItem('department'),
    activity:'login'
  }
  activityLog(){
    this.http.post('http://127.0.0.1:8000/api/addActivity', this.log).subscribe((res: any) => {
        console.log(res)   
    })
  }

  // memberChange() {
  //   let memberID = this.paymentForm.get("member")?.value;
  //   this.wahieService.getMemberInfo(memberID).subscribe(res => {
  //     let memberData: any;
  //     memberData = res;
  //     if (memberData != null) {
  //       this.paymentForm.get("email")?.setValue(memberData.email);
  //     }
  //   });
  // }
}
