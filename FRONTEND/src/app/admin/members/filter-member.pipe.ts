import { Pipe, PipeTransform } from "@angular/core";
import { memItem } from "./memItem";


@Pipe({
    name: 'filterMemName',

})
export class FilterMemberPipe implements PipeTransform{
    transform(name: memItem[], term: string) {
        console.log("filter pipe called");
        if(name.length === 0 || term === ''){
            return name;
        } else{
            return name.filter((name) =>
            {
                return name.name.trim().toLowerCase().includes(term.toLowerCase());
            })
        }
        
    }
}