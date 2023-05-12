import { Component } from '@angular/core';
import { invItem } from './invItem';
import { itemService } from './invItem.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
  providers: [itemService],
})
export class InventoryComponent {
  loader = false;
  loader2 = true;

  
  invItem: invItem[] = [];
  term: string = '';
  p: number = 1;
  category: string;
  pricing: string;
 
  price: string[] = ['low to high', 'high to low'];
  categories: string[] = ['Supplies', 'Tools'];

  constructor(private ItemService: itemService) {}

  ngOnInit() {
    setTimeout(() => {
      this.loader = true;
    }, 1000);
    setTimeout(() => {
      this.loader2 = false;
    }, 1000);

    this.invItem = this.ItemService.invItemArr.sort(
      (low, high) => low.price - high.price
    );
  }
  change(event: any) {
    switch (event.target.value) {
      case 'low': {
        this.invItem = this.invItem.sort((low, high) => low.price - high.price);
        break;
      }

      case 'high': {
        this.invItem = this.invItem.sort((low, high) => high.price - low.price);
        break;
      }
      case 'default': {
        this.invItem = this.invItem.sort(function (low, high) {
          if (low.price < high.price) {
            return -1;
          } else if (low.price > high.price) {
            return 1;
          } else {
            return 0;
          }
        });
        break;
      }
    }
    return this.term;
  }
}
