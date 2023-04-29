import { Pipe, PipeTransform } from "@angular/core";
import { Item } from "./mItem";

@Pipe({
    name: 'filterMemHome',
})
export class FilterHomePipe implements PipeTransform{
    transform(name: Item[], term: string) {
        console.log("filter pipe called");
        if(name.length === 0 || term === ''){
            return name;
        } else{
            return name.filter((name) =>
            {
                return name.Member.trim().toLowerCase().includes(term.toLowerCase());
            })
        }
        
    }
}