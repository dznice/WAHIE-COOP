import { Component, OnInit } from '@angular/core';
import { logItem } from './logItem';
import { itemService } from './logItem.service';


@Component({
  selector: 'app-activity-logs',
  templateUrl: './activity-logs.component.html',
  styleUrls: ['./activity-logs.component.scss'],
  providers: [itemService]
})
export class ActivityLogsComponent implements OnInit{
  
  loader = false;
  loader2 = true;

  item: logItem[] = [];
  term: string = '';
  p: number = 1;
  
  stringStart: string = new Date().toDateString();
  startDate: string = '';
  stringEnd: string = new Date().toDateString();
  endDate : string = '';
  
  constructor(private ItemService: itemService){


    
  }
  



ngOnInit():void{
  this.item = this.ItemService.item;
  setTimeout(() => {
    this.loader = true;
  }, 2000);
  setTimeout(() => {
    this.loader2 = false;
  }, 2000);
   


}
}
