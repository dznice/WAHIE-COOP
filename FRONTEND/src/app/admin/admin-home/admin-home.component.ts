import { Component, OnInit } from '@angular/core';
import { Item } from './hItem';
import { itemService } from './hItem.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss'],
  providers: [itemService]
})
export class AdminHomeComponent implements OnInit {
  nullcheck: number = 0;
  item: any[] = [];
  term: string = '';
  p: number = 1;
  type: string;
  stat: string;

  types: string[]= ["Journal Entry", "Invoice", "Payment" ];
  stats: string[]= ["Overdue", "Pending", "Closed", "Paid" ];

  startDate: string = '';
  endDate : string = '';
  duedit: any;

  constructor(private http: HttpClient, private route: Router) {}
  ngOnInit(): void {
      // this.showEntries();
      this.showAccounting()
      this.checkDue()
  }


  public entries: any;
  public account: any;

last_day:any;
today=new Date()

  showAccounting(): void {
      this.http.get('http://127.0.0.1:8000/api/account').subscribe((res: any) => {
        console.log(res.length);
        this.account = res;
          
      });
    }

    dueDate(): void {
      this.http.get('http://127.0.0.1:8000/api/duedate').subscribe((res: any) => {
        console.log(res);
        this.duedit = res;
      });
    }


  memberInfo(data: any) {
      this.http
        .get('http://127.0.0.1:8000/api/memberList/' + data)
        .subscribe((res: any) => {
          this.route.navigateByUrl('admin/accounting/member-info/' + data);
        });
  }

  memberJournal(data: any) {
      this.http
        .get('http://127.0.0.1:8000/api/transacList/' + data)
        .subscribe((res: any) => {
          if(data != null){
          console.log(data);
          this.route.navigateByUrl('admin/accounting/journal-transac/' + data);
          }
        });
    }

    hello:string = 'hello'
    checkDue(){
      console.log('checkdueee')
      this.http.post('http://127.0.0.1:8000/api/dueDateSMS', this.hello) .subscribe((res: any) => {
        console.log(res)
    })
    }

  }
