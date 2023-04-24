import { Component, OnInit } from '@angular/core';
import { Item } from './item';
import { itemService } from '../../accounting/item.service';

@Component({
  selector: 'app-member-info',
  templateUrl: './member-info.component.html',
  styleUrls: ['./member-info.component.scss'],
  providers: [itemService],
})
export class MemberInfoComponent implements OnInit {
  item: Item[] = [];
  term: string = '';
  p: number = 1;
  type: string;
  types: string[]= ["Journal Entry", "Invoice", "Payment" ];

  constructor(private ItemService: itemService) {}

  ngOnInit(): void {
    this.item = this.ItemService.item;
  }
}
