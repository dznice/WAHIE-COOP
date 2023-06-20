import { HttpClient } from '@angular/common/http';
import { Component, HostListener, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BackendService } from 'src/app/services/backend.service';
import { NgToastService } from 'ng-angular-popup';
import { DOCUMENT } from '@angular/common';

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
  maxDate: any;

  private formatDate() {
    const d = new Date();
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    this.maxDate = [year, month, day].join('-');
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
    private toast: NgToastService,
    @Inject(DOCUMENT) private _document: any,
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
    this._document.body.classList.add('body');
    this.formatDate();
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

    this.showRegions();
    this.showProvinces();
    this.showCities();
    this.showBarangay();
    this.showBarangayDesc();
    this.logSelectedValues();

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
      this.mobile_number = [
        res.mobile_number.slice(0, 3),
        '-',
        res.mobile_number.slice(3, 6),
        '-',
        res.mobile_number.slice(6),
      ].join('');
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
      this.toast.warning({
        detail: 'Password not match',
        summary: 'Please check the password',
        duration: 2000,
        sticky: false,
        position: 'tr',
      });
    } else {
      console.log(this.email);
      this.http
        .post('http://127.0.0.1:8000/api/users/changePass/' + this.email, this.form)
        .subscribe(
          (res: any) => {
            this.toast.success({
              detail: 'Success',
              summary: 'Password changed successfuly',
              duration: 2000,
              sticky: false,
              position: 'tr',
            });
            this.route.navigateByUrl('member/member-home');
          },

          (error) => {
            this.toast.error({
              detail: 'Invalid current password',
              summary: 'Please check the password you input',
              duration: 2000,
              sticky: false,
              position: 'tr',
            });
          }
        );
    }
  }

  selectedRegion: any;
  selectedProvince: any;
  selectedCity: any;
  selectedBarangay: any;

  province: any;
  cities: any;
  barangay: any;

  isDisplayed: boolean = true;

  civilStatus: string[] = ['Single', 'Married'];
  employmentStatus: string[] = ['Employed', 'Unemployed', 'Self-employed'];
  // disabling spouse when single
  isSpouseDisabled: boolean = false;
  onSpouseChange() {
    if (this.updateMemberform.civil_status === this.civilStatus[0]) {
      this.isSpouseDisabled = true;
    } else {
      this.isSpouseDisabled = false;
    }
  }

  // disabling occupation when unemployed
  isOccupationDisabled: boolean = false;
  isCompAddDisabled: boolean = false;
  onEmploymentChange() {
    if (this.updateMemberform.employment_status === this.employmentStatus[1]) {
      this.isOccupationDisabled = true;
      this.isCompAddDisabled = true;
    } else {
      this.isOccupationDisabled = false;
      this.isCompAddDisabled = false;
    }
  }

  logSelectedValues() {
    console.log('Selected Region:', this.updateMemberform.selectedRegion);
    console.log('Selected Province:', this.updateMemberform.selectedProvince);
    console.log('Selected City:', this.updateMemberform.selectedCity);
    console.log('Selected Barangay:', this.updateMemberform.selectedBarangay);
  }

  showRegions() {
    this.http.get('http://127.0.0.1:8000/api/region').subscribe((res: any) => {
      console.log(res);
      this.region = res;
    });
  }

  showProvinces() {
    if (this.updateMemberform.selectedRegion) {
      console.log(this.selectedRegion);
      this.updateMemberform.selectedRegionDescription = this.region.find(
        (reg: { region_code: null }) => reg.region_code === this.updateMemberform.selectedRegion
      )?.region_description;
      this.http
        .get(`http://127.0.0.1:8000/api/province/${this.updateMemberform.selectedRegion}`)
        .subscribe((res: any) => {
          console.log(res);
          this.province = res;
        });
    } else {
      this.province = [];
    }
  }

  showCities() {
    if (this.updateMemberform.selectedProvince) {
      console.log(this.selectedProvince);
      this.updateMemberform.selectedProvinceDescription = this.province.find(
        (prov: { province_code: null }) =>
          prov.province_code === this.updateMemberform.selectedProvince
      )?.province_description;
      this.http
        .get(`http://127.0.0.1:8000/api/city/${this.updateMemberform.selectedProvince}`)
        .subscribe((res: any) => {
          console.log(res);
          this.cities = res;
        });
    } else {
      this.cities = [];
    }
  }

  showBarangay() {
    if (this.updateMemberform.selectedCity) {
      console.log(this.selectedCity);
      this.updateMemberform.selectedCityDescription = this.cities.find(
        (city: { city_municipality_code: null }) =>
          city.city_municipality_code === this.updateMemberform.selectedCity
      )?.city_municipality_description;
      this.http
        .get(`http://127.0.0.1:8000/api/barangay/${this.updateMemberform.selectedCity}`)
        .subscribe((res: any) => {
          console.log(res);
          this.barangay = res;
        });
    } else {
      this.barangay = [];
    }
  }

  showBarangayDesc() {
    if (this.updateMemberform.selectedBarangay) {
      console.log(this.selectedBarangay);

      this.http
        .get(`http://127.0.0.1:8000/api/barangay/${this.updateMemberform.selectedCity}`)
        .subscribe((res: any) => {
          console.log(res);
          this.barangay = res;
        });
    } else {
      this.barangay = [];
    }
  }

  editProfile = 2;
  edit(index: any) {
    this.editProfile = index;
  }

  @HostListener('window:keydown.esc', ['$event'])
  onEsc(event: KeyboardEvent) {
    console.log(event);
    this.edit(2);
  }

  public updateMemberform = {
    email: this.email,
    tin_number: null,
    civil_status: null,
    spouse: null,
    employment_status: null,
    occupation: null,
    company_address: null,

    selectedRegion: null,
    current_address: null,
    selectedCity: null,
    selectedProvince: null,
    postal_code: null,
    selectedBarangay: null,
    selectedRegionDescription: null,
    selectedProvinceDescription: null,
    selectedCityDescription: null,
    selectedBarangayDescription: null,
  };

  updateProfile() {
    console.log(this.updateMemberform);
    this.http
      .post('http://127.0.0.1:8000/api/profileUpdate' + '/' + this.email, this.updateMemberform)
      .subscribe(
        (res: any) => {
          console.log(res);
          location.reload();
        },
        (error) => {
          this.toast.warning({
            detail: 'Input is required',
            summary: 'Please Check',
            duration: 2000,
            sticky: false,
            position: 'tr',
          });
        }
      );
  }

  
  addBeneficiary = 2;
  addBene(index: any) {
    this.addBeneficiary = index;
  }

//bene
row = [
  {
    benificiary_name: '',
    benificiary_birthdate: '',
    benificiary_relation: '',
  },
  {
    benificiary_name: '',
    benificiary_birthdate: '',
    benificiary_relation: '',
  },
  {
    benificiary_name: '',
    benificiary_birthdate: '',
    benificiary_relation: '',
  },
];

addTable() {
  const obj = {
    benificiary_name: '',
    benificiary_birthdate: '',
    benificiary_relation: '',
    required: true,
  };
  this.row.push(obj);
}

delModal = -1;
showDel(index: number) {
  this.delModal = index;
}

deleteRow(x: number) {
  //var delBtn = confirm(' Do you want to delete ?');
  // if (delBtn == true) {
  //   s
  // }
  this.row.splice(x, 1);
  this.showDel(2);
}

public updateBeneForm = {

  row: this.row,

};
updateBene(){
  this.http
  .post('http://127.0.0.1:8000/api/beneUpdate' + '/' + this.email, this.updateBeneForm)
  .subscribe(
    (res: any) => {
      location.reload();
    this.toast.success({
      detail: 'Success',
      summary: 'Beneficiary Added',
      duration: 2000,
      sticky: false,
      position: 'tr',
    });
    },
    (error) => {
      this.toast.warning({
        detail: 'Input is required',
        summary: 'Please Check',
        duration: 2000,
        sticky: false,
        position: 'tr',
      });
    }
  );
}

beneDel:any
deleteMember(id:any){
  console.log(id)
  this.http
  .post('http://127.0.0.1:8000/api/beneRemove' + '/' + id, this.beneDel)
  .subscribe(
    (res: any) => {
    this.toast.success({
      detail: 'Success',
      summary: 'Beneficiary Removed',
      duration: 2000,
      sticky: false,
      position: 'tr',
    });
    this.myBene()
    },
    (error) => {
      this.toast.warning({
        detail: 'Input is required',
        summary: 'Please Check',
        duration: 2000,
        sticky: false,
        position: 'tr',
      });
    }
  );
}

}


