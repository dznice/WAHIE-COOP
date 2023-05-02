import { Component, OnInit } from '@angular/core';
import { Item } from './paymentItem';
import { itemService } from './paymentItem.service';

@Component({
  selector: 'app-add-payment',
  templateUrl: './add-payment.component.html',
  styleUrls: ['./add-payment.component.scss'],
  providers: [itemService]
})
export class AddPaymentComponent {
  item: Item[] = [];
  term: string = '';
  p: number = 1;
  
  startDate: string = '';
  endDate: string = '';

  constructor(private ItemService: itemService){}
  ngOnInit(): void {
    this.item = this.ItemService.item;
  }

}