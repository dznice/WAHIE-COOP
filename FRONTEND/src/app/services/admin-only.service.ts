import { Injectable } from '@angular/core';
import { CanActivate,ActivatedRouteSnapshot ,RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AdminOnlyService {
  canActivate(route:Router,state:RouterStateSnapshot):boolean | Observable<boolean>{

  
   let role = localStorage.getItem('userRole');
   if(role=='1'){
    return true;
    this.route.navigateByUrl('/admin/admin-home');
   }
   else{
    alert("For Admin Only")
    this.backPage.back();
    return false;  
   }

  }
    
  constructor(private token:TokenService, private backPage:Location,private route:Router) { }
}
