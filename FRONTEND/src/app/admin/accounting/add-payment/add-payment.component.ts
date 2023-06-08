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
  public recentdebs: any;
  // paymentForm: FormGroup;

  total_debit: any;
  total_credit: any;
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
    this.showRecentDebitTransactions(this.id, this.selectedTNo);
    }
    else{
      this.selectedTNo='';
      this.showRecentTransactions(this.id, this.selectedTNo);
      this.showRecentDebitTransactions(this.id, this.selectedTNo);
    }
  }

  paymentForm=this.builder.group({
    member:this.builder.control({value:'', disabled: true}),
    memberId:this.builder.control({value:'', disabled: true}),
    userId:this.builder.control(this.useid),
    paysId:this.builder.control({value:'', disabled: true}),
    debsId:this.builder.control({value:'', disabled: true}),
    credsId:this.builder.control({value:'', disabled: true}),
    open_balance:this.builder.control({value:'', disabled: true}),
    orig_amount:this.builder.control({value:'', disabled: true}),
    due_date:this.builder.control({value:'', disabled: true}),
    paymentDate:this.builder.control(this.formatDate()),
    paymentMethod:this.builder.control('',Validators.required),
    referenceNo:this.builder.control(''),
    depositTo:this.builder.control('',Validators.required),
    transactionNo:this.builder.control('',Validators.required),
    paysID:this.builder.control(''),
    // invoiceNo:this.builder.control(''),
    // startDate:this.builder.control(''),
    // endDate:this.builder.control(''),
    payables:this.builder.array([
      this.Generaterow(),
      this.Generaterow(),
      this.Generaterow(),
      this.Generaterow()]),
    totaldebit:this.builder.control(0),
    totalcredit:this.builder.control(0),
  });

  personalInfo(index:any){
    this.members = this.wahieService.getMemberInfo(index).subscribe((member:any)=>{
      this.members = member;
      this.paymentForm.get("member")?.setValue(this.members.first_name +' '+ this.members.last_name);
      this.paymentForm.get("memberId")?.setValue(this.members.id);
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
    this.recentdebs = this.wahieService.listTransaction(mem, tran).subscribe((recent:any)=>{
      this.recents = recent.filter((item: any) => item.credit_amount !== item.debit_amount && item.status !== "Closed");
      const lastData = this.recents[this.recents.length - 1]; // Get the last data
      const paysId = lastData ? lastData.paysId : null; // Retrieve the paysId from the last data or set to null if there is no data
      this.paymentForm.get("paysId")?.setValue(paysId);
      console.log(this.recents);
    });
  }

  showRecentDebitTransactions(mem:any, tran:any){
    this.recentdebs = this.wahieService.listDebitTransaction(mem, tran).subscribe((recentdeb:any)=>{
      this.recentdebs = recentdeb.filter((item: any) => item.credit_amount !== item.debit_amount && item.status !== "Closed");
      const lastData = this.recentdebs[this.recentdebs.length - 1]; // Get the last data
      const open_balance = lastData ? lastData.open_balance : null; // Retrieve the paysId from the last data or set to null if there is no data
      this.paymentForm.get("open_balance")?.setValue(open_balance);
      const orig_amount = lastData ? lastData.orig_amount : null; // Retrieve the paysId from the last data or set to null if there is no data
      this.paymentForm.get("orig_amount")?.setValue(orig_amount);
      const due_date = lastData ? lastData.due_date : null; // Retrieve the paysId from the last data or set to null if there is no data
      this.paymentForm.get("due_date")?.setValue(due_date);
      const debsId = lastData ? lastData.debsId : null; // Retrieve the paysId from the last data or set to null if there is no data
      this.paymentForm.get("debsId")?.setValue(debsId);
      const credsId = lastData ? lastData.credsId : null; // Retrieve the paysId from the last data or set to null if there is no data
      this.paymentForm.get("credsId")?.setValue(credsId);
      console.log(this.recentdebs);
    });
  }

  showLibJournal(): void{
    this.libJournals = this.wahieService.listLibJournals().subscribe(libjournal=>{
      this.libJournals = libjournal;
      console.log(this.libJournals);
    });
  }

  showAccounting(): void{
    this.accounts = this.wahieService.getListAccount(this.id).subscribe((account:any[])=>{
        this.accounts = account;
    });
  }

  get payablesRow(){
    return this.paymentForm.get("payables") as FormArray;
  }

  showAccounting1(): void{
    this.accounts = this.wahieService.listTransactions().subscribe((account:any)=>{
      this.accounts = account;
      console.log(this.accounts);
    });
  }

  savePayment(){
    let total_debit = this.paymentForm.get('totaldebit')?.value;
    let total_credit = this.paymentForm.get('totalcredit')?.value;
    console.log(total_debit == total_credit);
    if(this.paymentForm.valid && total_debit == total_credit){
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

  autoZero(index: any) {
    this.paymentRow = this.paymentForm.get('payables') as FormArray;
    this.amount = this.paymentRow.at(index) as FormGroup;
    let debit = this.amount.get('debit')?.value;
    let credit = this.amount.get('credit')?.value;
    if (debit == null || credit == null) {
      if (debit == null) {
        this.amount.get('credit')?.setValue(null);
        this.amount.get('credit')?.setValue('');
        this.amount.get('debit')?.setValue('');
      } else if (credit == null) {
        this.amount.get('debit')?.setValue(null);
        this.amount.get('debit')?.setValue('');
        this.amount.get('credit')?.setValue('');
      }
    } else if (debit > 0) {
      this.amount.get('credit')?.setValue(0);
    } else if (credit > 0) {
      this.amount.get('debit')?.setValue(0);
    }

    this.balance_summary();
  }

  balance_summary() {
    let array = this.paymentForm.getRawValue().payables;
    this.total_debit = 0;
    this.total_credit = 0;

    array.forEach((x: any) => {
      if (x.debit == '' && x.credit == '') {
        x.debit = 0;
        x.credit = 0;
        this.total_debit = this.total_debit + x.debit;
        this.total_credit = this.total_credit + x.credit;
      } else {
        this.total_debit = this.total_debit + x.debit;
        this.total_credit = this.total_credit + x.credit;
      }
    });
    this.paymentForm.get('totaldebit')?.setValue(this.total_debit);
    this.paymentForm.get('totalcredit')?.setValue(this.total_credit);
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
