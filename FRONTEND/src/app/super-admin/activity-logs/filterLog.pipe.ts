import { Pipe, PipeTransform } from "@angular/core";
import { logItem } from "./logItem";


@Pipe({
    name: 'filterLogs',

})
export class FilterLogsPipe implements PipeTransform{
    transform(name: logItem[], term: string) {
        
        if(name.length === 0 || term === ''){   
            return name;
        } 
        else{
            return name.filter((name) =>
            {
                return name.name.trim().toLowerCase().includes(term.toLowerCase());
            })
        }

        
        
    }
}