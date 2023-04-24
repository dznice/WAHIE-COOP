import { Injectable } from '@angular/core';
import { CanActivate,ActivatedRouteSnapshot ,RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class LoggedInService {

  canActivate(route:Router,state:RouterStateSnapshot):boolean | Observable<boolean>{

    return this.token.loggedIn();

    this.route.navigateByUrl('/admin/admin-home');

  }
    
      constructor(private token:TokenService, private backPage:Location,private route:Router) { }
    }