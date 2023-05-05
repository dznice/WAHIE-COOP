import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class WahieService {

  url:string = 'http://127.0.0.1:8000';

  constructor(private http:HttpClient) {

  }

  public listLibJournals(): Observable<any[]>{
    return this.http.get<any[]>(this.url+'/api/journals');
  }

  httpOptions={
    headers : new HttpHeaders({
      'Content-Type' : 'application/json'
    })
  };


  public addLibJournal(journals:any): Observable<any>{
    return this.http.post<any>(this.url+'/api/journals', journals, this.httpOptions);
  }

  public listMembers(): Observable<any[]>{
    return this.http.get<any[]>(this.url+'/api/members');
  }

  public memberId(): Observable<any[]>{
    return this.http.get<any>(this.url+'/api/memberId');
  }

  public addMember(members:any):Observable<any>{
    return this.http.post<any>(this.url+'/api/members',members, this.httpOptions);
  }

  public addBeneficiary(beneficiaries:any):Observable<any>{
    return this.http.post<any>(this.url+'/api/beneficiaries',beneficiaries, this.httpOptions);
  }

  public saveJournalEntry(entries:any):Observable<any>{
    return this.http.post<any>(this.url+'/api/journal-entry', entries, this.httpOptions)
  }

  public listJournalEntry(): Observable<any[]>{
    return this.http.get<any[]>(this.url+'/api/journal-entry');
  }

  public debits(): Observable<any[]>{
    return this.http.get<any[]>(this.url+'/api/debits');
  }

  public credits(): Observable<any[]>{
    return this.http.get<any[]>(this.url+'/api/credits');
  }

  public payables(): Observable<any[]>{
    return this.http.get<any[]>(this.url+'/api/payables');
  }

  public transactions(): Observable<any[]>{
    return this.http.get<any[]>(this.url+'/api/transactions');
  }

  public listEntries(): Observable<any[]>{
    return this.http.get<any[]>(this.url+'/api/entries');
  }
}
