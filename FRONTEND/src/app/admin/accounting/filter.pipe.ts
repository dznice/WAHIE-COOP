import { Pipe, PipeTransform } from "@angular/core";
import { Item } from "./item";


@Pipe({
    name: 'filterName',

})
export class FilterPipe implements PipeTransform{
    transform(name: Item[], term: string) {
        console.log("filter pipe called");
        if(name.length === 0 || term === ''){
            return name;
        } else{
            return name.filter((name) =>
            {
                return name.first_name.trim().toLowerCase().includes(term.toLowerCase());
            })
        }

    }
}
