import { Pipe, PipeTransform } from '@angular/core';
import { memItem } from './mItem';

@Pipe({
  name: 'filterMhDate',
})
export class FilterMemHomeDatePipe implements PipeTransform {
  transform(item: memItem[], sDate: string, eDate: string) {
    console.log('filter pipe called');
    if (!sDate || !eDate) {
      return item;
    } else {
      let startDate = new Date(sDate);
      let endDate = new Date(eDate);
      let f = item.filter(
        (item) =>
          new Date(item.date) >= startDate && new Date(item.date) <= endDate
      );
      return f;
    }
  }
}
