import { Injectable } from '@angular/core';
import { CanActivate,ActivatedRouteSnapshot ,RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MemberOnlyService {
  canActivate(route:Router,state:RouterStateSnapshot):boolean | Observable<boolean>{

  
    let role = localStorage.getItem('userRole');
    if(role=='3'){
     return true;
     this.route.navigateByUrl('/member/member-home');
    }

      else{
        alert("For Members Only")
        this.backPage.back();
        return false;   
      }
 
 
 
 
 
   }
     
   constructor(private token:TokenService, private backPage:Location,private route:Router) { }
 }
 