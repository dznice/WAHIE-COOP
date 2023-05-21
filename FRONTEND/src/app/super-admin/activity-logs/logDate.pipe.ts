import { Pipe, PipeTransform } from '@angular/core';
import { logItem } from "./logItem";

@Pipe({
  name: 'filterlogDate'
})
export class FilterLogDatePipe implements PipeTransform {

  transform(item: logItem[], sDate: string, eDate: string) {
    if(!sDate || !eDate){
      return item;
    }
    else
    {
      let startDate = new Date(sDate);
      let endDate = new Date(eDate);
      let f = item.filter((item) => new Date(item.created_at) >= startDate && new Date(item.created_at) <= endDate);
      return f;
    }
    
}

}
