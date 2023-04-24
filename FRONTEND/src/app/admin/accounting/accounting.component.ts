import { Component, OnInit } from '@angular/core';
import { Item } from './item';
import { itemService } from './item.service';

@Component({
  selector: 'app-accounting',
  templateUrl: './accounting.component.html',
  styleUrls: ['./accounting.component.scss'],
  providers: [itemService],
})
export class AccountingComponent implements OnInit {

  item: Item[] = [];
  term: string = '';
  p: number = 1;
  type: string;
  stat: string;



  types: string[]= ["Journal Entry", "Invoice", "Payment" ];
  stats: string[]= ["Overdue", "Pending", "Closed" ];

  startDate: string = '';
  endDate : string = '';

  constructor(private ItemService: itemService) {}

  ngOnInit(): void {
    this.item = this.ItemService.item;
  }
}

