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
  item: any[] = [];
  term: string = '';
  p: number = 1;
  type: string;
  stat: string;



  types: string[]= ["Journal Entry", "Invoice", "Payment" ];
  stats: string[]= ["Overdue", "Pending", "Closed", "Paid" ];

  startDate: string = '';
  endDate : string = '';

  constructor(private ItemService: itemService,
              private http: HttpClient,
              private route: Router) {}
  ngOnInit(): void {
    this.item = this.ItemService.item;
      // this.showEntries();
      this.showAccounting();
  }

  
  public entries: any;
  public account: any;
  

  showAccounting(): void {
      this.http.get('http://127.0.0.1:8000/api/account').subscribe((res: any) => {
        console.log(res);
        this.account = res;
      });
    }

}
