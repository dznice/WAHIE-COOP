import { Component, OnInit } from '@angular/core';
import { itemService } from './item.service';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member-info',
  templateUrl: './member-info.component.html',
  styleUrls: ['./member-info.component.scss'],
  providers: [itemService],
})
export class MemberInfoComponent implements OnInit {
  constructor(private ItemService: itemService, private http:HttpClient, private aRouter: ActivatedRoute) {
    this.personalInfo();
    this.benInfo();
    this.showAccounting()
  }
  item: any[] = [];
  ben: any[] = [];
  term: string = '';
  p: number = 1;
  type: string;
  startDate: string = '';
  endDate : string = '';
  stat: string;


  stats: string[]= ["Overdue", "Pending", "Closed", "Paid" ];

  types: string[]= ["Journal Entry", "Invoice", "Payment" ];
 private urlId : Subscription;
 public account: any;




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

  benInfo(){
    this.http.get('http://127.0.0.1:8000/api/beneficiaries').subscribe(
      (res:any)=>
      {
        console.log(res)
        this.ben = res;
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
