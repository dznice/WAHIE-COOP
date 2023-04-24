import { Component, OnInit } from '@angular/core';
import { memItem } from './memItem';
import { itemService } from './memItem.service';
@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss'],
  providers: [itemService],
})
export class MembersComponent implements OnInit {
  term: string = '';
  p: number = 1;
  memItem: memItem[] = [];



  constructor(private ItemService: itemService) {}

  ngOnInit(): void {
    this.memItem = this.ItemService.memItem;
  }
 


}
