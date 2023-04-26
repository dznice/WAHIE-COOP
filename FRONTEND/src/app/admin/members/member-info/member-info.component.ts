import { Component, OnInit } from '@angular/core';
import { Item } from './item';
import { itemService } from '../../accounting/item.service';
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
  item: any[] = [];
  term: string = '';
  p: number = 1;
  type: string;
  types: string[]= ["Journal Entry", "Invoice", "Payment" ];
 private urlId : Subscription;


  constructor(private ItemService: itemService, private http:HttpClient, private aRouter: ActivatedRoute) {
    this.personalInfo();
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
        console.log('marlon', this.id);
        this.item = res;  

      
      }
    )
  }
}
