import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
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
    return this.http.get<any[]>(this.url+'/api/memberList');
  }

  public getMemberInfo(id:any): Observable<any>{
    return this.http.get<any[]>(this.url+'/api/memberList/'+id);
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

  public listTransactions(): Observable<any[]>{
    return this.http.get<any[]>(this.url+'/api/account');
  }

  public journId(): Observable<any[]>{
    return this.http.get<any[]>(this.url+'/api/journ');
  }

  public getListAccount(mem_id:any){
    const params = new HttpParams()
                   .set('open_balance', '1')
                   .set('paymentIdentifier', 'Closed');

                   return this.http.get<any[]>(`${this.url}/api/accounts?id=${mem_id}`, { params });
  }


  public getJournalLogs(journalNo: number): Observable<any> {
    const url = `${this.url}/api/journalLog/${journalNo}`;
    return this.http.get(url);
  }


  public JournalLogs(transac_id:any){
    return this.http.get<any[]>(`${this.url}/api/journalLog/${transac_id}`);
  }

  // public accLegder(journId:any){
  //   return this.http.get<any[]>(`${this.url}/api/totaljour?journal_ids=${journId}`);
  // }

  // public memLegder(memId:any){
  //   return this.http.get<any[]>(`${this.url}/api/totaljour?member_id=${memId}`);
  // }

  // public sLegder3(memId:any, journId:any){
  //   return this.http.get<any[]>(`${this.url}/api/totaljour?member_id=${memId}&journal_ids=${journId}`);
  // }

  public sLegder(memId:any, journId:any, startD:any, endD:any){
    return this.http.get<any[]>(`${this.url}/api/totaljour?member_id=${memId}&journal_ids=${journId}&start_date=${startD}&end_date=${endD}`);
  }

  // public sLegder5(memId:any, startD:any, endD:any){
  //   return this.http.get<any[]>(`${this.url}/api/totaljour?member_id=${memId}&start_date=${startD}&end_date=${endD}`);
  // }

  // public sLegder6( journId:any, startD:any, endD:any){
  //   return this.http.get<any[]>(`${this.url}/api/totaljour?journal_ids=${journId}&start_date=${startD}&end_date=${endD}`);
  // }

  public savePayment(payment:any):Observable<any>{
    return this.http.post<any>(this.url+'/api/payment', payment, this.httpOptions)
  }
}
