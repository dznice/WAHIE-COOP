import { Component, OnInit } from '@angular/core';
import { memItem } from './mItem';
import { itemService } from './mItem.service';

@Component({
  selector: 'app-member-home',
  templateUrl: './member-home.component.html',
  styleUrls: ['./member-home.component.scss'],
  providers: [itemService]
})
export class MemberHomeComponent {

  memItem: memItem[] = [];
  p: number = 1;
  type: string;
  stat: string;

  types: string[]= ["Journal Entry", "Invoice", "Payment" ];
  stats: string[]= ["Overdue", "Pending", "Closed" ];

  startDate: string = '';
  endDate : string = '';

  constructor(private ItemService: itemService) {}
  ngOnInit(): void {
    this.memItem = this.ItemService.item;
  }
}
