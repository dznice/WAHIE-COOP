import { Component, OnInit } from '@angular/core';
import { Item } from './paymentItem';
import { itemService } from '../item.service';
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
  public account: any;

  constructor(private ItemService: itemService, private http:HttpClient, private aRouter: ActivatedRoute){
    this.showAccounting()
    this.personalInfo()
  }


  id:number = 0;
  ngOnInit(): void {
    this.item = this.ItemService.item;
    this.urlId = this.aRouter.params.subscribe(
      params=>{

      console.log(params);
      console.log(params['memberId'])
      this.id = params['memberId']
    })
  }

  personalInfo(){
    this.http.get('http://127.0.0.1:8000/api/memberList').subscribe(
      (res:any)=>
      {

        console.log(res)
        this.item = res;

      }
    )
  }

  showAccounting(): void{
    this.http.get('http://127.0.0.1:8000/api/account').subscribe(
      (res:any)=>
      {
        console.log(res);
        this.account = res
    });
  }

}
