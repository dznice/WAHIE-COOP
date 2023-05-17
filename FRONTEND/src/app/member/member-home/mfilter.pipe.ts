import { Pipe, PipeTransform } from "@angular/core";
import { memItem } from "./mItem";

@Pipe({
    name: 'filterMemHome',
})
export class FilterHomePipe implements PipeTransform{
    transform(name: memItem[], term: string) {
        console.log("filter pipe called");
        if(name.length === 0 || term === ''){
            return name;
        } else{
            return name.filter((name) =>
            {
                return name.member.trim().toLowerCase().includes(term.toLowerCase());
            })
        }

    }
}
