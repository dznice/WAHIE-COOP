import { Component, OnInit } from '@angular/core';
import { memItem } from './mItem';
import { itemService } from './mItem.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-member-home',
  templateUrl: './member-home.component.html',
  styleUrls: ['./member-home.component.scss'],
  providers: [itemService]
})
export class MemberHomeComponent {



  memItem: any[] = [];
  p: number = 1;
  type: string;
  stat: string;

  types: string[]= ["Journal Entry", "Invoice", "Payment" ];
  stats: string[]= ["Overdue", "Pending", "Closed", "Paid" ];

  startDate: string = '';
  endDate : string = '';
  public account: any[];

  constructor(private ItemService: itemService, private http:HttpClient) {}
  ngOnInit(): void {
    this.memItem = this.ItemService.item;
    this.myProfile();
    this.showAccounting();
  }

 id = localStorage.getItem('userData');

 memId:string = '';

myProfile(){
  this.http.get('http://127.0.0.1:8000/api/users/myProfile/' + this.id).subscribe(
    (res: any) =>
    {
    console.log('myprof' + res);
    this.memId = res.id;
    console.log(this.memId)
    })
}

 showAccounting(): void{
  this.http.get('http://127.0.0.1:8000/api/account').subscribe(
    (res:any)=>
    {
      console.log(res);
      this.account = res.filter((account: { debit: { cred: { transac: { member: { id: any; }; }; }; }; }) => account.debit.cred.transac.member.id === this.memId);
  });
}


}
