import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { Component, Output, EventEmitter, OnInit, HostListener } from '@angular/core';
import { adminNavData } from './admin-navdata';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';
import { HttpClient } from '@angular/common/http';
import { BackendService } from 'src/app/services/backend.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-admin-sidenav',
  templateUrl: './admin-sidenav.component.html',
  styleUrls: ['./admin-sidenav.component.scss'],
  host: {
    "(window:click)": "disappearContext()"
  },
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
export class AdminSidenavComponent implements OnInit {
  //dark
  toggleDarkTheme() {
    document.body.classList.toggle('darkmodes');
  }



  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  collapsed = false;
  screenWidth = 0;
  aNavData = adminNavData;

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
  navChange!:FormGroup

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    // var data = this.creds.get();
    // console.log('email', data)
    // this.email=sessionStorage.getItem('email')
    // this.auth.authStatus.subscribe(
    //   value=>{
    //     this.loggedIn = value;
    //   }
    // )
    this.navChange = this.fb.group({
    
      "current_pass": new FormControl(null, [Validators.required]),
  
      "new_pass": new FormControl(null, [Validators.required]),
      
      "confirm_pass": new FormControl(null, [Validators.required])
    })
  }
  
  

  hide:boolean = false;

  contextMenu(e:any){
    e.stopPropagation();
    this.hide = !this.hide;


  }

  disappearContext(){
    this.hide = false;
  }



  showModal = -1;
  show(index: number){
    this.showModal = index;
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

  constructor(private auth:AuthGuardService,private router:Router,private token:TokenService,
    private backend:BackendService, private http:HttpClient,  private fb:FormBuilder) {
 
    }

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
    this.activityLog()
    event.preventDefault();
    this.auth.changeStatus(false);
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

 
  userName(){
    return sessionStorage.getItem('name');
  }

public passForm={
  current_pass:null,
  new_pass:null,
  confirm_pass:null,
  userId: localStorage.getItem('userData')
}  

  navChangePass(){
    console.log(this.passForm.userId)
    this.http.post('http://127.0.0.1:8000/api/users/navChangePass', this.passForm).subscribe((res: any) => {
      localStorage.clear()
      sessionStorage.clear()
      console.log(res)
      this.router.navigateByUrl('login');
  })
  }
}
