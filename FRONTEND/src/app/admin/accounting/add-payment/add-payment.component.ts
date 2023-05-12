import { Component, OnInit } from '@angular/core';
import { Item } from './paymentItem';
import { FormBuilder, Validators, FormArray,FormGroup } from '@angular/forms';
import { WahieService } from '../../../services/wahie.service';
import { itemService } from '../../accounting/item.service';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

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

  startDate: string = '';
  endDate: string = '';
  public accounts: any;
  public members: any;
  tryForm: FormGroup;

  constructor(private builder:FormBuilder, private wahieService:WahieService, private ItemService: itemService, private http:HttpClient, private aRouter: ActivatedRoute){

  }


  paymentForm=this.builder.group({
    member:this.builder.control({value:'', disabled: true}),
    email:this.builder.control({value:'', disabled: true}),
    paymentDate:this.builder.control(''),
    paymentMethod:this.builder.control(''),
    referenceNo:this.builder.control(''),
    depositTo:this.builder.control(''),
    // invoiceNo:this.builder.control(''),
    // startDate:this.builder.control(''),
    // endDate:this.builder.control(''),
    payables:this.builder.array([]),
  });


  

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
      this.tryForm = this.builder.group({
        testing: this.builder.array(account.map(trial => this.generateFormGroup(trial)))
      });
    });
  }

  private generateFormGroup(trial:any) {
    console.log(trial.debit.cred.entries.entry_name)
    return this.builder.group({
      description: this.builder.control({ value: trial.debit.cred.entries.entry_name , disabled: true }),
      dueDate: this.builder.control({ value: trial.debit.cred.due_date, disabled: true }),
      origAmount: this.builder.control({ value: trial.orig_amount, disabled: true }),
      openBalance: this.builder.control({ value: trial.open_balance , disabled: true }),
      payment: this.builder.control({value: 0, disabled: false})
    });
  }

  get tryRow(){
    return this.tryForm.get("testing") as FormArray;
  }

  showAccounting1(): void{
    this.accounts = this.wahieService.listTransactions().subscribe((account:any)=>{
      this.accounts = account;
      console.log(this.accounts);
    });
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