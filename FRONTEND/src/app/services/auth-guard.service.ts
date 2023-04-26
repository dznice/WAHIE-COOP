import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from './token.service';
import {BehaviorSubject} from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';



@Injectable()

export class AuthGuardService  {
  private loggedIn = new BehaviorSubject<boolean>(this.token.loggedIn());
  authStatus = this.loggedIn.asObservable();
  
  private role = new  BehaviorSubject<boolean>(this.token.loggedIn());
  authRole = this.role.asObservable();

  changeStatus(value:boolean){
    this.loggedIn.next(value);
  }

  changeRole(value:boolean){
    this.role.next(value);
  }



  // getAuthUser() : Observable<any> {
  //   return this.http.get(this.email)

  // }
  
  constructor( private route:Router, private token:TokenService , private http: HttpClient){}



}
