import { Component, OnInit } from '@angular/core';
import { Item } from './hItem';
import { itemService } from './hItem.service';
@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss'],
  providers: [itemService]
})
export class AdminHomeComponent implements OnInit {

  loader = false;
  loader2 = true;

  
  item: Item[] = [];
  term: string = '';
  p: number = 1;
  type: string;
  stat: string;



  types: string[]= ["Journal Entry", "Invoice", "Payment" ];
  stats: string[]= ["Overdue", "Pending", "Closed", "Paid" ];

  startDate: string = '';
  endDate : string = '';

  constructor(private ItemService: itemService) {}
  ngOnInit(): void {
    this.item = this.ItemService.item;
    setTimeout(() => {
      this.loader = true;
    }, 2000);
    setTimeout(() => {
      this.loader2 = false;
    }, 2000);
  }
  

}
