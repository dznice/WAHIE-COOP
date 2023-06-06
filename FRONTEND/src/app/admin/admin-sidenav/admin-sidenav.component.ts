import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { Component, Output, EventEmitter, OnInit, HostListener } from '@angular/core';
import { adminNavData } from './admin-navdata';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';
import { HttpClient } from '@angular/common/http';
import { BackendService } from 'src/app/services/backend.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-admin-sidenav',
  templateUrl: './admin-sidenav.component.html',
  styleUrls: ['./admin-sidenav.component.scss'],
  host: {
    '(window:click)': 'disappearContext()',
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
  // Dark Mode
  mode: boolean = true;
  modeState: boolean = false;

  toggleDarkTheme() {
    this.mode = !this.mode;
    document.body.classList.toggle('darkmodes');
  }

  current: boolean = true;
  chcurrent: boolean = true;
  ccurrent() {
    this.current = !this.current;
    this.chcurrent = !this.chcurrent;
  }

  visible: boolean = true;
  changetype: boolean = true;
  viewpass() {
    this.visible = !this.visible;
    this.changetype = !this.changetype;
  }

  cvisible: boolean = true;
  cchangetype: boolean = true;
  cviewpass() {
    this.cvisible = !this.cvisible;
    this.cchangetype = !this.cchangetype;
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

  passwordMatch(controlName: string, matchControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchControl = formGroup.controls[matchControlName];
      if (matchControl.errors && !matchControl.errors['passwordMatch']) {
        return;
      }
      if (control.value !== matchControl.value) {
        matchControl.setErrors({ passwordMatch: true });
      } else {
        matchControl.setErrors(null);
      }
    };
  }

  email: any;
  navChange!: FormGroup;

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
 
    this.navChange = this.fb.group(
      {
        current_pass: new FormControl(null),

        new_pass: new FormControl(null),

        confirm_pass: new FormControl(null),
      },
      {
        validator: this.passwordMatch('new_pass', 'confirm_pass'),
      }
    );
  }

  hide: boolean = false;
  chevron: boolean = true;

  contextMenu(e: any) {
    e.stopPropagation();
    this.hide = !this.hide;
    this.chevron = !this.chevron;
  }

  disappearContext() {
    this.hide = false;
  }

  onStrengthChange(score: any) {
    console.log('new score', score);
  }

  @HostListener('window:keydown.esc', ['$event'])
  onEsc(event: KeyboardEvent) {
    console.log(event);
    this.show(2);
  }

  showModal = -1;
  show(index: number) {
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

  public loggedIn: boolean = false;

  constructor(
    private auth: AuthGuardService,
    private router: Router,
    private token: TokenService,
    private backend: BackendService,
    private http: HttpClient,
    private fb: FormBuilder,
    private toast: NgToastService
  ) {}

  public log = {
    name: this.userName(),
    department: sessionStorage.getItem('department'),
    activity: 'Logout',
  };

  activityLog() {
    this.http
      .post('http://127.0.0.1:8000/api/addActivity', this.log)
      .subscribe((res: any) => {
        console.log(res);
      });
  }

  logout(event: MouseEvent) {
    this.activityLog();
    event.preventDefault();
    this.auth.changeStatus(false);
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

  userName() {
    return sessionStorage.getItem('name');
  }

  public passForm = {
    current_pass: null,
    new_pass: null,
    confirm_pass: null,
    userId: localStorage.getItem('userData'),
  };

  navChangePass() {
    if (this.navChange.invalid) {
      this.toast.warning({
        detail: 'Password not match',
        summary: 'Please check the password',
        duration: 3000,
        sticky: false,
        position: 'tr',
      });
    } else {
      console.log(this.passForm.userId);
      this.http
        .post('http://127.0.0.1:8000/api/users/navChangePass', this.passForm)
        .subscribe((res: any) => {
          console.log(res);
        }
      );
    }
  }
}
