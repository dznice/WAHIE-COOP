import { Pipe, PipeTransform } from '@angular/core';
import { invItem } from './invItem';

@Pipe({
  name: 'filterInvName',
})
export class FilterInvPipe implements PipeTransform {
  transform(item: invItem[], term: any) {
    console.log('filter pipe called');
    if (item.length === 0 || term === '') {
      return item;
    } else {
      return item.filter((item) => {
        return item.name.trim().toLowerCase().includes(term.toLowerCase());
      });
    }
  }
}
