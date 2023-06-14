import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BackendService } from 'src/app/services/backend.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-member-profile',
  templateUrl: './member-profile.component.html',
  styleUrls: ['./member-profile.component.scss'],
})
export class MemberProfileComponent implements OnInit, OnDestroy {
  prov: any;
  city: any;
  brgy: any;
  region: any;

  changePass!: FormGroup;

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

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private backend: BackendService,
    private route: Router,
    private toast: NgToastService
  ) {
    this.myProfile();
    this.myBene();
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

  ngOnDestroy() {}
  ngOnInit() {
    this.changePass = this.fb.group(
      {
        current_pass: new FormControl(null),

        new_pass: new FormControl(null),

        retype_pass: new FormControl(null),
      },
      {
        validator: this.passwordMatch('new_pass', 'retype_pass'),
      }
    );
  }

  id: any = localStorage.getItem('userData');
  memId: string = '';
  first_name: string = '';
  middle_name: string = '';
  last_name: string = '';
  suffix: string = '';
  gender: string = '';
  address: string = '';
  mobile_number: string = '';
  birthdate: string = '';
  civil_status: string = '';
  company_address: string = '';
  company_name: string = '';
  occupation: string = '';
  spouse: string = '';
  tin_number: string = '';
  email: string = '';
  department: string = '';
  employment_status: string = '';

  myProfile() {
    this.http.get('http://127.0.0.1:8000/api/users/myProfile/' + this.id).subscribe((res: any) => {
      console.log('myprof' + res);
      this.memId = res.id;
      this.first_name = res.first_name;
      this.middle_name = res.middle_name;
      this.last_name = res.last_name;
      this.suffix = res.suffix;
      this.email = res.email;
      this.address = res.address;
      this.mobile_number = [res.mobile_number.slice(0, 3),'-', res.mobile_number.slice(3, 6), '-', res.mobile_number.slice(6),].join('');
      this.birthdate = res.birthdate;
      this.civil_status = res.civil_status;
      this.company_address = res.company_address;
      this.company_name = res.company_name;
      this.occupation = res.occupation;
      this.spouse = res.spouse;
      this.tin_number = res.tin_number;
      this.gender = res.gender;
      this.employment_status = res.employment_status;
      this.department = res.department;
    });
  }

  ben: any[] = [];
  myBene() {
    this.http.get('http://127.0.0.1:8000/api/beneficiaries').subscribe((res: any) => {
      console.log(res);
      this.ben = res;
    });
  }

  public form = {
    current_pass: null,
    new_pass: null,
    retype_pass: null,
    userId: this.id,
  };

  onSubmit() {
    if (this.changePass.invalid) {
      this.toast.warning({detail: 'Password not match', summary: 'Please check the password', duration: 2000, sticky: false, position: 'tr'});
    } else {
      console.log(this.email);
      this.http
        .post('http://127.0.0.1:8000/api/users/changePass/' + this.email, this.form)
        .subscribe(
          (res: any) => {
            this.toast.success({detail: 'Success', summary: 'Password changed successfuly', duration: 2000, sticky: false, position: 'tr'});
            this.route.navigateByUrl('member/member-home');
          },

          (error) => {
            this.toast.error({detail: 'Invalid current password', summary: 'Please check the password you input', duration: 2000, sticky: false, position: 'tr'});
          }
        );
    }
  }
}
