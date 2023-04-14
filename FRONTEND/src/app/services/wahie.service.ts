import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class WahieService {

  showDialog=false;

  url:string = 'http://127.0.0.1:8000';

  constructor(private http:HttpClient) {

  }

  public listJournals(): Observable<any[]>{
    return this.http.get<any[]>(this.url+'/api/journals');
  }

  httpOptions={
    headers : new HttpHeaders({
      'Content-Type' : 'application/json'
    })
  };


  public addJournal(journal:any): Observable<any>{
    return this.http.post<any>(this.url+'/api/journals', journal, this.httpOptions);
  }
  // public getJournals(query: any){
  //   return this.http.get<any>(this.url+`/api/journals/${query}`);
  // }

  public listMembers(): Observable<any[]>{
    return this.http.get<any[]>(this.url+'/api/members');
  }

  public getMemberss(query: any){
    return this.http.get<any>(this.url+`/api/journals/${query}`);
  }


}
