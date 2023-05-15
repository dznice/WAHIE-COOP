import { Component, OnInit } from '@angular/core';
import { Item } from './transacitem';
import { itemService } from './transacitem.service';

@Component({
  selector: 'app-journal-transac',
  templateUrl: './journal-transac.component.html',
  styleUrls: ['./journal-transac.component.scss'],
  providers: [itemService], 
})
export class JournalTransacComponent implements OnInit {
  item: Item[] = [];
  term: string = '';

  constructor(private ItemService: itemService) {}

  ngOnInit(): void {
    this.item = this.ItemService.item;
  }
}

