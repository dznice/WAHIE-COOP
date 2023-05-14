import { Component, OnInit, OnDestroy, ViewEncapsulation, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { slider, slideright } from '../animation';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BackendService } from '../services/backend.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-sadmin-chpass',
  templateUrl: './sadmin-chpass.component.html',
  styleUrls: ['./sadmin-chpass.component.scss'],
  animations: [slideright, slider],
  encapsulation: ViewEncapsulation.Emulated,
})
export class SadminChpassComponent implements OnInit, OnDestroy {
  isDisplayed: boolean = true;
  toggleDiv() {
    this.isDisplayed = this.isDisplayed ? false : true;
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

  chpassForm!: FormGroup;

  constructor(
    @Inject(DOCUMENT) private _document: any,
    private fb: FormBuilder,
    private http: HttpClient,
    private backend: BackendService,
    private route: Router,
    private token: TokenService
  ) {}

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

  get frm() {
    return this.chpassForm.controls;
  }

  ngOnInit(): void {
    this._document.body.classList.add('body');

    this.chpassForm = this.fb.group(
      {
        password: new FormControl(null, [Validators.required]),

        confirm_pass: new FormControl(null, [Validators.required]),
      },
      {
        validator: this.passwordMatch('password', 'confirm_pass'),
      }
    );

    /*this.form = this.fb.group({
      password: ['', Validators.required],
    });*/
  }

  onSubmit() {
    this.chpassForm.get('password')?.markAsTouched();

    this.chpassForm.get('confirm_pass')?.markAsTouched();
  }

  ngOnDestroy() {
    this._document.body.classList.add('body');
    // this.toast.success({detail:'Success',summary:'Successfuly logged out', sticky:false,position:'false'});
  }

  onStrengthChange(score: any) {
    console.log('new score', score);
  }

  id = localStorage.getItem('userData');
  public chform = {
    id: null,
    password: null,
    confirm_pass: null,
  };

  submitPass() {
    this.http
      .post('http://127.0.0.1:8000/api/users/superChange' + '/' + this.id, this.chform)
      .subscribe((res: any) => {
        console.log(res.id);
        this.token.handle(sessionStorage.getItem('ftoken'));
        this.route.navigateByUrl('super-admin/sadmin-home');
      });
  }
}