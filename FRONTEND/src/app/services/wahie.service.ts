import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class WahieService {

  url:string = 'http://127.0.0.1:8000';

  constructor(private http:HttpClient) {
    
  }

  public listJournals(): Observable<any[]>{
    return this.http.get<any[]>(this.url+'/api/journals');
  }

  public getJounnals(query: any){
    return this.http.get<any>(this.url+`/api/journals/${query}`);
  }

   
}
