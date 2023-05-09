import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http:HttpClient) { }
  login(data:any){
    return this.http.post('http://127.0.0.1:8000/api/login', data);
  }

  register(data:any){
    return this.http.post('http://127.0.0.1:8000/api/register', data);
  }
  
  submitLogin(data:any) : Observable<any>{
    return this.http.get('http://127.0.0.1:8000/api/login', data);
  }
  
  resendOtp(data:any, $id :string) : Observable<any>{
    return this.http.get('http://127.0.0.1:8000/api/users/${$id}', data);
  }



}

