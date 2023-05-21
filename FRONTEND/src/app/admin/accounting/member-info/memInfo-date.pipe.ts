import { Pipe, PipeTransform } from '@angular/core';
import { Item } from '../item';


@Pipe({
  name: 'filterInfoDate',
})
export class FilterMemInfoDPipe implements PipeTransform {
  transform(item: Item[], sDate: string, eDate: string) {
    console.log('filter pipe called');
    if (!sDate || !eDate) {
      return item;
    } else {
      let startDate = new Date(sDate);
      let endDate = new Date(eDate);
      let f = item.filter(
        (item) =>
          new Date(item.debit.cred.transac.transaction_date ) >= startDate && new Date(item.debit.cred.transac.transaction_date ) <= endDate
      );
      return f;
    }
  }
}
