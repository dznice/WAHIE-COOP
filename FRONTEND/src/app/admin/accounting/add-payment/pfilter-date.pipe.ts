import { Pipe, PipeTransform } from "@angular/core";
import { Item } from "./paymentItem";

@Pipe({
    name: 'filterPDate'
})

export class FilterPaymentDatePipe implements PipeTransform {

    transform(item: Item[], sDate: string, eDate: string) {
        console.log("filter pipe called");
        if(!sDate || !eDate){
            return item;
        }
        else
        {
            let startDate = new Date(sDate);
            let endDate = new Date(eDate);
            let f = item.filter((item) => new Date(item.dueDate) >= startDate && new Date(item.dueDate) <= endDate);
            return f;
        }
    }
}
