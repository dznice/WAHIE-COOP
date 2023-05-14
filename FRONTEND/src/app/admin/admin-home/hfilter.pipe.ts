import { Pipe, PipeTransform } from "@angular/core";
import { Item } from "./hItem";


@Pipe({
    name: 'filterHome',

})
export class FilterHomePipe implements PipeTransform{
    transform(name: Item[], term: string) {
        console.log("filter pipe called");
        if(name.length === 0 || term === ''){
            return name;
        } else{
            return name.filter((name) =>
            {
                return name.debit.cred.transac.member.first_name && name.debit.cred.transac.member.last_name.trim().toLowerCase().includes(term.toLowerCase());
            })
        }
        
    }
}