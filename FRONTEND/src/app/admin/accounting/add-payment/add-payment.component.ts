import { Component, OnInit } from '@angular/core';
import { Item } from './paymentItem';
import { FormBuilder, Validators, FormArray,FormGroup } from '@angular/forms';
import { WahieService } from '../../../services/wahie.service';
import { itemService } from '../../accounting/item.service';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
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
  public accounts: any;
  public members: any;
  paymentForm: FormGroup;
  paymentRow !: FormArray<any>;
  amount !: FormGroup<any>;

  constructor(private builder:FormBuilder, private wahieService:WahieService, private ItemService: itemService, private http:HttpClient, private aRouter: ActivatedRoute, private toast: NgToastService){

  }


  // paymentForm=this.builder.group({
  //   member:this.builder.control({value:'', disabled: true}),
  //   email:this.builder.control({value:'', disabled: true}),
  //   paymentDate:this.builder.control(''),
  //   paymentMethod:this.builder.control(''),
  //   referenceNo:this.builder.control(''),
  //   depositTo:this.builder.control(''),
  //   // invoiceNo:this.builder.control(''),
  //   // startDate:this.builder.control(''),
  //   // endDate:this.builder.control(''),
  //   payables:this.builder.array([]),
  // });


  

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
    this.showAccounting();
    this.showAccounting1();
    this.personalInfo();
  }

  personalInfo(){
    this.members = this.wahieService.listMembers().subscribe((member:any)=>{
      this.members = member;
      console.log(this.members);
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
        this.paymentForm=this.builder.group({
          amountReceived:this.builder.control({value: 0, disabled: true}),
          member:this.builder.control({value: account[0].debit.cred.transac.member.first_name 
            +' '+ account[0].debit.cred.transac.member.last_name, disabled: true}),
          email:this.builder.control({value: account[0].debit.cred.transac.member.email, disabled: true}),
          paymentDate:this.builder.control(''),
          paymentMethod:this.builder.control(''),
          referenceNo:this.builder.control(''),
          memberId:this.builder.control(this.id),
          userId:this.builder.control(this.useid),
          // startDate:this.builder.control(''),
          // endDate:this.builder.control(''),
          payables: this.builder.array(account.map(trial => this.generateFormGroup(trial))),
          amountApply:this.builder.control({value: 0, disabled: true}),
          amountCredit:this.builder.control({value: 0, disabled: true}),

      });
    });
  }

  private generateFormGroup(trial:any) {
    return this.builder.group({
      debitId: this.builder.control({ value: trial.id , disabled: true }),
      creditId: this.builder.control({ value: trial.credits_id , disabled: true }),
      description: this.builder.control({ value: trial.debit.cred.entries.entry_name , disabled: true }),
      dueDate: this.builder.control({ value: null, disabled: true }),
      origAmount: this.builder.control({ value: trial.orig_amount, disabled: true }),
      openBalance: this.builder.control({ value: trial.open_balance , disabled: true }),
      payment: this.builder.control({ value: null , disabled: false })
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
    //this.paymentForm.get("entries") as FormArray;
    // this.paymentForm.controls.journal_no.setValue( this.journId )
    // let total_debit = this.journalEntryForm.get("totaldebit")?.value;
    // let total_credit = this.journalEntryForm.get("totalcredit")?.value;
    if(this.paymentForm.valid){
      this.wahieService.savePayment(this.paymentForm.getRawValue()).subscribe(res=>{
        let result:any;
        result=res;
        console.log(result);
        this.toast.success({detail:'Success',summary:'Payment saved',duration:2000, sticky:false,position:'tr'});
        //this.route.navigateByUrl('admin/accounting')
      })
    }else{
      this.toast.error({detail:'Failed',summary:'Fill all inputs',duration:2000, sticky:false,position:'tr'});
      console.log("Error: Fill all input or need balance the amount to submit");
    }
    console.log(this.paymentForm.getRawValue());
    //this.route.navigateByUrl('admin/accounting')
  }

  ammountClick(index: any) {
    this.paymentRow = this.paymentForm.get("payables") as FormArray;
    this.amount = this.paymentRow.at(index) as FormGroup;
    this.ammount_summary();
  }

  ammount_summary(){
    let array=this.paymentForm.getRawValue().payables;
    let apply = 0;
    //let credit = 0;
    array.forEach((x:any)=>{
      apply=apply+x.payment;
    });
    console.log(apply)
    this.paymentForm.get("amountApply")?.setValue(apply);
    this.paymentForm.get("amountReceived")?.setValue(apply);
    //this.paymentForm.get("totalcredit")?.setValue(total_credit);

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