import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { Component, Output, EventEmitter, OnInit, HostListener } from '@angular/core';
import { memberNavData } from './member-navdata';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';
import { HttpClient } from '@angular/common/http';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-member-sidenav',
  templateUrl: './member-sidenav.component.html',
  styleUrls: ['./member-sidenav.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('350ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('350ms', style({ opacity: 0 })),
      ]),
    ]),
    trigger('rotate', [
      transition(':enter', [
        animate(
          '800ms',
          keyframes([
            style({ transform: 'rotate(0deg)', offset: '0' }),
            style({ transform: 'rotate(2turn)', offset: '1' }),
          ])
        ),
      ]),
    ]),
  ],
})
export class MemberSidenavComponent {
  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  collapsed = false;
  screenWidth = 0;
  mNavData = memberNavData;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth <= 768) {
      this.collapsed = false;
      this.onToggleSideNav.emit({
        collapsed: this.collapsed,
        screenWidth: this.screenWidth,
      });
    }
  }

  email:any

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
  }

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({
      collapsed: this.collapsed,
      screenWidth: this.screenWidth,
    });
  }

  closeSidenav(): void {
    this.collapsed = false;
    this.onToggleSideNav.emit({
      collapsed: this.collapsed,
      screenWidth: this.screenWidth,
    });
  }

  public loggedIn:boolean = false;

  constructor(private auth:AuthGuardService,private router:Router,private token:TokenService, private http:HttpClient) {}


  
  public log ={
    name: this.userName(),
    department:sessionStorage.getItem('department'),
    activity:'Logout'
  }

  activityLog(){
    this.http.post('http://127.0.0.1:8000/api/addActivity', this.log).subscribe((res: any) => {
        console.log(res)   
    })
  }

  logout(event:MouseEvent){
    this. activityLog();
    event.preventDefault();
    this.auth.changeStatus(false);
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }
  
  userName(){
    return sessionStorage.getItem('name');
  }
}
